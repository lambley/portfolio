import React, { PropsWithChildren } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";

type LayoutProps = {
  theme: string;
};

const Layout = ({ children, theme }: PropsWithChildren<LayoutProps>) => {
  return (
    <>
      <div className="layout-wrapper">
        <Navigation theme={theme}>
          <div className="content-container">{children}</div>
        </Navigation>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
