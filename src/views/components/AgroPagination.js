import React from 'react'

import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

const AgroPagination = ({ count, itemsPerPage, page, setPage }) => {
  const maxPageNumber = Math.floor(count / itemsPerPage) - 1
  const maxPaginationItems = 5

  const pages = () => {
    const arr = []
    if (maxPageNumber < 5) {
      for (let i = 0; i <= maxPageNumber; i += 1) {
        arr.push(i + 1)
      }
    } else {
      let startPage
      if (maxPageNumber - page < maxPaginationItems) {
        startPage = maxPageNumber - maxPaginationItems
      } else {
        startPage = page >= 2 ? page - 2 : 0
      }
      const endPage = Math.min(startPage + 5, maxPageNumber)
      for (let i = startPage; i <= endPage; i += 1) {
        arr.push(i + 1)
      }
    }
    return arr
  }

  return count / itemsPerPage > 1 ? (
    <nav>
      <Pagination>
        <PaginationItem>
          <PaginationLink
            aria-label="Previous"
            onClick={() => {
              if (page >= 1) {
                setPage(page - 1)
              }
            }}
          >
            <span aria-hidden>
              <i aria-hidden className="tim-icons icon-double-left" />
            </span>
          </PaginationLink>
        </PaginationItem>
        {pages().map((item) => (
          <PaginationItem
            className={item === page + 1 ? 'active' : ''}
            key={`page_${item}`}
          >
            <PaginationLink
              onClick={() => {
                setPage(item - 1)
              }}
            >
              {item}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationLink
            aria-label="Next"
            onClick={() => {
              if (page < maxPageNumber) {
                setPage(page + 1)
              }
            }}
          >
            <span aria-hidden>
              <i aria-hidden className="tim-icons icon-double-right" />
            </span>
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    </nav>
  ) : null
}

export default AgroPagination
