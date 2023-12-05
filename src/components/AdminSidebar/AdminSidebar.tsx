import Link from "next/link";
import { Button } from "../ui/button";
import { DotOutline, type Icon as PhosIcon } from "@phosphor-icons/react";
import { cn } from "~/lib/utils";
import { type HTMLAttributes } from "react";
import { usePathname } from "next/navigation";

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

export type AdminSidebarProps = {
  items: {
    href: string;
    title: string;
    Icon?: PhosIcon;
  }[];
  className?: string;
} & HTMLAttributes<HTMLElement>;

const AdminSidebar = ({ items, className, ...props }: AdminSidebarProps) => {
  const pathName = usePathname();

  return (
    <aside
      className={cn("h-screen w-48 border-r-zinc-400 p-4 shadow-lg", className)}
      {...props}
    >
      <nav>
        <ul className="flex flex-col gap-6 text-2xl">
          {items.map((item) => (
            <li key={item.href}>
              <LinkButtons
                Icon={item.Icon ?? DotOutline}
                active={pathName === item.href}
                href={item.href}
                text={item.title}
              />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
