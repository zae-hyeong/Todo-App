import React from "react";
import { Form } from "react-bootstrap";

interface Props {
  id: number;
  name: string;
  type: string;
  placeholder: string;
  errorMessage: string;
  label: string;
  pattern: string;
  required: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({
  id,
  errorMessage,
  label,
  pattern,
  onChange,
  ...inputProps
}: Props) {
  const [focused, setFocused] = React.useState(false);
  const [valid, setValid] = React.useState(false);

  const [inputValue, setValue] = React.useState("");

  const handleFocus = () => {
    setFocused(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange(e);
    setValid(new RegExp(pattern).test(e.target.value));
  };

  return (
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        {...inputProps}
        value={inputValue}
        onChange={handleChange}
        onBlur={handleFocus}
      />
      {focused && !valid && (
        <Form.Text className="text-danger">{errorMessage}</Form.Text>
      )}
    </Form.Group>
  );
}
