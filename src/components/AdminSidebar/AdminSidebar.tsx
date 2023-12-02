import Link from "next/link";
import { Button } from "../ui/button";
import {
  HouseLine,
  Synagogue,
  MapPin,
  BookBookmark,
  Barcode,
  type Icon as PhosIcon,
} from "@phosphor-icons/react";
import { cn } from "~/lib/utils";

export type LinkButtonsProps = {
  href: string;
  text: string;
  Icon: PhosIcon;
  active?: boolean;
};

const LinkButtons = ({
  href,
  text,
  Icon,
  active = false,
}: LinkButtonsProps) => {
  return (
    <Link href={href}>
      <Button
        className="w-full items-center justify-start gap-2 py-8"
        variant={active ? "default" : "ghost"}
      >
        <Icon />
        {text}
      </Button>
    </Link>
  );
};

type AdminSidebarProps = {
  className?: string;
};

const AdminSidebar = ({ className }: AdminSidebarProps) => {
  return (
    <aside
      className={cn("h-screen w-48 border-r-zinc-400 p-4 shadow-lg", className)}
    >
      <nav>
        <ul className="flex flex-col gap-6 text-2xl">
          <li>
            <LinkButtons Icon={HouseLine} active href="/admin" text="Home" />
          </li>
          <li>
            <LinkButtons Icon={Synagogue} href="/admin" text="Gurudwara" />
          </li>
          <li>
            <LinkButtons Icon={MapPin} href="/admin" text="Location" />
          </li>
          <li>
            <LinkButtons Icon={BookBookmark} href="/admin" text="Journals" />
          </li>
          <li>
            <LinkButtons Icon={Barcode} href="/admin" text="Fund QR codes" />
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
