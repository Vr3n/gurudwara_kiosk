import KioskBaseLayout from "~/layouts/KioskBaseLayout";
import { Card, CardHeader } from "~/components/ui/card";
import {
  ArrowCircleLeft,
  ArrowCircleRight,
  Translate,
} from "@phosphor-icons/react";
import { type KioskButtonPropType } from "~/components/KioskButton/KioskButton";

/* The language selector page.
 */
export default function Home() {
  return (
    <>
      <Card className="grid">
        <CardHeader>
          Use Grid layout here! (Refer Tailwind Css Grids)
        </CardHeader>
      </Card>
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
    href: "/next",
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
    Icon={Translate}
    heading="Choose your preferred Language"
    navButtons={navButtons}
  >
    {page}
  </KioskBaseLayout>
);
