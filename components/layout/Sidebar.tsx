import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { sidebarItems } from "@/lib/constants";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AppSidebar items={sidebarItems} />
      <main className="w-full bg-gray-800">
        <SidebarTrigger className="absolute bg-gray-800 text-white hover:bg-gray-700 hover:text-white active:bg-gray-800 active:text-white" />
        {children}
      </main>
    </>
  );
};
export default Sidebar;
