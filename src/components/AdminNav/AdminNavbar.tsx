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
import { fontSans } from "~/layouts/AdminBaseLayout";

const AdminNavbar = () => {
  return (
    <header className="flex h-16 justify-between border-b-zinc-300 p-4 shadow-sm">
      <p className="text-2xl font-bold">Admin Panel</p>
      <section>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className={cn("font-sans", fontSans.variable)}>
            <DropdownMenuLabel className="text-lg">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-lg">Profile</DropdownMenuItem>
            <DropdownMenuItem className="text-lg">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
    </header>
  );
};

export default AdminNavbar;
