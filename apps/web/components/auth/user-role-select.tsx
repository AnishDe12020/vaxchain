"use client"

import { redirect } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
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
  role: z.string({
    required_error: "Please select a role to proceed.",
  }),
  toc: z.boolean({
    required_error: "Please accept the terms and conditions.",
  }),
})

const UserRoleSelect = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    axios
      .put("/api/user", {
        role: data.role,
      })
      .then((res) => {
        console.log(res)
        window.location.href = "/dashboard"
      })
      .catch((err) => {
        console.log(err)
      })
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
        <FormField
          control={form.control}
          name="toc"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Create Custodial Wallet</FormLabel>
                <FormDescription>
                  You agree that we maintain a custodial wallet on behalf of you
                  to sign the transaction.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <div>
          <Button type="submit" variant="default">
            Go to Dashboard
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default UserRoleSelect
