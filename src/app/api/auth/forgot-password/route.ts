import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 });
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ ok: true }); // avoid leaking users

  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 1000 * 60 * 30); // 30m
  await prisma.passwordResetToken.create({ data: { token, userId: user.id, expiresAt } });

  // TODO: send email. For now, return token for dev.
  return NextResponse.json({ ok: true, token });
}
