import React from "react";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="d-flex w-100 h-100 justify-content-center align-items-center">
      <div className="d-flex justify-content-center h-100">
        <div
          className="d-flex justify-content-center align-items-center bg-primary me-5"
          style={styles.loginBackground}
        >
          <span>Login</span>
        </div>
        <LoginForm />

        <div>
          <Link to={'/auth/signup'}>signup</Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  loginBackground: {
    maxWidth: "900px",
    width: "40%",
    heigt: "100%",
    color: "white",
    fontSize: "3rem",
    fontWeight: "bold",
  },
};
