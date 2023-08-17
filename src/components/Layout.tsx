import React, { PropsWithChildren } from "react";
import Navigation from "./Navigation";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Navigation>
      <div>{children}</div>
    </Navigation>
  );
};

export default Layout;
