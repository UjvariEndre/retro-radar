import { useFilters } from "@/hooks/useFilters";
import {
  SearchFilterModel,
  SearchFilterSchema,
} from "@/lib/models/searchFilters.model";
import { SelectOptionsModel } from "@/lib/models/ui.models";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import RRScrollArea from "../features/RRScrollArea";
import { Form } from "../ui/form";
import ComboboxField from "./fields/ComboboxField";
import SelectField from "./fields/SelectField";
import YearPickerField from "./fields/YearPickerField";

const PLATFORM_OPTIONS: SelectOptionsModel = [
  { value: JSON.stringify({ id: 1, name: "NES" }), title: "NES" },
  { value: JSON.stringify({ id: 2, name: "SNES" }), title: "SNES" },
];

const PUBLISHER_OPTIONS: SelectOptionsModel = [
  { value: JSON.stringify({ id: 1, name: "Nintendo" }), title: "Nintendo" },
  { value: JSON.stringify({ id: 97, name: "Acclaim" }), title: "Acclaim" },
];

const REGION_OPTIONS: SelectOptionsModel = [
  {
    value: JSON.stringify({ id: 1, tag: "JP", name: "Japan" }),
    title: "Japan",
  },
  {
    value: JSON.stringify({ id: 2, tag: "NA", name: "North America" }),
    title: "North America",
  },
  {
    value: JSON.stringify({ id: 3, tag: "EU", name: "Europe" }),
    title: "Europe",
  },
];

const LICENSE_STATUS_OPTIONS: SelectOptionsModel = [
  { value: "licensed_only", title: "Licensed Releases" },
  { value: "unlicensed_only", title: "Unlicensed Releases" },
];

interface SearchFilterFormProps {
  footer: ReactNode;
  onClose: () => void;
}

const SearchFilterForm = ({ footer, onClose }: SearchFilterFormProps) => {
  const { filters, setFilters, setPageIndex } = useFilters();
  const form = useForm<SearchFilterModel>({
    resolver: zodResolver(SearchFilterSchema),
    defaultValues: filters,
  });

  // Submit handler
  function onSubmit(values: SearchFilterModel) {
    setFilters(values);
    setPageIndex(0);
    onClose();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <RRScrollArea className="mb-2 max-h-[calc(60vh-100px)] min-h-[80px] space-y-4 overflow-auto pr-1">
          <ComboboxField
            form={form}
            name="platform"
            options={PLATFORM_OPTIONS}
            title="Platform"
            triggerText="Select Platform..."
            placeholder="Search Platform..."
            showClearButton
          />
          <ComboboxField
            form={form}
            name="publisher"
            options={PUBLISHER_OPTIONS}
            title="Publisher"
            triggerText="Select Publisher..."
            placeholder="Search Publisher..."
            showClearButton
          />
          <ComboboxField
            form={form}
            name="region"
            options={REGION_OPTIONS}
            title="Region"
            triggerText="Select Region..."
            placeholder="Search Region..."
            showClearButton
          />
          <SelectField
            form={form}
            name="license_status"
            options={LICENSE_STATUS_OPTIONS}
            title="License Status"
            desc="Select whether to show officially licensed games or unlicensed third-party releases."
            placeholder="All Releases"
            showClearButton
          />
          <YearPickerField form={form} />
        </RRScrollArea>
        {footer}
      </form>
    </Form>
  );
};
export default SearchFilterForm;
