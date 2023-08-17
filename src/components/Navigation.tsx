import React from "react";
import Link from "next/link";

type NavigationProps = {
  children: React.ReactNode;
};

const Navigation: React.FC<NavigationProps> = ({
  children,
}: NavigationProps) => {
  return (
    <>
      <div className="custom-navbar">
        <div className="navbar-left">
          <Link className="navbar-link" href="/">
            Home
          </Link>
        </div>
        <div className="navbar-right">
          <Link className="navbar-link" href="/">
            Blog
          </Link>
          <Link className="navbar-link" href="/">
            Portfolio
          </Link>
        </div>
      </div>
      {children}
    </>
  );
};

export default Navigation;
