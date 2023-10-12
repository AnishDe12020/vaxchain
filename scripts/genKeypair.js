import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";

const keypair = Keypair.generate();

console.log("publicKey", keypair.publicKey.toBase58());
const key = bs58.encode(keypair.secretKey);
console.log("privateKey", key);
