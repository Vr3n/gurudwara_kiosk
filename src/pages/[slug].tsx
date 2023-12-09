import { ArrowCircleRight } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import KioskButton from "~/components/KioskButton/KioskButton";
import { Separator } from "~/components/ui/separator";
import KioskLocationBaseLayout from "~/layouts/KioskLocationBaseLayout";

const LocationDetailPage = () => {
  const router = useRouter();

  return (
    <div className="max-h-screen">
      <div className="grow rounded-md border-2 border-zinc-300 p-8 shadow-md">
        <h1 className="text-4xl font-bold">{router.query.slug}</h1>
        <Separator className="my-4 border border-zinc-400" />
        <p className="text-2xl font-semibold">Images</p>
        <Separator className="my-4 border border-zinc-200" />
        <p className="text-2xl font-semibold">Journals</p>
        <Separator className="my-4 border border-zinc-200" />
        <p className="text-2xl font-semibold">News</p>
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
