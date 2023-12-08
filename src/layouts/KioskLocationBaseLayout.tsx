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
        className={cn(
          "mx-auto max-h-screen max-w-screen-xl px-4 py-8 font-sans",
          fontSans.variable,
        )}
      >
        {/* Content */}
        <section className="my-6 border-zinc-600">{children}</section>
      </main>
    </>
  );
};

export default KioskLocationBaseLayout;
