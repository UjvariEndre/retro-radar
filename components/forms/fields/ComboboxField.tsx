import { RRCombobox } from "@/components/features/RRCombobox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SelectOptionsModel } from "@/lib/models/ui.models";
import {
  ControllerProps,
  FieldPath,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";

interface ComboboxFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<ControllerProps<TFieldValues, TName>, "render"> {
  form: UseFormReturn;
  options: SelectOptionsModel;
  title?: string;
  desc?: string;
  triggerText?: string;
  placeholder?: string;
  showClearButton?: boolean;
  render?: ControllerProps<TFieldValues, TName>["render"];
}

const ComboboxField = (props: ComboboxFieldProps) => {
  const { form, name, title, desc, options, placeholder, triggerText } = props;

  return (
    <FormField
      {...props}
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full space-y-0">
          <FormLabel>{title}</FormLabel>
          <FormDescription>{desc}</FormDescription>
          <FormControl>
            <RRCombobox
              {...field}
              options={options}
              placeholder={placeholder}
              triggerText={triggerText}
              value={field.value}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default ComboboxField;
