import "./index.css";
import React, { useEffect, useState } from 'react'

import { safeJwtDecode } from "../../utilities/safeJwtDecode";
import axios from "axios";
import { Formik, Form } from 'formik';
import { TextField } from '../../components/TextFeild/TextField.js';
import * as Yup from 'yup';
import { APIEndpoint } from "../../utilities/apiEndpoint";

const data = safeJwtDecode();

const userDataUpdateURL = `${APIEndpoint}/user/emailUsername/${data.uid}`
const accountDataUpdateURL = `${APIEndpoint}/user/changePW/${data.uid}`


function SettingsScreen() {
 
    const validateUser = Yup.object({
        userName: Yup.string()
            .min(15, 'Must be 10 characters or more')
            .required('Required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
    })

    const validatePassword = Yup.object({
        password: Yup.string()
            .min(6, 'Password must be at least 6 charaters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Password must match')
            .required('Confirm password is required'),
        newPassword: Yup.string()
            .notOneOf([Yup.ref('password'), null], 'Enter a new password')
            .min(6, 'New password must be at least 6 charaters')
            .required('New password is required'),
    })


    return (
        <div className="container">
            <div className="mainTitle"><h1>Settings</h1></div>
            <div className="settingsContainer">
                <div className="row">
                    <Formik
                        initialValues={{
                            userName: '',
                            email: '',
                        }}
                        validationSchema={validateUser}
                        onSubmit={values => {
                            axios.post(userDataUpdateURL, {
                                ...values
                            }).then(() => {
                                alert('User settings updated !')
                            })
                        }}
                    >
                        <div>
                            <h3 className="my-4 font-weight-normal .display-4">User Settings</h3>
                            <Form>
                                <TextField label="User Name" name="userName" type="text" />
                                <TextField label="Email" name="email" type="email" />
                                <button className="btn btn-dark mt-3" type="submit">Submit</button>
                                <button className="btn btn-danger mt-3 ml-3" type="reset">Reset</button>
                            </Form>
                        </div>
                    </Formik>
                </div>

                <div className="row ">
                    <Formik
                        initialValues={{
                            password: '',
                            confirmPassword: '',
                            newPassword: '',
                        }}
                        validationSchema={validatePassword}
                        onSubmit={values => {
                            const { password, newPassword } = values 
                            axios.post(accountDataUpdateURL, {
                                "password": password,
                                "newPassword": newPassword
                            }).then(res => {
                                if (res.status !== 200) {
                                    alert("Old password is wrong ")
                                } else {
                                    alert("Password updated !")
                                }
                            }).catch((e) => {
                                alert("Old password is wrong ")
                            })
                        }}
                    >
                        <div>
                            <h3 className="my-4 font-weight-normal .display-4">Account Settings</h3>
                            <Form>
                                <TextField label="Password" name="password" type="password" />
                                <TextField label="Confirm Password" name="confirmPassword" type="password" />
                                <TextField label="New Password" name="newPassword" type="password" />
                                <button className="btn btn-dark mt-3" type="submit">Submit</button>
                                <button className="btn btn-danger mt-3 ml-3" type="reset">Reset</button>
                            </Form>
                        </div>
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default SettingsScreen