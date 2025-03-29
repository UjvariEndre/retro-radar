import { z } from "zod";

export const SelectOptionItemSchema = z.object({
  title: z.string().min(1),
  value: z.string().min(1),
});
export type SelectOptionItemModel = z.infer<typeof SelectOptionItemSchema>;

export const SelectOptionsSchema = z.array(SelectOptionItemSchema);
export type SelectOptionsModel = z.infer<typeof SelectOptionsSchema>;
