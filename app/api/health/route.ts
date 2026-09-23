import { NextResponse } from "next/server";

/**
 * Placeholder health/status endpoint for future REST integration.
 * Extend with real API routes under /api/* as backends come online.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "oll-website",
    version: "0.1.0",
    message:
      "Ready for REST API integration. Wire lib/content.ts to OLL_API_BASE_URL when backends are available.",
  });
}
