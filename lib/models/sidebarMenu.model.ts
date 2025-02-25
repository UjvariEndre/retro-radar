import { ElementType } from "react";
import { z } from "zod";

export const SidebarMenuItemSchema = z.object({
  title: z.string(),
  url: z.string(),
  icon: z.custom<ElementType>((val) => typeof val === "function", {
    message: "Invalid icon component",
  }),
  target: z.string().optional(),
});
export type SidebarMenuItemModel = z.infer<typeof SidebarMenuItemSchema>;

export const SidebarMenuItemsSchema = z.array(SidebarMenuItemSchema);
export type SidebarMenuItemsModel = z.infer<typeof SidebarMenuItemsSchema>;
