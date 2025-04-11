import { Request, Response, NextFunction } from 'express';

/**
 * Async handler to avoid try-catch blocks in controller functions
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};