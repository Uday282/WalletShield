import { ethers } from "ethers";

export interface DecodedTakeAll {

  type: "TAKE_ALL";

  token?: string;

  recipient?: string;

}

export function decodeTakeAll(
  data: string
): DecodedTakeAll | null {

  try {

    console.log("===== TAKE_ALL =====");

    console.log(data);

    return {

      type: "TAKE_ALL"

    };

  }

  catch (e) {

    console.log(
      "TAKE_ALL decode failed",
      e
    );

    return null;

  }

}