import "./pages.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import ShowcasedWorksList from "../components/ShowcasedWorksList";
import HiddenShowcasedWorksList from "../components/HiddenShowcasedWorksList";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";

const Main = () => {
  const [showcasedWorks, setShowcasedWorks] = useState([]);
  const [hiddenShowcasedWorks, setHiddenShowcasedWorks] = useState(false);

  const getList = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_BASE_URL);
      const response = await res.json();
      setShowcasedWorks(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getHiddenList = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/hidden`);
      const response = await res.json();
      setShowcasedWorks(response);
    } catch (error) {
      console.log(error);
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
      console.log(error);
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
      console.log(data)
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
        <Button variant="outlined" startIcon={<AddIcon />}>
          Add showcased work
        </Button>
      </Link>
      <Button onClick={() => setHiddenShowcasedWorks(!hiddenShowcasedWorks)}>
        {hiddenShowcasedWorks
          ? "Show not hidden showcased works"
          : "Show hidden showcased works"}
      </Button>
      {hiddenShowcasedWorks ? (
        <HiddenShowcasedWorksList
          getHiddenList={getHiddenList}
          showcasedWorks={showcasedWorks}
          deleteItem={deleteItem}
          hideItem={hideItem}
        />
      ) : (
        <ShowcasedWorksList
          getList={getList}
          showcasedWorks={showcasedWorks}
          deleteItem={deleteItem}
          hideItem={hideItem}
        />
      )}
    </div>
  );
};

export default Main;
