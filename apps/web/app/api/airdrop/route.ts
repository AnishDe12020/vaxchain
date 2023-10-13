import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes"
import {
  createAssociatedTokenAccountInstruction,
  getAccount,
  getAssociatedTokenAddressSync,
  getOrCreateAssociatedTokenAccount,
  mintTo,
} from "@solana/spl-token"
import { Connection, Keypair, PublicKey, Transaction } from "@solana/web3.js"
import { getServerSession } from "next-auth"

import { TOKEN_DECIMALS, TOKEN_MINT } from "@/lib/constants"

export const POST = async () => {
  const session = await getServerSession()

  if (!session?.user?.name) {
    return new Response("Unauthorized", { status: 401 })
  }

  const airdropPrivateKey = process.env.AIRDROP_PRIVATE_KEY

  if (!airdropPrivateKey) {
    return new Response("Airdrop private key not set", { status: 500 })
  }

  const airdropKeypair = Keypair.fromSecretKey(bs58.decode(airdropPrivateKey))

  const connection = new Connection(process.env.NEXT_PUBLIC_RPC!)

  const userATA = getAssociatedTokenAddressSync(
    new PublicKey(TOKEN_MINT),
    new PublicKey(session.user.name)
  )

  try {
    await getAccount(connection, userATA)
  } catch (err) {
    const transaction = new Transaction().add(
      createAssociatedTokenAccountInstruction(
        airdropKeypair.publicKey,
        userATA,
        new PublicKey(session.user.name),
        new PublicKey(TOKEN_MINT)
      )
    )

    const sig = await connection.sendTransaction(transaction, [airdropKeypair])

    await connection.confirmTransaction(sig, "confirmed")

    console.log("Created ATA", sig)
  }

  console.log(userATA)

  const sig = await mintTo(
    connection,
    airdropKeypair,
    new PublicKey(TOKEN_MINT),
    userATA,
    airdropKeypair,
    10000 * 10 ** TOKEN_DECIMALS,
    undefined,
    {
      skipPreflight: true,
    }
  )

  await connection.confirmTransaction(sig)

  return new Response("OK", { status: 200 })
}
