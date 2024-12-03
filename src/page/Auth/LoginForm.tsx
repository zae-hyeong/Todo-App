import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import FormInput from "./FormInput";
import { loginAPI } from "@/public/utils/authAPI";

export default function LoginForm() {

  const navigate = useNavigate();

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "asdf@google.com",
      errorMessage: "It should be a valid email address!",
      label: "Email Adress",
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
  ];

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const fd = new FormData(event.target as HTMLFormElement);

    const responseStatus = await loginAPI({
      email: fd.get("email") as string,
      password: fd.get("password") as string,
    });

    if(responseStatus < 300 ) {
      navigate('/home');
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      {inputs.map((input) => (
        <FormInput key={input.id} {...input} />
      ))}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
