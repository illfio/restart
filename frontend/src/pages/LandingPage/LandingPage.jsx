import "./landingPage.css";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export default function Landing() {
  const navigate = useNavigate();

  const handleNavigation = (href) => {
    navigate(`/${href}`);
  };

  return (
    <div className="landingContainer">
      <div className="landingContent">
        <h1>splash page</h1>
        <div className="landingButtonDiv">
          <Button
            variant="contained"
            onClick={() => {
              handleNavigation("login");
            }}
          >
            Login
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleNavigation("register");
            }}
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}
