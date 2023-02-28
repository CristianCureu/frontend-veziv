import "./pages.css";
import { useState } from "react";
import ShowcasedWorksList from "../components/ShowcasedWorksList";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Main = () => {
  const [showcasedWorks, setShowcasedWorks] = useState([]);

  const getList = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_BASE_URL);
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
    } catch (error) {}
  };

  return (
    <div className="page">
      <h1>Showcased Works</h1>
      <Link to="/create">
        <Button variant="outlined" startIcon={<AddIcon />}>
          Add showcased work
        </Button>
      </Link>
      <ShowcasedWorksList
        getList={getList}
        showcasedWorks={showcasedWorks}
        deleteItem={deleteItem}
      />
    </div>
  );
};

export default Main;
