import React, { createContext, useEffect } from 'react'
import { useState } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import Edit_blogs from './Edit_blog'
export default function Old_blogs() {
  const [blogs, setBlogs] = useState([]);
  const [blogNum, setBlogNum] = useState(0);
  const blog_param=createContext();
  
  const load_data = async () => {
   
    let response = await Axios.get('http://localhost:5000/my_old_blogs', ({ params: { user_id: localStorage.getItem("user_id") } }));
    response = response.data;
    if(!response.success){
      alert(response.message);
    }
    else{
     response=response.data;
     setBlogs(response);
    }
    
  }
  useEffect(() => {
    load_data()
  }, [])

  const editBlog = async(blog_num) => {
   const response=await Axios.get('http://localhost:5000/my_old_blogs',({params:{user_id:localStorage.getItem("user_id"),blog_num:blog_num}}))
   
  }
  const deleteBlog = async(blog_id) => {
    let response=await Axios.post('http://localhost:5000/delete_blog',({blog_id:blog_id}))
    response=response.data;
    if(!response.success){
      alert(response.message);
    }
    else{alert(response.message);
      load_data();
    }
  }
  return (
    <>
      {
        blogs.length == 0 ? (<div className='m-5 h1'>No initial Blogs</div>)
          :
          (
            <section className="p-4 p-md-5 text-center text-lg-start shadow-1-strong rounded" style={{
              backgroundImage: "url(https://mdbcdn.b-cdn.net/img/Photos/Others/background2.webp)"
            }}
            >
              <div className="row d-flex justify-content-center">
                <div className="col-md-10">

                  {blogs.map((blogs) => {
                    return (
                      <div className="card m-2 shadow-lg">
                        <div className="card-body m-3">
                          <div className="row">
                            <div className="col-lg-4 d-flex justify-content-center align-items-center mb-4 mb-lg-0">
                              <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20%2810%29.webp"
                                className="rounded-circle img-fluid shadow-1" alt="woman avatar" style={{ width: "100", height: "100" }} />
                            </div>
                            <div className="col-lg-8">
                              <p className="text-muted fw-bold mb-4">
                                {blogs.blog}
                              </p>
                              <p className="fw-light text-muted mb-0">Written By:-</p>
                              <p className="fw-bolder mb-2">{localStorage.getItem("name")}</p>
                              <div>
                              
                                 <Link to={`/edit_blog/${blogs._id}/${blogs.blog}`}  className='btn btn-warning m-2'>Edit</Link>
                                <button className='btn btn-danger m-2' onClick={() => { deleteBlog(blogs._id) }}>Delete Blog</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })

                  }

                </div>
              </div>
            </section>
          )
      }
    </>
  )
}


