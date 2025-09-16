import { NextResponse } from 'next/server';
import pkg from '@/../package.json';

export async function GET() {
  const data = {
    name: pkg.name,
    version: pkg.version,
    time: new Date().toISOString(),
    // Heroku provides one of these depending on deploy method
    commit: process.env.HEROKU_SLUG_COMMIT || process.env.SOURCE_VERSION || 'unknown',
    branch: process.env.HEROKU_SLUG_DESCRIPTION || process.env.GIT_BRANCH || 'unknown',
  };
  return NextResponse.json(data, { headers: { 'Cache-Control': 'no-store' } });
}
