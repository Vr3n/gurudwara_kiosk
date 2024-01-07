import { cn } from "~/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Toggle } from "~/components/ui/toggle";
import { fontSans } from "~/layouts/AdminBaseLayout";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import type { Session } from "next-auth";
import { signOut } from "next-auth/react";

type AdminNavbarProps = {
  sidebarToggleFunc: () => void;
  session?: Session | null;
};

/*
 * Admin Navigation Bar.
 *
 * Takes in the toggle function for hide/show the sidebar.
 */
const AdminNavbar = ({ sidebarToggleFunc, session }: AdminNavbarProps) => {
  return (
    <header className="flex h-16 justify-between border-b-zinc-300 p-4 shadow-sm">
      <section className="flex gap-4">
        <Toggle
          onPressedChange={() => sidebarToggleFunc()}
          aria-label="Toggle sidebar"
        >
          <HamburgerMenuIcon />
        </Toggle>
        <p className="text-2xl font-bold">Admin Panel</p>
      </section>
      <section>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage
                src={
                  session?.user?.image
                    ? session.user?.image
                    : "https://www.svgrepo.com/show/452030/avatar-default.svg"
                }
                alt="user image"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className={cn("font-sans", fontSans.variable)}>
            <DropdownMenuLabel className="text-lg">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-lg">Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()} className="text-lg">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
    </header>
  );
};

export default AdminNavbar;
