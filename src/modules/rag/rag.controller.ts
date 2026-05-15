import { Request, Response } from "express";
import { RAGService } from "./rag.service";

const ragService = new RAGService();

const getStats = async (req: Request, res: Response) => {
  const result = await ragService.getStats();

  res.status(200).json({
    success: true,
    httpStatusCode: 200,
    message: "RAG stats retrieved successfully",
    data: result,
  });
};

const ingestMedicines = async (req: Request, res: Response) => {
  const result = await ragService.ingestMedicinesData();

  res.status(200).json({
    success: true,
    httpStatusCode: 200,
    message: "Medicine Data Ingested Successfully",
    data: result,
  });
};

const queryRag = async (req: Request, res: Response) => {
  const { query, limit, sourceType } = req.body;
  if (!query) {
    return res.status(400).json({
      success: false,
      message: "Query is required",
    });
  }

  try {
    const result = await ragService.generateAnswer(
      query,
      limit ?? 5,
      sourceType,
      true,
    );

    res.status(200).json({
      success: true,
      message: "AI response generated successfully",
      data: result,
    });
  } catch (error) {
    console.error("RAG Query Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate AI response",
    });
  }
};

export const RagController = {
  getStats,
  ingestMedicines,
  queryRag,
};
