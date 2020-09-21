import React from 'react';
import ReactPaginate from 'react-paginate';

class Pagination extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0
        }
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        this.setState({currentPage: selected}, () => {
            this.props.updateBlogList(this.state.currentPage);
        })
    }


    render() {
        return (
            <div>
                <ReactPaginate
                    // previousLabel={'previous'}
                    // nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={this.props.pageCount} // this.props. pass page count from parent
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    // subContainerClassName={'pages pagination'}
                    // activeClassName={'active'}
                />
            </div>
        )
    }
}

export default Pagination;