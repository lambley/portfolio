import React from "react";
import VisitorCounter from "./VisitorCounter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faSquareGithub,
  faSquareInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = (): JSX.Element => {
  return (
    <footer className="footer text-center">
      <div className="footer-content">
        <VisitorCounter />
        <div className="footer-socials">
          <a
            href="https://github.com/lambley/"
            target="_blank"
            aria-label="Go to my GitHub"
          >
            <FontAwesomeIcon icon={faSquareGithub} />
          </a>
          <a
            href="https://www.linkedin.com/in/aaron-lambley-35671b124/"
            target="_blank"
            aria-label="Go to my LinkedIn"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>

          <a
            href="https://www.instagram.com/maya_the_collie_cross/"
            target="_blank"
            aria-label="Go to my Instagram"
          >
            <FontAwesomeIcon icon={faSquareInstagram} />
          </a>
        </div>
        <span className="footer-text">
          &copy; 2023 - {new Date().getFullYear()} Aaron Lambley
        </span>
      </div>
    </footer>
  );
};

export default Footer;
