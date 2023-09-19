import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import dynamic from "next/dynamic";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import apiUrl from "@/utils/apiConfig";
import axios from "axios";

type FormValues = {
  name: string;
  email: string;
  message: string;
  captcha: string;
};

const DynamicRecaptcha = dynamic(() => import("react-google-recaptcha"), {
  ssr: false,
});

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setSubmitting(true);
    try {
      const params = new URLSearchParams();
      params.append("name", data.name);
      params.append("from", data.email);
      params.append("message", data.message);

      const response = await axios.post(`${apiUrl}/api/v1/contacts?${params.toString()}`);
      if (response.status === 200) {
        setMessage(response.data.message);
        reset();
      } else {
        setMessage("Something went wrong. Please try again later.");
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCaptchaChange = (value: string | any) => {
    if (value) {
      console.log("Captcha value:", value);
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "700px" }}>
      <Row className="g-5">
        <Col xs={12} md={6} className="text-end">
          <h4>Got any questions?</h4>
          <p>
            Feel free to reach out using the contact form here, and I&apos;ll
            get back to you as soon as possible.
          </p>

          <Image
            src="/images/contact.gif"
            alt="get in touch"
            width={300}
            height={300}
          />
        </Col>
        <Col xs={12} md={6} className="mb-3">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="name" className="mb-2">
              <Form.Label aria-label="name">Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="What's your name?"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p>{errors.name.message}</p>}
            </Form.Group>
            <Form.Group controlId="email" className="mb-2">
              <Form.Label aria-label="email">Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="How can I reach you?"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </Form.Group>
            <Form.Group controlId="message" className="mb-2">
              <Form.Label aria-label="message">Message:</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Your thoughts, comments, or questions..."
                rows={3}
                {...register("message", { required: "Message is required" })}
              />
              {errors.message && <p>{errors.message.message}</p>}
            </Form.Group>
            {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
              <Form.Group className="my-3">
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                  onChange={handleCaptchaChange}
                />
              </Form.Group>
            )}
            <Button variant="primary" type="submit">
              {submitting ? "Submitting..." : "Send Message"}
            </Button>
            {message && <p className="mt-2">{message}</p>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactForm;
