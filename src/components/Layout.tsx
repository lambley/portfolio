import React, { PropsWithChildren } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="layout-wrapper">
        <Navigation>
          <div className="content-container">{children}</div>
        </Navigation>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
