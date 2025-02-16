import "./registerPage.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/login");
  };

  return (
    <div className="registerContainer">
      <div className="registerContent">
        <h1>register page</h1>

        <form className="registerFormDiv">
          <>
            <label name="username">Username: </label>
            <input for="username" placeholder="Enter username" />
          </>
          <>
            <label name="username">Password: </label>
            <input type="text" for="username" placeholder="Enter username" />
          </>
          <Button
            variant="contained"
            onClick={() => {
              handleSubmit();
            }}
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}
