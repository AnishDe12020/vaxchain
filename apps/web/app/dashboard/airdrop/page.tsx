"use client"

import { useEffect, useState } from "react"
import {
  getAccount,
  getAssociatedTokenAddress,
  getAssociatedTokenAddressSync,
  TokenAccountNotFoundError,
  TokenInvalidAccountOwnerError,
} from "@solana/spl-token"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { PublicKey } from "@solana/web3.js"
import axios from "axios"
import { toast } from "sonner"

import { TOKEN_MINT } from "@/lib/constants"
import { Button } from "@/components/ui/button"

const AirdropPage = () => {
  const [isAirdropping, setIsAirdropping] = useState(false)
  const [balance, setBalance] = useState(0)
  const [isLoadingBalance, setIsLoadingBalance] = useState(false)

  const { publicKey } = useWallet()
  const { connection } = useConnection()

  const airdrop = async () => {
    setIsAirdropping(true)
    try {
      await axios.post("/api/airdrop")
      toast.success("Airdropped")
      setIsAirdropping(false)
    } catch (error) {
      toast.error("Error airdropping")
      console.error(error)
      setIsAirdropping(false)
    }
  }

  useEffect(() => {
    ;(async () => {
      if (!publicKey) {
        return
      }

      setIsLoadingBalance(true)
      try {
        const ata = getAssociatedTokenAddressSync(
          new PublicKey(TOKEN_MINT),
          publicKey
        )

        console.log(ata)

        const accountData = await getAccount(connection, ata)

        setBalance(Number(accountData.amount.toString()))
        setIsLoadingBalance(false)
      } catch (error) {
        if (
          error instanceof TokenAccountNotFoundError ||
          error instanceof TokenInvalidAccountOwnerError
        ) {
          setBalance(0)
        } else {
          console.error(error)
          toast.error("Error fetching balance")
          setIsLoadingBalance(false)
        }
      }
    })()
  }, [isAirdropping, publicKey])

  return (
    <>
      <h1 className="text-3xl font-bold">Airdrop 10000 VAX Tokens</h1>

      <p>Balance: {isLoadingBalance ? "Loading..." : balance}</p>

      <Button onClick={airdrop} isLoading={isAirdropping} className="mt-4">
        Airdrop
      </Button>
    </>
  )
}

export default AirdropPage
