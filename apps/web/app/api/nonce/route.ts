import crypto from "crypto";
import { serialize } from "cookie";

export const GET = async () => {
    const nonce = crypto.randomBytes(32).toString("base64");

    return new Response(JSON.stringify({nonce}), {
        headers: {
            "Set-Cookie": serialize("auth-nonce", nonce, {
                httpOnly: true,
                sameSite: "strict",
                secure: true,
            })
        }
    });
}

