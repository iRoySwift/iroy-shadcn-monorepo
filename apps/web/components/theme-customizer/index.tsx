"use client";

import { Button } from "@iroy/ui/components/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@iroy/ui/components/drawer";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@iroy/ui/components/popover";
import React from "react";
import Customizer from "./customizer";

interface Props {}
const ThemeCustomizer: React.FC<Props> = () => {
  return (
    <div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button size="sm" className="md:hidden">
            <Customizer />
          </Button>
        </DrawerTrigger>
        <DrawerContent>s</DrawerContent>
      </Drawer>
      <div className="hidden md:flex">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open popover</Button>
          </PopoverTrigger>
          <PopoverContent className="w-[340px]" align="start">
            <Customizer />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
export default ThemeCustomizer;
