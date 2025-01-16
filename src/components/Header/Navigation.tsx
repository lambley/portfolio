import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import ThemeToggle from "../Forms/ThemeToggle";

type NavigationProps = {
  theme: string;
  onToggle: () => void;
  children: React.ReactNode;
};

const Navigation: React.FC<NavigationProps> = ({
  theme,
  onToggle,
  children,
}: NavigationProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY >= 60;
      if (isScrolled && !scrolled) {
        setScrolled(true);
      } else if (!isScrolled && scrolled) {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderThemeToggle = () => {
    if (isMounted && process.env.NEXT_PUBLIC_ENABLE_THEME_TOGGLE) {
      return <ThemeToggle theme={theme} onToggle={onToggle} />;
    }
  };

  return (
    <>
      <button
        className={`top-arrow ${scrolled ? "show" : "hide"}`}
        onClick={() => backToTop()}
        aria-label="Back to top"
        id="back-to-top"
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
      <div className={`custom-navbar ${scrolled ? "scrolled" : ""}`}>
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
          {renderThemeToggle()}
        </div>
      </div>
      {children}
    </>
  );
};

export default Navigation;
