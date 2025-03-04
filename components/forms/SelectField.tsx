import { SelectOptionsModel } from "@/lib/models/ui.models";
import {
  ControllerProps,
  FieldPath,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";
import RRSelect from "../features/RRSelect";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface SelectFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<ControllerProps<TFieldValues, TName>, "render"> {
  form: UseFormReturn;
  options: SelectOptionsModel;
  title?: string;
  placeholder?: string;
  render?: ControllerProps<TFieldValues, TName>["render"];
}

const SelectField = (props: SelectFieldProps) => {
  const { form, name, title, options, placeholder } = props;

  return (
    <FormField
      {...props}
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full space-y-0">
          <FormLabel>{title}</FormLabel>
          <FormControl>
            <RRSelect {...field} options={options} placeholder={placeholder} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default SelectField;
