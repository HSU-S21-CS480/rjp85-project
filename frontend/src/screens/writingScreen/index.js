import React, { useState } from "react";
import ReactQuill from 'react-quill';
import axios from "axios";
import 'react-quill/dist/quill.snow.css';
import "./index.css" 
import { safeJwtDecode } from "../../utilities/safeJwtDecode";
import { useHistory } from "react-router-dom";
import { APIEndpoint } from "../../utilities/apiEndpoint";
 
const apiEndpoint = `${APIEndpoint}/article`
 
const WritingScreen = () => {

  const history = useHistory();
  const navigate = () => {
    history.push(`/`)
  }

  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');


  const createRequest = (title, content) => {
    const toeknData = safeJwtDecode();
    const date =   new Date() ;
    const articleObject = {
      auther: toeknData.userName,
      content,
      createdOn: date,  
      updatedOn: date,
      title,
      writerId: toeknData.uid
    }
    axios.post(apiEndpoint, { articleObject }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        navigate()
      })
  }
  

  return (
    <div className="container">
      
      {/* <div className="mainTitle">Create new article</div> */}
            <div className="mainTitle"><h1>Create a new article</h1></div>
      <div className="titleContainer">
        <label className="lableSpacingTitle" >Title </label>
        <input type="email" className="form-control" value={title} onChange={(e) => { setTitle(e.target.value) }} placeholder="Enter title here" />
      </div>
      <div className="editorContainer">
        <label className="lableSpacingBody" > Body </label>
        <ReactQuill className={"editor"} theme="snow" value={value} onChange={setValue} /> 
        <div className="buttonContainer">
          <button type="button" className="btn btn-primary" onClick={() => { createRequest(title, value) }}>Publish</button>
        </div>
      </div>
    </div>
  );
}
export default WritingScreen