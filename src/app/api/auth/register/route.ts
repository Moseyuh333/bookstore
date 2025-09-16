import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { email, password, name } = await req.json();
  if (!email || !password) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return NextResponse.json({ error: 'Email exists' }, { status: 409 });
  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.create({ data: { email, passwordHash, name } });
  return NextResponse.json({ ok: true });
}
