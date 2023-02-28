import "./components.css";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ShowcasedWork = ({
  id,
  title,
  url = "No url",
  photo = "No photo",
  deleteItem,
}) => {
  return (
    <div className="showcased-work">
      <h2>{title}</h2>
      <p>{url}</p>
      <p>{photo}</p>
      <div className="buttons">
        <IconButton color="success">
          <EditIcon />
        </IconButton>
        <IconButton color="error" onClick={() => deleteItem(id)}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default ShowcasedWork;
