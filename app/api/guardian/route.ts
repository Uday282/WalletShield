import { NextResponse } from "next/server";

import {
  analyzeWalletThreat,
} from "@/lib/threat/threatAnalysisService";

export async function POST(
  req: Request
) {
  try {

    const body =
      await req.json();

    const address =
      body.address;

    if (!address) {

      return NextResponse.json(
        {
          error:
            "Wallet address is required"
        },
        {
          status: 400
        }
      );
    }

    const result =
      await analyzeWalletThreat(
        address
      );

    return NextResponse.json(
      result
    );

  } catch (error) {

    console.error(
      "Guardian API Error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Guardian analysis failed"
      },
      {
        status: 500
      }
    );
  }
}