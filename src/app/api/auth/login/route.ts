import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { signToken, attachSessionCookie } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!email || !password) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  const token = signToken({ sub: user.id, email: user.email });
  const res = NextResponse.json({ ok: true });
  return attachSessionCookie(res, token);
}
