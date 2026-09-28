import { NextRequest, NextResponse } from "next/server";

import { decodeTransactionData } from "@/lib/transactionDecoder";

export async function POST(
  req: NextRequest
) {

  try {

    const body =
      await req.json();

    const {

      transaction,

      value

    } = body;

    if (!transaction) {

      return NextResponse.json(

        {

          error:
            "Transaction calldata is required"

        },

        {

          status: 400

        }

      );

    }

    const decoded =
      decodeTransactionData(
        transaction,
        value
      );

    return NextResponse.json({

      success: true,

      decoded

    });

  }

  catch (error) {

    console.error(
      "Transaction API Error:",
      error
    );

    return NextResponse.json(

      {

        success: false,

        error:
          "Transaction analysis failed"

      },

      {

        status: 500

      }

    );

  }

}