import React, { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import axios from "axios";
import 'react-quill/dist/quill.snow.css';
import "./index.css"
import { useParams , useHistory } from "react-router";
import { APIEndpoint } from "../../utilities/apiEndpoint";
  
const apiEndpoint = `${APIEndpoint}/article/`
 

const EditingScreen = () => {
const [data, setData] = useState({})

const fetchData = ({ id, setValue, setTitle }) => {
 
  axios.get(`${apiEndpoint}/${id}`).then((res) => { 
    setData(res.data)
    setTitle(res.data.title)
    setValue(res.data.body)
  })
}

const history = useHistory();
const navigate = () => {
  history.push(`/`)
}

const createRequest = ({ title, value, id }) => {  
  const articleObject = {
    auther:data.auther,//add name by fetching the article  
    content: value,
    updatedOn: new Date(),
    title
  } 
  axios.put(`${apiEndpoint}/${id}`, { ...articleObject })
    .then(res => { 
      navigate();
    })
}

 
  let { id } = useParams();
  const [value, setValue] = useState(''); //reduce these to only use one object 
  const [title, setTitle] = useState('');
  useEffect(() => {
    fetchData({ id, setValue, setTitle, title, value });
  }, [null])

  return (
    <div className="container">
      <div className="mainTitle">Edit article</div>
      <div className="titleContainer">
        <label className="lableSpacingTitle" >Title </label>
        <input type="email" className="form-control" value={title} onChange={(e) => { setTitle(e.target.value) }} placeholder="Enter title here" />
      </div>
     
      <div className="editorContainer">
        <label className="lableSpacingBody" > Body </label>
        <ReactQuill className={"editor"} theme="snow" value={value} onChange={setValue} />
        <div className="buttonContainer">
          <button type="button" className="btn btn-primary" onClick={() => { createRequest({ title, value, id }) }}>Publish</button>
        </div>
      </div>
    </div>
  );
}
export default EditingScreen