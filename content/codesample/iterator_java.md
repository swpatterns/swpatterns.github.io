---
title: "Iterator - Java"
date: 2025-12-03T13:09:45.368-05:00
draft: false
pattern_usage: ["Iterator"]
language: ["Java"]
---
The Iterator pattern is a behavioral design pattern that provides a way to access the elements of an aggregate object sequentially without exposing its underlying representation. It defines a standardized interface for traversing collections. This example demonstrates this with a `BookCollection` aggregate and a `BookIterator` that allows access to books one by one.  Java’s built-in `Iterator` interface heavily relies on this pattern, and our implementation mirrors that. Using an explicit iterator class promotes loose coupling between the collection and the client code, increasing flexibility. This approach utilizes a private inner class for the iterator, encapsulating its logic within the collection.

```java
import java.util.NoSuchElementException;

class Book {
    private String title;

    public Book(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }
}

class BookCollection {
    private Book[] books;
    private int bookCount;

    public BookCollection(Book[] books) {
        this.books = books;
        this.bookCount = books.length;
    }

    public BookIterator createIterator() {
        return new BookIterator();
    }

    private class BookIterator implements java.util.Iterator<Book> {
        private int position = 0;

        @Override
        public boolean hasNext() {
            return position < bookCount;
        }

        @Override
        public Book next() {
            if (!hasNext()) {
                throw new NoSuchElementException("No more books in the collection.");
            }
            return books[position++];
        }
    }
}

public class IteratorExample {
    public static void main(String[] args) {
        Book[] bookList = {new Book("The Hitchhiker's Guide to the Galaxy"), new Book("Pride and Prejudice"), new Book("1984")};
        BookCollection collection = new BookCollection(bookList);
        BookIterator iterator = collection.createIterator();

        while (iterator.hasNext()) {
            Book book = iterator.next();
            System.out.println(book.getTitle());
        }
    }
}
```