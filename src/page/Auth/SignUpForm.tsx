import React from "react";
import { Button, Form } from "react-bootstrap";
import FormInput from "./Utils/FormInput";
import { createUserAPI } from "@/public/api";

export default function SignupForm() {
  const [enteredValues, setEnteredValues] = React.useState<{
    [key: string]: string;
  }>({
    email: "",
    password: "",
    confirmPassword: "",
  });

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
      pattern: enteredValues.password ? enteredValues.password : "",
      required: true,
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEnteredValues((prev) => ({ ...prev, [name]: value }));
  };

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const fd = new FormData(event.target as HTMLFormElement);
    // const data = Object.fromEntries(fd.entries());

    const res = createUserAPI({
      email: fd.get("email") as string,
      password: fd.get("password") as string,
    });

    res.then((data) => console.log(data.token));
    // console.log();
  }

  return (
    <Form onSubmit={handleSubmit}>
      {inputs.map((input) => (
        <FormInput key={input.id} onChange={handleChange} {...input} />
      ))}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
