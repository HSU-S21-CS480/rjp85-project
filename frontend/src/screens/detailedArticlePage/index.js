import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css"
import { APIEndpoint  } from "../../utilities/apiEndpoint";
const DetailedArticleScreen = (props) => {

  const articleID = props.match.params.id
  const apiEndpoint = `${APIEndpoint}/article/${articleID}`
  const [article, setArticle] = useState([])

  useEffect(() => {
    axios.get(apiEndpoint)
      .then(res => {
        setArticle(res.data) 
      })
  }, [])


  return (
    <div className="card cardWrapperOfDetailedArticlePage"  > 
      <div className="card-body">
        <div className="title">{article.title}</div>
      </div>
      <div className="articleWrapper"
        dangerouslySetInnerHTML={{
          __html:  article.body 
        }}></div>
 
    </div>

  );
}
export default DetailedArticleScreen