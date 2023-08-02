import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { AppContext } from "../context/AppProvider";
import axios from "axios";
import Alerts from "../components/Alerts";
import { CircularProgress } from "@mui/material";
export default function Show_blog() {
  const slug = useParams();
  //   const { blogs } = useContext(AppContext);
  const [post, setPost] = useState({});
  const Navigate = useNavigate();
  let response;

  async function loadBlog() {
    response = await axios.get("http://localhost:5000/getToBeEditedBlog", {
      params: { blog_id: slug.slug },
    });
    response = response.data;

    if (!response.success) {
      <Alerts val="0" message={response.message} />;
      Navigate = "/Old_blogs";
    }
    response = response.data;
    console.log(response);
    setPost(response[0]);
    // console.log(post);
  }
  //   console.log(`hello`);
  useEffect(() => {
    loadBlog();
  }, []);
  return (
    <>
      {post == {} ? (
        <CircularProgress />
      ) : (
        <div class="container mt-5">
          <div class="row">
            <div class="col-md-6">
              <img src={post.img} class="img-fluid rounded" alt="Post Image" />
            </div>
            <div class="col-md-6">
              <h2 class="font-weight-bold">{post.title}</h2>

              <p>{post.blog}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
