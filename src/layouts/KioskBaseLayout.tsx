import { Avatar, AvatarImage } from "~/components/ui/avatar";
import { Nunito as FontSans } from "next/font/google";
import { type Icon as PhosIcon } from "@phosphor-icons/react";
import { cn } from "~/lib/utils";
import KioskButton, {
  type KioskButtonPropType,
} from "~/components/KioskButton/KioskButton";

type KioskBaseLayoutProps = {
  Icon: PhosIcon;
  heading: string;
  children: React.ReactNode;
};

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

/* Base layout for Kiosk.
 *
 * Renders the Logo, Page Icon and Page Heading.
 *
 * In Footer it takes in the list of KioskButtonProps
 * to render navigation buttons.
 *
 * */
const KioskBaseLayout = ({ Icon, heading, children }: KioskBaseLayoutProps) => {
  return (
    <>
      {/* Container */}
      <main className={cn("font-sans", fontSans.variable)}>
        <div className="flex h-screen flex-col px-4 py-8">
          {/* Heading */}
          <header className="flex justify-between">
            <Avatar className="h-24 w-32">
              <AvatarImage src="/logo.png" alt="sikh-society-logo" />
            </Avatar>

            {/* Title and Icon of the Page */}
            <span className="flex flex-col gap-4">
              <div className="self-end rounded-full p-4 shadow-lg shadow-gray-300 sm:self-center">
                <Icon size={42} color="#0c286a" weight="bold" />
              </div>
              <p className="text-2xl font-medium md:text-4xl">{heading}</p>
            </span>

            {/* Empty block for proper spacing */}
            <span className="hidden sm:block md:mx-8"></span>
          </header>

          {/* Content */}
          <section className="my-6 grow">{children}</section>
        </div>
      </main>
    </>
  );
};

export default KioskBaseLayout;
