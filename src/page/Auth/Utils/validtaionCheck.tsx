const validationCheck = {

  checkEmail : (input: string) => {
    const validation: {isSuccessful: boolean, message: string} = {
      isSuccessful: false,
      message: ""
    };
  
    if (!input) { //empty
      validation.message = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input)) { //invalid email
      validation.message = 'Invalid email address'
    } else {
      validation.message = 'Valid email address';
      validation.isSuccessful = true;
    }
  
    return validation;
  },

  checkPassword : (input: string) => {
    const validation: {isSuccessful: boolean, message: string} = {
      isSuccessful: false,
      message: ""
    };
  
    if (!input) {
      validation.message = 'Required';
    } else if (input.length < 10) {
      validation.message = 'Must be 10 characters or more';
    } else {
      validation.message = 'Valid password';
      validation.isSuccessful = true;
    }
  
    return validation
  },

  comparePassword : (password: string, confirmPassword: string) => {
    const validation: {isSuccessful: boolean, message: string} = {
      isSuccessful: false,
      message: ""
    };
  
    if (password !== confirmPassword) {
      validation.message = 'Password and confirm password must be the same';
    } else {
      validation.message = 'Valid password';
      validation.isSuccessful = true;
    }
  
    return validation;
  }
}

export default validationCheck;