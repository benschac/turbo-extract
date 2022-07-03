import omit from "lodash/omit";
import isEqual from "lodash/isEqual";
import { Properties, SimplePseudos } from "csstype";
import mapValues from "lodash/mapValues";

export const breakpoints = {
  sm: 0,
  md: 768,
  lg: 1200,
} as const;

export type Breakpoint = keyof typeof breakpoints;
export const breakpointNames = Object.keys(breakpoints) as Breakpoint[];

export const queries = mapValues(
  omit(breakpoints, "mobile"),
  (bp) => `screen and (min-width: ${bp}px)`
);

const makeMediaQuery =
  (breakpoint: Breakpoint) => (styles?: Properties<string | number>) =>
    Object.keys(styles ?? {}).length === 0
      ? {}
      : {
          [`screen and (min-width: ${breakpoints[breakpoint]}px)`]: styles,
        };

const mediaQuery = {
  sm: makeMediaQuery("sm"),
  md: makeMediaQuery("md"),
  lg: makeMediaQuery("lg"),
};
type CSSProps = Properties<string | number> & {
  [P in SimplePseudos]?: Properties<string | number>;
};

export type ResponsiveStyles = {
  // TODO -- curious if there's a way to also import the theme here.
  sm?: CSSProps;
  md?: CSSProps;
  lg?: CSSProps;
};

export const responsiveStyle = ({ sm, md, lg }: ResponsiveStyles) => {
  const smStyles = omit(sm, "@media");

  const mdStyles = !md || isEqual(md, smStyles) ? null : md;
  const belowLg = md || lg;
  const lgStyles = !lg || isEqual(lg, belowLg) ? null : lg;

  const hasMediaQuery = mdStyles || lgStyles;

  return {
    ...smStyles,
    ...(hasMediaQuery
      ? {
          "@media": {
            ...(mdStyles ? mediaQuery.md(mdStyles) : {}),
            ...(lgStyles ? mediaQuery.lg(lgStyles) : {}),
          },
        }
      : {}),
  };
};
