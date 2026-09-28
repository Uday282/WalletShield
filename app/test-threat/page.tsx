"use client";

export default function TestThreat() {

  async function testThreat() {

    const response =
      await fetch(
        "/api/threat-check",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            address:
              "0xdead00000000000000000000000000000000dead"
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
    <div style={{ padding: 40 }}>
      <button
        onClick={testThreat}
      >
        Test Threat API
      </button>
    </div>
  );
}