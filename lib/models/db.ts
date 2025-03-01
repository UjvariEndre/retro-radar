import { z } from "zod";

export const dbReleaseItemSchema = z.object({
  created_at: z.string().min(1),
  id: z.number().min(1),
  is_licensed: z.boolean().optional(),
  market_tag: z.object({ tag: z.string() }).optional(),
  platform_name: z.object({ name: z.string() }),
  publisher_name: z.object({ name: z.string() }).optional(),
  release_date: z.string().optional(),
  title: z.string().min(1),
  wiki_tag: z.string().optional(),
});
export type dbReleaseItemModel = z.infer<typeof dbReleaseItemSchema>;

export const dbReleasesSchema = z.array(dbReleaseItemSchema);
export type dbReleasesModel = z.infer<typeof dbReleasesSchema>;
