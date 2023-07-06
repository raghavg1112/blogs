import React from 'react'
import { useState } from 'react'
import Axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
export default function Login() {
    const Navigate = useNavigate();
    const [input, setInput] = useState({ username: '', password: '' });
    const handleChange = (e) => {
        const newUser = { ...input }
        newUser[e.target.name] = e.target.value
        setInput(newUser);
    }
    const submit = async (e) => {
        e.preventDefault();
        let response = await Axios.post('http://localhost:5000/login', ({ username: input.username, password: input.password }));
        response = response.data;
       
        if (!response.success) {
            alert(response.message)
        }
        else {
            localStorage.setItem("authToken", response.authToken);
            localStorage.setItem("user_id", response.user_id);

            Navigate('/')
        }
    }
    return (
        <>
            <section className="vh-75 mt-5 " style={{ "background-color": "#eee;" }}>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ "border-radius": "25px;" }}>
                                <div className="card-body ">
                                    <div className="row justify-content-center">
                                        <div className="col-lg-6 col-xl-5 order-2 order-lg-1">

                                            <p className="text-center h1 fw-bold mb-5 mx-1  mt-2">Login</p>

                                            <form className="mx-1 mx-md-3">



                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>

                                                    <input type="email" id="form3Example3c" className="form-control" placeholder='email' name='username' onChange={(e) => { handleChange(e) }} />


                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>

                                                    <input type="password" id="form3Example4cd" className="form-control" placeholder='Password' name='password' onChange={(e) => { handleChange(e) }} />


                                                </div>


                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-4">
                                                    <button type="button" className="btn btn-primary btn-lg m-2" onClick={(e) => { submit(e) }}>Login</button>
                                                    <Link to='/register' className='btn btn-danger btn-lg m-2'>Not a User</Link>
                                                </div>


                                            </form>

                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                                className="img-fluid" alt="Sample image" />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
