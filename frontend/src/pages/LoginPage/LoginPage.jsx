import "./loginPage.css";
import Button from "@mui/material/Button";
import { useState } from "react";

export default function Login() {
  const [usernameInput, setUsernameInput] = useState();
  const [passwordInput, setPasswordInput] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="loginContainer">
      <div className="loginContent">
        <form className="loginFormDiv">
          <>
            <label name="username">Username: </label>
            <input for="username" placeholder="Enter username" />
          </>
          <>
            <label name="username">Password: </label>
            <input type="text" for="username" placeholder="Enter username" />
          </>
          <>
            <Button
              variant="contained"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Submit
            </Button>
          </>
        </form>
      </div>
    </div>
  );
}
