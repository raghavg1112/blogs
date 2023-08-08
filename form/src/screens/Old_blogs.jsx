import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Alerts from "../components/Alerts";
import { AppContext } from "../context/AppProvider";
export default function Old_blogs() {
  const [blogs, setBlogs] = useState([]);
  const { user } = useContext(AppContext);
  const load_data = async () => {
    console.log(`hello`);
    let response = await Axios.get("http://localhost:5000/my_old_blogs", {
      params: { user_id: localStorage.getItem("user_id") },
    });
    response = response.data;
    if (!response.success) {
      <Alerts val="0" text={response.message} />;
    } else {
      response = response.data;
      setBlogs(response);
    }
  };
  useEffect(() => {
    load_data();
  }, []);

  const deleteBlog = async (blog_id) => {
    let response = await Axios.post("http://localhost:5000/delete_blog", {
      blog_id: blog_id,
    });
    response = response.data;
    if (!response.success) {
      <Alerts val="0" message={response.message} />;
    } else {
      <Alerts val="1" message={response.message} />;
      load_data();
    }
  };
  return (
    <>
      {blogs.length == 0 ? (
        <div className="m-5 h1">No initial Blogs</div>
      ) : (
        <section
          className="p-4 p-md-5 text-center text-lg-start shadow-1-strong rounded"
          style={{
            backgroundImage:
              "url(https://mdbcdn.b-cdn.net/img/Photos/Others/background2.webp)",
          }}
        >
          <div className="row d-flex justify-content-center">
            <div className="col-md-10">
              {blogs.map((blogs) => {
                return (
                  <div className="card m-2 shadow-lg">
                    <div className="card-body m-3">
                      <div className="row">
                        <div
                          className="col-lg-4 d-flex justify-content-center align-items-center mb-4 mb-lg-0"
                          style={{ objectFit: "cover" }}
                        >
                          <img
                            src={blogs.img}
                            className="rounded-circle img-fluid shadow-1"
                            alt="woman avatar"
                            style={{ width: "150px", height: "150px" }}
                          />
                        </div>
                        <div className="col-lg-8">
                          <p
                            className="text-muted fw-bold mb-3"
                            style={{ fontSize: "x-large" }}
                          >
                            {blogs.title}
                          </p>
                          <p className="fw-light text-muted mb-0">
                            Written By:-
                          </p>
                          <p className="fw-bolder mb-2">
                            {localStorage.getItem("name")}
                          </p>
                          <div>
                            <Link
                              to={`/edit_blog/${blogs._id}`}
                              className="btn btn-warning m-2"
                            >
                              Edit
                            </Link>
                            <button
                              className="btn btn-danger m-2"
                              onClick={() => {
                                deleteBlog(blogs._id);
                              }}
                            >
                              Delete Blog
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
