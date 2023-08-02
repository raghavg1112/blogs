import React from "react";
import { Link } from "react-router-dom";

export default function Card({ blog }) {
  return (
    <>
      <div className="view overlay">
        <img className="card-img-top" src={blog.img} alt="Card image cap" />
        <a href="#!">
          <div className="mask rgba-white-slight"></div>
        </a>
      </div>

      <div className="card-body">
        <h4 className="card-title">{blog.title}</h4>

        <p className="mt-4 card-text">Published on:-{blog.date}</p>
        <Link to={`/show_blog/${blog._id}`}>{"Read>>"}</Link>
      </div>
    </>
  );
}
