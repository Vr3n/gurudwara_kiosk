import {
  ArrowCircleLeft,
  ArrowCircleRight,
  MapPin,
} from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { useState } from "react";
import KioskButton from "~/components/KioskButton/KioskButton";
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
  const router = useRouter();
  const [activeLocation, setActiveLocation] = useState<string>("");

  return (
    <>
      <div className="flex gap-4">
        {/* Map Grid */}
        <div className="grow rounded-md border-2 border-zinc-300"></div>
        {/* Location Buttons */}
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
      <footer className="mt-6">
        {activeLocation !== null ? (
          <div className="flex justify-between">
            <KioskButton
              onClick={() => router.back()}
              href=""
              type="secondary"
              text="Back"
              Icon={ArrowCircleLeft}
            />
            {activeLocation !== "" ? (
              <KioskButton
                href={{
                  pathname: "/location/[slug]",
                  query: { slug: activeLocation },
                }}
                type="primary"
                text="Next"
                Icon={ArrowCircleRight}
              />
            ) : (
              <KioskButton
                href={{
                  pathname: "/location/[slug]",
                  query: { slug: activeLocation },
                }}
                disabled={true}
                type="secondary"
                text="Next"
                Icon={ArrowCircleRight}
              />
            )}
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
LocationPage.getLayout = (page: any) => (
  <KioskBaseLayout
    key="location-page"
    Icon={MapPin}
    heading="Select Available Location"
  >
    {page}
  </KioskBaseLayout>
);
