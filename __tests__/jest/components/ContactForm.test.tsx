import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import ContactForm from "@/components/Forms/ContactForm";

describe("ContactForm", () => {
  it("renders correctly", () => {
    const { getByLabelText, getByText } = render(<ContactForm />);

    expect(getByLabelText("Name:")).toBeInTheDocument();
    expect(getByLabelText("Email:")).toBeInTheDocument();
    expect(getByLabelText("Message:")).toBeInTheDocument();
    expect(getByText("Send Message")).toBeInTheDocument();
  });

  it("displays error message for empty fields", async () => {
    const { getByText, getByRole } = render(<ContactForm />);
    const submitButton = getByText("Send Message");

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText("Name is required")).toBeInTheDocument();
      expect(getByText("Email is required")).toBeInTheDocument();
      expect(getByText("Message is required")).toBeInTheDocument();
    });
  });
});
