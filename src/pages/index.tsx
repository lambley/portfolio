import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Image from "next/image";
import Typewriter from "@/components/Typewriter";
import Latest from "@/components/Latest";
import ContactForm from "@/components/ContactForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

const HomePage = (): JSX.Element => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  const renderHeadline = (): JSX.Element => {
    if (isMobile) {
      return (
        <ul className="mobile-headline-wrapper">
          <li className="text-center mobile-headline-element">
            Fullstack Developer 💻
          </li>
          <li className="text-center mobile-headline-element">
            Web-Dev Enthusiast 🌐
          </li>
          <li className="text-center mobile-headline-element">Bookworm 📚</li>
          <li className="text-center mobile-headline-element">Dog Lover 🐶</li>
        </ul>
      );
    } else {
      return (
        <h3 className="text-center mb-3">
          Fullstack Developer 💻 | Web-Dev Enthusiast 🌐 | Bookworm 📚 | Dog
          Lover 🐶
        </h3>
      );
    }
  };

  return (
    <Container className="py-4">
      {/* TODO: add hero banner */}
      {/* Bio */}
      <Typewriter
        text={"Hello, it's me, Aaron 👋"}
        delay={100}
        infinite={true}
        optionalClass={["text-center", "fs-1", "fw-bold", "mb-5"]}
      />
      <div className="d-flex align-items-center flex-column">
        <div className="border-0 rounded-circle overflow-hidden me-3 my-3 fade-in">
          <Image
            src="/images/aaron.png"
            alt="Aaron"
            className="round-avatar"
            width={200}
            height={200}
          />
        </div>
        <div className="border rounded p-3 bio-container">
          {renderHeadline()}
          <div className="download-wrapper my-3">
            <a
              className="download-cta"
              href="https://drive.google.com/file/d/10sluVUfpXieszIOA87wpYo2d39DOmtNN/view?usp=sharing"
              onMouseOver={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              target="blank"
            >
              Download my cv{" "}
              <FontAwesomeIcon icon={faFile} bounce={isHovered} />
            </a>
          </div>
          <div className="fade-in">
            <p className="text-center">
              Experienced Ruby on Rails and JavaScript developer skilled in
              startup and technical consultancy settings, and well-practiced at
              working within agile methodology environments. Passionate about learning
              and advancing my skills in fullstack development and DevOps.
            </p>
            <p className="text-center">
              Formerly, specialized in non-fiction publishing with a focus on
              physical and digital sales, including ecommerce and data
              analytics.
            </p>
            <p className="text-center">
              Currently learning NestJS framework and using Redis and Docker.
            </p>
          </div>
        </div>
        {/* Latest blogs and projects */}
        <Latest />
        <hr
          style={{ border: "none", borderTop: "2px solid #ccc", width: "100%" }}
        />
        {/* Contact form */}
        <ContactForm />
      </div>
    </Container>
  );
};

export default HomePage;
