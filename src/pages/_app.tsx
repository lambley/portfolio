import React, { useState, useEffect } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
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
    <div className={`${theme}-theme`} style={{ minHeight: "100vh" }}>
      <Layout>
        <button onClick={toggleTheme}>
          {theme === "light" ? "Dark" : "Light"} Mode
        </button>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
export default MyApp;
