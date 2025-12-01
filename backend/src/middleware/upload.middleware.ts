import type { Request, Response, NextFunction } from "express";
import multer, { MulterError } from "multer";
import { ResponseError } from "../utils/response-error.util";

const MAX_SIGNATURE_SIZE = 1 * 1024 * 1024; // 1 MB
const signatureMimeTypes = new Set(["image/png", "image/jpeg", "image/jpg"]);

const signatureUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_SIGNATURE_SIZE,
  },
  fileFilter: (_req, file, cb) => {
    if (signatureMimeTypes.has(file.mimetype.toLowerCase())) {
      cb(null, true);
      return;
    }
    cb(
      new ResponseError(
        400,
        "Signature must be an image with PNG or JPG format"
      )
    );
  },
}).single("signature");

export const handleSignatureUpload = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  signatureUpload(req, res, (err?: unknown) => {
    if (!err) {
      next();
      return;
    }

    if (err instanceof ResponseError) {
      next(err);
      return;
    }

    if (err instanceof MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        next(
          new ResponseError(
            400,
            "Signature image size must be less than or equal to 1 MB"
          )
        );
        return;
      }

      next(new ResponseError(400, err.message));
      return;
    }

    next(err as Error);
  });
};
