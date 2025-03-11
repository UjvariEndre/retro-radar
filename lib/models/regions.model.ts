import { z } from "zod";
import { CommonIntIdSchema, CommonNameSchema } from "./common.model";

export const RegionTagSchema = z.string();
export type RegionTagModel = z.infer<typeof RegionTagSchema>;

export const RegionItemSchema = z.object({
  id: CommonIntIdSchema.min(1),
  tag: RegionTagSchema.min(1),
  name: CommonNameSchema.min(1),
});
export type RegionItemModel = z.infer<typeof RegionItemSchema>;

export const RegionsSchema = z.array(RegionItemSchema);
export type RegionsModel = z.infer<typeof RegionsSchema>;
