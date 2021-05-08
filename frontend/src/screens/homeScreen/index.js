import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ArticleCard from '../../components/articleCard'
import { APIEndpoint } from '../../utilities/apiEndpoint';
import "./index.css"; 

const apiEndpoint = `${APIEndpoint}/article`
 
const saerchAPIEndpoint= `${apiEndpoint}/search`

const HomeScreen = () => {

  const [articles, setArticles] = useState([])
  const [searchKeyword, setSearchKeyword] = useState('')
  const [disable, setDisable] = useState(true)
 
  const fetchAllArticles = ()=>{
      axios.get(apiEndpoint)
      .then(res => {
        setArticles(listToMatrix(res.data, 3))
      })
  }

  useEffect(() => {
    fetchAllArticles()
  }, [])

  const listToMatrix = (list, elementsPerSubArray) => {
    var matrix = [], i, k;
    for (i = 0, k = -1; i < list.length; i++) {
      if (i % elementsPerSubArray === 0) {
        k++;
        matrix[k] = [];
      }
      matrix[k].push(list[i]);
    }
    return matrix;
  }


  const search = () => {
    axios.post(saerchAPIEndpoint, {"query":searchKeyword})
      .then(res => {
        setArticles(listToMatrix(res.data, 3))
      })
  }
  const change = (e) => {
    if (e.target.value.length == 0) {
      setDisable(true)
    fetchAllArticles()
    } else {
      setDisable(false)
    }
    setSearchKeyword(e.target.value)
  }


  return (

    <div>
      <div className="searchBarContainer">
        <div className="searchBar">
          <input type="text" className="form-control"
            onChange={(e) => {
              change(e)
            }}
            value={searchKeyword}
          />
        </div>
        <div className="searchButton">
          <button type="button" className="btn btn-light" onClick={() => { search() }} disabled={disable}>Search</button>
        </div>
      </div>

      <div className="articleListContainer">
        <div className="container ">
          <div className="articleList">
          {articles.map((articleRow) => {
            return (
              <div className="row" key={articleRow[0]['id']}>
                {articleRow.map((article) => { 
                  return (
                    <div className="col-sm-12 col-md-4 col-lg-4 " key={article.id}>
                      <ArticleCard  content={article}   />
                    </div>
                  )
                })}
              </div>
            )
          })}
          </div>
        </div>
      </div>
    </div>

  )
}


export default HomeScreen







