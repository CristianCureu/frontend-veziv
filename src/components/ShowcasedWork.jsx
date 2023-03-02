import "./components.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";

const ShowcasedWork = ({
  id,
  title,
  url = "No url",
  photo,
  isVissible,
  deleteItem,
  hideItem,
}) => {
  const [picture, setPicture] = useState(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const getPhoto = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/photo/${photo}`
        );
        if (response.status === 200) {
          setPicture(response.url);
        }
      } catch (error) {
        toast.error(error.message, {
          position: "bottom-right",
        });
      }
    };
    photo && getPhoto();
  }, []);

  return (
    <div className="showcased-work">
      <h2>{title}</h2>
      <a target="blank" href={url}>
        {url}
      </a>
      {picture ? (
        <img src={picture} alt="showcased work photo" />
      ) : (
        <p>No photo</p>
      )}
      <div className="buttons">
        <Link to={`/${id}`}>
          <IconButton color="success">
            <EditIcon />
          </IconButton>
        </Link>
        <IconButton
          color="primary"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => hideItem(id, !isVissible)}
        >
          {hovered ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </IconButton>
        <IconButton color="error" onClick={() => deleteItem(id)}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default ShowcasedWork;
