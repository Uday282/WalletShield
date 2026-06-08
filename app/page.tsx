"use client";
import { checkThreatIntel }
from "@/lib/threatIntel";

import ShareAnalysis from "@/components/ShareAnalysis";

import TransactionHistory
from "@/components/TransactionHistory";

import TopHoldings
from "@/components/TopHoldings";

import {
  fetchAllPortfolioTokens
} from "@/lib/alchemy";

import {
  getTokenPrices
} from "@/lib/coingecko";

import {
  testPortfolioRaw
} from "@/lib/alchemy";

import {
  checkProtocolReputation,
} from "@/lib/protocolReputation";

import {
  evaluateSignatureThreat,
} from "@/lib/signatureGuardian";

import {
  calculateAssetExposure
} from "@/lib/assetExposure";




import {
  checkSpenderReputation,
} from "@/lib/spenderReputation";


import {
  analyzeTransactionRisk,
} from "@/lib/transactionRiskEngine";

import {
  fetchWalletLabel,
} from "@/lib/reputationFetcher";

import {
  classifyWallet,
} from "@/lib/walletClassifier";

import {
  analyzeWalletReputation,
} from "@/lib/walletReputation";

import {
  startLiveMonitoring,
} from "@/lib/liveMonitor";
import {
  analyzeApprovalThreats,
} from "@/lib/threatEngine";

import TokenPortfolio
from "@/components/TokenPortfolio";

import ThreatRail
from "@/components/ThreatRail";

import SecurityToolsTabs
from "@/components/SecurityToolsTabs";

import DashboardLayout
from "@/components/DashboardLayout";

import BehaviorAnalytics
from "@/components/BehaviorAnalytics";

import {
  analyzeWalletBehavior,
} from "@/lib/behaviorAnalyzer";

import WalletWatchlist
from "@/components/WalletWatchlist";

import WalletHealth
from "@/components/WalletHealth";

import SecurityScoreChart
from "@/components/SecurityScoreChart";

import ThreatFeed
from "@/components/ThreatFeed";

import PortfolioRisk
from "@/components/PortfolioRisk";

import {
  analyzePortfolioRisk,
} from "@/lib/portfolioRisk";

import AlertCenter
from "@/components/AlertCenter";

import SecurityCopilot
from "@/components/SecurityCopilot";

import {
  askSecurityCopilot,
} from "@/lib/securityCopilot";

import TokenRiskAnalyzer
from "@/components/TokenRiskAnalyzer";

import {
  analyzeToken,
} from "@/lib/tokenAnalyzer";

import ContractAnalyzer
from "@/components/ContractAnalyzer";

import {
  analyzeContract,
} from "@/lib/contractAnalyzer";

import PhishingScanner
from "@/components/PhishingScanner";

import { scanUrl }
from "@/lib/urlScanner";

import EmergencyAlerts
from "@/components/EmergencyAlerts";

import DrainRiskMonitor
from "@/components/DrainRiskMonitor";

import {
  detectWalletDrainRisk,
} from "@/lib/drainDetector";

import TransactionSimulation
from "@/components/TransactionSimulation";

import { simulateTransaction }
from "@/lib/transactionSimulator";

import { detectScamApproval }
from "@/lib/scamDetector";

import {
  fetchWalletHistory,
  fetchWalletTokens,
  fetchTokenMetadata,
  testPortfolio,
} from "@/lib/alchemy";

import { useEffect, useMemo, useState } from "react";

import { ethers } from "ethers";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useAccount } from "wagmi";

import DashboardCards from "@/components/DashboardCards";

import ChainStatus from "@/components/ChainStatus";

import LiveMonitoring from "@/components/LiveMonitoring";

import WalletExposure from "@/components/WalletExposure";

import RiskAnalysis from "@/components/RiskAnalysis";

import SecurityRecommendations from "@/components/SecurityRecommendations";

import ActivityFeed from "@/components/ActivityFeed";

import TransactionDecoder from "@/components/TransactionDecoder";

import TokenApprovals from "@/components/TokenApprovals";

import {
  Token,
  Activity,
  Approval,
  DecodedTransaction,
} from "@/types/wallet";

import {
  CHAIN_ID_MAP,
  CHAINS,
} from "@/lib/chains";

import {
  ERC20_ABI,
  KNOWN_SPENDERS,
  DANGEROUS_CONTRACTS,
} from "@/lib/constants";

import { calculateRisk } from "@/lib/riskEngine";

import { decodeTransactionData } from "@/lib/transactionDecoder";

function formatUsd(
  value: number
) {

  if (
    value >= 1_000_000_000
  ) {
    return (
      value /
      1_000_000_000
    ).toFixed(1) + "B";
  }

  if (
    value >= 1_000_000
  ) {
    return (
      value /
      1_000_000
    ).toFixed(1) + "M";
  }

  if (
    value >= 1_000
  ) {
    return (
      value /
      1_000
    ).toFixed(1) + "K";
  }

  return value.toFixed(0);
}
export default function Home() {

  const { address, isConnected } =
    useAccount();
    useEffect(() => {

  if (
    address &&
    !activeWallet
  ) {

    setActiveWallet(
      address
    );
  }

}, [address]);
    const [activeWallet,
  setActiveWallet] =
  useState("");
const [walletInput,
  setWalletInput] =
  useState("");

  const [balance, setBalance] =
    useState("0");

  const [selectedChain, setSelectedChain] =
    useState("ethereum");

   const [history, setHistory] =
  useState<any[]>([]);

  const [tokens, setTokens] =
    useState<Token[]>([]);
    
    const hasWalletData =
  activeWallet &&
  (
    Number(balance) > 0 ||
    tokens.length > 0
  );

    const [
  portfolioValue,
  setPortfolioValue,
] = useState(0);

const [
  walletNetWorth,
  setWalletNetWorth,
] = useState(0);

const [
  ethPercent,
  setEthPercent
] = useState(0);

const [
  erc20Percent,
  setErc20Percent
] = useState(0);

const [
  concentrationRisk,
  setConcentrationRisk,
] = useState("");

const [
  riskInsight,
  setRiskInsight,
] = useState("");

const [
  topHolding,
  setTopHolding,
] = useState("");

const [
  topHoldingPercent,
  setTopHoldingPercent,
] = useState(0);

   const [
  walletClassification,
  setWalletClassification,
] = useState<any>(null);

const [
  guardianDecision,
  setGuardianDecision,
] = useState<any>(null);

const [
  protocolReputation,
  setProtocolReputation,
] = useState<any>(null);

  const [activities, setActivities] =
    useState<Activity[]>([]);

  const [approvals, setApprovals] =
    useState<Approval[]>([]);

  const [riskFactors, setRiskFactors] =
    useState<string[]>([]);

  const [txDataInput, setTxDataInput] =
    useState("");

  const [decodedTx, setDecodedTx] =
    useState<DecodedTransaction | null>(
      null
    );

    const [simulationResult,
  setSimulationResult,
] = useState<any>(null);

const [
  transactionRisk,
  setTransactionRisk,
] = useState<any>(null);


const [
  spenderThreat,
  setSpenderThreat,
] = useState<any>(null);


const [urlInput, setUrlInput] =
  useState("");

const [urlScanResult,
  setUrlScanResult] =
  useState<any>(null);

  const [
  contractInput,
  setContractInput,
] = useState("");

const [
  contractAnalysis,
  setContractAnalysis,
] = useState<any>(null);

const [
  tokenInput,
  setTokenInput,
] = useState("");

const [
  tokenAnalysis,
  setTokenAnalysis,
] = useState<any>(null);

const [
  copilotQuestion,
  setCopilotQuestion,
] = useState("");

const [
  copilotResponse,
  setCopilotResponse,
] = useState<any>(null);

const [alerts, setAlerts] =
  useState<any[]>([]);

  
  const [
  walletReputation,
  setWalletReputation,
] = useState<any>(null);



  const [threatFeed, setThreatFeed] =
  useState<any[]>([]);

  const [
  securityHistory,
  setSecurityHistory,
] = useState<any[]>([]);

const [monitoringUptime,
  setMonitoringUptime] =
  useState("0s");

  const [
  watchWalletInput,
  setWatchWalletInput,
] = useState("");

const [
  watchedWallets,
  setWatchedWallets,
] = useState<any[]>([]);


  const [lastUpdated, setLastUpdated] =
    useState("");

  const [
    liveProtectionStatus,
    setLiveProtectionStatus,
  ] = useState("Protected");

  const [isScanning, setIsScanning] =
    useState(false);

  useEffect(() => {

    async function detectNetwork() {

      if (!window.ethereum)
        return;

      try {

        const provider =
          new ethers.BrowserProvider(
            window.ethereum
          );

        const network =
          await provider.getNetwork();

        const detectedChain =
          CHAIN_ID_MAP[
            Number(network.chainId)
          ];

        if (detectedChain) {

          setSelectedChain(
            detectedChain
          );
        }

      } catch (err) {

        console.log(err);
      }
    }

    detectNetwork();

  }, []);

  useEffect(() => {

  async function fetchBalance() {

    if (!activeWallet) {

      setBalance("0");
      return;
    }

    try {

      console.log(
        "Fetching balance for:",
        activeWallet
      );

      const provider =
        new ethers.JsonRpcProvider(
          "https://ethereum-rpc.publicnode.com"
        );

      const balanceWei =
        await provider.getBalance(
          activeWallet
        );

      console.log(
        "Balance wei:",
        balanceWei.toString()
      );

      const formattedBalance =
        ethers.formatEther(
          balanceWei
        );

      console.log(
        "Formatted balance:",
        formattedBalance
      );

      setBalance(
        Number(
          formattedBalance
        ).toFixed(4)
      );

    } catch (err) {

      console.log(
        "FETCH BALANCE ERROR:",
        err
      );

      setBalance("0");
    }
  }

  fetchBalance();

}, [activeWallet]);
useEffect(() => {

  const ETH_PRICE = 2500;

  const ethUsdValue =
    Number(balance) *
    ETH_PRICE;

  const totalNetWorth =
    portfolioValue +
    ethUsdValue;

  setWalletNetWorth(
    totalNetWorth
  );

  if (
    totalNetWorth > 0
  ) {

    setEthPercent(
      (
        ethUsdValue /
        totalNetWorth
      ) * 100
    );

    setErc20Percent(
      (
        portfolioValue /
        totalNetWorth
      ) * 100
    );

  }

}, [
  balance,
  portfolioValue
]);
useEffect(() => {

  async function loadReputation() {

    if (!activeWallet)
      return;

    // FIRST:
    // check local intelligence DB

    const known =
      analyzeWalletReputation(
        activeWallet
      );

    if (known) {

      setWalletReputation(
        known
      );

      return;
    }

    // SECOND:
    // try dynamic label fetch

    const fetchedLabel =
      await fetchWalletLabel(
        activeWallet
      );

    if (fetchedLabel) {

      setWalletReputation({

        label:
          fetchedLabel,

        risk: "Unknown",

        description:
          "Fetched from external intelligence source.",

      });

      return;
    }

    // FALLBACK

    setWalletReputation({

      label:
        "Unlabeled Wallet",

      risk: "Unknown",

      description:
        "No known reputation data available.",

    });
  }

  loadReputation();

}, [activeWallet]);

useEffect(() => {

  if (
    !activities.length
  ) return;

  const result =
  classifyWallet(
    activities,
    balance,
    tokens
  );

  setWalletClassification(
    result
  );

}, [
  activities,
  balance,
]);

  /* useEffect(() => {

    async function fetchTokens() {

     if (!activeWallet) {

  setBalance("0");
  return;
}

      try {

        setIsScanning(true);

        const provider =
          new ethers.JsonRpcProvider(
  "https://ethereum-rpc.publicnode.com"
);

        const network =
          await provider.getNetwork();

        const currentChainId =
          Number(network.chainId);

        const detectedChain =
          CHAIN_ID_MAP[
            currentChainId
          ];

        if (!detectedChain) {

          setTokens([
            {
              symbol:
                "Unsupported Network",

              balance: "0",
            },
          ]);

          return;
        }

        const chainConfig =
          CHAINS[
            detectedChain as keyof typeof CHAINS
          ];

        setSelectedChain(
          detectedChain
        );

        const tokenList = [
          {
            symbol: "USDT",
            address:
              chainConfig.usdt,
          },

          {
            symbol: "USDC",
            address:
              chainConfig.usdc,
          },

          {
            symbol: "DAI",
            address:
              chainConfig.dai,
          },
        ];

        const balances = [];

        for (const token of tokenList) {

          try {

            const contract =
              new ethers.Contract(
                token.address,
                ERC20_ABI,
                provider
              );

            const rawBalance =
              await contract.balanceOf(
                activeWallet
              );

            const decimals =
              await contract.decimals();

            const formattedBalance =
              ethers.formatUnits(
                rawBalance,
                decimals
              );

            balances.push({
              symbol:
                token.symbol,

              balance:
                Number(
                  formattedBalance
                ).toFixed(4),
            });

          } catch (err) {

            balances.push({
              symbol:
                token.symbol,

              balance:
                "0.0000",
            });
          }
        }

        setTokens(balances);

        setLastUpdated(
          new Date().toLocaleTimeString()
        );

        setIsScanning(false);

      } catch (err) {

        console.log(err);

        setIsScanning(false);
      }
    }

    fetchTokens();

  }, [activeWallet]); */

  useEffect(() => {

    async function fetchApprovals() {

      if (!activeWallet) {

  setBalance("0");
  return;
}

      try {

        const provider =
          new ethers.JsonRpcProvider(
  "https://ethereum-rpc.publicnode.com"
);

        const chainConfig =
          CHAINS[
            selectedChain as keyof typeof CHAINS
          ];

        const tokenList = [
          {
            symbol: "USDT",
            address:
              chainConfig.usdt,
          },

          {
            symbol: "USDC",
            address:
              chainConfig.usdc,
          },

          {
            symbol: "DAI",
            address:
              chainConfig.dai,
          },
        ];

        const foundApprovals = [];

        for (const token of tokenList) {

          const contract =
            new ethers.Contract(
              token.address,
              ERC20_ABI,
              provider
            );

          for (const spender of KNOWN_SPENDERS) {

            try {

              const allowance =
                await contract.allowance(
                  activeWallet,
                  spender.address
                );

              const decimals =
                await contract.decimals();

              const formatted =
                Number(
                  ethers.formatUnits(
                    allowance,
                    decimals
                  )
                );

              if (formatted > 0) {

                let risk = "Low";
                const scamCheck =
  detectScamApproval(
    spender.address
  );

                let riskColor =
                  "text-green-400";

                if (
  scamCheck.detected
) {

  risk =
    scamCheck.risk;

  riskColor =
    "text-red-600";
}

              

                if (
                  formatted > 1000
                ) {

                  risk = "High";

                  riskColor =
                    "text-red-400";
                }

                foundApprovals.push({
                  token:
                    token.symbol,

                  tokenAddress:
                    token.address,

                  spender:
                    spender.name,

                  spenderAddress:
                    spender.address,

                  amount:
                    formatted.toFixed(
                      2
                    ),

                  risk,

                  riskColor,
                });
              }

            } catch (err) {

              console.log(err);
            }
          }
        }

        setApprovals(
          foundApprovals
        );

      } catch (err) {

        console.log(err);
      }
    }

    fetchApprovals();

  }, [
    activeWallet,
    selectedChain,
  ]);

  useEffect(() => {

  async function loadWalletHistory() {

    if (!activeWallet) {

      setActivities([]);
      return;
    }

    try {

      const history =
        await fetchWalletHistory(
          activeWallet
        );

      setActivities(history);
    } catch (err) {

      console.log(err);
    }
  }

  loadWalletHistory();

}, [activeWallet]);

   useEffect(() => {

  async function loadWalletTokens() {

   /* const cached =
  localStorage.getItem(
    `walletshield-${activeWallet}`
  ); 

if (cached) {

  const parsed =
    JSON.parse(cached);

  setTokens(parsed);

  console.log(
    "LOADED FROM CACHE:",
    parsed.length
  );

  return;
} 
  */



    const startTime =
  Date.now();

    if (!activeWallet)
      return;

    try {

  const portfolioTokens =
  await fetchAllPortfolioTokens(
    activeWallet
  );



  const fastTokens = [];

for (
  const token of portfolioTokens
) {

  const metadata =
    token.tokenMetadata;

  if (!metadata?.symbol)
    continue;

  const rawBalance =
    BigInt(
      token.tokenBalance || "0"
    );

  if (rawBalance <= 0n)
    continue;

  const formatted =
    ethers.formatUnits(
      rawBalance,
      metadata.decimals || 18
    );

  const balance =
    Number(formatted);

  const price =
    Number(
      token.tokenPrices?.[0]
        ?.value || 0
    );

  const usdValue =
    balance * price;

    console.log(
  metadata.symbol,
  usdValue
);

if (
  rawBalance <= 0n
) {
  continue;
}
  fastTokens.push({

    contractAddress:
      token.tokenAddress,

    symbol:
      metadata.symbol,

    name:
      metadata.name,

    decimals:
      metadata.decimals,

    balance:
      balance.toFixed(4),

    price,

    usdValue,

  });

}

fastTokens.sort(
  (a: any, b: any) =>
    b.usdValue - a.usdValue
);


const totalPortfolioValue =
  fastTokens.reduce(
    (sum, token) =>
      sum + (token.usdValue || 0),
    0
  );
  
const largestHolding =
  fastTokens[0];

const concentrationPercent =
  totalPortfolioValue > 0
    ? (
        (largestHolding?.usdValue || 0) /
        totalPortfolioValue
      ) * 100
    : 0;

  setPortfolioValue(
  totalPortfolioValue
);

setTopHolding(
  largestHolding?.symbol || ""
);

setTopHoldingPercent(
  concentrationPercent
);

if (
  concentrationPercent > 40
) {

  setConcentrationRisk(
    "HIGH"
  );

  setRiskInsight(
    `Portfolio is heavily concentrated in ${largestHolding?.symbol}. A major decline in this asset could significantly impact wallet value.`
  );

} else if (
  concentrationPercent > 20
) {

  setConcentrationRisk(
    "MEDIUM"
  );

  setRiskInsight(
    `Portfolio has meaningful exposure to ${largestHolding?.symbol}. Consider diversification to reduce concentration risk.`
  );

} else {

  setConcentrationRisk(
    "LOW"
  );

  setRiskInsight(
    "Portfolio appears reasonably diversified across multiple assets."
  );
}

console.log(
  "FAST TOKENS FINAL:",
  fastTokens.length
);

setTokens(
  fastTokens
);

console.log(
  "LOAD TIME:",
  Date.now() - startTime,
  "ms"
);
  /*const historical =
  await fetchHistoricalTokens(
    activeWallet
  );

  const balanceContracts =
  new Set<string>();

balances.forEach(
  (token: any) => {

    if (
      token.contractAddress
    ) {

      balanceContracts.add(
        token.contractAddress
          .toLowerCase()
      );
    }
  }
);

const historicalContracts =
  new Set<string>();

historical.forEach(
  (tx: any) => {

    if (
      tx.rawContract?.address
    ) {

      historicalContracts.add(
        tx.rawContract.address
          .toLowerCase()
      );
    }
  }
);
const allContracts =
  Array.from(

    new Set([

      ...balanceContracts,

      ...historicalContracts,

    ])
  ).slice(0, 300);

console.log(
  "TOTAL CONTRACTS:",
  allContracts.length
);

const v2Tokens = [];
const filteredTokens = [];
for (
  const contractAddress
  of allContracts
) {

  try {

    const metadata =
      await fetchTokenMetadata(
        contractAddress
      );

    if (
      !metadata?.symbol
    ) {
      continue;
    }

    const rawBalance =
      await fetchTokenBalance(
        contractAddress,
        activeWallet
      );

    if (
      rawBalance <= 0n
    ) {
      continue;
    }

    const formatted =
      ethers.formatUnits(
        rawBalance,
        metadata.decimals || 18
      );
const symbol =
  metadata.symbol || "";

const lower =
  symbol.toLowerCase();

if (
  lower.includes("visit") ||
  lower.includes(".net") ||
  lower.includes(".org") ||
  lower.includes(".com") ||
  lower.includes("claim")
) {

  continue;
}
      console.log(
  "V2 BALANCE:",
  metadata.symbol,
  formatted
);

    filteredTokens.push({

  symbol:
    metadata.symbol,

  balance:
    Number(
      formatted
    ).toFixed(4),

  contract:
    contractAddress,

});

    console.log(
      "V2 TOKEN:",
      metadata.symbol
    );

  } catch (err) {

    console.log(err);
  }
}

console.log(
  "FILTERED TOKENS:",
  filteredTokens.length
);
  
console.log(
  "SCAN TIME:",
  (
    (Date.now() -
      startTime) /
    1000
  ).toFixed(1),
  "seconds"
);

const merged = [
  ...fastTokens
];

filteredTokens.forEach(
  (token: any) => {

    const exists =
      merged.some(
        (t: any) =>
          t.symbol ===
          token.symbol
      );

    if (!exists) {

      merged.push(
        token
      );
    }
  }
);

console.log(
  "MERGED TOKENS:",
  merged.length
);

setTokens(
  merged
);

localStorage.setItem(
  `walletshield-${activeWallet}`,
  JSON.stringify(
    filteredTokens
  )
); */

      

    } catch (err) {

      console.log(err);
    }
  }

  loadWalletTokens();

}, [activeWallet]);

  useEffect(() => {

    if (!isConnected)
      return;

    const interval =
      setInterval(() => {

        setLastUpdated(
          new Date().toLocaleTimeString()
        );

      

      }, 30000);

    return () =>
      clearInterval(interval);

  }, [isConnected]);

 
async function handleDecodeTransaction() {

  const decoded =
    decodeTransactionData(
      txDataInput
    );

  setDecodedTx(decoded);

  const simulation =
    simulateTransaction(
      txDataInput
    );

  setSimulationResult(
    simulation
  );

  const riskAnalysis =
    analyzeTransactionRisk(
      decoded
    );

  setTransactionRisk(
    riskAnalysis
  );

  let currentThreat = null;
let protocol = null;
  if (
    txDataInput.startsWith(
      "0x095ea7b3"
    )
  ) {

    const spender =
      "0x" +
      txDataInput.slice(
        34,
        74
      );

    console.log(
      "Extracted spender:",
      spender
    );

    currentThreat =
  await checkThreatIntel(
    spender
  );

setSpenderThreat(
  currentThreat
);
    protocol =
  checkProtocolReputation(
    spender
  );

setProtocolReputation(
  protocol
);

  } else {

    setSpenderThreat(
  null
);

setProtocolReputation(
  null
);
  }

  const guardian =
  evaluateSignatureThreat(
    decoded,
    riskAnalysis,
    currentThreat,
    protocol
  );

  setGuardianDecision(
    guardian
  );
  setHistory((prev) => [
  {
    time: new Date()
      .toLocaleTimeString(),

    type: decoded?.type,

    score: riskAnalysis?.score,

    decision: guardian?.action,
  },

  ...prev,
].slice(0, 20));
}


function handleUrlScan() {

  const result =
    scanUrl(
      urlInput
    );

  setUrlScanResult(
    result
  );
}
function handleContractAnalysis() {

  const result =
    analyzeContract(
      contractInput
    );

  setContractAnalysis(
    result
  );
}
function handleTokenAnalysis() {

  const result =
    analyzeToken(
      tokenInput
    );

  setTokenAnalysis(
    result
  );
}

function handleCopilotAsk() {

  const result =
    askSecurityCopilot(
      copilotQuestion
    );

  setCopilotResponse(
    result
  );
}

function addWalletToWatchlist() {

  if (
    !watchWalletInput
  ) return;

  let risk = "Low";

  if (
    watchWalletInput
      .toLowerCase()
      .includes("dead")
  ) {

    risk = "Critical";
  }

  const newWallet = {

    activeWallet:
      watchWalletInput,

    label:
      `Watched Wallet ${
        watchedWallets.length + 1
      }`,

    risk,
  };

  setWatchedWallets(
    (prev) => [
      ...prev,
      newWallet,
    ]
  );

  setWatchWalletInput("");
}
function analyzeWallet() {

  if (
    !walletInput ||
    walletInput.length < 20
  ) return;

  setActiveWallet(
    walletInput
  );
}

  async function revokeApproval(
  tokenAddress: string,
  spenderAddress: string
) {

  try {

    if (!window.ethereum)
      return;

    const provider =
      new ethers.BrowserProvider(
        window.ethereum
      );

    const signer =
      await provider.getSigner();

    const contract =
      new ethers.Contract(
        tokenAddress,
        ERC20_ABI,
        signer
      );

    const tx =
      await contract.approve(
        spenderAddress,
        0
      );

    await tx.wait();

    alert(
      "Approval revoked successfully!"
    );

  } catch (err) {

    console.log(err);

    alert(
      "Failed to revoke approval."
    );
  }
}

  const riskResult =
  useMemo(() => {

    return calculateRisk({
      isConnected,
      balance,
      approvals,
      activities,
      tokens,
      selectedChain,
    });

  }, [
    isConnected,
    balance,
    approvals,
    activities,
    tokens,
    selectedChain,
  ]);
const drainAnalysis =
  useMemo(() => {

    return detectWalletDrainRisk({
      approvals,
      activities,
    });

  }, [
    approvals,
    activities,
  ]);

  const portfolioAnalysis =
  useMemo(() => {

    return analyzePortfolioRisk(
      tokens
    );

  }, [tokens]);

  const assetExposure =
  useMemo(() => {

    return calculateAssetExposure(
      tokens
    );

  }, [tokens]);
  const behaviorAnalysis =
  useMemo(() => {

    return analyzeWalletBehavior(
      activities
    );

  }, [activities]);

  useEffect(() => {

  const start =
    Date.now();

  const interval =
    setInterval(() => {

      const elapsed =
        Math.floor(
          (Date.now() -
            start) / 1000
        );

      setMonitoringUptime(
        `${elapsed}s`
      );

    }, 1000);

  return () =>
    clearInterval(interval);

}, []);

  useEffect(() => {

  const newEntry = {

    time:
      new Date().toLocaleTimeString(),

    score:
      riskResult.score,
  };

  setSecurityHistory(
    (prev) => {

      const updated = [
        ...prev,
        newEntry,
      ];

      return updated.slice(-10);
    }
  );

}, [riskResult.score]);

  useEffect(() => {

  const liveThreats = [

    {
      title:
        "Fake Uniswap Phishing Campaign",

      severity:
        "Critical",

      description:
        "Users are being redirected to fake wallet connect pages.",
    },

    {
      title:
        "Malicious NFT Mint Exploit",

      severity:
        "High",

      description:
        "Suspicious ERC721 approvals detected across multiple wallets.",
    },

    {
      title:
        "Wallet Drainer Activity Spike",

      severity:
        "Critical",

      description:
        "Increase in malicious approval contracts draining wallets.",
    },

    {
      title:
        "Fake Airdrop Scam",

      severity:
        "Medium",

      description:
        "Fake token claim websites targeting retail users.",
    },
  ];

  setThreatFeed(
    liveThreats
  );

}, []);

  useEffect(() => {

  const generatedAlerts =
    [];
    const approvalThreats =
  analyzeApprovalThreats(
    approvals
  );

generatedAlerts.push(
  ...approvalThreats
);

  if (
    drainAnalysis.threatLevel ===
    "Critical"
  ) {

    generatedAlerts.push({

      title:
        "Critical Wallet Threat",

      severity:
        "Critical",

      message:
        "Wallet drain behavior detected. Immediate action recommended.",
    });
  }

  if (
    approvals.some(
      (a) =>
        a.risk ===
        "High"
    )
  ) {

    generatedAlerts.push({

      title:
        "Dangerous Approval Detected",

      severity:
        "High",

      message:
        "A wallet approval contains elevated risk permissions.",
    });
  }

  if (
    activities.some(
      (a) =>
        a.risk ===
        "Critical"
    )
  ) {

    generatedAlerts.push({

      title:
        "Suspicious Activity",

      severity:
        "Critical",

      message:
        "Potential malicious blockchain interaction detected.",
    });
  }

  setAlerts(
    generatedAlerts
  );

}, [
  approvals,
  activities,
  drainAnalysis,
]);

  useEffect(() => {

    setRiskFactors(
      riskResult.risks
    );

    if (
      riskResult.criticalApprovals > 0
    ) {

      setLiveProtectionStatus(
        "Critical Threat"
      );

      return;
    }

    if (
      riskResult.highRiskApprovals > 0
    ) {

      setLiveProtectionStatus(
        "Warning"
      );

      return;
    }

    setLiveProtectionStatus(
      "Protected"
    );

  }, [riskResult]);

  return (

      <DashboardLayout>

        <div className="border border-zinc-800 rounded-3xl p-5 bg-zinc-950 mb-8">

<div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
<div className="pt-4">
      <div className="flex items-center gap-3 mb-4">

        <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse" />

        <p className="text-green-400 text-sm uppercase tracking-[0.2em]">

          Wallet Protected

        </p>

      </div>

      <h1 className="text-4xl font-bold mb-3">

        WalletShield AI

      </h1>

      <p className="text-zinc-400 text-lg max-w-xl">

        Real-time multi-chain wallet security intelligence platform.

      </p>

      <div className="mt-6">

  <ConnectButton />

</div>

<div className="mt-5 flex gap-3">

  <input
    type="text"
    placeholder="Analyze wallet address..."
    value={walletInput}
    onChange={(e) =>
      setWalletInput(
        e.target.value
      )
    }
    className="
      flex-1
      bg-zinc-900
      border border-zinc-800
      rounded-xl
      px-4 py-3
      text-sm
      outline-none
      focus:border-purple-500
    "
  />

  <button
    onClick={analyzeWallet}
    className="
      px-5 py-3
      rounded-xl
      bg-white
      text-black
      font-medium
      hover:opacity-90
      transition
    "
  >

    Analyze

  </button>

</div>

    </div>



    <div className="grid grid-cols-2 gap-4 min-w-[320px]">

<div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800 min-h-[110px]">
        <p className="text-zinc-500 text-sm mb-1">

          Security Score

        </p>

        <p className="text-3xl font-bold text-white">

          {riskResult.score}/100

        </p>

      </div>

<div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800 min-h-[110px]">
  <p className="text-zinc-500 text-sm mb-1">

    Network

  </p>

  <p className="text-3xl font-bold text-purple-400">

    {
      CHAINS[
        selectedChain as keyof typeof CHAINS
      ]?.name
    }

  </p>

</div>
<div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 min-h-[180px]">

  <p className="text-zinc-500 text-sm mb-1">

    Wallet Net Worth

  </p>

 <p className="text-4xl font-bold text-green-400 mt-4">

  {walletNetWorth > 0
    ? `$${formatUsd(walletNetWorth)}`
    : "—"}

</p>
</div>

<div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 min-h-[180px]">
  <p className="text-zinc-500 text-sm mb-1">

    ETH Balance

  </p>

  <p className="text-4xl font-bold text-green-400">

  {Number(balance) > 0
    ? `${Number(balance).toLocaleString(
        undefined,
        {
          maximumFractionDigits: 0,
        }
      )} ETH`
    : "—"}

</p>

<p className="text-xs text-zinc-500 mt-2">

  {portfolioValue > 0
    ? `Portfolio: $${formatUsd(
        portfolioValue
      )}`
    : "Waiting for analysis"}

</p>

</div>

<div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800 min-h-[160px]">
  <p className="text-zinc-500 text-sm mb-1">

    Concentration Risk

  </p>

  <p className="text-3xl font-bold text-yellow-400">

  {portfolioValue > 0
    ? concentrationRisk
    : "—"}

</p>

    Top Holding: {topHolding}


  <p className="text-sm text-zinc-400">

  {portfolioValue > 0
    ? `${topHoldingPercent.toFixed(1)}% of Portfolio`
    : ""}

</p>

</div>
<div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800">

  <p className="text-zinc-500 text-sm mb-4">

  Portfolio Composition

</p>

{
  walletNetWorth <= 0 && (
    <p className="text-sm text-zinc-500 mb-4">

      Waiting for analysis

    </p>
  )
}

<div className="space-y-4">
    <div>

      <div className="flex justify-between mb-1">

        <span className="text-zinc-300">

          ETH

        </span>

        <span className="text-white font-medium">

{walletNetWorth > 0
  ? `${ethPercent.toFixed(1)}%`
  : "—"}
        </span>

      </div>

      <div className="w-full h-2 bg-zinc-800 rounded-full">

        <div
          className="h-2 bg-green-400 rounded-full"
style={{
  width:
    walletNetWorth > 0
      ? `${ethPercent}%`
      : "0%"
}}        />

      </div>

    </div>

    <div>

      <div className="flex justify-between mb-1">

        <span className="text-zinc-300">

          ERC20

        </span>

        <span className="text-white font-medium">

{walletNetWorth > 0
  ? `${erc20Percent.toFixed(1)}%`
  : "—"}
        </span>

      </div>

      <div className="w-full h-2 bg-zinc-800 rounded-full">

        <div
          className="h-2 bg-purple-400 rounded-full"
          style={{
  width:
    walletNetWorth > 0
      ? `${erc20Percent}%`
      : "0%"
}}
        />

      </div>

    </div>

  </div>

</div>

<div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800">

  <p className="text-zinc-500 text-sm mb-3">

    Risk Insight

  </p>

  <p className="text-sm text-zinc-300 leading-relaxed">

    {riskInsight}

  </p>

</div>




<div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800 min-h-[110px]">
  <p className="text-zinc-500 text-sm mb-1">

    Wallet Status

  </p>

  <p
    className={`text-3xl font-bold ${
      liveProtectionStatus ===
      "Protected"
        ? "text-green-400"
        : liveProtectionStatus ===
          "Warning"
        ? "text-yellow-400"
        : "text-red-400"
    }`}
  >

    {liveProtectionStatus}

  </p>

</div>

<div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800 min-h-[110px]">
  <p className="text-zinc-500 text-sm mb-1">

    Wallet Reputation

  </p>

  <p className="text-xl font-bold text-white">

    {
      walletReputation
        ?.label || "Unknown"
    }

  </p>

  <p className="text-sm text-zinc-500 mt-2">

    {
      walletReputation
        ?.description ||
      "No intelligence found."
    }

  </p>

</div>

<div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800">

  <p className="text-zinc-500 text-sm mb-1">

    Wallet Classification

  </p>

  <p className="text-xl font-bold text-white">

    {
     walletNetWorth > 0
  ? walletClassification?.type
  : "Awaiting Analysis"
    }

  </p>

  <p className="text-sm text-zinc-500 mt-2">

    {
  walletNetWorth > 0
    ? `Confidence: ${
        walletClassification?.confidence || 0
      }%`
    : "Enter a wallet address"
}
  </p>

  <p className="text-sm text-zinc-400 mt-2">

    {
      walletClassification
        ?.reasoning
    }

  </p>

</div>
 
 <ShareAnalysis
  report={{
    address: activeWallet,
    netWorth: walletNetWorth,
    securityScore: riskResult.score,
    riskLevel: liveProtectionStatus,
    classification:
      walletClassification?.type || "Unknown",
  }}
/>

<div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800 min-h-[110px]">
        <p className="text-zinc-500 text-sm mb-1">

          Wallet

        </p>

        <p className="text-sm font-semibold text-zinc-300 truncate">

          {activeWallet}

        </p>

      </div>

    </div>

  </div>

</div>

<EmergencyAlerts
  threatLevel={
    drainAnalysis.threatLevel
  }
  warnings={
    drainAnalysis.warnings
  }
/>
<div className="mt-8">

  <div className="mb-4">

    <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">

      Transaction Protection

    </p>

    <h2 className="text-3xl font-bold mt-2">

      Analyze Before Signing

    </h2>

  </div>

  <TransactionDecoder
    txDataInput={txDataInput}
    setTxDataInput={setTxDataInput}
    decodedTx={decodedTx}
    onAnalyze={handleDecodeTransaction}
  />

  {decodedTx && (
    <>
      <TransactionSimulation
        simulationResult={simulationResult}
        transactionRisk={transactionRisk}
        spenderThreat={spenderThreat}
        assetExposure={assetExposure}
        guardianDecision={guardianDecision}
        protocolReputation={protocolReputation}
      />

      <TransactionHistory
        history={history}
      />
    </>
  )}

</div>
<div className="mb-2 mt-10">

  <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">

    Monitoring Overview

  </p>

</div>
        <div className="grid lg:grid-cols-2 gap-5">

  <ChainStatus
    selectedChain={
      CHAINS[
        selectedChain as keyof typeof CHAINS
      ]?.name || "Unknown"
    }
  />

  <LiveMonitoring
    lastUpdated={lastUpdated}
    liveProtectionStatus={
      liveProtectionStatus
    }
    isScanning={isScanning}
  />

  <BehaviorAnalytics
    analysis={
      behaviorAnalysis
    }
  />

  <PortfolioRisk
    analysis={
      portfolioAnalysis
    }
  />

</div>

<div className="grid lg:grid-cols-[1fr_320px] gap-5 items-start mt-8">

  <div className="space-y-5">


        <WalletExposure
        
          tokensLength={
            tokens.length
          }
          approvalsLength={
            approvals.length
          }
          criticalApprovals={
            riskResult.criticalApprovals
          }
          highRiskApprovals={
            riskResult.highRiskApprovals
          }
        />
        <TopHoldings
  tokens={tokens}
    portfolioValue={portfolioValue}

/>
        <TokenPortfolio
  tokens={tokens}
/>
       <div className="grid lg:grid-cols-2 gap-5">

  <WalletWatchlist
    wallets={
      watchedWallets
    }
    walletInput={
      watchWalletInput
    }
    setWalletInput={
      setWatchWalletInput
    }
    addWallet={
      addWalletToWatchlist
    }
  />

  <WalletHealth
    status={
      drainAnalysis.threatLevel ===
      "Critical"
        ? "Critical"
        : drainAnalysis.threatLevel ===
          "High"
        ? "Warning"
        : "Healthy"
    }
    uptime={
      monitoringUptime
    }
    connected={
      isConnected
    }
    chain={
      CHAINS[
        selectedChain as keyof typeof CHAINS
      ]?.name || "Unknown"
    }
  />

</div>

<SecurityScoreChart
  data={
    securityHistory
  }
/>

       
<div className="grid lg:grid-cols-2 gap-5 mb-8">

  <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-5">

    <div className="flex items-center justify-between mb-6">

      <div>

        <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-2">

          Threat Monitoring

        </p>

        <h2 className="text-xl font-semibold">

          Security Status

        </h2>

      </div>

      <div className="h-3 w-3 rounded-full bg-red-400 animate-pulse" />

    </div>

    <div className="space-y-4">

      <AlertCenter
        alerts={alerts}
      />

      <RiskAnalysis
        riskFactors={
          riskFactors
        }
      />

      <DrainRiskMonitor
        threatLevel={
          drainAnalysis.threatLevel
        }
        score={
          drainAnalysis.score
        }
        warnings={
          drainAnalysis.warnings
        }
      />

    </div>

  </div>

  <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-5">

    <div className="flex items-center justify-between mb-6">

      <div>

        <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-2">

          Wallet Operations

        </p>

        <h2 className="text-xl font-semibold">

          Exposure & Activity

        </h2>

      </div>

      <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse" />

    </div>

    <div className="space-y-4">

      <SecurityRecommendations />

      <ActivityFeed
        activities={
          activities
        }
      />

    </div>

  </div>

</div>

       <SecurityToolsTabs

  children={{

    copilot: (

      <SecurityCopilot
        question={
          copilotQuestion
        }
        setQuestion={
          setCopilotQuestion
        }
        response={
          copilotResponse
        }
        onAsk={
          handleCopilotAsk
        }
      />

    ),

    phishing: (

      <PhishingScanner
        url={urlInput}
        setUrl={setUrlInput}
        result={urlScanResult}
        onScan={handleUrlScan}
      />

    ),

    token: (

      <TokenRiskAnalyzer
        tokenInput={
          tokenInput
        }
        setTokenInput={
          setTokenInput
        }
        result={
          tokenAnalysis
        }
        onAnalyze={
          handleTokenAnalysis
        }
      />

    ),

    contract: (

      <ContractAnalyzer
        contractInput={
          contractInput
        }
        setContractInput={
          setContractInput
        }
        result={
          contractAnalysis
        }
        onAnalyze={
          handleContractAnalysis
        }
      />

    ),
   
decoder: (

  <div className="space-y-5">

    <TransactionDecoder

      txDataInput={
        txDataInput
      }

      setTxDataInput={
        setTxDataInput
      }

      decodedTx={
        decodedTx
      }

      onAnalyze={
        handleDecodeTransaction
      }

    />

    
<TransactionSimulation
  simulationResult={
    simulationResult
  }

  transactionRisk={
    transactionRisk
  }

  spenderThreat={
    spenderThreat
  }

  assetExposure={
    assetExposure
  }

  guardianDecision={
  guardianDecision

  
}
protocolReputation={
  protocolReputation
}
/>
<TransactionHistory
  history={history}
/>


  </div>

),




approvals: (

  <TokenApprovals

    approvals={
      approvals
    }

    revokeApproval={
      revokeApproval
    }

  />

),

  }}

/>

        

  </div>

  <ThreatRail
    threats={threatFeed}
  />

</div>


</DashboardLayout>
  );
}