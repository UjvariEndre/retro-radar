import { z } from "zod";
import { CommonNameSchema } from "./common.model";

export const YearSchema = z
  .string()
  .regex(/^\d{4}$/, "Must be a 4-digit number")
  .or(z.literal(""));
export type YearModel = z.infer<typeof YearSchema>;

export const LicenseStatusSchema = z
  .enum(["licensed_only", "unlicensed_only"])
  .or(z.literal(""));
export type LicenseStatusModel = z.infer<typeof LicenseStatusSchema>;

export const SearchFilterSchema = z.object({
  platform_name: CommonNameSchema.optional(),
  publisher_name: CommonNameSchema.optional(),
  region_name: CommonNameSchema.optional(),
  license_status: LicenseStatusSchema.optional(),
  date_from: YearSchema.optional(),
  date_to: YearSchema.optional(),
});
export type SearchFilterModel = z.infer<typeof SearchFilterSchema>;
