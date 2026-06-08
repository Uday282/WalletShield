"use client";

import "@rainbow-me/rainbowkit/styles.css";

import {
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";

import {
  WagmiProvider,
} from "wagmi";

import {
  mainnet,
  polygon,
} from "wagmi/chains";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: "Wallet Safety Dashboard",
  projectId:
    "YOUR_PROJECT_ID",
  chains: [mainnet, polygon],
  ssr: true,
});

const queryClient =
  new QueryClient();

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiProvider config={config}>

      <QueryClientProvider
        client={queryClient}
      >

        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>

      </QueryClientProvider>

    </WagmiProvider>
  );
}