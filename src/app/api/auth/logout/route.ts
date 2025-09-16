import { NextResponse } from 'next/server';
import { clearSessionOnResponse } from '@/lib/auth';

export async function POST() {
  const res = NextResponse.json({ ok: true });
  return clearSessionOnResponse(res);
}
