import React from "react";
import { cn } from "~/lib/utils";
import { fontSans } from "~/layouts/KioskBaseLayout";

const RenderHtml = ({
  html,
  className,
}: {
  html: string;
  className?: string | undefined;
}) => {
  return (
    <article
      className={cn("prose", fontSans.variable, className)}
      dangerouslySetInnerHTML={{ __html: html }}
    ></article>
  );
};

export default RenderHtml;
