"use client";

import {
  IconCirclePlusFilled,
  IconDashboard,
  IconListDetails,
  IconChartBar,
  IconUsers,
  IconSettings,
  IconHelp,
  IconSearch,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const iconMap = {
  dashboard: IconDashboard,
  lifecycle: IconListDetails,
  analytics: IconChartBar,
  team: IconUsers,
  settings: IconSettings,
  help: IconHelp,
  search: IconSearch,
};

export type IconName = keyof typeof iconMap;

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: IconName;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <Link href={`/panel/mesas`}>
            <SidebarMenuItem className="flex items-center gap-2">
              <SidebarMenuButton
                tooltip="Quick Create"
                className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
              >
                <IconCirclePlusFilled />
                <span>Realizar un pedido</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <Link href={item.url} key={item.title}>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <Icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </Link>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
