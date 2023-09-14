import React, { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";
import "../styles/globals.css";
import Layout from "../components/Layout";
import ThemeToggle from "../components/ThemeToggle";

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <>
      <Head>
        <title>Aaron&apos;s Portfolio</title>
        <meta
          name="description"
          content="Aaron Lambley - Fullstack Developer - Ruby on Rails, React, Nextjs, Python"
        />
        <meta property="og:image" content="/images/ogimage.png" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css"
        />
      </Head>
      <div className={`${theme}-theme`}>
        <Layout>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <Component {...pageProps} />
        </Layout>
        <Analytics />
      </div>
    </>
  );
}
export default MyApp;
