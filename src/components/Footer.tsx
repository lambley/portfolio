import React from "react";
import VisitorCounter from "./VisitorCounter";

const Footer = (): JSX.Element => {
  return (
    <footer className="footer text-center">
      <div className="footer-content">
        <VisitorCounter />
        <span className="footer-text">
          &copy; {new Date().getFullYear()} Aaron Lambley
        </span>
      </div>
    </footer>
  );
};

export default Footer;
