import "./pages.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import ShowcasedWorksList from "../components/ShowcasedWorksList";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";

const Main = () => {
  const [showcasedWorks, setShowcasedWorks] = useState([]);
  const [hidden, setHidden] = useState(false);

  const getList = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_BASE_URL);
      const response = await res.json();
      setShowcasedWorks(response);
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-right",
      });
    }
  };

  const getHiddenList = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/hidden`);
      const response = await res.json();
      setShowcasedWorks(response);
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-right",
      });
    }
  };

  const deleteItem = async (id) => {
    const oldItems = [...showcasedWorks];
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      setShowcasedWorks(oldItems.filter((el) => el._id !== data._id));
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-right",
      });
    }
  };

  const hideItem = async (id, isVissible) => {
    const oldItems = [...showcasedWorks];
    const formData = new FormData();
    formData.append("isVissible", isVissible);
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/${id}`, {
        method: "PUT",
        body: formData,
      });
      const data = await response.json();
      setShowcasedWorks(oldItems.filter((el) => el._id !== data._id));
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-right",
      });
    }
  };

  return (
    <div className="page">
      <h1>Showcased Works</h1>
      <Link to="/create">
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          sx={{ margin: "2rem" }}
        >
          Add showcased work
        </Button>
      </Link>
      <Button onClick={() => setHidden(!hidden)}>
        {hidden ? "Display not hidden items" : "DIsplay hidden items"}
      </Button>
      <ShowcasedWorksList
        getList={getList}
        getHiddenList={getHiddenList}
        showcasedWorks={showcasedWorks}
        deleteItem={deleteItem}
        hideItem={hideItem}
        hidden={hidden}
      />
    </div>
  );
};

export default Main;
