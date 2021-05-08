import React, { useEffect, useState } from "react";
import axios from "axios";
import 'react-quill/dist/quill.snow.css';
import "./index.css"
import { useHistory } from "react-router-dom";
import { getDate } from "./../../utilities/calculateTime";
import { safeJwtDecode } from "../../utilities/safeJwtDecode";
import { APIEndpoint } from "../../utilities/apiEndpoint";

const apiEndpoint = `${APIEndpoint}/article/`

const ManageScreen = () => {
  const history = useHistory();
  const token = localStorage.getItem('token')
  const toeknData = safeJwtDecode();

  const [articles, setArticles] = useState([])

  const fetchArticles = () => {
    axios.get(`${apiEndpoint}get/${toeknData.uid}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        setArticles(res.data)
      })
  }
  useEffect(() => {
    fetchArticles()
  }, [])


  const ActionButtons = (id) => {
    return (
      <div className="actionButtonContainer">
        <div className="buttonWrapper"> <button type="button" className="btn btn-success" onClick={() => { editArticle(id) }}>Edit</button>    </div>
        <div className="buttonWrapper"> <button type="button" className="btn btn-danger" onClick={() => { deleteArticle(id) }}>Delete</button></div>
      </div>
    )
  }

  const deleteArticle = ({ id }) => {
    axios.delete(`${apiEndpoint}${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        fetchArticles()
      })
  }

  const editArticle = ({ id }) => {
    history.push(`edit/${id}`)
  }

  return (
    <div className="container">
      <div className="mainTitle"><h1>Articles published by you</h1></div>
      {/* <div className="mainTitle">Articles published by you</div> */}
      <div className="tableWrapper">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Published on</th>
              <th scope="col" className="actionsTh" >Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              articles.map(article => {
                return (
                  <tr key={article.id}>
                    <td> {article.title}</td>
                    <td>{getDate(article.created_on)}</td>
                    <td>
                      <ActionButtons id={article.id} />
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default ManageScreen