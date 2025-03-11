import { z } from "zod";
import { PlatformItemSchema } from "./platforms.model";
import { PublisherItemSchema } from "./publishers.model";
import { RegionItemSchema } from "./regions.model";

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
  platform: PlatformItemSchema.or(z.literal("")).optional(),
  publisher: PublisherItemSchema.or(z.literal("")).optional(),
  region: RegionItemSchema.or(z.literal("")).optional(),
  license_status: LicenseStatusSchema.optional(),
  date_from: YearSchema.optional(),
  date_to: YearSchema.optional(),
});
export type SearchFilterModel = z.infer<typeof SearchFilterSchema>;
