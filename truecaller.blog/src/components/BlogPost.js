import React from 'react';
import parse from 'html-react-parser';
import axios from 'axios';

import Blog from './BlogsList/Blog';
import './BlogPost.css';
// import { Link } from 'react-router-dom';

class BlogPost extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            blog: {},
            relatedPosts: []
        }
    }

    componentDidMount() {
        this.setState({
            blog: { ...this.props.location.state.blog }
        }, () => this.getRelatedPosts())
    }

    getRelatedPosts() {
        let data = {
            id: this.state.blog.ID
        }
        axios.post('http://localhost:3001/getRelatedPosts', data)
            .then((r) => {
                this.setState({
                    relatedPosts: [...r.data]
                })
            })
    }

    handleClickBlog = (data) => {
        this.setState({
            blog: { ...data }
        }, () => this.getRelatedPosts())
    }

    render() {
        let content = (
            this.state.blog.content ?
                <div className="blog-content">
                    {parse(this.state.blog.content)}
                </div> : null
        )

        let categories = (
            this.state.blog.categories ?
                Object.keys(this.state.blog.categories).map((el, i) => (
                    <span key={i}>{this.state.blog.categories[el].name}</span>
                ))
                : null
        )

        let image = (
            this.state.blog.post_thumbnail ?
                (
                    <img
                        className="main-image"
                        src={this.state.blog.post_thumbnail.URL}
                        alt="post_image"></img>
                )
                : null
        );


        let relatedLinks = (
            this.state.relatedPosts ?
                (<div>
                    {
                        this.state.relatedPosts.map((el, i) => (
                            <Blog
                                key={i}
                                title={el.title}
                                content={el.content}
                                thumbnail={el.post_thumbnail.URL}
                                dateModified={el.modified}
                                clickedBlog={() => this.handleClickBlog(el)}
                            ></Blog>
                        ))
                    }
                </div>)
                : null
        );

        return (
            <section className="middle-section">

                <div className="container">
                    {/* <Link to>Home</Link> */}
                    <div className="row">
                        <div className="col-lg-8">
                            {image}
                            <h3>{this.state.blog.title}</h3>
                            {categories}
                            {content}
                        </div>
                        <div className="col-lg-4">
                            <h5>{"Similar Posts".toUpperCase()}</h5>
                            {relatedLinks}
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default BlogPost;