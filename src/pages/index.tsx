import KioskBaseLayout from "~/layouts/KioskBaseLayout";
import { Card, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import {
  ArrowCircleLeft,
  ArrowCircleRight,
  Translate,
} from "@phosphor-icons/react";

import { parseAsString, useQueryState } from "next-usequerystate";
import { type KioskButtonPropType } from "~/components/KioskButton/KioskButton";
import { cn } from "~/lib/utils";
import { Languages } from "~/constants/languages";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
    </>
  );
}

/* The Footer Navigation buttons list.
 *
 */
const navButtons: KioskButtonPropType[] = [
  {
    href: "/admin",
    text: "Back",
    type: "secondary",
    Icon: ArrowCircleLeft,
  },
  {
    href: "/location",
    text: "Next",
    type: "primary",
    Icon: ArrowCircleRight,
  },
];

/* to set the layout of the page.
 * use this as an example for other pages too.
 */

// eslint-disable-next-line
Home.getLayout = (page: any) => (
  <KioskBaseLayout
    key="home-page"
    Icon={Translate}
    heading="Choose your preferred Language"
    navButtons={navButtons}
  >
    {page}
  </KioskBaseLayout>
);
