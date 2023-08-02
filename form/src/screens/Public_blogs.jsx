import React, { useContext } from "react";
import Axios from "axios";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import { AppContext } from "../context/AppProvider";
import Alerts from "../components/Alerts";
export default function Public_blogs() {
  const { blogs, setBlogs } = useContext(AppContext);
  const load_data = async () => {
    let response = await Axios.get("http://localhost:5000/get_all_blogs");
    response = response.data;
    if (!response.success) {
      <Alerts val="0" message={response.message} />;
    } else {
      setBlogs(response.data);
    }
  };

  useEffect(() => {
    load_data();
  }, []);
  return (
    <>
      <div className="container ml-5">
        <div className="row">
          {blogs.map((blog) => {
            return (
              <div className="col-12  col-md- col-lg-3">
                <div className="card m-3">
                  <Card blog={blog} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
