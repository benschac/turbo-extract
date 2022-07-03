import React, { useContext } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Column, Row, Spacer } from "../components/flex.component";
import { ThemeContext } from "../ThemeProvider";

const Home: NextPage = () => {
  const { setTheme, theme } = useContext(ThemeContext);
  console.log(theme);

  return (
    <div>
      <Head>
        <title>bensch.ac</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <Row grow>
          <Column
            debug
            py={{
              sm: "xl",
              m: "lg",
              l: "md",
            }}
            px="xl"
          >
            Thing
          </Column>
          <Spacer.Flex debug />
          <Column px="s">Other thing</Column>
        </Row>
      </header>
      <main>
        {/* Hello */}
        {/* <Column align justify wrap>
          Hello align justify
          <Spacer.Flex debug />
        </Column>
        <Spacer.Flex debug /> */}
        {/* <Column>Hello div click me I have padding I'm using px and py</Column> */}
        {/* <Column py="xxl" relative as="aside">
          <Spacer.Flex debug />
          <Column
            absolute={{
              top: 4,
              left: 5,
            }}
          >
            <Spacer.Flex debug />
          </Column>
        </Column> */}
      </main>
    </div>
  );
};

export default Home;
