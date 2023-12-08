import {
  ArrowCircleLeft,
  ArrowCircleRight,
  MapPin,
} from "@phosphor-icons/react";
import { useState } from "react";
import { type KioskButtonPropType } from "~/components/KioskButton/KioskButton";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";
import KioskBaseLayout from "~/layouts/KioskBaseLayout";
import { cn } from "~/lib/utils";

/* The Location Selector Card component.
 *
 * */
type CardProps = React.ComponentProps<typeof Card>;

type LocationNameCardProps = {
  activeLocation: string;
  locationName: string;
  className?: string;
} & CardProps;

const LocationNameCard = ({
  activeLocation,
  locationName,
  className,
  ...props
}: LocationNameCardProps) => {
  const ACTIVE_CARD_STYLE = "border-2 border-red-300 shadow-2xl";

  return (
    <Card
      className={cn(
        "h-40 cursor-pointer p-2 shadow-md shadow-zinc-300 transition-shadow delay-200 hover:shadow-xl",
        activeLocation === locationName && ACTIVE_CARD_STYLE,
        className,
      )}
      {...props}
    >
      <CardHeader>
        <CardTitle className="text-2xl">{locationName}</CardTitle>
      </CardHeader>
    </Card>
  );
};

const locationNames = [
  { name: "Calgary" },
  { name: "Edmonton" },
  { name: "Lakeview" },
  { name: "Millwoods" },
];


export default function LocationPage() {
  const [activeLocation, setActiveLocation] = useState<string>("");

  return (
    <div className="flex gap-4">
      <div className="grow rounded-md border-2 border-zinc-300"></div>
      <div className="flex w-1/4 flex-col gap-4">
        {locationNames.map((location) => (
          <LocationNameCard
            key={location.name}
            activeLocation={activeLocation}
            onClick={() => setActiveLocation(location.name)}
            locationName={location.name}
          />
        ))}
      </div>
    </div>
  );
}

/* to set the layout of the page.
 * use this as an example for other pages too.
 */

// eslint-disable-next-line
LocationPage.getLayout = (page: any) => (
  <KioskBaseLayout
    key="location-page"
    Icon={MapPin}
    heading="Select Available Location"
  >
    {page}
  </KioskBaseLayout>
);
