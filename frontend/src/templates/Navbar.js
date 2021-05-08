import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import "./Navbar.css";
import "./../pluginCSS/draftJS.css";
import { connect } from "react-redux";
import { checkAuthentication } from "../store/actionCreators/auth";
import { useHistory } from "react-router";

function Navbar({ children ,  auth , checkAuthentication }) {
    const [showDropDown, setShowDropDown] = useState(false) 

    useEffect(() => {
        checkAuthentication()
    }, [ ])

    const history = useHistory(); 

    const logout = () =>{ 
        localStorage.removeItem('token')
        checkAuthentication()
        history.push(`/login`)
    }
 

    const toggleDropDown = () => {
        setShowDropDown(!showDropDown)
    }

    const PrivateMenuItems = () => {
        return (
            <> 
                <li className="nav-item" onClick={() => toggleDropDown()} >
                    <Link className="nav-link" to="/write">Write</Link>
                </li>
                <li className="nav-item" onClick={() => toggleDropDown()} >
                    <Link className="nav-link" to="/manage">Manage</Link>
                </li>
                <li className="nav-item" onClick={() => toggleDropDown()} >
                    <Link className="nav-link" to="/settings">Settings</Link>
                </li>
                <li className="nav-item" onClick={() => toggleDropDown()} >
                    <div className="nav-link" onClick={()=>{logout()}}>Logout</div>
                </li>
            </>
        )
    }

    const UserMenuItems = () => {
        return (
            <>  
                <li className="nav-item" onClick={() => toggleDropDown()} >
                    <Link className="nav-link" to="/login">Log in</Link>
                 </li> 
            </>
        )
    }

    return (
        <div>
            <header>
                <div className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <div className="container-fluid">
                        <div className="navbar-brand" >Article Hub</div>
                        <button className="navbar-toggler" onClick={() => toggleDropDown()} type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className={` collapse navbar-collapse ${showDropDown ? 'show' : ''}`} id="navbarCollapse">
                           
                            <ul className=" nav navbar-nav ml-auto w-100 justify-content-end">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Home</Link>
                                </li>

                                { auth? <PrivateMenuItems /> :< UserMenuItems />} 
                           

                            </ul> 
                        </div>
                    </div>
                </div>
            </header>
            <div className="pageDetails">
                {children}
            </div>
        </div>
    )
}

const mapStateToProps = (store) => ({
    auth: store.auth.authenticated,
  });

export default connect(mapStateToProps, { checkAuthentication   })(Navbar);
// export default Navbar
