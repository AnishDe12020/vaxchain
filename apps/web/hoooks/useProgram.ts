import { useMemo } from "react"
import { AnchorProvider, Program } from "@project-serum/anchor"
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react"

import { IDL, Vpl } from "@/lib/vpl"
import { PROGRAM_ID } from "@/lib/constants"

const useProgram = () => {
  const anchorWallet = useAnchorWallet()
  const { connection } = useConnection()

  const anchorProvider = useMemo(() => {
    if (!anchorWallet) return

    return new AnchorProvider(connection, anchorWallet, {
      commitment: "confirmed",
    })
  }, [connection, anchorWallet])

  const anchorProgram: Program<Vpl> | undefined = useMemo(() => {
    if (!anchorProvider) return

    return new Program(IDL, PROGRAM_ID, anchorProvider)
  }, [anchorProvider])

  return {
    program: anchorProgram,
  }
}

export default useProgram
