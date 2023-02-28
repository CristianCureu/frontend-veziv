import "./components.css";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";

const CreateForm = () => {
  const [info, setInfo] = useState({});

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(process.env.REACT_APP_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });
      const response = await res.json();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(info);
  }, [info]);
  return (
    <form className="create-form" onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Title"
        onChange={(e) => setInfo({ ...info, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="URL"
        onChange={(e) => setInfo({ ...info, url: e.target.value })}
      />
      <input accept="image/*" multiple type="file" />
      <Button type="submit" variant="outlined">
        Submit
      </Button>
    </form>
  );
};

export default CreateForm;
