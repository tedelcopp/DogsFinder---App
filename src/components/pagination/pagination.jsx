import { useState } from "react";
import "./pagination.css";

const Pagination = ({ dogs, dogsInPage }) => {
  let totalPages = Math.floor(dogs.length / 8);
  let renderPageButtons = [];
  let index = 1;
  while (totalPages > 0) {
    renderPageButtons.push(index);
    index++;
    totalPages--;
  }

  const handleClick = (page) => {
    dogsInPage(page);
  };

  return (
    <div className="div-paginador">
      {renderPageButtons?.map((page, key) => (
        <button
          className="boton-paginador"
          key={key}
          onClick={() => handleClick(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
