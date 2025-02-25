import {
  LucideChartNoAxesColumn,
  LucideHome,
  LucideLibraryBig,
  LucideLogOut,
  LucideSettings,
  LucideTrendingUp,
} from "lucide-react";
import { SidebarMenuItemsModel } from "./models/sidebarMenu.model";

export const sidebarItems: SidebarMenuItemsModel = [
  { title: "Home", url: "/", icon: LucideHome, target: "_blank" },
  { title: "Dashboard", url: "/", icon: LucideChartNoAxesColumn },
  { title: "Price Tracker", url: "/price-tracker", icon: LucideTrendingUp },
  { title: "My Collection", url: "/collection", icon: LucideLibraryBig },
  { title: "Settings", url: "/settings", icon: LucideSettings },
  { title: "Logout", url: "/logout", icon: LucideLogOut },
];
