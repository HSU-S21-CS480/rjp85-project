import axios from 'axios';
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import "./index.css";

import { Formik, Form } from 'formik';
import { TextField } from '../../components/TextFeild/TextField.js';
import * as Yup from 'yup';
import { APIEndpoint } from '../../utilities/apiEndpoint';
  
const apiEndpoint = `${APIEndpoint}/user/signup`
 

const SignUpScreen = () => {

    const history = useHistory()

    const submitForm = (formObject) => { 
        axios.post(apiEndpoint, formObject).then(async res => {
            const data = await res.data
            if (data === 'Error') {
                alert("Email already exists")
            } else {
                alert("Account created successfully !")
                history.push('/login')
            }
        }).catch(error => {
            console.log(error)
        })
    }

    const validateUser = Yup.object({
        userName: Yup.string()
            .min(15, 'Must be 10 characters or more')
            .required('Required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 charaters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Password must match')
            .required('Confirm password is required'),
    })

    return (
        <div className="contaier">
            <div className="signupFormContainer col-md-4 col-sm-8">
                <div className="card">
                    <div className="card-header">  Sign Up </div>
                    <div className="card-body">
                        <div className="input-group mb-4">
                            <div className="col-md-10  col-sm-12 mx-auto  mt-4">
                                <div className="row">
                                    <Formik
                                        initialValues={{
                                            userName: '',
                                            email: '',
                                            password: '',
                                            confirmPassword: ''
                                        }}
                                        validationSchema={validateUser}
                                        onSubmit={values => {
                                            submitForm(values)
                                        }}
                                    >
                                        <div>
                                            <Form>
                                                <TextField label="User Name" name="userName" type="text" />
                                                <TextField label="Email" name="email" type="email" />
                                                <TextField label="Password" name="password" type="password" />
                                                <TextField label="Confirm Password" name="confirmPassword" type="password" />
                                                <div className="loginTextContainer">  <button className="btn btn-primary mt-3" type="submit">Submit</button></div>
                                            </Form>
                                        </div>
                                    </Formik>
                                </div>
                            </div>
                            <div className="col-md-12 co-sm-12 col-lg-12 col-md-offset-3">
                                <br />
                                <div className="loginTextContainer">
                                    <p>   Already has an account ? <Link className="signupLink " to="/login"> Login </Link> now.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SignUpScreen