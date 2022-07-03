import React, { useState, useEffect } from "react";
import * as BooksAPI from "../BooksAPI";
import "../App.css";
import Header from "./Header";
import ShelfType from "./ShelfType";
import { Link } from "react-router-dom";

const BooksApp = () => {
  const [books, setBooks] = useState([]);
  const [mapOfId, setMapOfId] = useState(new Map());
  const [booksInSearch, setbooksInSearch] = useState([]);
  const [mergedBooks, setMergedBooks] = useState([]);

  const [query, setQuery] = useState("");

  useEffect(() => {
    BooksAPI.getAll().then((data) => {
      setBooks(data);
      setMapOfId(createMapOfBooks(data));
    });
  }, []);

  useEffect(
    () => {
      let isActive = true;
      if (query) {
        BooksAPI.search(query).then((data) => {
          if (data.error) {
            setbooksInSearch([]);
          } else {
            if (isActive) {
              setbooksInSearch(data);
            }
          }
        });
      }
      return () => {
        isActive = false;
      };
    },
    [query]
  );
  useEffect(
    () => {
      const combined = booksInSearch.map((book) => {
        if (mapOfId.has(book.id)) {
          return mapOfId.get(book.id);
        } else {
          return book;
        }
      });
      setMergedBooks(combined);
    },
    [booksInSearch]
  );

  const createMapOfBooks = (books) => {
    const map = new Map();
    books.map((book) => map.set(book.id, book));
    return map;
  };
  const updateBookShelf = (book, whereTo) => {
    const updatedBooks = books.map((b) => {
      if (b.id === book.id) {
        b.shelf = whereTo;
        return book;
      }
      return b;
    });
    setBooks(updatedBooks);
    BooksAPI.update(book, whereTo);
  };

  return (
    <div className="app">
      <div className="list-books">
        <Header />
        <div className="list-books-content">
          <ShelfType books={books} updateBookShelf={updateBookShelf} />
        </div>

        <div className="open-search">
          <Link to="/search">
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BooksApp;
