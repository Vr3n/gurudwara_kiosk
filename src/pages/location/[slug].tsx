import {
  ArrowCircleLeft,
  ArrowCircleRight,
  HouseLine,
} from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/router";
import KioskButton, { btnClasses } from "~/components/KioskButton/KioskButton";
import { Separator } from "~/components/ui/separator";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import KioskLocationBaseLayout from "~/layouts/KioskLocationBaseLayout";
import { useState } from "react";
import JournalCard from "~/components/JournalCard/JournalCard";
import NewsCard from "~/components/NewsCard/NewsCard";
import HistoryCard from "~/components/HistoryCard/HistoryCard";
import { api } from "~/utils/api";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { Swiper, SwiperSlide } from "swiper/react";

const LocationDetailPage = () => {
  const router = useRouter();

  const [activeJournal, setActiveJournal] = useState<string>("");
  const [activeNews, setActiveNews] = useState<string>("");
  const [activeHistory, setActiveHistory] = useState<string>("");

  const cityName: string = router.query.slug as string;

  const {
    data: cityData,
    isLoading: isCityDataLoading,
    error: cityDataError,
  } = api.gurudwara.getByCityName.useQuery(
    { name: cityName },
    {
      refetchOnWindowFocus: false,
    },
  );

  if (isCityDataLoading) return <p>Loading...</p>;

  if (cityDataError) return <p>Error loading the City...</p>;

  return (
    <div className="min-h-screen">
      <div className="flex flex-col justify-between">
        <div className="h-[90vh] overflow-y-scroll rounded-md border-2 border-zinc-300 p-8 shadow-md">
          <h1 className="text-4xl font-bold">{cityName}</h1>
          <Separator className="my-4 border border-zinc-400" />
          <p className="text-2xl font-semibold">Images</p>
          <Swiper spaceBetween={15} slidesPerView={4}>
            <div className="flex w-max gap-4">
              {cityData.map((gurudwara) => {
                return gurudwara.images.map((image) => {
                  return (
                    <SwiperSlide
                      onClick={async () => {
                        await router.push(`/gurudwara/${gurudwara.name}`);
                      }}
                      key={image.id}
                    >
                      <figure className="shrink-0">
                        <div className="overflow-hidden rounded-md">
                          <Image
                            className="border-zinc-200"
                            src={image.url}
                            height={400}
                            width={400}
                            alt="Photo"
                          />
                        </div>
                      </figure>
                    </SwiperSlide>
                  );
                });
              })}
            </div>
          </Swiper>
          <p className="mt-4 text-2xl font-semibold">Journals</p>
          <Separator className="my-2 border border-zinc-200" />
          <div className="max-h-96 overflow-y-scroll">
            {cityData.map((gurudwara) => {
              return gurudwara.journals.map((journal) => {
                return (
                  <JournalCard
                    journal={journal}
                    gurudwara={gurudwara}
                    className={"mt-5"}
                    activeJournal={activeJournal === journal.id}
                    onClick={async () => {
                      setActiveJournal(journal.id);
                      await router.push(`/gurudwara/${gurudwara.name}`);
                    }}
                    key={journal.id}
                  />
                );
              });
            })}
          </div>
          <p className="mt-4 text-2xl font-semibold">News</p>
          <Separator className="my-2 border border-zinc-200" />
          <div className="max-h-96 overflow-y-scroll">
            {cityData.map((gurudwara) => {
              return gurudwara.news.map((news) => {
                return (
                  <NewsCard
                    news={news}
                    gurudwara={gurudwara}
                    className={"mt-5"}
                    activeNews={activeNews === news.id}
                    onClick={async () => {
                      setActiveNews(news.id);
                      await router.push(`/gurudwara/${gurudwara.name}`);
                    }}
                    key={news.id}
                  />
                );
              });
            })}
          </div>
          <p className="mt-4 text-2xl font-semibold">History</p>
          <Separator className="my-2 border border-zinc-200" />
          <div className="max-h-80 overflow-y-scroll">
            {cityData.map((gurudwara) => {
              return gurudwara.histories.map((history) => {
                return (
                  <HistoryCard
                    history={history}
                    gurudwara={gurudwara}
                    className={"mt-5"}
                    activeHistory={activeHistory === history.id}
                    onClick={async () => {
                      setActiveHistory(history.id);
                      await router.push(`/gurudwara/${gurudwara.name}`);
                    }}
                    key={history.id}
                  />
                );
              });
            })}
          </div>
        </div>
        <footer className="mt-6">
          <div className="flex justify-between">
            <Button
              className={cn(btnClasses.primary)}
              onClick={() => router.back()}
            >
              <ArrowCircleLeft
                size={24}
                color={"#fff"}
                weight="bold"
                className="mr-4"
              />{" "}
              Back
            </Button>
            <KioskButton href="/" type="primary" text="Home" Icon={HouseLine} />
            <KioskButton
              href="/location"
              type="primary"
              text="Next"
              Icon={ArrowCircleRight}
            />
          </div>
        </footer>
      </div>
    </div>
  );
};

// eslint-disable-next-line
LocationDetailPage.getLayout = (page: any) => (
  <KioskLocationBaseLayout key="location_detail">
    {page}
  </KioskLocationBaseLayout>
);

export default LocationDetailPage;
