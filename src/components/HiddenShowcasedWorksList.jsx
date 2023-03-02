import "./components.css";
import { useEffect } from "react";
import ShowcasedWork from "./ShowcasedWork";

const HiddenShowcasedWorksList = ({
  getHiddenList,
  showcasedWorks,
  deleteItem,
  hideItem,
}) => {
  useEffect(() => {
    getHiddenList();
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
              deleteItem={deleteItem}
              hideItem={hideItem}
            />
          ))
        : "No showcased works"}
    </div>
  );
};

export default HiddenShowcasedWorksList;
