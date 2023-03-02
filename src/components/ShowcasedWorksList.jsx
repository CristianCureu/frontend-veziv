import "./components.css";
import { useEffect } from "react";
import ShowcasedWork from "./ShowcasedWork";
import { useLocation } from "react-router-dom";

const ShowcasedWorksList = ({
  getList,
  showcasedWorks,
  deleteItem,
  hideItem,
}) => {
  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="list">
      {showcasedWorks.length
        ? showcasedWorks.map((item) => (
            <ShowcasedWork
              key={item._id}
              id={item._id}
              title={item.title}
              url={item.url}
              photo={item.photo}
              isVissible={item.isVissible}
              deleteItem={deleteItem}
              hideItem={hideItem}
            />
          ))
        : "No showcased works"}
    </div>
  );
};

export default ShowcasedWorksList;
