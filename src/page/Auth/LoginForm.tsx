import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import FormInput from "./Utils/FormInput";

export default function LoginForm() {
  const [enteredValues, setEnteredValues] = React.useState<{
    [key: string]: string;
  }>({
    email: "",
    password: "",
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEnteredValues((prev) => ({ ...prev, [name]: value }));
  };

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const fd = new FormData(event.target as HTMLFormElement);

    console.log(fd.get("email"));

    //TODO: send server request
    const data = Object.fromEntries(fd.entries());
    console.log(data);
  }

  return (
    <Form onSubmit={handleSubmit}>
      {inputs.map((input) => (
        <FormInput key={input.id} onChange={handleChange} {...input} />
      ))}
      <Button variant="primary" type="submit" >
        Submit
      </Button>
    </Form>
  );
}
