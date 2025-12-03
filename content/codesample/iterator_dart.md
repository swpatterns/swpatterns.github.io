---
title: "Iterator - Dart"
date: 2025-12-03T13:13:25.369-05:00
draft: false
pattern_usage: ["Iterator"]
language: ["Dart"]
---
The Iterator pattern provides a way to access the elements of an aggregate object sequentially without exposing its underlying representation. It defines a standard interface for creating iterators and iterating over collections. This implementation uses Dart’s `Iterable` and `Iterator` classes. The `Album` class represents the aggregate, and the `AlbumIterator` class provides the iteration logic. Dart’s `yield` keyword makes creating iterators concise, and using an `Iterable` allows the `Album` class to be used with other Dart collection utilities easily. This embraces the functional aspects of Dart and utilizes its built-in iteration support.

```dart
// Define the iterator class
class AlbumIterator<T> implements Iterator<T> {
  final List<T> _data;
  int _currentIndex = 0;

  AlbumIterator(this._data);

  @override
  T get current => _data[_currentIndex];

  @override
  bool moveNext() {
    return _currentIndex < _data.length - 1;
  }
}

// Define the aggregate class (collection)
class Album<T> extends Iterable<T> {
  final List<T> _songs;

  Album(this._songs);

  @override
  Iterator<T> get iterator => AlbumIterator(_songs);

  void addSong(T song) {
    _songs.add(song);
  }
}

void main() {
  final album = Album<String>(['Song 1', 'Song 2', 'Song 3']);

  for (final song in album) {
    print(song);
  }

  final iterator = album.iterator;
  while (iterator.moveNext()) {
    print('Current song using iterator: ${iterator.current}');
  }
}
```