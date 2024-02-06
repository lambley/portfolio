import React, { PropsWithChildren } from "react";
import Navigation from "./Header/Navigation";
import Footer from "./Footer/Footer";

type LayoutProps = {
  theme: string;
  onToggle: () => void;
};

const Layout = ({
  children,
  theme,
  onToggle,
}: PropsWithChildren<LayoutProps>) => {
  return (
    <>
      <div className="layout-wrapper">
        <Navigation theme={theme} onToggle={onToggle}>
          <div className="content-container">{children}</div>
        </Navigation>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
