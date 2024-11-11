import React from "react";
import { Button, Form } from "react-bootstrap";
import validationCheck from "./Utils/validtaionCheck";

export default function SignUp() {
  const [enteredValues, setEnteredValues] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const emailIsInvalid = !enteredValues.email.includes("@");

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

    if (identifier === "email") {
      setValidationInfo({
        ...validationInfo,
        [identifier]: {
          ...validationCheck.checkEmail(enteredValues[identifier]),
          isBlurred: validationInfo[identifier].isBlurred,
        },
      });
    } else if (identifier === "password") {
      setValidationInfo({
        ...validationInfo,
        [identifier]: {
          ...validationCheck.checkPassword(enteredValues[identifier]),
          isBlurred: validationInfo[identifier].isBlurred,
        },
      });
    } else {
      setValidationInfo({
        ...validationInfo,
        [identifier]: {
          ...validationCheck.comparePassword(
            enteredValues["password"],
            enteredValues["confirmPassword"]
          ),
          isBlurred: validationInfo[identifier].isBlurred,
        },
      });
    }
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
        />
        {validationInfo.email.isBlurred && emailIsInvalid ? (
          <Form.Text className="text-muted">10자 이상 입력해주세요.</Form.Text>
        ) : (
          <Form.Text className="text-danger">
            {validationInfo.email.message}
          </Form.Text>
        )}
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
