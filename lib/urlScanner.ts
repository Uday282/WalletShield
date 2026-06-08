import {
  PHISHING_DOMAINS,
} from "./scamDatabase";

export function scanUrl(
  url: string
) {

  const normalized =
    url.toLowerCase();

  const found =
    PHISHING_DOMAINS.find(
      (domain) =>
        normalized.includes(
          domain
        )
    );

  if (found) {

    return {

      safe: false,

      risk: "Critical",

      title:
        "Phishing Website Detected",

      message:
        `${found} is flagged as a dangerous phishing domain.`,

      color:
        "text-red-600",
    };
  }

  if (
    normalized.includes(
      "claim"
    ) ||
    normalized.includes(
      "airdrop"
    ) ||
    normalized.includes(
      "free"
    )
  ) {

    return {

      safe: false,

      risk: "Medium",

      title:
        "Suspicious Website Pattern",

      message:
        "This URL contains suspicious crypto phishing keywords.",

      color:
        "text-yellow-400",
    };
  }

  return {

    safe: true,

    risk: "Low",

    title:
      "Website Appears Safe",

    message:
      "No known phishing indicators detected.",

    color:
      "text-green-400",
  };
}