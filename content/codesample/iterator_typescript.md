---
title: "Iterator - TypeScript"
date: 2025-12-03T13:10:34.183-05:00
draft: false
pattern_usage: ["Iterator"]
language: ["TypeScript"]
---
The Iterator pattern provides a way to access elements of an aggregate object sequentially without exposing its underlying representation. It defines an interface for creating an iterator and uses that interface to traverse the collection.

This TypeScript example implements an iterator for a `BookCollection`. The `BookCollection` class doesn't directly expose its `books` array. Instead, `createIterator()` returns a `BookIterator` instance, which holds a pointer to the current index. The iterator's `next()` method returns the next book in the collection, and `hasNext()` indicates if there are more books to read.  This fits TypeScript's OOP style through the use of classes and interfaces and leverages type safety for `Book` objects.

```typescript
interface Book {
  title: string;
  author: string;
}

interface Iterator<T> {
  hasNext(): boolean;
  next(): T | null;
}

class BookCollection {
  private books: Book[];

  constructor(books: Book[]) {
    this.books = books;
  }

  createIterator(): Iterator<Book> {
    return new BookIterator(this.books);
  }
}

class BookIterator implements Iterator<Book> {
  private books: Book[];
  private index: number;

  constructor(books: Book[]) {
    this.books = books;
    this.index = 0;
  }

  hasNext(): boolean {
    return this.index < this.books.length;
  }

  next(): Book | null {
    if (this.hasNext()) {
      return this.books[this.index++];
    }
    return null;
  }
}

// Example Usage:
const books = [
  { title: "The Cat in the Hat", author: "Dr. Seuss" },
  { title: "To Kill a Mockingbird", author: "Harper Lee" },
  { title: "1984", author: "George Orwell" },
];

const collection = new BookCollection(books);
const iterator = collection.createIterator();

while (iterator.hasNext()) {
  const book = iterator.next();
  console.log(`${book?.title} by ${book?.author}`);
}
```