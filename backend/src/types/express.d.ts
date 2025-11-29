import type { User } from "../../generated/prisma/client";
import type { SafeUser } from "../services/auth.service";

declare global {
  namespace Express {
    interface Request {
      user?: SafeUser;
      authToken?: string;
    }
  }
}

export {};
