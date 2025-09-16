import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { token, password } = await req.json();
  if (!token || !password) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  const rec = await prisma.passwordResetToken.findUnique({ where: { token } });
  if (!rec || rec.used || rec.expiresAt < new Date()) return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
  const hash = await bcrypt.hash(password, 10);
  await prisma.$transaction([
    prisma.user.update({ where: { id: rec.userId }, data: { passwordHash: hash } }),
    prisma.passwordResetToken.update({ where: { token }, data: { used: true } })
  ]);
  return NextResponse.json({ ok: true });
}
