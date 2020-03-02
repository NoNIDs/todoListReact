import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLimit: 5,
      pageNeighbours: 2,
      currentPage: 1
    };
    this.state = props;
  }

  componentDidMount() {
    const { pageLimit, pageNeighbours } = this.state;
    this.gotoPage(1);
    this.pageLimit = typeof pageLimit === "number" ? pageLimit : 5;

    this.pageNeighbours =
      typeof pageNeighbours === "number"
        ? Math.max(0, Math.min(pageNeighbours, 2))
        : 0;
  }

  gotoPage = page => {
    const { onPageChanged = f => f } = this.props;
    const { pageLimit } = this.state;

    const currentPage = Math.max(0, Math.min(page, this.props.totalPages));

    const paginationData = {
      currentPage,
      pageLimit: pageLimit
    };

    this.setState({ currentPage }, () => onPageChanged(paginationData));
  };

  handleClick = (page, evt) => {
    evt.preventDefault();
    this.gotoPage(page);
  };

  handleMoveLeft = evt => {
    evt.preventDefault();
    this.gotoPage(this.state.currentPage - 1);
  };

  handleMoveRight = evt => {
    evt.preventDefault();
    this.gotoPage(this.state.currentPage + 1);
  };

  fetchPageNumbers = () => {
    const { currentPage, pageNeighbours } = this.state;

    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (this.props.totalPages > totalBlocks) {
      let pages = [];

      const leftBound = currentPage - pageNeighbours;
      const rightBound = currentPage + pageNeighbours;
      const beforeLastPage = this.props.totalPages - 1;

      const startPage = leftBound > 2 ? leftBound : 2;
      const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

      pages = range(startPage, endPage);

      const pagesCount = pages.length;
      const singleSpillOffset = totalNumbers - pagesCount - 1;

      const leftSpill = startPage > 2;
      const rightSpill = endPage < beforeLastPage;

      const leftSpillPage = LEFT_PAGE;
      const rightSpillPage = RIGHT_PAGE;

      if (leftSpill && !rightSpill) {
        const extraPages = range(startPage - singleSpillOffset, startPage - 1);
        pages = [leftSpillPage, ...extraPages, ...pages];
      } else if (!leftSpill && rightSpill) {
        const extraPages = range(endPage + 1, endPage + singleSpillOffset);
        pages = [...pages, ...extraPages, rightSpillPage];
      } else if (leftSpill && rightSpill) {
        pages = [leftSpillPage, ...pages, rightSpillPage];
      }

      return [1, ...pages, this.props.totalPages];
    }

    return range(1, this.props.totalPages);
  };

  render() {
    const { currentPage } = this.state;
    const pages = this.fetchPageNumbers();
    console.log("click");
    return (
      <Fragment>
        <nav aria-label="Todos Pagination">
          <ul className="pagination">
            {pages.map((page, index) => {
              if (page === LEFT_PAGE)
                return (
                  <li key={index} className="page-item">
                    <a
                      className="page-link"
                      href="#"
                      aria-label="Previous"
                      onClick={this.handleMoveLeft}
                    >
                      <span aria-hidden="true">&laquo;</span>
                      <span className="sr-only">Previous</span>
                    </a>
                  </li>
                );

              if (page === RIGHT_PAGE)
                return (
                  <li key={index} className="page-item">
                    <a
                      className="page-link"
                      href="#"
                      aria-label="Next"
                      onClick={this.handleMoveRight}
                    >
                      <span aria-hidden="true">&raquo;</span>
                      <span className="sr-only">Next</span>
                    </a>
                  </li>
                );

              return (
                <li
                  key={index}
                  className={`page-item${
                    currentPage === page ? " active" : ""
                  }`}
                >
                  <a
                    className="page-link"
                    href="#"
                    onClick={e => this.handleClick(page, e)}
                  >
                    {page}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </Fragment>
    );
  }
}

Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  pageNeighbours: PropTypes.number,
  onPageChanged: PropTypes.func
};

export default Pagination;
