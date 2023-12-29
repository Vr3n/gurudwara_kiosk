import { Card } from "~/components/ui/card";
import Image from "next/image";
import { cn } from "~/lib/utils";
import { DotOutline } from "@phosphor-icons/react";
import type { News, Gurudwara } from "@prisma/client";

/* The News Card component.
 *
 * */
type CardProps = React.ComponentProps<typeof Card>;

type NewsCardProps = {
  activeNews: boolean;
  className?: string;
  news: News;
  gurudwara: Gurudwara;
} & CardProps;

const NewsCard = ({
  activeNews,
  className,
  news,
  gurudwara,
  ...props
}: NewsCardProps) => {
  return (
    <Card
      className={cn(
        "cursor-pointer  rounded-md",
        className,
        activeNews && "border-4 border-red-200 shadow-xl",
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
          <h3 className="font-xl font-bold">{news.title}</h3>
          <p>{news.description}</p>
          <section className="flex items-center gap-2">
            <p className="font-semibold">
              {news.createdAt.toLocaleDateString()}
            </p>
            <DotOutline size={24} color="#0c286a" weight="bold" />
            <p className="font-semibold">{gurudwara.name}</p>
          </section>
        </section>
      </div>
    </Card>
  );
};

export default NewsCard;
