import {
  ArrowCircleLeft,
  ArrowCircleRight,
  HouseLine,
} from "@phosphor-icons/react";
import { useRouter } from "next/router";
import KioskButton, { btnClasses } from "~/components/KioskButton/KioskButton";
import KioskLocationBaseLayout from "~/layouts/KioskLocationBaseLayout";
import { api } from "~/utils/api";
import RenderHtml from "~/components/RenderHtml/RenderHtml";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

const HistoryDetailPage = () => {
  const router = useRouter();

  if (router.query.id === undefined) {
    return <p>Loading...</p>;
  }

  const historyId: string = router.query.id as string;

  const {
    data: history,
    isLoading: isHistoryLoading,
    error: historyError,
  } = api.history.getById.useQuery(
    { id: historyId },
    {
      refetchOnWindowFocus: false,
    },
  );

  if (isHistoryLoading) return <p>Loading...</p>;

  if (historyError) return <p>Error loading the card...</p>;

  return (
    <div className="min-h-screen">
      <div className="flex flex-col justify-between">
        <div className="h-[90vh] overflow-y-scroll rounded-md border-2 border-zinc-300 p-8 shadow-md">
          <RenderHtml html={history?.content ?? "<p>Loading...</p>"} />
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
HistoryDetailPage.getLayout = (page: any) => (
  <KioskLocationBaseLayout key="GurudwaraDetailPage">
    {page}
  </KioskLocationBaseLayout>
);

export default HistoryDetailPage;
