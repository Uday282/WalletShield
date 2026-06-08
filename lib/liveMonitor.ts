import { Alchemy, Network }
from "alchemy-sdk";

const config = {

  apiKey:
    process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,

  network:
    Network.ETH_MAINNET,

};

const alchemy =
  new Alchemy(config);

export function startLiveMonitoring(

  walletAddress: string,

  onThreatDetected: (
    threat: any
  ) => void

) {

  const address =
    walletAddress.toLowerCase();

  alchemy.ws.on(

    {

      method:
        "alchemy_pendingTransactions",

      fromAddress:
        address,

    },

    (tx) => {

      let severity =
        "Low";

      let title =
        "Transaction Detected";

      let description =
        `Pending transaction detected:
         ${tx.hash}`;

      if (
        tx.value &&
        Number(tx.value) > 5
      ) {

        severity =
          "High";

        title =
          "Large Wallet Transfer";

        description =
          "High-value outgoing transfer detected.";
      }

      if (
        tx.to &&
        tx.to
          .toLowerCase()
          .includes("dead")
      ) {

        severity =
          "Critical";

        title =
          "Suspicious Contract Interaction";

        description =
          "Wallet interacting with suspicious contract.";
      }

      onThreatDetected({

        severity,
        title,
        description,

      });
    }
  );
}