import AdminNavbar from "~/components/AdminNav/AdminNavbar";
import { Nunito as FontSans } from "next/font/google";
import { cn } from "~/lib/utils";
import AdminSidebar, { AdminSidebarProps } from "~/components/AdminSidebar/AdminSidebar";
import { useState } from "react";
import {
  HouseLine,
  Synagogue,
  MapPin,
  BookBookmark,
  Barcode,
} from "@phosphor-icons/react"

type AdminBaseLayoutProps = {
  children: React.ReactNode;
};

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});


const sidebarItems: AdminSidebarProps["items"] = [
  {
    href: "/admin",
    title: "Home",
    Icon: HouseLine
  },
  {
    href: "/admin/locations",
    title: "Locations",
    Icon: MapPin
  },
  {
    href: "/admin/gurudwaras",
    title: "Gurudwara",
    Icon: Synagogue
  },
  {
    href: "/admin/journals",
    title: "Journals",
    Icon: BookBookmark
  },
  {
    href: "/admin/news",
    title: "News",
    Icon: BookBookmark
  },
  {
    href: "/admin/histories",
    title: "Histories",
    Icon: BookBookmark
  },
  {
    href: "/admin/fund-qrcodes",
    title: "Fund QR Codes",
    Icon: Barcode
  },
]

const AdminBaseLayout = ({ children }: AdminBaseLayoutProps) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);

  const toggleSidebarVisibility = () => {
    setIsSidebarVisible((state) => !state);
  };

  return (
    <div className={cn("font-sans", fontSans.variable)}>
      <AdminNavbar sidebarToggleFunc={toggleSidebarVisibility} />
      <span className="flex gap-4">
        <AdminSidebar
          items={sidebarItems}
          className={cn("hidden", isSidebarVisible ? "block" : null)}
        />
        <main className="p-4">{children}</main>
      </span>
    </div>
  );
};

export default AdminBaseLayout;
