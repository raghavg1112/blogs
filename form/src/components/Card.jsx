import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
export default function Card({ blog }) {
  return (
    <>
      <div className="view overlay">
        <img
          className="card-img-top bg-image hover-zoom "
          src={blog.img}
          alt="Card image cap"
          style={{ height: "170px", overflow: "hidden", objectFit: "cover" }}
        />
      </div>

      <div className="card-body">
        <h4 className="card-title">{blog.title}</h4>

        <p className="mt-4 card-text">
          Published on:-{dayjs(blog.date).format("MM/DD/YYYY")}
        </p>
        <Link to={`/show_blog/${blog._id}`}>{"Read>>"}</Link>
      </div>
    </>
  );
}
