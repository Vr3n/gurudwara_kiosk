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

/* The Journal Card component.
 *
 * */
type CardProps = React.ComponentProps<typeof Card>;

type JournalCardProps = {
  activeJournal: boolean;
  className?: string;
} & CardProps;

const JournalCard = ({
  activeJournal,
  className,
  ...props
}: JournalCardProps) => {
  return (
    <Card
      className={cn(
        "cursor-pointer  rounded-md",
        className,
        activeJournal && "border-4 border-red-200 shadow-xl",
      )}
      {...props}
    >
      <div className="flex gap-4">
        <figure>
          <Image
            className="rounded-md"
            src={`https://picsum.photos/seed/picsum/200`}
            height={100}
            width={100}
            alt="Photo"
          />
        </figure>
        <section className="flex flex-col gap-2 pt-2">
          <h3 className="font-xl font-bold">Guide to Gurudwara</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat
            nam culpa quidem animi! Nulla soluta officia saepe veniam,
            reprehenderit hic rerum a cumque, cupiditate maiores quod, neque
            odio? Iure, consectetur.
          </p>
          <section className="flex items-center gap-2">
            <p className="font-semibold">Sep 16, 2023</p>
            <DotOutline size={24} color="#0c286a" weight="bold" />
            <p className="font-semibold">
              BRAHM BUNGA SPIRITUAL FELLOWSHIP CALGARY
            </p>
          </section>
        </section>
      </div>
    </Card>
  );
};

const LocationDetailPage = () => {
  const router = useRouter();

  const [activeJournal, setActiveJournal] = useState<number>(0);

  useEffect(() => {
    console.log(activeJournal);
  }, [activeJournal]);

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
        <p className="mt-4 text-2xl font-semibold">News</p>
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
