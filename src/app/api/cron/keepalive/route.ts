import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Pinged on a schedule (see vercel.json) so the Supabase free-tier project
// keeps registering activity and never gets auto-paused for inactivity.
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ ok: true, checkedAt: new Date().toISOString() });
  } catch (error) {
    console.error('[cron/keepalive] Database ping failed', error);
    return NextResponse.json({ ok: false }, { status: 503 });
  }
}
