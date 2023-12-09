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
    <>
      {/* Container */}
      <main
        className={cn("mx-auto max-w-screen-xl font-sans", fontSans.variable)}
      >
        <div className="flex min-h-screen flex-col p-8">
          {/* Content */}
          <section className="min-h-screen grow">{children}</section>
        </div>
      </main>
    </>
  );
};

export default KioskLocationBaseLayout;
