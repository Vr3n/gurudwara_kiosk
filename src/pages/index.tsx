import KioskBaseLayout from "~/layouts/KioskBaseLayout";
import { Card, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { ArrowCircleRight, Translate } from "@phosphor-icons/react";

import { cn } from "~/lib/utils";
import { Languages } from "~/constants/languages";
import { useState } from "react";
import KioskButton from "~/components/KioskButton/KioskButton";

/* The Language Selector Card component.
 *
 * */
type CardProps = React.ComponentProps<typeof Card>;

type LanguageSelectorCardProps = {
  className?: string;
  welcomeText: string;
  text: string;
  activeLanguage: string;
} & CardProps;

const LanguageSelectorCard = ({
  className,
  welcomeText,
  activeLanguage,
  text,
  ...props
}: LanguageSelectorCardProps) => {
  const ACTIVE_CARD_STYLE = "border-2 border-red-300 shadow-2xl";

  return (
    <Card
      className={cn(
        "cursor-pointer p-2 shadow-md shadow-zinc-300 transition-shadow delay-200 hover:shadow-xl",
        activeLanguage === text && ACTIVE_CARD_STYLE,
        className,
      )}
      {...props}
    >
      <CardHeader>
        <CardTitle className="text-2xl">{welcomeText}</CardTitle>
      </CardHeader>
      <CardFooter>
        <p className="text-6xl">{text}</p>
      </CardFooter>
    </Card>
  );
};

/* The language selector page.
 */
export default function Home() {
  const [activeLanguage, setActiveLanguage] = useState<string>("English");

  return (
    <>
      <div className="grid grid-cols-1  gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Languages.map((item) => (
          <LanguageSelectorCard
            className="h-full"
            key={item.language}
            activeLanguage={activeLanguage}
            onClick={() => setActiveLanguage(item.language)}
            welcomeText={item.welcomeText}
            text={item.language}
          />
        ))}
      </div>
      <footer className="mt-6">
        {activeLanguage !== null ? (
          <div className="flex justify-between">
            <span></span>
            <KioskButton
              href="/location"
              type="primary"
              text="Next"
              Icon={ArrowCircleRight}
            />
          </div>
        ) : null}
      </footer>
    </>
  );
}

/* to set the layout of the page.
 * use this as an example for other pages too.
 */

// eslint-disable-next-line
Home.getLayout = (page: any) => (
  <KioskBaseLayout
    key="home-page"
    Icon={Translate}
    heading="Choose your preferred Language"
  >
    {page}
  </KioskBaseLayout>
);
