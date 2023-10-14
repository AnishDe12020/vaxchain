import sensorLib from "node-dht-sensor";
import * as dotenv from "dotenv";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import base58 from "bs58";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import { AnchorProvider, Program } from "@project-serum/anchor";
import axios from "axios";
import cron from "node-cron";

import { IDL, Vpl } from "./vpl";

dotenv.config();

export const PROGRAM_ID = "6JuaxB1fEN9n6ApcvRxy6avr25H8qTzGRGpT43qrCvm4";
const BATCH = new PublicKey("8e2tDHQskDDy3fTkNdsyYH8khBVbHV5M4MA5c55XZA7U");
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

if (!process.env.BACKEND_URL) {
  console.error("BACKEND_URL not set");
  process.exit(1);
}

const connection = new Connection(process.env.RPC);

const keypair = Keypair.fromSecretKey(base58.decode(process.env.PRIVATE_KEY));

const nodeAnchorWallet = new NodeWallet(keypair);

const provider = new AnchorProvider(connection, nodeAnchorWallet, {
  commitment: "confirmed",
});

const program: Program<Vpl> = new Program(IDL, PROGRAM_ID, provider);

if (!sensorLib.initialize(22, 4)) {
  console.warn("Failed to initialize sensor");
  process.exit(1);
}

const backendUrl = process.env.BACKEND_URL;

const axiosClient = axios.create({
  baseURL: backendUrl,
});

cron.schedule("* * * * *", async () => {
  const readout = sensorLib.read();
  console.log(readout.temperature, "C ", readout.humidity, "%");

  const { data: batch } = await axiosClient.get(
    `/api/batch/${BATCH.toBase58()}`
  );

  console.log(batch);

  let lastTempLog, lastTempLogPda;

  if (!batch) {
    console.error("Batch not found");
    process.exit(1);
  }

  if (batch.TempLog.length > 0) {
    lastTempLog = new PublicKey(batch.TempLog[0].pubkey);
    lastTempLogPda = PublicKey.findProgramAddressSync(
      [Buffer.from("temp_log"), BATCH.toBuffer(), lastTempLog.toBuffer()],
      program.programId
    )[0];
  }

  const userPda = PublicKey.findProgramAddressSync(
    [Buffer.from("user"), keypair.publicKey.toBuffer()],
    program.programId
  )[0];

  const batchPda = PublicKey.findProgramAddressSync(
    [Buffer.from("batch"), BATCH.toBuffer()],
    program.programId
  )[0];

  const vaultPda = PublicKey.findProgramAddressSync(
    [Buffer.from("vault"), BATCH.toBuffer(), TOKEN_MINT.toBuffer()],
    program.programId
  )[0];

  const tempLogKeypair = Keypair.generate();

  const tempLogPda = PublicKey.findProgramAddressSync(
    [
      Buffer.from("temp_log"),
      BATCH.toBuffer(),
      tempLogKeypair.publicKey.toBuffer(),
    ],
    program.programId
  )[0];

  const sig = await program.methods
    .tempLog(Number((readout.temperature + 273).toFixed(0)))
    .accounts({
      batch: BATCH,
      batchPda,
      tempLog: tempLogKeypair.publicKey,
      tempLogPda,
      user: keypair.publicKey,
      userPda,
      lastTempLog: lastTempLog ?? null,
      lastTempLogPda: lastTempLogPda ?? null,
      mint: TOKEN_MINT,
      vault: vaultPda,
    })
    .rpc();

  console.log(sig);

  await axiosClient.post("/api/logs", {
    batch: BATCH.toBase58(),
    temp: Number((readout.temperature + 273).toFixed(0)),
    pubkey: tempLogKeypair.publicKey.toBase58(),
  });
});
