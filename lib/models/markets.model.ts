import { z } from "zod";
import { CommonIntIdSchema, CommonNameSchema } from "./common.models";

export const MarketTagSchema = z.string();
export type MarketTagModel = z.infer<typeof MarketTagSchema>;

export const MarketItemSchema = z.object({
  id: CommonIntIdSchema.min(1),
  tag: MarketTagSchema.min(1),
  name: CommonNameSchema.min(1),
});
