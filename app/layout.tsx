import "./globals.css";

import Providers from "./providers";

export const metadata = {
  title: "Wallet Safety Dashboard",
  description:
    "AI-powered crypto wallet security platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">

      <body>

        <Providers>
          {children}
        </Providers>

      </body>

    </html>
  );
}