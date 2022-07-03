import React, { DOMAttributes } from "react";
import { sprinkles } from "../styles/utils.css";
import { GlobalVars } from "../styles/globals.css";
import { responsiveStyle, ResponsiveStyles } from "../styles/responsive";

type FlexJustifyType =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around";

type FlexAlignType = "flex-start" | "flex-end" | "center" | "stretch";

type FlexWrapType = "nowrap" | "wrap" | "wrap-reverse";

type DebugType = "debug";

type FlexProps = {
  justify?: boolean | FlexJustifyType;
  align?: boolean | FlexAlignType;
  grow?: boolean | number;
  shrink?: boolean;
  reverse?: boolean;
  wrap?: boolean | FlexWrapType;
};

type LayoutProps = {
  relative?: boolean;
  px?: keyof GlobalVars["spacing"];
  py?: ResponsiveStyles | keyof GlobalVars["spacing"];
  absolute?:
    | boolean
    | { top?: number; right?: number; bottom?: number; left?: number };
};

type DebugProps = {
  debug?: boolean | DebugType;
};
type BaseType = {
  style?: React.CSSProperties;
  as?: keyof HTMLElementTagNameMap;
  children: React.ReactNode;
} & DOMAttributes<HTMLElement>;

const sprinklesConfigFn = ({
  justify,
  align,
  wrap,
  relative,
  shrink,
  grow,
  px,
  py,
}: FlexProps & Omit<LayoutProps, "absolute">) =>
  ({
    display: "flex",
    ...(justify && {
      justifyContent: typeof justify === "boolean" ? "center" : justify,
    }),
    ...(align && {
      alignItems: typeof align === "boolean" ? "center" : align,
    }),
    flexWrap: wrap && typeof wrap !== "boolean" ? wrap : "nowrap",
    ...(relative && {
      position: "relative" as
        | "relative"
        | "absolute"
        | "fixed"
        | "sticky"
        | "static",
    }),
    ...(shrink && {
      flexShrink: (typeof shrink === "boolean" ? "1" : "0") as "0" | "1",
    }),
    ...(grow && {
      flexGrow: (typeof grow === "boolean" ? "1" : "0") as "0" | "1",
      ...(py && {
        ...responsiveStyle(typeof py === "object" ? { ...py } : py),
      }),
      ...(px && {
        px,
      }),
    }),
  } as const);

export const Column = React.memo(function Column(
  props: FlexProps & LayoutProps & DebugProps & BaseType
) {
  const {
    absolute,
    align = "center",
    as = "div",
    children,
    grow,
    justify,
    relative,
    shrink,
    style,
    reverse,
    wrap,
    debug,
    py,
    px,
    ...rest
  } = props;
  // TODO - come back to this typecast
  const Element = `${as}` as keyof Omit<
    HTMLElementTagNameMap,
    "frame" | "dir" | "font" | "frameset" | "marquee"
  >;

  const absolutePosition = React.useMemo(() => {
    return Object.entries(
      typeof absolute === "object"
        ? absolute
        : { top: 0, right: 0, bottom: 0, left: 0 }
    )
      .filter(([, amount]) => amount !== undefined)
      .map(([direction, amount]) => {
        return { [direction]: amount };
      })
      .reduce((acc, curr) => ({ ...acc, ...curr }), {});
  }, [absolute]);

  const sharedStyleConfig = React.useCallback(
    () =>
      sprinklesConfigFn({
        justify,
        align,
        wrap,
        grow,
        shrink,
        relative,
        py,
        px,
      }),
    [justify, align, wrap, grow, shrink, relative, py, px]
  );

  return (
    <Element
      className={`${sprinkles({
        ...sharedStyleConfig(),
        flexDirection: reverse ? "column-reverse" : "column",
      })}`}
      style={{
        ...style,
        ...(debug && {
          border: "1px solid red",
        }),
        ...(absolute && {
          position: "absolute",
          ...absolutePosition,
        }),
      }}
      {...rest}
    >
      {children}
    </Element>
  );
});

export const Row = React.memo(function Row(
  props: FlexProps & LayoutProps & DebugProps & BaseType
) {
  const {
    children,
    as,
    justify,
    align,
    relative,
    absolute,
    grow,
    shrink,
    reverse,
    wrap,
    style,
    debug,
    px,
    py,
    ...rest
  } = props;

  const Element = `${as}` as keyof Omit<
    HTMLElementTagNameMap,
    "frame" | "dir" | "font" | "frameset" | "marquee"
  >;

  const absolutePosition = React.useMemo(() => {
    return Object.entries(
      typeof absolute === "object"
        ? absolute
        : { top: 0, right: 0, bottom: 0, left: 0 }
    )
      .filter(([, amount]) => amount !== undefined)
      .map(([direction, amount]) => {
        return { [direction]: amount };
      })
      .reduce((acc, curr) => ({ ...acc, ...curr }), {});
  }, [absolute]);

  const sharedStyleConfig = React.useCallback(
    () =>
      sprinklesConfigFn({
        justify,
        align,
        wrap,
        grow,
        relative,
        shrink,
        px,
        py,
      }),
    [justify, align, wrap, grow, relative, shrink, px, py]
  );

  return (
    <Element
      className={`${sprinkles({
        ...sharedStyleConfig(),
        flexDirection: reverse ? "row-reverse" : "row",
      })}`}
      style={{
        ...style,
        ...(debug && {
          border: "1px solid green",
        }),
        ...(absolute && {
          position: "absolute",
          ...absolutePosition,
        }),
      }}
      {...rest}
    >
      {children}
    </Element>
  );
});

export const Spacer = {
  Flex: function (
    props: {
      as?: keyof JSX.IntrinsicElements;
      grow?: boolean | "1" | "0";
      shrink?: boolean;
    } & DebugProps
  ) {
    const { as = "div", grow = "1", shrink, debug } = props;
    const Element = `${as}` as keyof JSX.IntrinsicElements;
    return (
      <Element
        className={sprinkles({
          flexGrow:
            grow && !shrink ? (typeof grow === "boolean" ? "1" : grow) : "0",
          flexShrink: shrink ? "1" : "0",
        })}
        style={{
          ...(debug && {
            border: "1px solid blue",
          }),
        }}
      />
    );
  },
  Horizontal: function (props: {
    as: keyof JSX.IntrinsicElements;
    grow: boolean;
    shrink: boolean;
  }) {
    const { as, grow, shrink } = props;
    const Element = `${as}` as keyof JSX.IntrinsicElements;
    return (
      <Element
        className={sprinkles({
          display: "flex",
          flexDirection: "column",
          flexGrow: grow ? "1" : "0",
          flexShrink: shrink ? "1" : "0",
        })}
      />
    );
  },
  Vertical: function (props: {
    as: keyof JSX.IntrinsicElements;
    grow: boolean;
    shrink: boolean;
  }) {
    const { as, grow, shrink } = props;
    const Element = `${as}` as keyof JSX.IntrinsicElements;
    return (
      <Element
        className={sprinkles({
          display: "flex",
          flexDirection: "row",
          flexGrow: grow ? "1" : "0",
          flexShrink: shrink ? "1" : "0",
        })}
      />
    );
  },
};
