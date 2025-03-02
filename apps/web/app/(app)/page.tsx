import { MoonIcon, SunIcon } from "@iroy/ui/icons";
import React from "react";

interface Props {}
const IndexPage: React.FC<Props> = () => {
  return (
    <div className="dark:text-red-500">
      <SunIcon className="hidden [html.dark_&]:block " />
      <MoonIcon className="hidden [html.light_&]:block " />
    </div>
  );
};
export default IndexPage;
