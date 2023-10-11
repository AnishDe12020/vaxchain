"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"

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

  const onSubmit = (values: CreateBatchFormValues) => {
    console.log(values)
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
                    <FormDescription>Expiration date</FormDescription>
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
                        <Input {...field} type="number" />
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
                        <Input {...field} type="number" />
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
                        <Input {...field} type="number" />
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
                        <Input {...field} type="number" />
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
            <Button type="submit">Create Batch</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

export default CreateBatchForm
