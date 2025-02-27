import { AppSidebar } from "@/components/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { sidebarItems } from "@/lib/constants";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AppSidebar items={sidebarItems} />
      <main className="w-full bg-gray-800">
        <SidebarTrigger className="absolute hover:bg-gray-700 active:bg-gray-800 hover:text-white active:text-white bg-gray-800 text-white" />
        {children}
      </main>
    </>
  );
};
export default Sidebar;
