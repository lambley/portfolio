import React from "react";
import Container from "react-bootstrap/Container";
import Image from "next/image";
import Typewriter from "@/components/Typewriter";

const HomePage = (): JSX.Element => {
  return (
    <Container className="py-4">
      <Typewriter
        text={"Hello, it's me, Aaron 👋"}
        delay={100}
        infinite={true}
        optionalClass={["text-center", "fs-3"]}
      />

      <div className="d-flex align-items-center flex-column">
        <div className="border rounded-circle overflow-hidden me-3 my-3">
          <Image
            src="/images/aaron.png"
            alt="Aaron"
            className="round-avatar"
            width={200}
            height={200}
          />
        </div>

        <div className="border rounded p-3 bio-container">
          <p className="text-center">
            <b>
              Fullstack Developer 💻 | Web-Dev Enthusiast 🌐 | Bookworm 📚 | Dog
              Lover 🐶
            </b>
          </p>
          <p className="text-center">
            Experienced Ruby on Rails and JavaScript developer skilled in
            startup and technical consultancy settings, and well-practiced at
            working within agile methodology environments.
          </p>
          <p className="text-center">
            Formerly, specialized in non-fiction publishing with a focus on
            physical and digital sales, including ecommerce and data analytics.
          </p>
          <p className="text-center">
            Currently learning 🌱 Next.js and honing my React skills.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
