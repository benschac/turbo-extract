import type { AppProps } from "next/app";
import "../styles/globals.css.ts";
import { ThemeProvider } from "../ThemeProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
