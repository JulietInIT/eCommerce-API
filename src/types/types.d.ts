import type { Request } from 'express';

// here we extend the Express Request type to include a custom 'user' property.
// This allows TypeScript to recognize 'req.user' as a valid field,
// avoiding the "property 'user' does not exist on type 'Request'" error.

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        roles: string[];
      };
    }
  }
}