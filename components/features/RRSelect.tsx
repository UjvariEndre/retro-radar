import { SelectOptionsModel } from "@/lib/models/ui.models";
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
  onChange: (value: string) => void;
}

const RRSelect = (props: RRSelectProps) => {
  const { options, onChange } = props;
  return (
    <Select {...props} onValueChange={onChange}>
      <SelectTrigger className="h-11 w-[300px] rounded-lg bg-white">
        <SelectValue placeholder="Theme" />
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
