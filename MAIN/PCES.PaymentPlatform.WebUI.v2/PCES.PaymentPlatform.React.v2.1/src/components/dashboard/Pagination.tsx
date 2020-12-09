import React from 'react';
import { Link } from 'react-router-dom';

interface PaginationProps {
  perPage: number;
  total: number;
  paginate(pageNumber: number): void;
  active: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  perPage,
  total,
  paginate,
  active,
}) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination-content">
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <Link
              to="#"
              className={`page-link ${number === active ? 'active' : null}`}
              onClick={() => paginate(number)}
            >
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
