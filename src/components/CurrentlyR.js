import React from "react";
import Shelf from "./Shelf";

const CurrentlyR = ({ books, updateBookShelf }) => {
  const currentlyReading = books.filter(
    (book) => book.shelf === "currentlyReading"
  );

  return (
    <div>
      <Shelf
        title="Currently Reading "
        books={currentlyReading}
        updateBookShelf={updateBookShelf}
      />
    </div>
  );
};

export default CurrentlyR;
