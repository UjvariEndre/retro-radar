import {
  SearchFilterModel,
  SearchFilterSchema,
} from "@/lib/models/searchFilters.model";
import { SelectOptionsModel } from "@/lib/models/ui.models";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import SelectField from "./SelectField";

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

interface SearchFilterFormProps {
  footer: ReactNode;
}

const SearchFilterForm = ({ footer }: SearchFilterFormProps) => {
  const form = useForm<SearchFilterModel>({
    resolver: zodResolver(SearchFilterSchema),
    defaultValues: {
      platform_name: "",
    },
  });

  // Submit handler
  function onSubmit(values: SearchFilterModel) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <SelectField
          form={form}
          name="platform_name"
          options={PLATFORM_OPTIONS}
          title="Platform"
          placeholder="All Platforms"
        />
        <SelectField
          form={form}
          name="publisher_name"
          options={PUBLISHER_OPTIONS}
          title="Publisher"
          placeholder="All Publishers"
        />
        <SelectField
          form={form}
          name="region_name"
          options={REGION_OPTIONS}
          title="Region"
          placeholder="All Regions"
        />
        {footer}
      </form>
    </Form>
  );
};
export default SearchFilterForm;
