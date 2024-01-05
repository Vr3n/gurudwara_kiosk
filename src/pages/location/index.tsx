import {
  ArrowCircleLeft,
  ArrowCircleRight,
  MapPin,
} from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import KioskButton from "~/components/KioskButton/KioskButton";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";
import KioskBaseLayout from "~/layouts/KioskBaseLayout";
import { cn } from "~/lib/utils";
import { env } from "~/env.js";
import Map, { Marker } from "react-map-gl";
import { api } from "~/utils/api";
import type { City } from "@prisma/client";
import LocationHoverCard from "~/components/LocationHoverCard/LocationHoverCard";

/* THe Map component
 *
 */
type LocationMapProps = {
  activeLocation: City;
};

const LocationMap = ({ activeLocation }: LocationMapProps) => {
  const mapboxAccessToken = env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  if (activeLocation === undefined) {
    return <p>Loading the Map...</p>;
  }

  const longitude: number = +activeLocation.longitude;
  const latitude: number = +activeLocation.latitude;

  const [viewState, setViewState] = useState({
    longitude: longitude,
    latitude: latitude,
    zoom: 11,
  });

  const { data: locationList } = api.location.getByCity.useQuery(
    { name: activeLocation.name },
    {
      queryKey: ["location.getByCity", activeLocation],
      refetchOnWindowFocus: false,
      enabled: !!activeLocation.name,
    },
  );

  useEffect(() => {
    const longitude: number = +activeLocation.longitude;
    const latitude: number = +activeLocation.latitude;
    setViewState({
      longitude: longitude,
      latitude: latitude,
      zoom: 11,
    });
  }, [activeLocation]);

  const markers = useMemo(
    () =>
      !!locationList &&
      locationList.map((location) => (
        <Marker
          key={location.id}
          longitude={+location.longitude}
          latitude={+location.latitude}
        >
          <LocationHoverCard location={location} />
        </Marker>
      )),
    [locationList],
  );

  return (
    <>
      <Map
        reuseMaps
        mapboxAccessToken={mapboxAccessToken}
        {...viewState}
        style={{ width: "100%", height: "100%", borderRadius: 10 }}
        onMove={(evt) =>
          setViewState({
            longitude: evt.viewState.longitude,
            latitude: evt.viewState.latitude,
            zoom: evt.viewState.zoom,
          })
        }
        mapStyle="mapbox://styles/mapbox/dark-v10"
      >
        {markers}
      </Map>
    </>
  );
};

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

export default function LocationPage() {
  const router = useRouter();

  const [activeLocation, setActiveLocation] = useState<City>();

  const {
    data: cityList,
    isLoading: isCityLoading,
    error,
  } = api.city.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      if (data !== undefined) {
        setActiveLocation(data[0]);
      }
    },
  });

  if (isCityLoading && cityList === undefined) {
    return <p className="text-xl font-bold">Loading Cities...</p>;
  }

  if (error) {
    return (
      <p className="text-xl font-bold">
        An error has occured ... {error.message}
      </p>
    );
  }

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex h-full gap-4">
        {/* Map Grid */}
        <div className="grow rounded-md border-2 border-zinc-300 p-2">
          {!!activeLocation && <LocationMap activeLocation={activeLocation} />}
        </div>
        {/* Location Buttons */}
        <div className="flex h-full w-1/4 flex-col gap-4">
          {cityList?.map((city) => (
            <LocationNameCard
              key={city.name}
              className={"h-full"}
              activeLocation={activeLocation?.name ?? ""}
              onClick={() => setActiveLocation(city)}
              locationName={city.name}
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
            {activeLocation !== null ? (
              <KioskButton
                href={{
                  pathname: "/location/[slug]",
                  query: { slug: activeLocation?.name },
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
