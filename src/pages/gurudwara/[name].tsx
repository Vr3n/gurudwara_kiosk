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
import { cn } from "~/lib/utils";
import { useEffect, useState } from "react";
import JournalCard from "~/components/JournalCard/JournalCard";

/* The Journal Card component.
 *
 * */
type CardProps = React.ComponentProps<typeof Card>;

const GurudwaraDetailPage = () => {
  const router = useRouter();
  const [activeJournal, setActiveJournal] = useState<number>(0);

  return (
    <div className="max-h-screen">
      <div className="grow rounded-md border-2 border-zinc-300 p-8 shadow-md">
        <CardHeader className="flex flex-row gap-4">
          <figure>
            <Image
              width="170"
              height="100"
              className="cursor-pointer rounded-md"
              src="/Golden temple.png"
              alt={"Gurudwara"}
            />
          </figure>
          <CardTitle className="w-96 text-4xl font-bold">
            {router.query.name}
            <CardDescription className="mt-6 flex gap-4 text-2xl">
              <MapPin size={24} weight="bold" />
              <p className="font-medium">9350 17 Ave SE</p>
            </CardDescription>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs>
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
                  {[100, 232, 311, 34, 445, 116, 27, 88].map((i) => (
                    <figure key={i} className="shrink-0">
                      <div className="overflow-hidden rounded-md">
                        <Image
                          className="border-zinc-200"
                          src={`https://picsum.photos/id/${i}/200`}
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
                  {[100, 232, 311, 34, 445, 116, 27, 88].map((i) => (
                    <JournalCard
                      activeJournal={activeJournal === i}
                      onClick={() => setActiveJournal(i)}
                      key={i}
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
