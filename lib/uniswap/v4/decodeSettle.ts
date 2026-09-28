import { ethers } from "ethers";

export interface DecodedSettle {

  type: "SETTLE";

  token?: string;

  amount?: bigint;

}

export function decodeSettle(
  data: string
): DecodedSettle | null {

  try {

    console.log("===== SETTLE =====");

    console.log(data);

    return {

      type: "SETTLE"

    };

  }

  catch (e) {

    console.log(
      "SETTLE decode failed",
      e
    );

    return null;

  }

}