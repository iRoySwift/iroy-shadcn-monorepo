import gray from "./gray";
import neutral from "./neutral";
import red from "./red";
import rose from "./rose";
import slate from "./slate";
import stone from "./stone";
import zinc from "./zinc";

export { colors } from "./colors";

export const themeColor = [
  {
    name: "zinc",
    label: "Zinc",
    ...zinc,
  },
  {
    name: "slate",
    label: "Slate",
    ...slate,
  },
  {
    name: "stone",
    label: "Stone",
    ...stone,
  },
  {
    name: "gray",
    label: "Gray",
    ...gray,
  },
  {
    name: "neutral",
    label: "Neutral",
    ...neutral,
  },
  {
    name: "red",
    label: "Red",
    ...red,
  },
  {
    name: "rose",
    label: "Rose",
    ...rose,
  },
];

export type ThemeColor = (typeof themeColor)[number];
