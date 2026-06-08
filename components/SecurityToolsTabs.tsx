"use client";

import { useState } from "react";

type Props = {
  children: {
    copilot: React.ReactNode;
    phishing: React.ReactNode;
    token: React.ReactNode;
    contract: React.ReactNode;
    decoder: React.ReactNode;
    approvals: React.ReactNode;
  };
};

export default function SecurityToolsTabs({
  children,
}: Props) {

  const [activeTab, setActiveTab] =
    useState("copilot");

  const tabs = [

    {
      id: "copilot",
      label: "AI Copilot",
    },

    {
      id: "phishing",
      label: "URL Scanner",
    },

    {
      id: "token",
      label: "Token Risk",
    },

    {
      id: "contract",
      label: "Contract Risk",
    },

    {
      id: "decoder",
      label: "Tx Decoder",
    },

    {
      id: "approvals",
      label: "Approvals",
    },

  ];

  return (

    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden">

      <div className="px-4 pt-4 pb-2">

        <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-1">

          Security Workspace

        </p>

        <h2 className="text-lg font-semibold text-white">

          Investigation Tools

        </h2>

      </div>

      <div className="flex flex-wrap gap-2 p-3 border-b border-zinc-800 bg-zinc-900/40">

        {tabs.map((tab) => (

          <button
            key={tab.id}
            onClick={() =>
              setActiveTab(tab.id)
            }
            className={`
              px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
              ${
                activeTab === tab.id
                  ? "bg-zinc-200 text-black"
                  : "bg-transparent text-zinc-500 hover:text-white hover:bg-zinc-900"
              }
            `}
          >

            {tab.label}

          </button>

        ))}

      </div>

      <div className="p-4">

        {activeTab === "copilot" &&
          children.copilot}

        {activeTab === "phishing" &&
          children.phishing}

        {activeTab === "token" &&
          children.token}

        {activeTab === "contract" &&
          children.contract}

        {activeTab === "decoder" &&
          children.decoder}

        {activeTab === "approvals" &&
          children.approvals}

      </div>

    </div>
  );
}