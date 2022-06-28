import {
  globalStyle,
  globalFontFace,
  createGlobalTheme,
  createGlobalThemeContract,
} from "@vanilla-extract/css";

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
