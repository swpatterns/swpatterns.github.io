---
title: "Iterator - PHP"
date: 2025-12-03T13:12:59.022-05:00
draft: false
pattern_usage: ["Iterator"]
language: ["PHP"]
---
The Iterator pattern provides a way to access the elements of an aggregate object (like an array or list) sequentially without exposing its underlying representation. It defines a standard interface for traversing collections, enabling clients to interact with different data structures in a uniform manner.

The code implements this by defining a `BookCollection` class that holds an array of books.  Instead of directly accessing the array, the `BookCollection` returns a `BookIterator` object. This iterator implements the `Iterator` interface, providing `current()`, `next()`, `key()`, `valid()`, and `rewind()` methods to control traversal. This approach adheres to PHP's object-oriented style, enhancing encapsulation and flexibility.  Using interfaces is a standard practice in PHP for defining contracts.

```php
<?php

// Iterator Interface
interface Iterator
{
    public function current(): mixed;
    public function next(): void;
    public function key(): mixed;
    public function valid(): bool;
    public function rewind(): void;
}

// Aggregate (BookCollection)
class BookCollection implements Iterator
{
    private array $books;
    private int $position = 0;

    public function __construct(array $books)
    {
        $this->books = $books;
    }

    public function current(): mixed
    {
        return $this->books[$this->position];
    }

    public function next(): void
    {
        $this->position++;
    }

    public function key(): mixed
    {
        return $this->position;
    }

    public function valid(): bool
    {
        return isset($this->books[$this->position]);
    }

    public function rewind(): void
    {
        $this->position = 0;
    }

    public function addBook(string $title, string $author): void
    {
        $this->books[] = ['title' => $title, 'author' => $author];
    }
}

// Client Code
$books = new BookCollection([
    ['title' => 'The Lord of the Rings', 'author' => 'J.R.R. Tolkien'],
    ['title' => 'Pride and Prejudice', 'author' => 'Jane Austen'],
]);

foreach ($books as $book) {
    echo "Title: " . $book['title'] . ", Author: " . $book['author'] . "\n";
}

?>
```