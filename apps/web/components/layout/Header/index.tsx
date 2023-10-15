"use client"

import Link from "next/link"
import Avvvatars from "avvvatars-react"
import { LogOutIcon } from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons"
import { ConnectWallet } from "@/components/shared/ConnectWallet"

import { DesktopNav } from "./Desktop"
import { MobileNav } from "./Mobile"

export const Header = () => {
  return (
    <header className="sticky top-0 z-40 justify-between w-full border-b shadow-sm supports-backdrop-blur:bg-background/60 bg-background/75 backdrop-blur">
      <div className="container flex items-center h-14 justify-between">
        <DesktopNav />
        <MobileNav />
        <div className="flex items-center justify-end space-x-2 sm:space-x-4">
          <nav className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className={cn(
                    buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    }),
                    "w-9 px-0"
                  )}
                >
                  <Icons.gitHub className="w-5 h-5" />
                  <span className="sr-only">GitHub</span>
                </div>
              </Link>
            </div>

            <ConnectWallet>GET STARTED</ConnectWallet>
          </nav>
        </div>
      </div>
    </header>
  )
}
