import { ArrowCircleRight } from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/router";
import KioskButton from "~/components/KioskButton/KioskButton";
import { Separator } from "~/components/ui/separator";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import KioskLocationBaseLayout from "~/layouts/KioskLocationBaseLayout";

const LocationDetailPage = () => {
  const router = useRouter();

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
