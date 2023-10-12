"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import useProgram from "@/hoooks/useProgram"
import { zodResolver } from "@hookform/resolvers/zod"
import { BN } from "@project-serum/anchor"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { Keypair, PublicKey } from "@solana/web3.js"
import axios from "axios"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

import { TOKEN_MINT } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import FormDatePicker from "@/components/ui/date-picker"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const createBatchFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  expiresAt: z
    .date()
    .min(new Date(), { message: "Expiration date must be in the future." }),
  quantity: z.number().positive(),
  tempMin: z.number(),
  tempMax: z.number(),
  costPerPiece: z.number().positive(),
})

type CreateBatchFormValues = z.infer<typeof createBatchFormSchema>

const CreateBatchForm = () => {
  const form = useForm<CreateBatchFormValues>({
    resolver: zodResolver(createBatchFormSchema),
    mode: "onChange",
  })

  const { program } = useProgram()
  const { publicKey, signAllTransactions } = useWallet()
  const { connection } = useConnection()

  const [isCreating, setIsCreating] = useState(false)

  const router = useRouter()

  const onSubmit = async (values: CreateBatchFormValues) => {
    console.log(values)

    if (!publicKey || !signAllTransactions) {
      toast.error("Wallet not connected")
      return
    }

    if (!program) {
      toast.error("Program not initialized")
      return
    }

    setIsCreating(true)

    try {
      const batchKey = Keypair.generate().publicKey

      const userPda = PublicKey.findProgramAddressSync(
        [Buffer.from("user"), publicKey.toBuffer()],
        program.programId
      )[0]

      const batchPda = PublicKey.findProgramAddressSync(
        [Buffer.from("batch"), batchKey.toBuffer()],
        program.programId
      )[0]

      const vaultPda = PublicKey.findProgramAddressSync(
        [
          Buffer.from("vault"),
          batchKey.toBuffer(),
          new PublicKey(TOKEN_MINT).toBuffer(),
        ],
        program.programId
      )[0]

      const batchSig = await program.methods
        .createBatch(
          new BN(values.expiresAt.getTime() / 1000),
          values.tempMin + 273,
          values.tempMax + 273,
          values.costPerPiece,
          values.quantity
        )
        .accounts({
          batch: batchKey,
          batchPda,
          user: publicKey,
          userPda,
          vault: vaultPda,
          mint: new PublicKey(TOKEN_MINT),
        })
        .rpc()

      const latestBlockhash = await connection.getLatestBlockhash()

      const vaccines = await Promise.all(
        [...Array(values.quantity)].map(async (_, i) => {
          const vaccine = Keypair.generate().publicKey

          const vaccinePda = PublicKey.findProgramAddressSync(
            [Buffer.from("vaccine"), vaccine.toBuffer()],
            program.programId
          )[0]

          const tx = await program.methods
            .createVaccine()
            .accounts({
              batch: batchKey,
              batchPda,
              user: publicKey,
              userPda,
              vaccine,
              vaccinePda,
            })
            .transaction()

          tx.recentBlockhash = latestBlockhash.blockhash
          tx.feePayer = publicKey

          return {
            tx,
            vaccine,
          }
        })
      )

      console.log(vaccines)

      const signedTransactions = await signAllTransactions([
        ...vaccines.map((v) => v.tx),
      ])

      console.log(signedTransactions)

      const vaccineTxSigs = await Promise.all(
        signedTransactions.map((tx) =>
          connection.sendRawTransaction(tx.serialize())
        )
      )

      console.log(vaccineTxSigs)

      await Promise.all(
        vaccineTxSigs.map((sig) =>
          connection.confirmTransaction(sig, "confirmed")
        )
      )

      await axios.post("/api/batch", {
        name: values.name,
        pubkey: batchKey.toBase58(),
        expiresAt: values.expiresAt.toISOString(),
        tempMin: values.tempMin + 273,
        tempMax: values.tempMax + 273,
        costPerPiece: values.costPerPiece,
        quantity: values.quantity,
        vaccines: vaccines.map((v) => v.vaccine.toBase58()),
      })

      await router.push(`/dashboard/batch/${batchKey.toBase58()}`)

      toast.success("Batch and vaccines created")
      setIsCreating(false)
    } catch (e) {
      setIsCreating(false)
      toast.error("Error creating batch")
      console.error(e)
    }
  }

  return (
    <Card className="w-[720px]">
      <CardHeader>
        <CardTitle>New Batch</CardTitle>
        <CardDescription>Create a new batch of vaccines</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-6">
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>Internal batch identifier</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expiresAt"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Expiration Date</FormLabel>
                    <FormDatePicker field={field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4 w-full">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Number of vaccines in the batch
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="costPerPiece"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Cost (per piece)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>Cost per vaccine in VAX</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-4 w-full">
                <FormField
                  control={form.control}
                  name="tempMin"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Minimum Temperature</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Minimum temperature in degrees Celsius
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tempMax"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Maximum Temperature</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Maximum temperature in degrees Celsius
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end space-x-2">
            <p className="text-gray-400 text-xs mr-4">
              You will need to confirm 2 transactions
            </p>

            <Button type="submit" isLoading={isCreating}>
              Create Batch
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

export default CreateBatchForm
