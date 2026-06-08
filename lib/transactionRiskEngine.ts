
export function analyzeTransactionRisk(
  decoded: any
) {

  if (!decoded) {

    return {

      score: 0,
      level: "Low",
      warnings: [],
    };
  }

  let score = 0;

  const warnings: string[] = [];

  // TOKEN APPROVAL

  if (
  decoded.type ===
  "Token Approval"
) {

  score += 50;

  warnings.push(
    "This transaction grants token spending permissions."
  );

  if (decoded.unlimited) {

    score += 40;

    warnings.push(
      "Unlimited approval detected."
    );

    warnings.push(
      "Unlimited approvals can drain wallet funds."
    );
  }
}

  // NATIVE TRANSFER

  if (
    decoded.type ===
    "ETH Transfer"
  ) {

    score += 10;

    warnings.push(
      "Native asset transfer detected."
    );
  }

  // CONTRACT INTERACTION


// NFT APPROVAL

if (
  decoded.type ===
  "NFT Approval For All"
) {

  score += 85;

  warnings.push(
    "NFT approval detected."
  );

  warnings.push(
    "setApprovalForAll grants full NFT access."
  );
}



  if (
    decoded.type ===
    "Contract Interaction"
  ) {

    score += 45;

    warnings.push(
      "Smart contract interaction detected."
    );
  }

  // DETERMINE LEVEL

  let level = "Low";

  if (score >= 80) {

    level = "Critical";

  } else if (score >= 60) {

    level = "High";

  } else if (score >= 30) {

    level = "Medium";
  }

  return {

    score,
    level,
    warnings,
  };
}

