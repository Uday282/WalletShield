import {
  getTokenSymbol
} from "./tokenAddressRegistry";
import { ethers } from "ethers";
export interface DecodedPath {

  tokenIn: string;

  tokenOut: string;

  tokenInSymbol: string;

  tokenOutSymbol: string;

  fee: number;

}
export function decodeUniswapV3Path(
  path: string
): DecodedPath | null {

  try {

    const hex =
      path.replace(
        "0x",
        ""
      );

    if (
      hex.length < 86
    ) {

      return null;

    }

   const tokenIn =
  "0x" +
  hex.slice(0, 40);

// First fee
const fee =
  parseInt(
    hex.slice(40, 46),
    16
  );

// LAST token in the path
const tokenOut =
  "0x" +
  hex.slice(
    hex.length - 40
  );

const tokenInAddress =
  ethers.getAddress(
    tokenIn
  );

const tokenOutAddress =
  ethers.getAddress(
    tokenOut
  );

console.log(
  "FULL PATH:",
  hex
);

console.log(
  "FIRST TOKEN:",
  tokenInAddress
);

console.log(
  "FINAL TOKEN:",
  tokenOutAddress
);

return {

  tokenIn:
    tokenInAddress,

  tokenOut:
    tokenOutAddress,

  tokenInSymbol:
    getTokenSymbol(
      tokenInAddress
    ),

  tokenOutSymbol:
    getTokenSymbol(
      tokenOutAddress
    ),

  fee

};

  }

  catch {

    return null;

  }

}