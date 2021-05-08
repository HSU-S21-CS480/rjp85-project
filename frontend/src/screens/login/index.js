import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "./index.css";
import { useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import { initAuthentication } from "../../store/actionCreators/auth";
import { APIEndpoint } from '../../utilities/apiEndpoint';

const apiEndpoint = `${APIEndpoint}/user/login`
 
function LoginScreen() {
    const history = useHistory();

    const submitForm = () => {
        initAuthentication()
        axios.post(apiEndpoint, formObject).then((res) => { 
            if(res.data.err){
               alert("User not found")
            }else{
                localStorage.setItem('token', res.data.token) 
                window.location.reload(false) 
                history.push('/') 
            } 
        })

    }

    const [formObject, setFormObject] = useState({})

    const generateFormObject = (target) => {
        setFormObject({ ...formObject, [target.name]: target.value })
    }

    return (
        <div className="contaier">
            <div className="formContainer col-md-4 col-sm-8">
                <div className="card">
                    <div className="card-header"> Login </div>
                    <div className="card-body">
                        <div className="input-group mb-4">
                            <div className="col-md-10  col-sm-12 mx-auto  mt-4">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="email" name="email" placeholder="user@testmail.com" onChange={(e) => { generateFormObject(e.target) }} />
                            </div>
                            <div className="col-md-10 col-sm-12 mx-auto  mt-4">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={(e) => { generateFormObject(e.target) }} />
                            </div>
                            <div className="col-md-8 mx-auto  mt-4 buttonContainer">
                                <button type="submit" className="mx-auto btn btn-primary" onClick={() => { submitForm() }} >Submit</button>
                            </div>
                            <div className="row ">
                                <div className="col-md-12 co-sm-12 col-lg-12 col-md-offset-3">
                                    <div className="loginTextContainer">
                                        <p>  Don't you have an account ? <Link className="signupLink " to="/signup"> Signup </Link> now.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(null, { initAuthentication })(LoginScreen);
