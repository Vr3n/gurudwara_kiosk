import { ArrowCircleRight, DotOutline, MapPin } from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/router";
import KioskButton from "~/components/KioskButton/KioskButton";
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
    <div className="max-h-screen">
      <div className="grow rounded-md border-2 border-zinc-300 p-8 shadow-md">
        <CardHeader className="flex flex-row gap-4">
          <figure>
            <Image
              width="170"
              height="100"
              className="cursor-pointer rounded-md"
              src={gurudwara?.image || "/Golden temple.png"}
              alt={"Gurudwara"}
            />
          </figure>
          <CardTitle className="w-96 text-4xl font-bold">
            {gurudwara?.name}
            <CardDescription className="mt-6 flex gap-4 text-2xl">
              <MapPin size={24} weight="bold" />
              <p className="font-medium">{gurudwara?.locations[0]?.city?.name}</p>
            </CardDescription>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={"image"} >
            <TabsList className="grid w-full grid-cols-6">
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
              <TabsTrigger
                className="relative  inline-flex h-9 items-center justify-center whitespace-nowrap rounded-none border-b-2 border-b-transparent bg-transparent px-4 py-1 pb-3 pt-2 text-sm text-xl font-semibold text-muted-foreground shadow-none ring-offset-background transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b-primary data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-none"
                value="more"
              >
                More
              </TabsTrigger>
            </TabsList>
            <TabsContent value="image">
              <ScrollArea className="mt-4">
                <div className="flex w-max gap-4">
                  {gurudwara?.images.map((image, i) => (
                    <figure key={i} className="shrink-0">
                      <div className="overflow-hidden rounded-md">
                        <Image
                          className="border-zinc-200"
                          src={`${image.url}`}
                          height={200}
                          width={200}
                          alt="Photo"
                        />
                      </div>
                    </figure>
                  ))}
                </div>
                <ScrollBar
                  className="h-6 rounded-md bg-zinc-600 transition-all delay-150"
                  orientation="horizontal"
                />
              </ScrollArea>
            </TabsContent>
            <TabsContent value="journals">
              <ScrollArea className="mt-4">
                <div className=" flex h-96 flex-col gap-4 overflow-x-scroll">
                  {gurudwara?.journals.map((journal, i) => (
                    <JournalCard
                      key={i}
                      journal={journal}
                      gurudwara={gurudwara}
                      activeJournal={activeJournal === i}
                      onClick={() => setActiveJournal(i)}
                    />
                  ))}
                </div>
                <ScrollBar orientation="vertical" />
              </ScrollArea>
            </TabsContent>
            <TabsContent value="videos">
              <ScrollArea className="mt-4">
                <div className=" flex h-96 flex-col gap-4 overflow-x-scroll">
                  {gurudwara?.videos.map((video) => (
                    <ReactPlayer
                      key={video.id}
                      url={video.url}
                      width={"100px"}
                      height={"100px"}
                    />
                  ))}
                </div>
                <ScrollBar orientation="vertical" />
              </ScrollArea>
            </TabsContent>
            <TabsContent value="news">
              <ScrollArea className="mt-4">
                <div className=" flex h-96 flex-col gap-4 overflow-x-scroll">
                  {gurudwara?.news.map((news, i) => (
                    <NewsCard
                      key={i}
                      news={news}
                      gurudwara={gurudwara}
                      activeNews={activeNews === i}
                      onClick={() => setActiveNews(i)}
                    />
                  ))}
                </div>
                <ScrollBar orientation="vertical" />
              </ScrollArea>
            </TabsContent>
            <TabsContent value="history">
              <ScrollArea className="mt-4">
                <div className=" flex h-96 flex-col gap-4 overflow-x-scroll">
                  {gurudwara?.histories.map((history, i) => (
                    <HistoryCard
                      key={i}
                      history={history}
                      gurudwara={gurudwara}
                      activeHistory={activeHistory === i}
                      onClick={() => setActiveHistory(i)}
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
          <span></span>
          <KioskButton
            href="/location"
            type="primary"
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
