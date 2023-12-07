import { Nunito as FontSans } from "next/font/google";
import KioskButton, {
  type KioskButtonPropType,
} from "~/components/KioskButton/KioskButton";
import { cn } from "~/lib/utils";

type KioskLocationBaseLayoutProps = {
  children: React.ReactNode
  navButtons: KioskButtonPropType[];
}


export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});


const KioskLocationBaseLayout = ({ navButtons, children }: KioskLocationBaseLayoutProps) => {
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

        {/* Navigation Footer */}
        <footer className="flex justify-between">
          {navButtons.map((btn) => (
            <KioskButton
              key={btn.href}
              href={btn.href}
              text={btn.text}
              type={btn.type}
              Icon={btn.Icon}
              className={btn.className}
            />
          ))}
        </footer>
      </main>
    </>
  )
}

export default KioskLocationBaseLayoutProps;
