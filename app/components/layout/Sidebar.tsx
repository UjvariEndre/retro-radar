import { AppSidebar } from "@/components/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { sidebarItems } from "@/lib/constants";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AppSidebar items={sidebarItems} />
      <main className="w-full">
        <SidebarTrigger className="absolute" />
        {children}
      </main>
    </>
  );
};
export default Sidebar;
