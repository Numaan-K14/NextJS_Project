"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  useSidebar,
} from "../ui/sidebar";
import { LogoutMenu } from "./LogoutMenu";
import { Separator } from "../ui/separator";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface SideMenuProps {
  sidemenuIcon1: string;
  sidemenuName1: string;
}

export function SideMenu({ sidemenuIcon1, sidemenuName1 }: SideMenuProps) {
  const pathname = usePathname();
  const isOverview = pathname === "/Landing";

  const user = JSON.parse(localStorage.getItem("user") || "null");

  function AppSidebar() {
    const { open } = useSidebar();

    return (
      <Sidebar collapsible="icon">
        <SidebarHeader
          className={`flex items-center ${open ? "pt-6 pb-11 px-3" : "py-6"}`}
        >
          <Image
            src="/icons/Heading.png"
            alt="Sidebar logo"
            width={240}
            height={80}
            className={`transition-all duration-300 object-contain ${
              open ? "h-20 w-60" : "h-3 w-full"
            }`}
          />
        </SidebarHeader>

        {/* --User Profile -- */}
        <div
          className={open ? "flex justify-between items-center pb-5" : "pb-8"}
        >
          <div className={open ? "flex items-center gap-4 " : ""}>
            <Image
              width={52}
              height={52}
              src="/images/Avatar.jpg"
              alt="User Avatar"
              className={`rounded-full transition-all duration-300 ${
                open ? "h-13 w-13" : "h-10 w-10 "
              }`}
            />
            {open && (
              <div className="flex flex-col">
                <span className="text-[#FDFDFD] font-semibold text-base leading-6">
                  {user?.name}
                </span>
                <p className="text-[#F5F5F5] font-normal text-base leading-6 capitalize">
                  {user?.role}
                </p>
              </div>
            )}
          </div>
          {open ? <LogoutMenu /> : null}
        </div>
        <SidebarContent>
          <SidebarGroup>
            <Separator />
            <SidebarGroupLabel
              className={`text-white font-medium text-base leading-5 transition-all duration-150 ${open ? "py-3" : "py-3"}`}
            >
              Main Menu
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className={`text-white  ${
                      isOverview
                        ? "bg-[#ffffff45] hover:bg-[#ffffff55]"
                        : "hover:bg-[#ffffff26]"
                    }`}
                  >
                    <Link href="/Landing">
                      <Image
                        height={24}
                        width={24}
                        src="/Overview.png"
                        alt={sidemenuName1}
                      />
                      {open && (
                        <span className="font-medium text-base leading-6 text-white">
                          {sidemenuName1}
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Sidebar Rail — enables hover expand effect */}
        <SidebarRail />
      </Sidebar>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
    </SidebarProvider>
  );
}
