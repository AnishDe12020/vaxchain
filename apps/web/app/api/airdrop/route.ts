import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes"
import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token"
import { Connection, Keypair, PublicKey } from "@solana/web3.js"
import { getServerSession } from "next-auth"

import { TOKEN_MINT } from "@/lib/constants"

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

  console.log(session.user.name)

  const userAta = await getOrCreateAssociatedTokenAccount(
    connection,
    airdropKeypair,
    new PublicKey(TOKEN_MINT),
    new PublicKey(session.user.name)
  )

  console.log(userAta)

  const sig = await mintTo(
    connection,
    airdropKeypair,
    new PublicKey(TOKEN_MINT),
    userAta.address,
    airdropKeypair,
    10000
  )

  await connection.confirmTransaction(sig)

  return new Response("OK", { status: 200 })
}
