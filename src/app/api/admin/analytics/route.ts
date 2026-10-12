import { NextResponse } from "next/server";
import { getAnalyticsOverview } from "@/lib/goatcounter";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const daysParam = Number(searchParams.get("days"));
  const days = [7, 30, 90].includes(daysParam) ? daysParam : 30;

  try {
    const overview = await getAnalyticsOverview(days);
    return NextResponse.json(overview);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
