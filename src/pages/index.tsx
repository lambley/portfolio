import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Image from "next/image";
import Typewriter from "@/components/Typewriter";
import Link from "next/link";

const HomePage = (): JSX.Element => {
  return (
    <Container className="py-4">
      <Typewriter
        text={"Hello, it's me, Aaron 👋"}
        delay={100}
        infinite={true}
        optionalClass={["text-center", "fs-1", "fw-bold", "mb-5"]}
      />

      <div className="d-flex align-items-center flex-column">
        <div className="border-0 rounded-circle overflow-hidden me-3 my-3">
          <Image
            src="/images/aaron.png"
            alt="Aaron"
            className="round-avatar"
            width={200}
            height={200}
          />
        </div>

        <div className="border rounded p-3 bio-container">
          <h3 className="text-center mb-3">
            Fullstack Developer 💻 | Web-Dev Enthusiast 🌐 | Bookworm 📚 | Dog
            Lover 🐶
          </h3>
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
            Currently learning 🌱 Next.js framework, and CI/CD with GitHub
            actions and Vercel.
          </p>
          <p className="text-center my-3">
            Check out more of my work <Link href={"/portfolio"}>here</Link>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
