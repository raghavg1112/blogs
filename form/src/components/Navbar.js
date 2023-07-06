import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
    const Navigate = useNavigate();
    const logout = (e) => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user_id");
        localStorage.getItem("name");
        Navigate('/')
    }
    return (
        <>
           
            <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
                <div className="container-fluid d-flex justfy-between">
                    <div className='d-flex justify-between'>
                        <Link className="navbar-brand " to="/">My Blogs</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <div>
                        {localStorage.getItem("authToken") ? (<div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav  mb-2 mb-lg-0">
                            <li className="nav-item">
                                    <Link className="nav-link " aria-current="page" to="/create_blog">Create Blog</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link " aria-current="page" to="/Old_blogs">Old Blogs</Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link " to="/login" onClick={(e) => { logout(e) }} >Log Out</Link>
                                </li>
                            </ul>

                        </div>)
                            :
                            (<div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link " aria-current="page" to="/">Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">Register</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className="nav-link " to="/login" >Login</Link>
                                    </li>
                                </ul>

                            </div>)

                        }
                    </div>
                </div>
            </nav>
        </>
    )
}
