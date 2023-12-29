import { Card } from "~/components/ui/card";
import Image from "next/image";
import { cn } from "~/lib/utils";
import { DotOutline } from "@phosphor-icons/react";
import type { History, Gurudwara } from "@prisma/client";

/* The History Card component.
 *
 * */
type CardProps = React.ComponentProps<typeof Card>;

type HistoryCardProps = {
  activeHistory: boolean;
  className?: string;
  history: History;
  gurudwara: Gurudwara;
} & CardProps;

const HistoryCard = ({
  activeHistory,
  className,
  history,
  gurudwara,
  ...props
}: HistoryCardProps) => {
  return (
    <Card
      className={cn(
        "cursor-pointer  rounded-md",
        className,
        activeHistory && "border-4 border-red-200 shadow-xl",
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
          <h3 className="font-xl font-bold">{history.title}</h3>
          <p>{history.description}</p>
          <section className="flex items-center gap-2">
            <p className="font-semibold">
              {history.createdAt.toLocaleDateString()}
            </p>
            <DotOutline size={24} color="#0c286a" weight="bold" />
            <p className="font-semibold">{gurudwara.name}</p>
          </section>
        </section>
      </div>
    </Card>
  );
};

export default HistoryCard;
