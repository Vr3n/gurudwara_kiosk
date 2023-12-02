import AdminNavbar from "~/components/AdminNav/AdminNavbar";
import { Nunito as FontSans } from "next/font/google";
import { cn } from "~/lib/utils";

type AdminBaseLayoutProps = {
  children: React.ReactNode;
};

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const AdminBaseLayout = ({ children }: AdminBaseLayoutProps) => {
  return (
    <div className={cn("font-sans", fontSans.variable)}>
      <AdminNavbar />
      <span className="flex gap-4">
        <aside>Sidebar</aside>
        <main>{children}</main>
      </span>
    </div>
  );
};

export default AdminBaseLayout;
