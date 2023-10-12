"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import useProgram from "@/hoooks/useProgram"
import {
  createAssociatedTokenAccount,
  createAssociatedTokenAccountInstruction,
  getAccount,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { PublicKey } from "@solana/web3.js"
import axios from "axios"
import { Role } from "database"
import QrReader from "react-qr-reader"
import { toast } from "sonner"

import { STAKE_PER_PIECE, TOKEN_MINT } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const BuyForm = ({ role }: { role: Role }) => {
  const [batchAddress, setBatchAddress] = useState<string>()
  const [useQR, setUseQR] = useState(false)

  const { program } = useProgram()
  const { publicKey } = useWallet()
  const { connection } = useConnection()

  const router = useRouter()

  const [isBuying, setIsBuying] = useState(false)

  const handleBuy = async () => {
    if (!publicKey) {
      toast.error("Wallet not connected")
      return
    }

    if (!program) {
      toast.error("Program not initialized")
      return
    }

    setIsBuying(true)

    try {
      if (!batchAddress) {
        toast.error("Batch address not found")
        return
      }

      const batch = await axios.get(`/api/batch/${batchAddress}`)

      const batchKey = new PublicKey(batchAddress)

      const userPda = PublicKey.findProgramAddressSync(
        [Buffer.from("user"), publicKey.toBuffer()],
        program.programId
      )[0]

      const batchPda = PublicKey.findProgramAddressSync(
        [Buffer.from("batch"), batchKey.toBuffer()],
        program.programId
      )[0]

      const vaultPda = PublicKey.findProgramAddressSync(
        [
          Buffer.from("vault"),
          batchKey.toBuffer(),
          new PublicKey(TOKEN_MINT).toBuffer(),
        ],
        program.programId
      )[0]

      const batchAccount = await program.account.batch.fetch(batchPda)

      console.log(batchAccount)

      if (role === "DISTRIBUTOR") {
        const distributorATA = getAssociatedTokenAddressSync(
          new PublicKey(TOKEN_MINT),
          publicKey
        )

        try {
          const distributorATAAccount = await getAccount(
            connection,
            distributorATA
          )

          console.log(Number(distributorATAAccount.amount.toString()))
          console.log(
            Number(batch.data.quantity) * Number(batch.data.costPerPiece) +
              Number(batch.data.quantity) * STAKE_PER_PIECE
          )

          if (
            Number(distributorATAAccount.amount.toString()) <
            Number(batch.data.quantity) * Number(batch.data.costPerPiece) +
              Number(batch.data.quantity) * STAKE_PER_PIECE
          ) {
            toast.error("Insufficient VAX", {
              description: (
                <p>
                  Go to <Link href="/dashboard/airdrop">the airdrop page</Link>{" "}
                  to get some VAX
                </p>
              ),
            })
            setIsBuying(true)
            return
          }
        } catch (err) {
          toast.error("Token account doesn't exist", {
            description: (
              <p>
                Go to <Link href="/dashboard/airdrop">the airdrop page</Link> to
                get some VAX
              </p>
            ),
          })
          setIsBuying(true)
          return
        }

        const manufacturerATA = getAssociatedTokenAddressSync(
          new PublicKey(TOKEN_MINT),
          new PublicKey(batch.data.manufacturer)
        )

        let preIxs = []

        try {
          await getAccount(connection, manufacturerATA)
        } catch (err) {
          preIxs.push(
            createAssociatedTokenAccountInstruction(
              publicKey,
              manufacturerATA,
              new PublicKey(batch.data.manufacturer),
              new PublicKey(TOKEN_MINT)
            )
          )
        }

        await program.methods
          .distributorReceive()
          .accounts({
            batch: batchKey,
            batchPda,
            user: publicKey,
            userPda,
            vault: vaultPda,
            mint: new PublicKey(TOKEN_MINT),
            distributorTokenAccount: distributorATA,
            manufacturerTokenAccount: manufacturerATA,
          })
          .preInstructions(preIxs)
          .rpc()

        await axios.post("/api/batch/buy/distributor", {
          batch: batchAddress,
        })

        toast.success("VAX bought")
        setIsBuying(false)

        router.push(`/dashboard/batch/${batchKey.toBase58()}`)
      }
    } catch (e) {
      setIsBuying(false)
      toast.error("Error buying batch")
      console.error(e)
    }
  }

  return (
    <Card className="w-[480px]">
      <CardHeader>
        <CardTitle>Buy batch</CardTitle>
        <CardDescription>Buy a batch of vaccines</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        {useQR ? (
          <div className="w-72 h-72">
            <QrReader
              delay={300}
              onError={() => toast.error("Cant scan QR")}
              onScan={(data: any) => {
                if (data) {
                  console.log(data)
                  setBatchAddress(data)
                }
              }}
            />
          </div>
        ) : (
          <Button onClick={() => setUseQR(true)}>Scan QR</Button>
        )}
        <div className="flex flex-col gap-2">
          <Label>Batch key</Label>
          <Input
            value={batchAddress}
            onChange={(e) => setBatchAddress(e.target.value)}
          />
        </div>

        <Button onClick={handleBuy} isLoading={isBuying}>
          Buy
        </Button>
      </CardContent>
    </Card>
  )
}

export default BuyForm
