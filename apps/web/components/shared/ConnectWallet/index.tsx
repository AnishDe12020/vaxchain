"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { LinkIcon, UnlinkIcon, WalletIcon } from "lucide-react";
import {
  HTMLAttributes,
  forwardRef,
  useCallback,
  useMemo,
  useState,
} from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import base58 from "bs58";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { truncatePubkey } from "@/utils/truncate";
import axios from "axios";
import { Icons } from "@/components/icons";
import { toast } from "sonner";

interface ConnectWalletProps extends HTMLAttributes<HTMLButtonElement> {
  onlyConnect?: boolean;
}

export const ConnectWallet = forwardRef<HTMLButtonElement, ConnectWalletProps>(
  ({ onlyConnect, children, ...props }, ref) => {
    const { wallets, select, publicKey, disconnect, connect, signMessage } =
      useWallet();
    const { status } = useSession();

    const [isSigningIn, setIsSigningIn] = useState(false);

    const login = useCallback(async () => {
      setIsSigningIn(true);
      const res = await axios.get("/api/nonce");

      if (res.status != 200) {
        console.error("failed to fetch nonce");
        return;
      }

      const { nonce } = res.data;

      const message = `Sign this message for authenticating with your wallet. Nonce: ${nonce}`;
      const encodedMessage = new TextEncoder().encode(message);

      if (!signMessage) {
        console.error("signMessage is not defined");
        return;
      }

      const signedMessage = await signMessage(encodedMessage);

      try {
        await signIn("credentials", {
          publicKey: publicKey?.toBase58(),
          signature: base58.encode(signedMessage),
          callbackUrl: `${window.location.origin}/${window.location.pathname}`,
        });
      } catch (e) {
        console.error(e);
        toast.error("Failed to sign in");
      }

      setIsSigningIn(false);
    }, [signMessage, publicKey]);

    const [isOpen, setIsOpen] = useState(false);

    const availableWallets = useMemo(
      () =>
        wallets.filter(
          (wallet: { readyState: string }) =>
            wallet.readyState === "Installed" ||
            wallet.readyState === "Loadable"
        ),
      [wallets]
    );

    const disconenctWallet = () => {
      disconnect();
      signOut();
    };

    return status === "loading" ? (
      <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
    ) : (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {publicKey && status === "authenticated" ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button ref={ref} variant="secondary" {...props}>
                  <WalletIcon className="w-4 h-4 mr-2" />
                  <span>{truncatePubkey(publicKey.toBase58())}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={disconenctWallet}
                  className="text-destructive"
                >
                  <UnlinkIcon className="w-4 h-4 mr-2" />
                  <span>Disconenct Wallet</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button ref={ref} {...props}>
              {children ?? (
                <>
                  <LinkIcon className="w-4 h-4 mr-2" />
                  <span>Connect Wallet</span>
                </>
              )}
            </Button>
          )}
        </DialogTrigger>

        <DialogContent className="w-96">
          <DialogHeader>
            <DialogTitle>Connect Wallet</DialogTitle>
          </DialogHeader>

          {publicKey && !onlyConnect ? (
            <div className="flex flex-col items-center justify-center gap-6 mt-4 text-center">
              <Button onClick={() => login()} isLoading={isSigningIn}>
                Sign Message
              </Button>
              <p className="text-sm text-gray-300">
                Sign a message with you wallet to prove that you own it.
                Don&apos;t worry, this wont trigger a transaction on the
                blockchain and hence no gas fees will be incurred!
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {availableWallets.map((wallet) => (
                <Button
                  key={wallet.adapter.name}
                  onClick={(e) => {
                    select(wallet.adapter.name);

                    if (!e.defaultPrevented) {
                      connect().catch((e) => {
                        console.error(e);
                      });
                    }
                  }}
                  variant="secondary"
                  className="justify-start"
                  size="lg"
                >
                  <img
                    className="w-5 h-5 mr-4"
                    src={wallet.adapter.icon}
                    alt={wallet.adapter.name}
                  />
                  <span>{wallet.adapter.name}</span>
                </Button>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    );
  }
);

ConnectWallet.displayName = "ConnectWallet";
