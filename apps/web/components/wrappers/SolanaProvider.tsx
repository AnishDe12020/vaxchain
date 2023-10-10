"use client"

import { useMemo } from "react"
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react"

export const SolanaProvider = ({ children }: { children: React.ReactNode }) => {
  const endpoint = useMemo(() => process.env.NEXT_PUBLIC_RPC as string, [])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  )
}
