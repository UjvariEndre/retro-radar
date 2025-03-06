import { SelectOptionsModel } from "@/lib/models/ui.models";
import { cn } from "@/lib/utils";
import { SelectProps } from "@radix-ui/react-select";
import { LucideMinusCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import RRButton from "./RRButton";

interface RRSelectProps extends SelectProps {
  options: SelectOptionsModel;
  placeholder?: string;
  className?: string;
  showClearButton?: boolean;
  onChange: (value: string | undefined) => void;
}

const RRSelect = (props: RRSelectProps) => {
  const { options, placeholder, className, showClearButton, value, onChange } =
    props;

  return (
    <div className="flex space-x-2">
      <Select
        key={value ?? "empty"}
        {...props}
        value={value || ""}
        onValueChange={onChange}
      >
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
      {showClearButton && value && (
        <RRButton variant="destructive" onClick={() => onChange("")}>
          <LucideMinusCircle style={{ width: "1.5rem", height: "1.5rem" }} />
        </RRButton>
      )}
    </div>
  );
};
export default RRSelect;
