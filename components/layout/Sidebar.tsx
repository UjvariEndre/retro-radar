import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarMenuItemsModel } from "@/lib/models/sidebarMenu.model";
import {
  LucideChartNoAxesColumn,
  LucideHome,
  LucideLibraryBig,
  LucideLogOut,
  LucideSearch,
  LucideSettings,
  LucideTrendingUp,
} from "lucide-react";

export const SIDEBAR_ITEMS: SidebarMenuItemsModel = [
  { title: "Home", url: "/", icon: LucideHome, target: "_blank" },
  { title: "Dashboard", url: "/", icon: LucideChartNoAxesColumn },
  { title: "Search", url: "/search", icon: LucideSearch },
  { title: "Price Tracker", url: "/price-tracker", icon: LucideTrendingUp },
  { title: "My Collection", url: "/collection", icon: LucideLibraryBig },
  { title: "Settings", url: "/settings", icon: LucideSettings },
  { title: "Logout", url: "/logout", icon: LucideLogOut },
];

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AppSidebar items={SIDEBAR_ITEMS} />
      <main className="w-full bg-gray-800">
        <SidebarTrigger className="absolute bg-gray-800 text-white hover:bg-gray-700 hover:text-white active:bg-gray-800 active:text-white" />
        {children}
      </main>
    </>
  );
};
export default Sidebar;
