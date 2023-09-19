import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import dynamic from "next/dynamic";

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
  } = useForm<FormValues>();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleCaptchaChange = (value: string | any) => {
    if (value) {
      console.log("Captcha value:", value);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          {...register("message", { required: "Message is required" })}
        ></textarea>
        {errors.message && <p>{errors.message.message}</p>}
      </div>
      {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
        <div>
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            onChange={handleCaptchaChange}
          />
        </div>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default ContactForm;
