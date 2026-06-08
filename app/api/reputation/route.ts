import { NextResponse }
from "next/server";

export async function GET(
  request: Request
) {

  try {

    const {
      searchParams,
    } = new URL(
      request.url
    );

    const address =
      searchParams.get(
        "address"
      );

    if (!address) {

      return NextResponse.json({
        label: null,
      });
    }

    const response =
      await fetch(
        `https://etherscan.io/address/${address}`
      );

    const html =
      await response.text();

      console.log(html);
      
    const match =
  html.match(
    /<title>(.*?)\| Address/
  );

    let label = null;

if (
  match &&
  match[1]
) {

  label =
    match[1]
      .replace(
        "Ethereum Address",
        ""
      )
      .trim();
}

    return NextResponse.json({
      label,
    });

  } catch (err) {

    console.log(err);

    return NextResponse.json({
      label: null,
    });
  }
}