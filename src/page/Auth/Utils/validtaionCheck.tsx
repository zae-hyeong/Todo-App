const validationCheck = {
  check: (
    identifier: "email" | "password" | "confirmPassword",
    input: string,
    confirmPassword?: string
  ) => {
    const validation: { isSuccessful: boolean; message: string } = {
      isSuccessful: false,
      message: "",
    };

    if (!input) {
      //empty
      validation.message = "Required";
      return validation;
    }

    switch (identifier) {
      case "email":
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input)) {
          //invalid email
          validation.message = "Invalid email address";
        } else {
          validation.message = "Valid email address";
          validation.isSuccessful = true;
        }
        break;
      case "password":
        if (input.length < 10) {
          validation.message = "Must be 10 characters or more";
        } else {
          validation.message = "Valid password";
          validation.isSuccessful = true;
        }
        break;
      case "confirmPassword":
        if (!confirmPassword)
          throw new Error(
            "validation check 함수에 confirmPassword 값을 넣지 않음"
          );

        if (input !== confirmPassword) {
          validation.message = "Password and confirm password must be the same";
        } else {
          validation.message = "Valid password";
          validation.isSuccessful = true;
        }
        break;
    }

    return validation;
  },
};

export default validationCheck;
