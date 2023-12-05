import AdminNavbar from "~/components/AdminNav/AdminNavbar";
import { Nunito as FontSans } from "next/font/google";
import { cn } from "~/lib/utils";
import AdminSidebar from "~/components/AdminSidebar/AdminSidebar";
import { useState } from "react";

type AdminBaseLayoutProps = {
  children: React.ReactNode;
};

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

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
          className={cn("hidden", isSidebarVisible ? "block" : null)}
        />
        <main className="p-4">{children}</main>
      </span>
    </div>
  );
};

export default AdminBaseLayout;
