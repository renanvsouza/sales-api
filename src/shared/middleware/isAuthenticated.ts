import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import AuthConfig from "@config/auth";
import AppError from "@shared/errors/AppError";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

function isAuthenticated(request: Request, response: Response, next: NextFunction): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [_, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, AuthConfig.jwt.secret);
    const { sub } = decodedToken as TokenPayload;
    request.user = { id: sub };
    return next();
  } catch (error) {
    next(new AppError('Invalid JWT token', 401));
  }
}

export default isAuthenticated;
