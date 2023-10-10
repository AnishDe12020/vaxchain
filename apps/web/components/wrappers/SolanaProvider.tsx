"use client";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { useMemo } from "react";
import {SolflareWalletAdapter} from "@solana/wallet-adapter-wallets"

export const SolanaProvider = ({ children }: { children: React.ReactNode }) => {
  const endpoint = useMemo(
    () => process.env.NEXT_PUBLIC_RPC as string,
    []
  );

  const wallets = useMemo(() => [
    new SolflareWalletAdapter()
  ], [])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
};
