import type { Metadata } from "next";
import "./globals.css";
import ThemeRegistry from "../theme/ThemeRegistry";
import ReduxProvider from "../services/ReduxProvider";

export const metadata: Metadata = {
  title: "Circlechain – Global Web3 Crypto Trading Platform",
  description:
    "Save, buy and sell your blockchain assets securely. Trade crypto anytime on the Circlechain decentralized platform. Built on next-gen Web3 technology.",
  keywords: "crypto, blockchain, web3, bitcoin, ethereum, defi, nft, trading",
  openGraph: {
    title: "Circlechain – Web3 Crypto Platform",
    description: "Decentralized crypto trading platform built on blockchain technology.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Raleway:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ReduxProvider>
          <ThemeRegistry>{children}</ThemeRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}
