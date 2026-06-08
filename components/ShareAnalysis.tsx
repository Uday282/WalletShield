"use client";

import { generateShareText, getTwitterShareUrl } from "@/lib/share";

interface Props {
  report: {
    address: string;
    netWorth: number;
    securityScore: number;
    riskLevel: string;
    classification: string;
  };
}

export default function ShareAnalysis({ report }: Props) {
  const handleTwitterShare = () => {
    window.open(
      getTwitterShareUrl(report),
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleCopyLink = async () => {
  const url =
    `${window.location.origin}/report/${report.address}`;

  await navigator.clipboard.writeText(url);

  alert("Link copied!");
};

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      generateShareText(report)
    );

    


    alert("Report copied!");
  };

  return (
  <div className="flex gap-3 mt-4">
    <button
      onClick={handleTwitterShare}
      className="px-4 py-2 rounded-lg border"
    >
      Share on X
    </button>

    <button
      onClick={handleCopy}
      className="px-4 py-2 rounded-lg border"
    >
      Copy Report
    </button>

    <button
      onClick={handleCopyLink}
      className="px-4 py-2 rounded-lg border"
    >
      Copy Link
    </button>
  </div>
);
}
