import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const out: any = {
    ok: true,
    env: {
      node: process.version,
      databaseUrl: process.env.DATABASE_URL ? 'present' : 'missing',
      jwtSecret: process.env.JWT_SECRET ? 'present' : 'missing',
    },
  };
  try {
    // cheap query to validate DB reachability
    await prisma.$queryRaw`SELECT 1`;
    out.db = 'ok';
  } catch (e: any) {
    out.db = 'error';
    out.dbError = e?.message || String(e);
  }
  return NextResponse.json(out);
}
