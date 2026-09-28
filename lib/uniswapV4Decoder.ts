import { decodeSwapExactInSingle } from "./uniswap/v4/decodeSwapExactInSingle";
import { decodeSwapExactOutSingle } from "./uniswap/v4/decodeSwapExactOutSingle";
import { decodeSwapExactOut } from "./uniswap/v4/decodeSwapExactOut";
import { ethers } from "ethers";

import { V4_ACTIONS } from "./uniswap/v4/actions";
import { decodeSwapExactIn, DecodedV4Swap } from "./uniswap/v4/decodeSwapExactIn";
import { decodeSettle } from "./uniswap/v4/decodeSettle";

import { decodeTakeAll } from "./uniswap/v4/decodeTakeAll";


export function decodeV4Swap(
  input: string
): DecodedV4Swap | null {

  try {

    console.log("===== V4 SWAP =====");

    const coder =
      ethers.AbiCoder.defaultAbiCoder();

    const decoded =
      coder.decode(
        [
          "bytes",
          "bytes[]"
        ],
        input
      );

    const actionBytes =
      decoded[0] as string;

    const params =
      decoded[1] as string[];

    console.log(
      "ACTION BYTES:",
      actionBytes
    );

    console.log(
      "TOTAL PARAMS:",
      params.length
    );

    const bytes =
      ethers.getBytes(
        actionBytes
      );

    const actions: string[] = [];

    for (const b of bytes) {

      const name =
        V4_ACTIONS[b] ??
        `UNKNOWN_${b}`;

      actions.push(name);

      console.log(
        "V4 ACTION:",
        name
      );

    }

    console.log(
      "===== ACTION PARAMS ====="
    );
let swap: DecodedV4Swap | undefined;
    actions.forEach(
      (
        action,
        index
      ) => {

        const param =
          params[index];

        console.log(
          "------------------------"
        );

        console.log(
          "ACTION:",
          action
        );

        console.log(
          "PARAM:",
          param
        );

        if (!param) {

          return;

        }

        switch (action) {

     case "SWAP_EXACT_IN": {

  console.log("FOUND SWAP_EXACT_IN");

  swap = decodeSwapExactIn(param);

  console.log("DECODED SWAP_EXACT_IN");

  console.log(swap);

  break;

}

          case "SETTLE": {

            console.log(
              "FOUND SETTLE"
            );

            const settle =
              decodeSettle(
                param
              );

            console.log(
              settle
            );

            break;

          }

          case "TAKE_ALL": {

            console.log(
              "FOUND TAKE_ALL"
            );

            const takeAll =
              decodeTakeAll(
                param
              );

            console.log(
              takeAll
            );

            break;

          }

          case "TAKE": {

            console.log(
              "FOUND TAKE"
            );

            console.log(
              param
            );

            break;

          }

        case "SWAP_EXACT_OUT": {

  console.log("FOUND SWAP_EXACT_OUT");

  swap = decodeSwapExactOut(param);

  console.log("DECODED SWAP_EXACT_OUT");

  console.log(swap);

  break;

}

         case "SWAP_EXACT_OUT_SINGLE": {

  console.log(
    "FOUND SWAP_EXACT_OUT_SINGLE"
  );

  swap = decodeSwapExactOutSingle(
    param
  );

  console.log(
    "DECODED SWAP_EXACT_OUT_SINGLE"
  );

  console.log(
    swap
  );

  break;

}

          case "SWAP_EXACT_IN_SINGLE": {

  console.log(
    "FOUND SWAP_EXACT_IN_SINGLE"
  );

  swap = decodeSwapExactInSingle(
    param
  );

  console.log(
    "DECODED SWAP_EXACT_IN_SINGLE"
  );

  console.log(
    swap
  );

  break;

}

          default: {

            console.log(
              "UNKNOWN ACTION PARAM"
            );

          }

        }

      }
    );

    return {

  actions,

  tokenIn: swap?.tokenIn,

  tokenOut: swap?.tokenOut,

  tokenInAddress: swap?.tokenInAddress,

  tokenOutAddress: swap?.tokenOutAddress,

  recipient: undefined,

  amountIn: swap?.amountIn,

  amountOutMinimum: swap?.amountOutMinimum

};

  }

  catch (e) {

    console.log(
      "V4 decode failed",
      e
    );

    return null;

  }

}