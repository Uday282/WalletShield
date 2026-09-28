import { AbiCoder } from "ethers";

import type {
  PoolKey,
  PathKey,
  ExactInputParams,
  ExactOutputParams,
  ExactInputSingleParams,
  ExactOutputSingleParams,
} from "./interfaces";

const abi = AbiCoder.defaultAbiCoder();

const POOL_KEY_ABI =
  "tuple(address currency0,address currency1,uint24 fee,int24 tickSpacing,address hooks)";

const PATH_KEY_ABI =
  "tuple(address intermediateCurrency,uint24 fee,int24 tickSpacing,address hooks,bytes hookData)";

const EXACT_INPUT_PARAMS_ABI =
  "tuple(address currencyIn,(address intermediateCurrency,uint24 fee,int24 tickSpacing,address hooks,bytes hookData)[] path,uint256[] minHopPriceX36,uint128 amountIn,uint128 amountOutMinimum)";

const EXACT_OUTPUT_PARAMS_ABI =
  "tuple(address currencyOut,(address intermediateCurrency,uint24 fee,int24 tickSpacing,address hooks,bytes hookData)[] path,uint256[] minHopPriceX36,uint128 amountOut,uint128 amountInMaximum)";

const EXACT_INPUT_SINGLE_ABI =
  "tuple((address currency0,address currency1,uint24 fee,int24 tickSpacing,address hooks) poolKey,bool zeroForOne,uint128 amountIn,uint128 amountOutMinimum,uint256 minHopPriceX36,bytes hookData)";

const EXACT_OUTPUT_SINGLE_ABI =
  "tuple((address currency0,address currency1,uint24 fee,int24 tickSpacing,address hooks) poolKey,bool zeroForOne,uint128 amountOut,uint128 amountInMaximum,uint256 minHopPriceX36,bytes hookData)";

export function decodePoolKey(
  data: string
): PoolKey {

  const [decoded] =
    abi.decode(
      [POOL_KEY_ABI],
      data
    );

  return {

    currency0:
      decoded.currency0,

    currency1:
      decoded.currency1,

    fee:
      Number(decoded.fee),

    tickSpacing:
      Number(decoded.tickSpacing),

    hooks:
      decoded.hooks,

  };

}

export function decodePathKey(
  data: string
): PathKey {

  const [decoded] =
    abi.decode(
      [PATH_KEY_ABI],
      data
    );

  return {

    intermediateCurrency:
      decoded.intermediateCurrency,

    fee:
      Number(decoded.fee),

    tickSpacing:
      Number(decoded.tickSpacing),

    hooks:
      decoded.hooks,

    hookData:
      decoded.hookData,

  };

}

export function decodeExactInputParams(
  data: string
): ExactInputParams {

  const [decoded] =
    abi.decode(
      [EXACT_INPUT_PARAMS_ABI],
      data
    );

  return {

    currencyIn:
      decoded.currencyIn,

    path:
      decoded.path.map(
        (p: any) => ({

          intermediateCurrency:
            p.intermediateCurrency,

          fee:
            Number(p.fee),

          tickSpacing:
            Number(p.tickSpacing),

          hooks:
            p.hooks,

          hookData:
            p.hookData,

        })
      ),

    minHopPriceX36:
      decoded.minHopPriceX36.map(
        (v: any) =>
          BigInt(v)
      ),

    amountIn:
      BigInt(
        decoded.amountIn
      ),

    amountOutMinimum:
      BigInt(
        decoded.amountOutMinimum
      ),

  };

}

export function decodeExactOutputParams(
  data: string
): ExactOutputParams {

  const [decoded] =
    abi.decode(
      [EXACT_OUTPUT_PARAMS_ABI],
      data
    );

  return {

    currencyOut:
      decoded.currencyOut,

    path:
      decoded.path.map(
        (p: any) => ({

          intermediateCurrency:
            p.intermediateCurrency,

          fee:
            Number(p.fee),

          tickSpacing:
            Number(p.tickSpacing),

          hooks:
            p.hooks,

          hookData:
            p.hookData,

        })
      ),

    minHopPriceX36:
      decoded.minHopPriceX36.map(
        (v: any) =>
          BigInt(v)
      ),

    amountOut:
      BigInt(
        decoded.amountOut
      ),

    amountInMaximum:
      BigInt(
        decoded.amountInMaximum
      ),

  };

}

export function decodeExactInputSingleParams(
  data: string
): ExactInputSingleParams {

  const [decoded] =
    abi.decode(
      [EXACT_INPUT_SINGLE_ABI],
      data
    );

  return {

    poolKey: {

      currency0:
        decoded.poolKey.currency0,

      currency1:
        decoded.poolKey.currency1,

      fee:
        Number(
          decoded.poolKey.fee
        ),

      tickSpacing:
        Number(
          decoded.poolKey.tickSpacing
        ),

      hooks:
        decoded.poolKey.hooks,

    },

    zeroForOne:
      decoded.zeroForOne,

    amountIn:
      BigInt(
        decoded.amountIn
      ),

    amountOutMinimum:
      BigInt(
        decoded.amountOutMinimum
      ),

    minHopPriceX36:
      BigInt(
        decoded.minHopPriceX36
      ),

    hookData:
      decoded.hookData,

  };

}

export function decodeExactOutputSingleParams(
  data: string
): ExactOutputSingleParams {

  const [decoded] =
    abi.decode(
      [EXACT_OUTPUT_SINGLE_ABI],
      data
    );

  return {

    poolKey: {

      currency0:
        decoded.poolKey.currency0,

      currency1:
        decoded.poolKey.currency1,

      fee:
        Number(
          decoded.poolKey.fee
        ),

      tickSpacing:
        Number(
          decoded.poolKey.tickSpacing
        ),

      hooks:
        decoded.poolKey.hooks,

    },

    zeroForOne:
      decoded.zeroForOne,

    amountOut:
      BigInt(
        decoded.amountOut
      ),

    amountInMaximum:
      BigInt(
        decoded.amountInMaximum
      ),

    minHopPriceX36:
      BigInt(
        decoded.minHopPriceX36
      ),

    hookData:
      decoded.hookData,

  };

}