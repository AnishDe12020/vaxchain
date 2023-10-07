import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { DatePicker } from "./date-picker";

async function handleSubmit() {}

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      }),
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  bio: "I own a computer.",
  urls: [
    { value: "https://shadcn.com" },
    { value: "http://twitter.com/shadcn" },
  ],
};

export function AddVaxForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  return (
    <Card className="w-[720px]">
      <CardHeader>
        <CardTitle>Add Vaccine</CardTitle>
        <CardDescription>
          Scan the QR code on the vaccine vial to add it to your inventory.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="vax-id">Vaccine Id</Label>
              <Input id="vax-id" placeholder="Scan and enter vaccine id" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="manufacturer-id">Manufacturer Id</Label>
              <Input id="manufacturer-id" placeholder="Enter manufacturer id" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="security-level">Status</Label>
              <Select defaultValue="1">
                <SelectTrigger
                  id="security-level"
                  className="line-clamp-2 w-[320px] truncate"
                >
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Created</SelectItem>
                  <SelectItem value="2">Shipped</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <DatePicker />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="subject">Add Notes</Label>
            <Input
              id="subject"
              placeholder="Add notes if necessary (optional)"
            />
          </div>
        </CardContent>
        <CardFooter className="justify-between space-x-2">
          <Button variant="ghost">Cancel</Button>
          <Button>Submit</Button>
        </CardFooter>
      </Form>
    </Card>
  );
}
