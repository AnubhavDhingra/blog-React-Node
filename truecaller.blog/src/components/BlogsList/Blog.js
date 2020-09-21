import React from 'react';
import parse from 'html-react-parser';

const blog = (props) => {
    return (
        <div className="card mb-3" onClick={props.clickedBlog}>
            <img src={props.thumbnail} alt="post_thumbnail" className="card-img-top" />
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.content ? parse(props.content) : null}</p>
                <p className="card-text"><small class="text-muted">{props.modified}</small></p>
            </div>
        </div>
    )
}

export default blog;
