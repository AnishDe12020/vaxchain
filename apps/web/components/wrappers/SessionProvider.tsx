"use client"

import { ReactNode } from "react"
import { SessionProvider } from "next-auth/react"

const SessionProviderWrapper = ({ children }: { children: ReactNode }) => (
  <SessionProvider>{children}</SessionProvider>
)

export default SessionProviderWrapper
