import { Request, Response, NextFunction } from "express";
import { ApplicationLetterService } from "../services/application-letter.service";
import { sendSuccess } from "../utils/response-builder.util";

export class ApplicationLetterController {
  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ApplicationLetterService.list(
        req.user!.id,
        req.query
      );
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const letter = await ApplicationLetterService.get(
        req.user!.id,
        req.params.id
      );
      sendSuccess(res, letter);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const letter = await ApplicationLetterService.create(
        req.user!.id,
        req.body
      );
      sendSuccess(res, letter, 201);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const letter = await ApplicationLetterService.update(
        req.user!.id,
        req.params.id,
        req.body
      );
      sendSuccess(res, letter);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await ApplicationLetterService.delete(req.user!.id, req.params.id);
      sendSuccess(res);
    } catch (error) {
      next(error);
    }
  }

  static async duplicate(req: Request, res: Response, next: NextFunction) {
    try {
      const letter = await ApplicationLetterService.duplicate(
        req.user!.id,
        req.params.id
      );
      sendSuccess(res, letter, 201);
    } catch (error) {
      next(error);
    }
  }

  static async download(req: Request, res: Response, next: NextFunction) {
    try {
      const formatParam = String(req.query.format ?? "docx").toLowerCase();
      if (formatParam !== "docx") {
        res.status(400).json({ message: "format not valid" });
        return;
      }

      const document = await ApplicationLetterService.generateDocx(
        req.user!.id,
        req.params.id
      );

      res.setHeader("Content-Type", document.mimeType);
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${document.fileName}"`
      );
      res.send(document.buffer);
    } catch (error) {
      next(error);
    }
  }

  static preview(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }
}
