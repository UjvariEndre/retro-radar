import { SelectOptionsModel } from "@/lib/models/ui.models";
import { cn } from "@/lib/utils";
import { SelectProps } from "@radix-ui/react-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface RRSelectProps extends SelectProps {
  options: SelectOptionsModel;
  placeholder?: string;
  className?: string;
  onChange: (value: string) => void;
}

const RRSelect = (props: RRSelectProps) => {
  const { options, placeholder, className, onChange } = props;
  return (
    <Select {...props} onValueChange={onChange}>
      <SelectTrigger
        className={cn("h-11 w-full rounded-lg bg-white", className)}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option, index) => (
          <SelectItem key={index} value={option.value}>
            {option.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
export default RRSelect;
