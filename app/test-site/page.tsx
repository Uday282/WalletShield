"use client";

export default function TestSite() {

  async function testSite() {

    const response =
      await fetch(
        "/api/site-check",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            domain:
              "fake-uniswap.xyz"
          })
        }
      );

    const result =
      await response.json();

    alert(
      JSON.stringify(
        result,
        null,
        2
      )
    );
  }

  return (
    <div
      style={{
        padding: "40px"
      }}
    >
      <button
        onClick={testSite}
      >
        Test Site API
      </button>
    </div>
  );
}