"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

export const DesktopNav = () => {
  const pathname = usePathname()

  return (
    <div className="hidden mr-4 md:flex flex-1">
      <Link href="/" className="flex items-center mr-6 space-x-2">
        <Icons.logomark className="h-6" />
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium justify-end w-full">
        <Link
          href="/dashboard"
          className={cn("transition-colors hover:text-foreground/80")}
        >
          DASHBOARD
        </Link>

        <Link
          href="/dashboard/airdrop"
          className={cn("transition-colors hover:text-foreground/80")}
        >
          AIRDROP
        </Link>
      </nav>
    </div>
  )
}
