import React from "react";
import Shelf from "./Shelf";

const Read = ({ books, updateBookShelf }) => {
  const read = books.filter((book) => book.shelf === "read");
  return (
    <div>
      <Shelf title="Read " books={read} updateBookShelf={updateBookShelf} />
    </div>
  );
};

export default Read;
