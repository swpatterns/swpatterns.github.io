---
title: "Iterator - JavaScript"
date: 2025-12-03T13:10:17.530-05:00
draft: false
pattern_usage: ["Iterator"]
language: ["JavaScript"]
---
The Iterator pattern provides a way to access the elements of an object sequentially without exposing its underlying representation. It defines a standard interface for traversing collections, allowing clients to request the next element without knowing how it's implemented.

The code defines a `BookCollection` class that acts as a collection.  It also defines a `BookIterator` class which implements the iterator interface (with `next()` and `hasNext()`). The `BookCollection` returns an instance of this iterator. This allows a client to iterate through the books without knowing the collection’s internal array structure.  Using JavaScript's class syntax and generator functions (in the iterator) is a modern and idiomatic approach to implementing this pattern. Generator functions simplify the creation of iterators by handling the state automatically with `yield`.

```javascript
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  toString() {
    return `${this.title} by ${this.author}`;
  }
}

class BookCollection {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
  }

  createIterator() {
    return new BookIterator(this.books);
  }
}

class BookIterator {
  constructor(books) {
    this.books = books;
    this.index = 0;
  }

  hasNext() {
    return this.index < this.books.length;
  }

  next() {
    if (this.hasNext()) {
      return this.books[this.index++];
    }
    return null; // Or throw an error, depending on desired behavior
  }
}



// Example usage:
const collection = new BookCollection();
collection.addBook(new Book("The Lord of the Rings", "J.R.R. Tolkien"));
collection.addBook(new Book("Pride and Prejudice", "Jane Austen"));
collection.addBook(new Book("1984", "George Orwell"));

const iterator = collection.createIterator();

while (iterator.hasNext()) {
  const book = iterator.next();
  console.log(book.toString());
}
```