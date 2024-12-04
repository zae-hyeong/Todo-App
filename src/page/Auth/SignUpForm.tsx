import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FormInput from "./FormInput";
import { createUserAPI } from "@/public/utils/authAPI";

export default function SignupForm() {
  const pwRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      pattern: `^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$`,
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 3,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: pwRef.current?.value ?? "",
      required: true,
    },
  ];

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const fd = new FormData(event.target as HTMLFormElement);

    const token = await createUserAPI({
      email: fd.get("email") as string,
      password: fd.get("password") as string,
    });

    if (token) {
      navigate("/");
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      {inputs.map((input) => (
        <FormInput
          key={input.id}
          {...input}
          ref={input.id === 2 ? pwRef : null}
        />
      ))}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
