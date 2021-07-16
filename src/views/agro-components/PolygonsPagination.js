import React, {useEffect, useState} from 'react';

import {
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

const ReactPagination = ({ count, itemsPerPage, page, setPage }) => {

  const maxPage = Math.ceil(count / itemsPerPage);

  const pages = () => {
    let arr = [];
    for (let i=0; i < maxPage; i++ ) {
      arr.push(i + 1)
    }
    return arr
  }

  return ( count / itemsPerPage > 1 ?
    <nav>
      <Pagination>
        <PaginationItem>
          <PaginationLink
            aria-label="Previous"
            href="#pablo"
            onClick={(e) => {
              e.preventDefault();
              if (page >= 2) {
                setPage(page-1);
              }
            }}
          >
            <span aria-hidden={true}>
              <i
                aria-hidden={true}
                className="tim-icons icon-double-left"
              />
            </span>
          </PaginationLink>
        </PaginationItem>
        {pages().map(item => (
            <PaginationItem
              className={item === page ? "active" : ""}
              key={'page_' + item}
            >
              <PaginationLink
                href="#pablo"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(item);
                }}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          ))
        }
        <PaginationItem>
          <PaginationLink
            aria-label="Next"
            href="#pablo"
            onClick={(e) => {
              e.preventDefault();
              if (page <= maxPage - 1) {
                setPage(page+1);
              }
            }}
          >
            <span aria-hidden={true}>
              <i
                aria-hidden={true}
                className="tim-icons icon-double-right"
              />
            </span>
          </PaginationLink>
        </PaginationItem>
    </Pagination>
    </nav> : null
  )
}

export default ReactPagination