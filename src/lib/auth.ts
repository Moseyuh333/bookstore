import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export const ACCESS_COOKIE = 'access_token';
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

export interface JwtPayload {
  sub: number; // user id
  email: string;
}

export function signToken(payload: JwtPayload, expiresIn: string = '7d') {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}

export function attachSessionCookie(res: NextResponse, token: string) {
  res.cookies.set(ACCESS_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}

export function clearSessionOnResponse(res: NextResponse) {
  res.cookies.set(ACCESS_COOKIE, '', { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 0 });
  return res;
}

export function getSessionFromRequest(req: NextRequest): JwtPayload | null {
  const token = req.cookies.get(ACCESS_COOKIE)?.value;
  if (!token) return null;
  return verifyToken(token);
}
