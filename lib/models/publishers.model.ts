import { z } from "zod";
import { CommonIntIdSchema, CommonNameSchema } from "./common.model";

export const PublisherItemSchema = z.object({
  id: CommonIntIdSchema,
  name: CommonNameSchema,
});
export type PublisherItemModel = z.infer<typeof PublisherItemSchema>;

export const PublishersSchema = z.array(PublisherItemSchema);
export type PublishersModel = z.infer<typeof PublishersSchema>;
