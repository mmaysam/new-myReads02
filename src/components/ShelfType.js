import React from "react";
import CurrentlyR from "./CurrentlyR";
import WantToR from "./WantToR";
import Read from "./Read";
const ShelfType = ({ books, updateBookShelf }) => {
  return (
    <div>
      <CurrentlyR updateBookShelf={updateBookShelf} books={books} />
      <WantToR updateBookShelf={updateBookShelf} books={books} />
      <Read updateBookShelf={updateBookShelf} books={books} />
    </div>
  );
};

export default ShelfType;
