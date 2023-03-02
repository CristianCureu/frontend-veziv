import "./components.css";
import { useEffect } from "react";
import ShowcasedWork from "./ShowcasedWork";

const ShowcasedWorksList = ({
  getList,
  getHiddenList,
  showcasedWorks,
  deleteItem,
  hideItem,
  hidden,
}) => {
  useEffect(() => {
    hidden ? getHiddenList() : getList();
  }, [hidden]);

  return (
    <div className="list">
      {showcasedWorks.length ? (
        showcasedWorks.map((item) => (
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
      ) : (
        <div>{hidden ? "No hidden showcased works" : "No showcased works"}</div>
      )}
    </div>
  );
};

export default ShowcasedWorksList;
