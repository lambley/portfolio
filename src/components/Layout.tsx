import React, { PropsWithChildren } from "react";
import Navigation from "./Navigation";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="layout-wrapper">
      <Navigation>
        <div className="content-container">{children}</div>
      </Navigation>
    </div>
  );
};

export default Layout;
