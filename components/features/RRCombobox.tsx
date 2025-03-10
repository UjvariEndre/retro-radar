"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { isSerializedObject } from "@/lib/helpers";
import { SelectOptionsModel } from "@/lib/models/ui.models";
import { cn } from "@/lib/utils";
import RRButton from "./RRButton";
import RemoveButton from "./RemoveButton";

interface RRComboboxProps {
  options: SelectOptionsModel;
  value: unknown;
  triggerText?: string;
  placeholder?: string;
  showClearButton?: boolean;
  onChange: (value: unknown) => void;
}

export function RRCombobox({
  options,
  value,
  triggerText,
  placeholder,
  showClearButton,
  onChange,
}: RRComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const stringifiedValue =
    typeof value === "object" ? JSON.stringify(value) : value;

  return (
    <div className="flex space-x-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <RRButton
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {stringifiedValue
              ? options.find((option) => option.value === stringifiedValue)
                  ?.title
              : triggerText}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </RRButton>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={placeholder} />
            <CommandList>
              <CommandEmpty>No match found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.title}
                    onSelect={() => {
                      const transformedValue = isSerializedObject(option.value)
                        ? JSON.parse(option.value)
                        : option.value;
                      onChange(transformedValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {option.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {showClearButton && stringifiedValue && (
        <RemoveButton onChange={() => onChange("")} />
      )}
    </div>
  );
}
