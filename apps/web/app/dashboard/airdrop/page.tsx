"use client"

import { useState } from "react"
import axios from "axios"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

const AirdropPage = () => {
  const [isAirdropping, setIsAirdropping] = useState(false)

  const airdrop = async () => {
    setIsAirdropping(true)
    try {
      await axios.post("/api/airdrop")
      toast.success("Airdropped")
      setIsAirdropping(false)
    } catch (error) {
      toast.error("Error airdropping")
      console.error(error)
      setIsAirdropping(false)
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold">Airdrop 10000 VAX Tokens</h1>

      <Button onClick={airdrop} isLoading={isAirdropping} className="mt-4">
        Airdrop
      </Button>
    </>
  )
}

export default AirdropPage
