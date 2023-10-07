import DatePickerWithRange from "@/components/dashboard/forms/date-picker-with-range";
import { Label } from "@/components/ui/label";

export function DatePicker() {
  return (
    // <Card>
    //   <CardContent className="pt-6">
    <div className="space-y-2">
      <Label htmlFor="form-date" className="shrink-0">
        Set Production & Expiration Dates
      </Label>
      <DatePickerWithRange className="[&>button]:w-[320px]" />
    </div>
    //   </CardContent>
    // </Card>
  );
}
