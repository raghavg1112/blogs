import React from 'react'
import Axios from 'axios'
import { useState, useEffect } from 'react'
export default function Public_blogs() {
    const [blogs, setBlogs] = useState([])


    const load_data = async () => {
        let response = await Axios.get('http://localhost:5000/get_all_blogs');
        response = response.data;
        if (!response.success) {
            alert(response.message)
        }
        else {
            setBlogs(response.data);
        }
    }


    useEffect(()=>{load_data()}, []);
    return (
        <>
            <div className='container ml-5'>
            <div className='row'>
                {blogs.map((blog) => {
                    return (
                       <div className='col-12  col-md- col-lg-3'>
                        <div className="card m-3">

                            <div className="view overlay">
                                <img className="card-img-top" src="https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).webp"
                                    alt="Card image cap" />
                                <a href="#!">
                                    <div className="mask rgba-white-slight"></div>
                                </a>
                            </div>


                            <div className="card-body">


                                <h4 className="card-title">Card title</h4>

                                <p className="card-text">{blog.blog}</p>
                                <p className="card-text">Published on:-{blog.date}</p>


                            </div>

                        </div>
                        </div>

                    )
                })

                }
            </div>
            </div>
        </>
    )
}
