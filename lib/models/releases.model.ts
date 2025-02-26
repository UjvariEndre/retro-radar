import { z } from "zod";
import {
  CommonIntIdSchema,
  CommonNameSchema,
  CommonTimestampSchema,
  WikiTagSchema,
} from "./common.models";
import { MarketTagSchema } from "./markets.model";

export const ReleaseIsLicensedSchema = z.boolean();
export type ReleaseIsLicensedModel = z.infer<typeof ReleaseIsLicensedSchema>;

export const ReleaseReleaseDateSchema = z.string().refine((val) => {
  // Match YYYY (e.g., 1998)
  const yearPattern = /^\d{4}$/;
  // Match YYYY-MM (e.g., 1998-07)
  const yearMonthPattern = /^\d{4}-(0[1-9]|1[0-2])$/;
  // Match YYYY-MM-DD (e.g., 1998-07-16)
  const fullDatePattern = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

  return (
    yearPattern.test(val) ||
    yearMonthPattern.test(val) ||
    fullDatePattern.test(val)
  );
}, "Invalid date format. Expected YYYY, YYYY-MM, or YYYY-MM-DD.");
export type ReleaseReleaseDateModel = z.infer<typeof ReleaseReleaseDateSchema>;

export const ReleaseItemSchema = z.object({
  id: CommonIntIdSchema.min(1),
  created_at: CommonTimestampSchema.min(1),
  title: CommonNameSchema.min(1),
  platform_name: CommonNameSchema.min(1),
  wiki_tag: WikiTagSchema.optional(),
  is_licensed: ReleaseIsLicensedSchema.optional(),
  publisher_name: CommonNameSchema.optional(),
  release_date: ReleaseReleaseDateSchema.optional(),
  market_tag: MarketTagSchema.optional(),
});
export type ReleaseItemModel = z.infer<typeof ReleaseItemSchema>;

export const ReleasesSchema = z.array(ReleaseItemSchema);
export type ReleasesModel = z.infer<typeof ReleasesSchema>;
