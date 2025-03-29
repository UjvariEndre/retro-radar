import { z } from "zod";
import { CommonIntIdSchema, CommonNameSchema } from "./common.model";

export const PlatformItemSchema = z.object({
  id: CommonIntIdSchema,
  name: CommonNameSchema,
});
export type PlatformItemModel = z.infer<typeof PlatformItemSchema>;

export const PlatformsSchema = z.array(PlatformItemSchema);
export type PlatformsModel = z.infer<typeof PlatformsSchema>;
