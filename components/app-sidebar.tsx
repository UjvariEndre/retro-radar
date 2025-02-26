import Logo from "@/components/layout/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarMenuItemsModel } from "@/lib/models/sidebarMenu.model";

interface AppSidebarProps {
  items: SidebarMenuItemsModel;
}

export function AppSidebar({ items }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarContent className="bg-gray-900 text-white">
        <SidebarGroup>
          <SidebarGroupLabel className="mt-4 mb-4 justify-center">
            <Logo className="tracking-wider text-lg" />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-gray-800 active:bg-gray-800 hover:text-white active:text-white"
                  >
                    <a href={item.url} target={item.target}>
                      <item.icon />
                      <span className="text-white">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
