import { useEffect } from "react";
import ShowcasedWork from "./ShowcasedWork";
import "./components.css";

const ShowcasedWorksList = ({ getList, showcasedWorks, deleteItem }) => {
  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="list">
      {showcasedWorks.map((item) => (
            <ShowcasedWork
              key={item._id}
              id={item._id}
              title={item.title}
              url={item.url}
              deleteItem={deleteItem}
            />
          ))
        }
    </div>
  );
};

export default ShowcasedWorksList;
