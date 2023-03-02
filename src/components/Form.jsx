import "./components.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { checkUrl } from "../validation";

const Form = () => {
  const { pathname } = useLocation();
  const [info, setInfo] = useState({});
  const URL =
    pathname === "/create"
      ? process.env.REACT_APP_BASE_URL
      : `${process.env.REACT_APP_BASE_URL}${pathname}`;

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", info.title);
    info.url && formData.append("url", info.url);
    info.photo && formData.append("photo", info.photo);
    if (info.url?.length && !checkUrl(info.url)) {
      toast.error("Please provide a valid URL!", {
        position: "bottom-right",
      });
    } else {
      try {
        const res = await fetch(URL, {
          method: pathname === "/create" ? "POST" : "PUT",
          body: formData,
        });
        const response = await res.json();
        if (response.statusCode === 500) {
          toast.error(response.message, {
            position: "bottom-right",
          });
        } else {
          toast.success(
            pathname === "/create"
              ? "Successfully created!"
              : "Successfully edited!",
            {
              position: "bottom-right",
            }
          );
        }
      } catch (error) {
        toast.error(error.message, {
          position: "bottom-right",
        });
      }
    }
  };

  useEffect(() => {
    const getInfo = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}${pathname}`
        );
        const data = await response.json();
        setInfo(data);
      } catch (error) {
        toast.error(error.message, {
          position: "bottom-right",
        });
      }
    };
    pathname !== "/create" && getInfo();
  }, []);

  return (
    <form onSubmit={submitHandler}>
      <input
        required
        type="text"
        placeholder="Title"
        defaultValue={info.title}
        onChange={(e) => setInfo({ ...info, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="URL"
        defaultValue={info.url}
        onChange={(e) => setInfo({ ...info, url: e.target.value })}
      />
      <input
        accept="image/*"
        multiple
        type="file"
        onChange={(e) => setInfo({ ...info, photo: e.target.files[0] })}
      />
      <Button type="submit" variant="contained">
        {pathname === "/create" ? "Add" : "Edit"}
      </Button>
    </form>
  );
};

export default Form;
