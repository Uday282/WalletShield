import { NextResponse }
from "next/server";

import {
  getSiteThreat
} from "@/lib/siteThreatDatabase";

export async function POST(
  req: Request
) {

  const body =
    await req.json();

  const threat =
    getSiteThreat(
      body.domain
    );

  console.log(
    "SITE CHECK RESULT:",
    threat
  );

  return NextResponse.json({
    threat:
      threat || null
  });
}