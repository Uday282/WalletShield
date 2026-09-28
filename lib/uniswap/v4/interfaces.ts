export interface PoolKey {
  currency0: string;
  currency1: string;
  fee: number;
  tickSpacing: number;
  hooks: string;
}

export interface PathKey {
  intermediateCurrency: string;
  fee: number;
  tickSpacing: number;
  hooks: string;
  hookData: string;
}

export interface ExactInputParams {
  currencyIn: string;
  path: PathKey[];
  minHopPriceX36: bigint[];
  amountIn: bigint;
  amountOutMinimum: bigint;
}

export interface ExactInputSingleParams {
  poolKey: PoolKey;
  zeroForOne: boolean;
  amountIn: bigint;
  amountOutMinimum: bigint;
  minHopPriceX36: bigint;
  hookData: string;
}

export interface ExactOutputParams {
  currencyOut: string;
  path: PathKey[];
  minHopPriceX36: bigint[];
  amountOut: bigint;
  amountInMaximum: bigint;
}

export interface ExactOutputSingleParams {
  poolKey: PoolKey;
  zeroForOne: boolean;
  amountOut: bigint;
  amountInMaximum: bigint;
  minHopPriceX36: bigint;
  hookData: string;
}