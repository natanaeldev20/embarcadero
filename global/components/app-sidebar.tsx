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
        <div className="space-y-2">
          <figure className="w-full">
            <img
              className="w-25 mx-auto"
              src="https://static.wikia.nocookie.net/brawlstars/images/0/08/Kit_Pin-Neutral.png/revision/latest?cb=20231214122300"
              alt="Logo de la empresa"
            />
          </figure>
          <h2 className="text-2xl font-bold text-center">KitCode Solutions</h2>
        </div>
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
