import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Axios from "axios";
import "./styles.css";
export default function Home() {
  const [input, setInput] = useState({ blog: "", title: "", img: "" });
  const Navigate = useNavigate();
  const handleChange = (e) => {
    const newblog = { ...input };
    newblog[e.target.name] = e.target.value;
    setInput(newblog);
  };
  const submit = async (e) => {
    let response = await Axios.post("http://localhost:5000/create_blog", {
      blog: input.blog,
      user_id: localStorage.getItem("user_id"),
      title: input.title,
      img: input.img,
    });
    response = response.data;

    if (!response.success) {
      alert(response.message);
    } else {
      Navigate("/old_blogs");
    }
  };
  return (
    <>
      <section className="vh-75 mt-5 " style={{ "background-color": "#eee;" }}>
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
                        Write a Blog
                      </p>

                      <form className="mx-1 mx-md-3">
                        <div className=" mb-4 height">
                          <input
                            type="text"
                            id="form3Example3c"
                            className="form-control m-2 "
                            placeholder="Blog Title......"
                            name="title"
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
                            placeholder="Write Your Blog Here........"
                            name="blog"
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            style={{ height: "180px" }}
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
                            Create Blog
                          </Link>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid img-container"
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
    </>
  );
}
