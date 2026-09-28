import { NextResponse } from "next/server";

import {
  getThreatContract
} from "@/lib/threatDatabase";

export async function POST(
  req: Request
) {

  const body =
    await req.json();

  const threat =
    getThreatContract(
      body.address
    );

  console.log(
    "THREAT CHECK RESULT:",
    threat
  );

  return NextResponse.json({
  threat: threat || null
});
}