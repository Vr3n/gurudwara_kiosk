import { Card } from "~/components/ui/card";
import Image from "next/image";
import { cn } from "~/lib/utils";
import { DotOutline } from "@phosphor-icons/react";

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

export default JournalCard;
