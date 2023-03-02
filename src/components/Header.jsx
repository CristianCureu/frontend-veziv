import "./components.css";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

const Header = ({ title }) => {
  const { pathname } = useLocation();

  return (
    <div className="header">
      <div className="buttons">
        <Link to="/">
          <IconButton sx={{ color: "white" }}>
            <HomeIcon />
          </IconButton>
        </Link>
        {pathname !== "/create" ? (
          <Link to="/create">
          <IconButton sx={{ color: "white" }}>
            <AddIcon />
          </IconButton>
          </Link>
        ) : (
          ""
        )}
      </div>
      <h2>{title}</h2>
    </div>
  );
};

export default Header;
