import { type Icon as PhosIcon } from "@phosphor-icons/react";
import { Button } from "../ui/button";
import { cn } from "~/lib/utils";
import Link from "next/link";

export type KioskButtonPropType = {
  type: "primary" | "secondary";
  Icon: PhosIcon;
  text: string;
  className?: string;
  href: string;
};

const btnClasses = {
  primary: "px-20 py-10 text-2xl",
  secondary: "bg-zinc-200 px-20 py-10 text-2xl text-gray-400",
};

/* The Button will be used for Navigation.
 * TODO: Change the name of the component to NavigationButton
 * Will change it after the demo!!!
 *
 * When selected primary the button will show blue button.
 * WHen selected secondary the button will show grey button.
 *
 * The icon, text, type is compulsory to define in component.
 * classname prop is optional
 *
 * Example:
 *   <KioskButton
 *     href={"/link"}
 *     text={"submit"}
 *     type={"primary"}
 *     Icon={Icon}
 *     className={"text-black-100"}
 *  />
 *
 */
const KioskButton = ({
  type = "primary",
  Icon,
  text,
  className,
  href,
}: KioskButtonPropType) => {
  return (
    <Link href={href}>
      <Button className={cn(btnClasses[type], className)}>
        <Icon
          size={24}
          color={type == "primary" ? "#fff" : "#bec2bf"}
          weight="bold"
          className="mr-4"
        />{" "}
        {text}
      </Button>
    </Link>
  );
};

export default KioskButton;
