import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

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
          <Link className="navbar-link" href="/" aria-label="Home">
            <FontAwesomeIcon icon={faHouse} />
          </Link>
        </div>
        <div className="navbar-right">
          <Link className="navbar-link navbar-link-hover" href="/blog">
            Blog
          </Link>
          <Link className="navbar-link navbar-link-hover" href="/portfolio">
            Portfolio
          </Link>
        </div>
      </div>
      {children}
    </>
  );
};

export default Navigation;
