import React from 'react';
import Blog from './Blog';
import axios from 'axios';

import Pagination from '../Pagination';
import banner from '../../assets/cropped-blog-header.png';
import Loader from '../UI/Loader';
import './BlogList.css';


class BlogsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            blogList : [],
            pageCount : 0,
            loading : true,
            categories: [],
            tags: []
        }
    } 

    componentDidMount() {
        this.getTopCategories();
        this.getTopTags();
        this.getBlogsList();
    }

    getTopTags() {
        axios.get('http://localhost:3001/getTags')
        .then(r => {
            this.setState({
                tags: r.data.tags.slice(0,9)
            })
        })
    }

    getTopCategories() {
        axios.get('http://localhost:3001/getCategories')
        .then(r => {
            this.setState({
                categories: [...r.data.categories]
            })
        })
    }

    handleTagClick = (data) => {
        this.getBlogsList(0,data.name, '');
    }

    handleCategoryClick = (data) => {
        this.getBlogsList(0,'',data.name);
    }

    getBlogsList = (page=0,tag='',category='') => {
        this.setState({loading: true});
        let data = {
            page,
            tag,
            category,
        }
        axios.post('http://localhost:3001/getPosts', data)
            .then(r => {
                let pageCount;
                pageCount = Math.ceil(r.data.found / r.data.posts.length);
                this.setState({
                    blogList : r.data.posts,
                    pageCount : pageCount,
                    loading : false
                });
            });
    }

    handleClickBlog = (e) => {
        this.props.history.push({
            pathname: '/post',
            search: '?id=' + e.ID,
            state: {
                blog: e
            }
        })
    }

    render() {
        let topCategories = (
            this.state.categories ? 
                this.state.categories.map((el, i) => (
                    <li key={i} onClick={() => this.handleCategoryClick(el)}>{el.name.toUpperCase()}</li>
                )) 
            : null
        );

        let topTags = (
            this.state.tags ? 
                this.state.tags.map((el,i) => (
                    <li key={i} onClick={() => this.handleTagClick(el)}>{el.name.toUpperCase()}</li>
                ))
            : null
        )

        let blogListing = null;

        if (this.state.blogList) {
            blogListing = this.state.blogList.map(el => (
                    <Blog
                        key = {el.ID}
                       title = {el.title}
                       content = {el.content}
                       dateModified = {el.modified}
                       clickedBlog = {() => this.handleClickBlog(el)}
                       thumbnail = {el.post_thumbnail ? el.post_thumbnail.URL : null}
                    ></Blog>
            ))
        }

        return (

            !this.state.loading ? (
                <React.Fragment>
                <section className="banner">
                    <img src={banner} alt="banner"/>
                </section>
                <section className="middle-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                {blogListing}
                            </div>
                            <div className="col-lg-4 categories">
                                <h5>TOP CATEGORIES</h5>
                                <ul className="listing-unordered">
                                    {topCategories}
                                </ul>
                                <h5>TOP TAGS</h5>
                                <ul className="listing-unordered">
                                    {topTags}
                                </ul>
                            </div>
                        </div>
                        <Pagination
                            pageCount={this.state.pageCount}
                            updateBlogList={this.getBlogsList}
                        ></Pagination>
                    </div>
                </section>
                </React.Fragment>
            )
                : <Loader></Loader>

        )
    }
}

export default BlogsList;