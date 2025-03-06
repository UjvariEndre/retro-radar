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
import SelectField from "./SelectField";
import YearPickerField from "./YearPickerField";

const PLATFORM_OPTIONS: SelectOptionsModel = [
  { value: "NES", title: "NES" },
  { value: "SNES", title: "SNES" },
];

const PUBLISHER_OPTIONS: SelectOptionsModel = [
  { value: "Nintendo", title: "Nintendo" },
  { value: "Acclaim", title: "Acclaim" },
];

const REGION_OPTIONS: SelectOptionsModel = [
  { value: "JP", title: "Japan" },
  { value: "NA", title: "North America" },
  { value: "EU", title: "Europe" },
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
  const { filters, setFilters } = useFilters();
  const form = useForm<SearchFilterModel>({
    resolver: zodResolver(SearchFilterSchema),
    defaultValues: filters,
  });

  // Submit handler
  function onSubmit(values: SearchFilterModel) {
    setFilters(values);
    onClose();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <RRScrollArea className="mb-2 max-h-[calc(60vh-100px)] min-h-[80px] space-y-4 overflow-auto pr-1">
          <SelectField
            form={form}
            name="platform_name"
            options={PLATFORM_OPTIONS}
            title="Platform"
            placeholder="All Platforms"
            showClearButton
          />
          <SelectField
            form={form}
            name="publisher_name"
            options={PUBLISHER_OPTIONS}
            title="Publisher"
            placeholder="All Publishers"
            showClearButton
          />
          <SelectField
            form={form}
            name="region_name"
            options={REGION_OPTIONS}
            title="Region"
            placeholder="All Regions"
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
