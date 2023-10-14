import * as dotenv from "dotenv";
import cron from "node-cron";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import base58 from "bs58";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import { AnchorProvider, Program } from "@project-serum/anchor";

import { prisma } from "./db";
import { IDL, Vpl } from "./vpl";

dotenv.config();

export const PROGRAM_ID = "6JuaxB1fEN9n6ApcvRxy6avr25H8qTzGRGpT43qrCvm4";
export const TOKEN_MINT = new PublicKey(
  "VAX5dPMGakTPLpdMunmnJcKsMoKh1532C5Z2XHFEbm5"
);

if (!process.env.RPC) {
  console.error("RPC not set");
  process.exit(1);
}

if (!process.env.PRIVATE_KEY) {
  console.error("PRIVATE_KEY not set");
  process.exit(1);
}

const connection = new Connection(process.env.RPC);

const keypair = Keypair.fromSecretKey(base58.decode(process.env.PRIVATE_KEY));

const nodeAnchorWallet = new NodeWallet(keypair);

const provider = new AnchorProvider(connection, nodeAnchorWallet, {
  commitment: "confirmed",
});

const program: Program<Vpl> = new Program(IDL, PROGRAM_ID, provider);

cron.schedule("* * * * *", async () => {
  // (async () => {
  const activeBatches = await prisma.batch.findMany({
    where: {
      stopDate: null,
      tempDefect: false,
    },
    include: {
      TempLog: {
        orderBy: {
          timestamp: "desc",
        },
        take: 1,
      },
    },
  });

  console.log(activeBatches);

  Promise.all(
    activeBatches.map(async (batch) => {
      if (!batch.TempLog[0]) {
        return;
      }

      const lastTempLog = batch.TempLog[0];

      if (
        new Date().getTime() - new Date(lastTempLog.timestamp).getTime() >
        300000
      ) {
        const batchKey = new PublicKey(batch.pubkey);

        const batchPda = PublicKey.findProgramAddressSync(
          [Buffer.from("batch"), batchKey.toBuffer()],
          program.programId
        )[0];

        const vaultPda = PublicKey.findProgramAddressSync(
          [Buffer.from("vault"), batchKey.toBuffer(), TOKEN_MINT.toBuffer()],
          program.programId
        )[0];

        const lastTempLogPda = PublicKey.findProgramAddressSync(
          [
            Buffer.from("temp_log"),
            batchKey.toBuffer(),
            new PublicKey(lastTempLog.pubkey).toBuffer(),
          ],
          program.programId
        )[0];

        const sig = await program.methods
          .checkTemp()
          .accounts({
            batch: batchKey,
            batchPda,
            mint: TOKEN_MINT,
            tempLog: lastTempLog.pubkey,
            tempLogPda: lastTempLogPda,
            user: keypair.publicKey,
            vault: vaultPda,
          })
          .rpc();

        console.log(sig);

        await prisma.batch.update({
          where: {
            pubkey: batch.pubkey,
          },
          data: {
            tempDefect: true,
          },
        });
      }
    })
  );
  // })();
});
