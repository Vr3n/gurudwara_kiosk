import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { MapPin } from "@phosphor-icons/react";
import { api } from "~/utils/api";
import type { Location } from "@prisma/client";
import { cn } from "~/lib/utils";
import { fontSans } from "~/layouts/AdminBaseLayout";
import { Separator } from "../ui/separator";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

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
      <PopoverContent className={cn("font-sans", fontSans.variable)}>
        <h3 className={cn("font-sans text-xl font-bold", fontSans.variable)}>
          {!!gurudwara ? gurudwara.name : "Loading"}
        </h3>
        <Separator className="my-2 border border-zinc-200" />
        <Swiper spaceBetween={5} slidesPerView={2}>
          {gurudwara?.images?.map((image) => {
            return (
              <SwiperSlide key={image.id}>
                <figure className="shrink-0">
                  <div className="overflow-hidden rounded-md">
                    <Image
                      className="border-zinc-200"
                      src={image.url}
                      height={200}
                      width={200}
                      alt="Photo"
                    />
                  </div>
                </figure>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </PopoverContent>
    </Popover>
  );
};

export default LocationHoverCard;
