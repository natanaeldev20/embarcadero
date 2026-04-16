import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { signOutAction } from "@/modules/auth/server-actions/auth.action";
import Link from "next/link";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/global/components/app-sidebar";
import { IconName } from "@/global/components/nav-main";

interface UserBar {
  name: string;
  username: string;
  avatar: string;
}

interface NavItem {
  title: string;
  url: string;
  icon: IconName;
}

export interface SidebarData {
  user: UserBar;
  navMain: NavItem[];
  navSecondary: NavItem[];
}

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  const data: SidebarData = {
    user: {
      name: session?.user?.name ?? "",
      username: session?.user?.email ?? "",
      avatar: session?.user?.image ?? "",
    },
    navMain: [
      {
        title: "Panel",
        url: "/panel",
        icon: "dashboard",
      },
      {
        title: "Productos",
        url: "/panel/productos",
        icon: "lifecycle",
      },
      {
        title: "Categorias",
        url: "/panel/categorias",
        icon: "analytics",
      },
    ],
    navSecondary: [
      {
        title: "Settings",
        url: "#",
        icon: "settings",
      },
      {
        title: "Get Help",
        url: "#",
        icon: "help",
      },
      {
        title: "Search",
        url: "#",
        icon: "search",
      },
    ],
  };

  return (
    <TooltipProvider>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar data={data} variant="inset" />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
