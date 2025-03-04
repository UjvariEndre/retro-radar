import { z } from "zod";
import { CommonNameSchema } from "./common.model";

export const SearchFilterSchema = z.object({
  platform_name: CommonNameSchema.optional(),
  publisher_name: CommonNameSchema.optional(),
  region_name: CommonNameSchema.optional(),
});
export type SearchFilterModel = z.infer<typeof SearchFilterSchema>;
