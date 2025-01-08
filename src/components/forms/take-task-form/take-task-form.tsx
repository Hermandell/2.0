import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { TakeformSchema, type TakeTaskFormData,TakeTaskFormDefault } from "./schema";
import { languages,plans } from "./config";
import { TextInput } from "../forms-fields/text-input";
import { DateTimeInput } from "../forms-fields/date-time-input";
import { ComboboxInput } from "../forms-fields/combobox-input";
import { TextareaInput } from "../forms-fields/textarea-input";
import { NumberInput } from "../forms-fields/number-input";
import { RadioGroupInput } from "../forms-fields/radio-group-input";
import { CheckboxInput } from "../forms-fields/checkbox-input";
import { SwitchInput } from "../forms-fields/switch-input";

interface TakeTaskFormProps {
  onSubmit: (data: TakeTaskFormData) => void;
}

export function TakeTaskForm({ onSubmit }: TakeTaskFormProps) {
  const form = useForm<TakeTaskFormData>({
    resolver: zodResolver(TakeformSchema),
    defaultValues: TakeTaskFormDefault,
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <div className="grid grid-cols-2 gap-4">
          <TextInput
            name="name"
            label="Name"
            placeholder="John Doe"
            description="Your full name"
          />
          <TextInput
            name="email"
            label="Email"
            type="email"
            placeholder="john@example.com"
            description="Your email address"
          />
        </div>

        <DateTimeInput name="datetime" label="Select Date and Time" />

        <ComboboxInput
          name="language"
          label="Language"
          options={languages}
          description="Select your preferred language"
        />

        <TextareaInput
          name="bio"
          label="Bio"
          placeholder="Tell us about yourself..."
          description="A brief description about you"
        />

        <NumberInput
          name="age"
          label="Age"
          min={18}
          max={120}
          description="You must be at least 18 years old"
        />

        <RadioGroupInput
          name="plan"
          label="Subscription Plan"
          options={plans}
          description="Select your subscription plan"
        />

        <CheckboxInput
          name="terms"
          label="Accept Terms"
          description="I agree to the terms and conditions"
        />

        <SwitchInput
          name="marketingEmails"
          label="Marketing Emails"
          description="Receive emails about new products and features"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
