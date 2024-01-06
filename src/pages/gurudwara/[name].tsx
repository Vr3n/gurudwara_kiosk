import {
  ArrowCircleLeft,
  ArrowCircleRight,
  DotOutline,
  HouseLine,
  MapPin,
} from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/router";
import KioskButton, { btnClasses } from "~/components/KioskButton/KioskButton";
import { Separator } from "~/components/ui/separator";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import KioskLocationBaseLayout from "~/layouts/KioskLocationBaseLayout";
import { useState } from "react";
import JournalCard from "~/components/JournalCard/JournalCard";
import { api } from "~/utils/api";
import ReactPlayer from "react-player";
import HistoryCard from "~/components/HistoryCard/HistoryCard";
import NewsCard from "~/components/NewsCard/NewsCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";
import RenderHtml from "~/components/RenderHtml/RenderHtml";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { fontSans } from "~/layouts/AdminBaseLayout";
import LightGallery from "lightgallery/react";

import lgThumbnail from "lightgallery/plugins/thumbnail";

/* The Journal Card component.
 *
 * */
type CardProps = React.ComponentProps<typeof Card>;

const GurudwaraDetailPage = () => {
  const router = useRouter();

  if (router.query.name === undefined) {
    return <p>Loading...</p>;
  }

  const gurudwaraName: string = router.query.name as string;

  const {
    data: gurudwara,
    isLoading: isGurudwaraLoading,
    error: gurudwaraError,
  } = api.gurudwara.getByName.useQuery(
    { name: gurudwaraName },
    {
      refetchOnWindowFocus: false,
    },
  );

  const [activeJournal, setActiveJournal] = useState<number>(0);
  const [activeNews, setActiveNews] = useState<number>(0);
  const [activeHistory, setActiveHistory] = useState<number>(0);

  if (isGurudwaraLoading) return <p>Loading...</p>;

  if (gurudwaraError) return <p>Error loading the card...</p>;

  return (
    <div className="flex h-screen flex-col">
      <div className="h-[90%] rounded-md border-2 border-zinc-300 p-8 shadow-md">
        <CardHeader className="flex flex-row gap-4">
          <figure>
            <Image
              width="170"
              height="100"
              className="cursor-pointer rounded-md"
              src={gurudwara?.image ?? "/Golden temple.png"}
              alt={"Gurudwara"}
            />
          </figure>
          <CardTitle className="w-96 text-4xl font-bold">
            {gurudwara?.name}
            <CardDescription className="mt-6 flex gap-4 text-2xl">
              <MapPin size={24} weight="bold" />
              <p className="font-medium">
                {gurudwara?.locations[0]?.street}{" "}
                {gurudwara?.locations[0]?.city?.name}
              </p>
            </CardDescription>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={"image"}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger
                className="relative inline-flex h-9 items-center justify-center whitespace-nowrap rounded-none border-b-2 border-b-transparent bg-transparent px-4 py-1 pb-3 pt-2 text-sm text-xl font-semibold text-muted-foreground shadow-none ring-offset-background transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b-primary data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-none"
                value="image"
              >
                Image Gallery{" "}
              </TabsTrigger>
              <TabsTrigger
                className=" relative inline-flex h-9 items-center justify-center whitespace-nowrap rounded-none border-b-2 border-b-transparent bg-transparent px-4 py-1 pb-3 pt-2 text-sm text-xl font-semibold text-muted-foreground shadow-none ring-offset-background transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b-primary data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-none"
                value="journals"
              >
                Journals
              </TabsTrigger>
              <TabsTrigger
                className="relative  inline-flex h-9 items-center justify-center whitespace-nowrap rounded-none border-b-2 border-b-transparent bg-transparent px-4 py-1 pb-3 pt-2 text-sm text-xl font-semibold text-muted-foreground shadow-none ring-offset-background transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b-primary data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-none"
                value="videos"
              >
                Videos
              </TabsTrigger>
              <TabsTrigger
                className="relative  inline-flex h-9 items-center justify-center whitespace-nowrap rounded-none border-b-2 border-b-transparent bg-transparent px-4 py-1 pb-3 pt-2 text-sm text-xl font-semibold text-muted-foreground shadow-none ring-offset-background transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b-primary data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-none"
                value="news"
              >
                News
              </TabsTrigger>
              <TabsTrigger
                className="relative  inline-flex h-9 items-center justify-center whitespace-nowrap rounded-none border-b-2 border-b-transparent bg-transparent px-4 py-1 pb-3 pt-2 text-sm text-xl font-semibold text-muted-foreground shadow-none ring-offset-background transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b-primary data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-none"
                value="history"
              >
                History
              </TabsTrigger>
            </TabsList>
            <TabsContent value="image" className="h-[60%]">
              <LightGallery
                speed={150}
                elementClassNames="grid grid-cols-3 gap-6 justify-between mt-4 overflow-y-scroll h-[60rem]"
                plugins={[lgThumbnail]}
              >
                {gurudwara?.images.map((image) => (
                  <a href={image.url}>
                    <Image
                      className="rounded-lg border-zinc-200"
                      src={image.url}
                      height={600}
                      width={600}
                      alt="Photo"
                    />
                  </a>
                ))}
              </LightGallery>
            </TabsContent>
            <TabsContent value="journals" className="h-full">
              <div className=" flex h-[60rem] flex-col content-stretch justify-between gap-4 overflow-y-scroll">
                {gurudwara?.journals.map((journal, i) => (
                  <JournalCard
                    journal={journal}
                    className="h-full"
                    gurudwara={gurudwara}
                    key={journal.id}
                    activeJournal={activeJournal === i}
                    onClick={async () => {
                      setActiveJournal(i)
                      await router.push(`/gurudwara/journal/${journal.id}`);
                    }}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="videos" className="h-full">
              <Swiper spaceBetween={5} slidesPerView={4}>
                {gurudwara?.videos.map((video) => (
                  <SwiperSlide key={video.id}>
                    <ReactPlayer
                      key={video.id}
                      url={video.url}
                      width={"200px"}
                      height={"200px"}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </TabsContent>
            <TabsContent value="news" className="h-full">
              <ScrollArea className="mt-4">
                <div className=" flex h-[60rem] flex-col content-stretch gap-4 overflow-y-scroll">
                  {gurudwara?.news.map((news, i) => (
                    <NewsCard
                      news={news}
                      key={news.id}
                      gurudwara={gurudwara}
                      className="h-full"
                      activeNews={activeNews === i}
                      onClick={async () => {
                        setActiveNews(i)

                        await router.push(`/gurudwara/news/${news.id}`);
                      }}
                    />
                  ))}
                </div>
                <ScrollBar orientation="vertical" />
              </ScrollArea>
            </TabsContent>
            <TabsContent value="history" className="h-full">
              <ScrollArea className="mt-4 h-full">
                <div className=" flex h-[60rem] flex-col content-stretch gap-4 overflow-y-scroll">
                  {gurudwara?.histories.map((history, i) => (
                    <HistoryCard
                      history={history}
                      gurudwara={gurudwara}
                      key={history.id}
                      className="h-full"
                      activeHistory={activeHistory === i}
                      onClick={async () => {
                        setActiveHistory(i)
                        await router.push(`/gurudwara/history/${history.id}`);
                      }}
                    />
                  ))}
                </div>
                <ScrollBar orientation="vertical" />
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
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
            disabled={true}
            text="Next"
            Icon={ArrowCircleRight}
          />
        </div>
      </footer>
    </div>
  );
};

// eslint-disable-next-line
GurudwaraDetailPage.getLayout = (page: any) => (
  <KioskLocationBaseLayout key="gurudwara_detail">
    {page}
  </KioskLocationBaseLayout>
);

export default GurudwaraDetailPage;
