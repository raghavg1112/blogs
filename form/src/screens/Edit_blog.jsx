import React from "react";
import Axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Alerts from "../components/Alerts";
export default function Edit_blog({}) {
  const slug = useParams();
  const Navigate = useNavigate();
  let response;
  console.log(slug.slug);
  async function loadBlog() {
    response = await Axios.get("http://localhost:5000/getToBeEditedBlog", {
      params: { blog_id: slug.slug },
    });
    response = response.data;
    // console.log(response);
    if (!response.success) {
      <Alerts val="0" message={response.message} />;
      Navigate = "/Old_blogs";
    }
    response = response.data;
    setInput(response[0]);
    console.log(input);
  }
  useEffect(() => {
    loadBlog();
  }, []);

  //   console.log(`hello`);
  const [input, setInput] = useState({});
  console.log(input);
  const handleChange = (e) => {
    const newblog = { ...input };
    newblog[e.target.name] = e.target.value;

    setInput(newblog);
  };
  const submit = async (e) => {
    let response = await Axios.post("http://localhost:5000/edit_blog", {
      _id: input._id,
      blog: input.blog,
      title: input.title,
      img: input.img,
    });
    response = response.data;

    if (!response.success) {
      <Alerts val="0" message={response.message} />;
    } else {
      Navigate("/old_blogs");
    }
  };
  //   console.log("hello");
  return (
    <>
      {input == {} ? (
        <p>Loading......</p>
      ) : (
        <section
          className="vh-75 mt-5 "
          style={{ "background-color": "#eee;" }}
        >
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                <div
                  className="card text-black"
                  style={{ borderradius: "25px;" }}
                >
                  <div className="card-body ">
                    <div className="row justify-content-center">
                      <div className="col-lg-6 col-xl-5 order-2 order-lg-1">
                        <p className="text-center h1 fw-bold mb-5 mx-1  mt-2">
                          Edit yourBlog
                        </p>

                        <form className="mx-1 mx-md-3">
                          <div className=" mb-4 height">
                            <input
                              type="text"
                              id="form3Example3c"
                              className="form-control m-2 "
                              placeholder="Blog Title......"
                              name="title"
                              value={input.title}
                              onChange={(e) => {
                                handleChange(e);
                              }}
                            />
                          </div>
                          <div className=" mb-4 height">
                            <input
                              type="text"
                              id="form3Example3c"
                              className="form-control m-2 "
                              placeholder="Blog image URL......"
                              name="img"
                              value={input.img}
                              onChange={(e) => {
                                handleChange(e);
                              }}
                            />
                          </div>
                          <div
                            className=" mb-4 height"
                            style={{ height: "250px" }}
                          >
                            <textarea
                              type="text"
                              id="form3Example3c"
                              className="form-control m-2 "
                              name="blog"
                              onChange={(e) => {
                                handleChange(e);
                              }}
                              style={{ height: "180px" }}
                              value={input.blog}
                            />
                          </div>

                          <div className="d-flex justify-content-center mx-4 mb-3 mb-4">
                            <Link
                              to="/old_blogs"
                              className="btn btn-primary btn-lg m-2"
                              onClick={(e) => {
                                submit(e);
                              }}
                            >
                              Edit
                            </Link>
                          </div>
                        </form>
                      </div>
                      <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                          className="img-fluid"
                          alt="Sample image"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
