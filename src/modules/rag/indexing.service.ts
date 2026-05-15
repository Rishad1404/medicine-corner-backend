import { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { EmbeddingService } from "./embedding.service";

const toVectorLiteral = (vector: number[]) => `[${vector.join(",")}]`;

export class IndexingService {
  private embeddingService: EmbeddingService;

  constructor() {
    this.embeddingService = new EmbeddingService();
  }

  async indexDocument(
    chunkKey: string,
    sourceType: string,
    sourceId: string,
    content: string,
    sourceLabel?: string,
    metaData?: Record<string, unknown>,
  ) {
    try {
      const embedding = await this.embeddingService.generateEmbedding(content);
      const vectorLiteral = toVectorLiteral(embedding);

      await prisma.$executeRaw(Prisma.sql`
                
                INSERT INTO "document_embeddings" 
                (
                    "id",
                    "chunkKey",
                    "sourceType",
                    "sourceId",
                    "sourceLabel",
                    "content",
                    "metaData",
                    "embedding",
                    "deletedAt",
                    "updatedAt"
                )
                VALUES 
                (
                    ${Prisma.raw("gen_random_uuid()")},
                    ${chunkKey},
                    ${sourceType},
                    ${sourceId},
                    ${sourceLabel || null},
                    ${content},
                    ${JSON.stringify(metaData || {})}::jsonb,
                    ${Prisma.raw(`'${vectorLiteral}'::vector`)},
          ${Prisma.raw("NOW()")},
          NOW()
                ) 
                ON CONFLICT ("chunkKey") 
                DO UPDATE SET 
                    "sourceType" = EXCLUDED."sourceType",
                    "sourceId" = EXCLUDED."sourceId",
                    "sourceLabel" = EXCLUDED."sourceLabel",
                    "content" = EXCLUDED."content",
                    "metaData" = EXCLUDED."metaData",
                    "embedding" = EXCLUDED."embedding",
                    "isDeleted" = false,
                    "deletedAt" = "document_embeddings"."deletedAt",
                    "updatedAt" = NOW();
            `);
    } catch (error) {
      console.log(error);
    }
  }

  async indexMedicinesData() {
    try {
      console.log("Fetching Medicine data for indexing");
      const medicines = await prisma.medicine.findMany({
        where: {
          stock: {
            gt: 0,
          },
        },
        select: {
          id: true,
          name: true,
          description: true,
          category: true,
          reviews: {
            select: {
              rating: true,
            },
          },
        },
      });

      let indexedCount = 0;
      for (const medicine of medicines) {
        const categoryName = medicine.category.name;

        const reviewsList = medicine.reviews
          .map(
            (review) => `-Rating: ${review.rating}/5. || "No Review Available"`,
          )
          .join("\n");

        const content = `Medicine Name: ${medicine.name}
                        Category: ${categoryName}
                        Description: ${medicine.description}
                        Reviews: ${reviewsList}`;
        const metaData = {
          medicineId: medicine.id,
          name: medicine.name,
          description: medicine.description,
          category: categoryName,
        };

        const chunkKey = `medicine-${medicine.id}`;

        await this.indexDocument(
          chunkKey,
          "MEDICINE",
          medicine.id,
          content,
          medicine.name,
          metaData,
        );

        indexedCount++;
      }
      console.log(`Successfully Indexed ${indexedCount} medicines `);
      return {
        success: true,
        message: `Successfully Indexed ${indexedCount} medicines `,
        indexedCount,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
