import { Card } from "~/components/ui/card";
import Image from "next/image";
import { cn } from "~/lib/utils";
import { DotOutline } from "@phosphor-icons/react";
import type { Journal, Gurudwara } from "@prisma/client";

/* The Journal Card component.
 *
 * */
type CardProps = React.ComponentProps<typeof Card>;

type JournalCardProps = {
  activeJournal: boolean;
  className?: string;
  journal: Journal;
  gurudwara: Gurudwara;
} & CardProps;

const JournalCard = ({
  activeJournal,
  className,
  journal,
  gurudwara,
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
      <div className="p-4">
        <section className="flex flex-col gap-2 pt-2">
          <h3 className="font-2xl font-bold">{journal.title}</h3>
          <p>{journal.description}</p>
          <section className="flex items-center gap-2">
            <p className="font-semibold">
              {journal.createdAt.toLocaleDateString()}
            </p>
            <DotOutline size={24} color="#0c286a" weight="bold" />
            <p className="font-semibold">{gurudwara.name}</p>
          </section>
        </section>
      </div>
    </Card>
  );
};

export default JournalCard;
