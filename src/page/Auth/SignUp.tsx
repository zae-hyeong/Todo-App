import React from "react";
import { Button, Form } from "react-bootstrap";
import validationCheck from "./Utils/validtaionCheck";

export default function SignUp() {
  const [enteredValues, setEnteredValues] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const emailValidation = enteredValues.email.includes('@');

  const [validationInfo, setValidationInfo] = React.useState({
    email: {
      isSuccessful: false,
      isBlurred: false,
      message: "",
    },
    password: {
      isSuccessful: false,
      isBlurred: false,
      message: "",
    },
    confirmPassword: {
      isSuccessful: false,
      isBlurred: false,
      message: "",
    },
  });

  function inputBlurHandler(
    identifier: "email" | "password" | "confirmPassword"
  ) {
    setValidationInfo({
      ...validationInfo,
      [identifier]: {
        isBlurred: true,
      },
    });
  }

  function inputChangeHandler(
    identifier: "email" | "password" | "confirmPassword",
    value: string
  ) {
    setEnteredValues({
      ...enteredValues,
      [identifier]: value,
    });

    console.log(
      `CHECK :::: isBlur ::: ${validationInfo[identifier].isBlurred}//// ${JSON.stringify(validationCheck.check(
        identifier,
        enteredValues[identifier],
        validationInfo["confirmPassword"].isBlurred
          ? enteredValues["confirmPassword"]
          : undefined
      ))}`
    );
    setValidationInfo({
      ...validationInfo,
      [identifier]: {
        ...validationCheck.check(
          identifier,
          enteredValues[identifier],
          validationInfo["confirmPassword"].isBlurred
            ? enteredValues["confirmPassword"]
            : undefined
        ),
        isBlurred: validationInfo[identifier].isBlurred,
      },
    });
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const fd = new FormData(event.target as HTMLFormElement);

    const data = Object.fromEntries(fd.entries());
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          placeholder="Enter email"
          name="email"
          value={enteredValues.email}
          onChange={(e) => inputChangeHandler("email", e.target.value)}
          onBlur={() => inputBlurHandler("email")}
          required
        />
        {(validationInfo.email.isBlurred &&
        !emailValidation) ? (
          <Form.Text className="text-danger">
            {validationInfo.email.message}
          </Form.Text>
        ) : <Form.Text>왜 안되는데</Form.Text>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          value={enteredValues.password}
          onChange={(e) => inputChangeHandler("password", e.target.value)}
          onBlur={() => inputBlurHandler("password")}
        />
        {validationInfo.password.isBlurred &&
        validationInfo.password.isSuccessful ? null : (
          <Form.Text className="text-danger">
            {validationInfo.password.message}
          </Form.Text>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={enteredValues.confirmPassword}
          onChange={(e) =>
            inputChangeHandler("confirmPassword", e.target.value)
          }
          onBlur={() => inputBlurHandler("confirmPassword")}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
