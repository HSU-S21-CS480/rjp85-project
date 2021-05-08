import "./index.css";
import React from 'react'
import { calculateTime } from "../../utilities/calculateTime";
import { useHistory } from "react-router-dom";

function ArticleCard({ content }) { 
    const history = useHistory();
    const navigate = () => {
        history.push(`/article/${content.id}`)
    }

    const extractText = (html)=> { 
        const text =  new DOMParser().parseFromString(html, "text/html") . 
            documentElement . textContent;
        return text.slice(0,150) + " ..."
    }

    return ( 
        <div className=" cardWrapper" onClick={() => { navigate() }}>
            <div className="cardcardStyle">
                <div className="card-body">
                    <h5 className="card-title">{content.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">By {content.writer_name }</h6>
                    <p className="card-text">{ extractText(content.body)}</p>
                    <div className="card-link">written on {calculateTime(content.created_on)}</div>
                </div>
            </div> 
        </div>
    )
}

export default ArticleCard
