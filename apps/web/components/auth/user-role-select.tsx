"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import useProgram from "@/hoooks/useProgram"
import { zodResolver } from "@hookform/resolvers/zod"
import { useWallet } from "@solana/wallet-adapter-react"
import { PublicKey } from "@solana/web3.js"
import axios from "axios"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const FormSchema = z.object({
  role: z.enum(["MANUFACTURER", "DISTRIBUTOR", "DOCTOR"]),
})

const UserRoleSelect = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const router = useRouter()

  const { program } = useProgram()
  const { publicKey } = useWallet()

  const [isCreating, setIsCreating] = useState(false)

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (!publicKey) {
      toast.error("Wallet not connected")
      return
    }

    if (!program) {
      toast.error("Program not initialized")
      return
    }

    const userPda = PublicKey.findProgramAddressSync(
      [Buffer.from("user"), publicKey.toBuffer()],
      program.programId
    )[0]

    const roleArg =
      data.role === "MANUFACTURER"
        ? { manufacturer: {} }
        : data.role === "DISTRIBUTOR"
        ? { distributor: {} }
        : { doctor: {} }

    setIsCreating(true)

    try {
      const sig = await program.methods
        .createUser(roleArg)
        .accounts({
          user: publicKey,
          userPda,
        })
        .rpc()

      console.log(sig)

      await axios.put("/api/user", {
        role: data.role,
      })

      toast.success("User created", {
        action: {
          label: "View on Solscan",
          onClick: () => {
            window.open(
              `https://solscan.io/tx/${sig}?cluster=devnet`,
              "_blank",
              "noopener noreferrer"
            )
          },
        },
      })

      setIsCreating(false)

      router.push("/dashboard")
    } catch (err) {
      setIsCreating(false)
      console.error(err)
      toast.error("Something went wrong")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="MANUFACTURER">Manufacturer</SelectItem>
                  <SelectItem value="DISTRIBUTOR">Distributor</SelectItem>
                  <SelectItem value="DOCTOR">Doctor</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <Button type="submit" variant="default" isLoading={isCreating}>
            Go to Dashboard
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default UserRoleSelect
