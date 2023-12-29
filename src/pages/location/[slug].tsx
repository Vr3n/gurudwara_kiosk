import { ArrowCircleRight, DotOutline } from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/router";
import KioskButton from "~/components/KioskButton/KioskButton";
import { Separator } from "~/components/ui/separator";
import { Card } from "~/components/ui/card";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import KioskLocationBaseLayout from "~/layouts/KioskLocationBaseLayout";
import { cn } from "~/lib/utils";
import { useEffect, useState } from "react";
import JournalCard from "~/components/JournalCard/JournalCard";
import NewsCard from "~/components/NewsCard/NewsCard";
import HistoryCard from "~/components/HistoryCard/HistoryCard";
import { api } from "~/utils/api";

const LocationDetailPage = () => {
  const router = useRouter();

  const { data: journalList, isLoading: isJournalLoading } =
    api.journal.getAll.useQuery(undefined, {
      refetchOnWindowFocus: false,
    });

  const { data: newsList, isLoading: isNewsLoading } = api.news.getAll.useQuery(
    undefined,
    {
      refetchOnWindowFocus: false,
    },
  );

  const { data: historyList, isLoading: isHistoryLoading } =
    api.history.getAll.useQuery(undefined, {
      refetchOnWindowFocus: false,
    });

  const [activeJournal, setActiveJournal] = useState<number>(0);
  const [activeNews, setActiveNews] = useState<number>(0);
  const [activeHistory, setActiveHistory] = useState<number>(0);

  return (
    <div className="max-h-screen">
      <div className="grow rounded-md border-2 border-zinc-300 p-8 shadow-md">
        <h1 className="text-4xl font-bold">{router.query.slug}</h1>
        <Separator className="my-4 border border-zinc-400" />
        <p className="text-2xl font-semibold">Images</p>
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
        <p className="mt-4 text-2xl font-semibold">Journals</p>
        <ScrollArea className="mt-4">
          {isJournalLoading && <p>Loading...</p>}
          {journalList?.length !== 0 ? (
            <div className=" flex h-96 flex-col gap-4 overflow-x-scroll">
              {journalList?.map((journal, i) => (
                <JournalCard
                  journal={journal}
                  gurudwara={journal.gurudwara}
                  activeJournal={activeJournal === i}
                  onClick={() => setActiveJournal(i)}
                  key={i}
                />
              ))}
            </div>
          ) : (
            <p className="text-2xl font-bold">No journal found!</p>
          )}
          <ScrollBar orientation="vertical" />
        </ScrollArea>
        <p className="mt-4 text-2xl font-semibold">News</p>
        <ScrollArea className="mt-4">
          {isNewsLoading && <p>Loading...</p>}
          {newsList?.length !== 0 ? (
            <div className=" flex h-96 flex-col gap-4 overflow-x-scroll">
              {newsList?.map((news, i) => (
                <NewsCard
                  news={news}
                  gurudwara={news.gurudwara}
                  activeNews={activeNews === i}
                  onClick={() => setActiveNews(i)}
                  key={i}
                />
              ))}
            </div>
          ) : (
            <p className="text-2xl font-bold">No news found!</p>
          )}
          <ScrollBar orientation="vertical" />
        </ScrollArea>
        <p className="mt-4 text-2xl font-semibold">History</p>
        <ScrollArea className="mt-4">
          {isHistoryLoading && <p>Loading...</p>}
          {historyList?.length !== 0 ? (
            <div className=" flex h-96 flex-col gap-4 overflow-x-scroll">
              {historyList?.map((history, i) => (
                <HistoryCard
                  history={history}
                  gurudwara={history.gurudwara}
                  activeHistory={activeHistory === i}
                  onClick={() => setActiveHistory(i)}
                  key={i}
                />
              ))}
            </div>
          ) : (
            <p className="text-2xl font-bold">No history found!</p>
          )}
          <ScrollBar orientation="vertical" />
        </ScrollArea>
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
LocationDetailPage.getLayout = (page: any) => (
  <KioskLocationBaseLayout key="location_detail">
    {page}
  </KioskLocationBaseLayout>
);

export default LocationDetailPage;
