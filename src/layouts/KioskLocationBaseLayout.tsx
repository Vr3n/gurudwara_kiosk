import { Nunito as FontSans } from "next/font/google";
import { cn } from "~/lib/utils";

type KioskLocationBaseLayoutProps = {
  children: React.ReactNode;
};

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const KioskLocationBaseLayout = ({
  children,
}: KioskLocationBaseLayoutProps) => {
  return (
    <main className={cn("font-sans", fontSans.variable)}>
      {/* Content */}
      <section className="p-8">{children}</section>
    </main>
  );
};

export default KioskLocationBaseLayout;
