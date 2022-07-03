import React from "react";

type Props = {
  children: React.ReactNode;
};

type ThemeType = "light" | "dark" | null;

export const ThemeContext = React.createContext<{
  theme: ThemeType;
  setTheme: (theme: "light" | "dark") => void;
}>({
  setTheme: () => {},
  theme: null,
});

const themeKey = "benschac-";

export function ThemeProvider(props: Props) {
  const { children } = props;
  const [theme, setTheme] = React.useState<"light" | "dark" | null>(null);

  const set = React.useCallback(
    (t: "light" | "dark") => {
      document.body.classList.remove("light", "dark");
      document.body.classList.add(`${themeKey}-${theme}`);

      console.log("setTheme", t);
      setTheme(t);
      try {
        localStorage.setItem(themeKey, t);
      } catch (e) {
        console.error(e);
      }
    },
    [theme]
  );

  React.useEffect(() => {
    const storedTheme = localStorage.getItem(themeKey) as
      | "light"
      | "dark"
      | null;

    if (storedTheme) {
      set(storedTheme);
      setTheme(storedTheme);
    } else {
      set("light");
      setTheme("light");
    }
  }, [set]);

  const value = React.useMemo(
    () => ({
      setTheme: set,
      theme,
    }),
    [set, theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
