import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { MapPin } from "@phosphor-icons/react";
import { api } from "~/utils/api";
import type { Location } from "@prisma/client";

type LocationHoverCardProps = {
  location: Location;
};

const LocationHoverCard = ({ location }: LocationHoverCardProps) => {
  const {
    data: gurudwara,
    isLoading,
    error: gurudwaraError,
  } = api.gurudwara.getById.useQuery(
    { id: location.gurudwaraId },
    {
      queryKey: ["gurudwara.getById", { id: location.gurudwaraId }],
      refetchOnWindowFocus: false,
      enabled: !!location.gurudwaraId,
    },
  );

  if (gurudwaraError) return <p>Error loading the card...</p>;

  if (isLoading) return <p>Loading...</p>;

  return (
    <Popover>
      <PopoverTrigger>
        <MapPin size={24} color="#d11d1d" weight="fill" />
      </PopoverTrigger>
      <PopoverContent>
        <h3 className="text-xl font-bold">
          {!!gurudwara ? gurudwara.name : "Loading"}
        </h3>
      </PopoverContent>
    </Popover>
  );
};

export default LocationHoverCard;
