import { SelectOptionsModel } from "@/lib/models/ui.models";
import { useMemo } from "react";
import { UseFormReturn } from "react-hook-form";
import SelectField from "./SelectField";

const START = 1980;
const END = 2000;

interface YearPickerFieldProps {
  form: UseFormReturn;
}

const YearPickerField = ({ form }: YearPickerFieldProps) => {
  const field = form.watch();

  const fromOptions: SelectOptionsModel = useMemo(() => {
    const result: SelectOptionsModel = [];
    let to: number = END;
    if (field.date_to) to = Number(field.date_to);
    for (let i = START; i <= to; i++) {
      const date = i.toString();
      result.push({ title: date, value: date });
    }
    return result;
  }, [field]);

  const toOptions: SelectOptionsModel = useMemo(() => {
    const result: SelectOptionsModel = [];
    let from: number = START;
    if (field.date_from) from = Number(field.date_from);
    for (let i = from; i <= END; i++) {
      const date = i.toString();
      result.push({ title: date, value: date });
    }
    return result;
  }, [field]);

  return (
    <div className="flex space-x-1">
      <SelectField
        form={form}
        name="date_from"
        options={fromOptions}
        title="From"
        placeholder="Year"
        showClearButton
      />
      <SelectField
        form={form}
        name="date_to"
        options={toOptions}
        title="To"
        placeholder="Year"
        showClearButton
      />
    </div>
  );
};
export default YearPickerField;
