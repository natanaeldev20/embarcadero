"use client";

import * as React from "react";

// import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/global/components/nav-main";
// import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/global/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarData } from "@/app/(protected)/panel/layout";

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  data: SidebarData;
};

export function AppSidebar({ data, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="/panel">
                <img
                  src={`https://media.tenor.com/u_eBntWlBWUAAAAj/kit-brawl-stars.gif`}
                  alt={`Icon`}
                  className="w-12"
                />
                <span className="text-base font-semibold">
                  KitCode Solutions
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
