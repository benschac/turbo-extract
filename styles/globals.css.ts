import {
  globalStyle,
  globalFontFace,
  createGlobalTheme,
} from "@vanilla-extract/css";
import colors from "tailwindcss/colors";

const grid = 4;
const px = (value: string | number) => `${value}px`;

globalStyle("*", {
  boxSizing: "border-box",
});

globalStyle("html, body", {
  margin: 0,
  padding: 0,
  fontFamily:
    "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
});

globalStyle("a", {
  textDecoration: "none",
  color: "inherit",
});

globalFontFace("MyFont", {
  src: 'local("Comic Sans MS")',
});

const colorPalette = {
  white: "#fff",
  black: "#000",

  blue50: colors["blue"]["50"],
  blue100: colors["blue"]["100"],
  blue200: colors["blue"]["200"],
  blue300: colors["blue"]["300"],
  blue400: colors["blue"]["400"],
  blue500: colors["blue"]["500"],
  blue600: colors["blue"]["600"],
  blue700: colors["blue"]["700"],
  blue800: colors["blue"]["800"],
};

export const vars = createGlobalTheme(":root", {
  grid: px(grid),
  fonts: {
    body: '-apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", HelveticaNeue, Helvetica, Arial, sans-serif',
  },
  palette: colorPalette,
  spacing: {
    none: "0",
    xs: px(1 * grid),
    s: px(2 * grid),
    md: px(3 * grid),
    lg: px(5 * grid),
    xl: px(8 * grid),
    xxl: px(12 * grid),
    xxxl: px(24 * grid),
  },
});

export type GlobalVars = typeof vars;
