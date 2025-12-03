---
title: "Iterator - C#"
date: 2025-12-03T13:10:51.607-05:00
draft: false
pattern_usage: ["Iterator"]
language: ["C#"]
---
The Iterator pattern provides a way to access elements of an aggregate object sequentially without exposing its underlying representation. It defines a standardized interface for traversing collections. This implementation uses C#'s `IEnumerable` and `IEnumerator` interfaces to create a custom iterator for a `Playlist` class. The `GetEnumerator()` method returns a new instance of the `PlaylistIterator` class, which handles moving through the playlist's songs one by one. This leverages C#'s built-in iteration infrastructure (e.g., `foreach` loops) and avoids exposing the `List<string>` directly. It's idiomatic C# as it fits seamlessly with the language’s collection handling mechanisms.

```csharp
using System;
using System.Collections;
using System.Collections.Generic;

public class Playlist : IEnumerable<string>
{
    private List<string> songs = new List<string> { "Song 1", "Song 2", "Song 3" };

    public void AddSong(string song)
    {
        songs.Add(song);
    }

    public IEnumerator<string> GetEnumerator()
    {
        return new PlaylistIterator(songs);
    }

    IEnumerator IEnumerable.GetEnumerator()
    {
        return GetEnumerator();
    }
}

public class PlaylistIterator : IEnumerator<string>
{
    private List<string> songs;
    private int current = -1;

    public PlaylistIterator(List<string> songs)
    {
        this.songs = songs;
    }

    public string Current
    {
        get
        {
            try
            {
                return songs[current];
            }
            catch (IndexOutOfRangeException)
            {
                throw new InvalidOperationException();
            }
        }
    }

    object IEnumerator.Current => Current;

    public void Dispose() { }

    public bool MoveNext()
    {
        current++;
        return (current < songs.Count);
    }

    public void Reset()
    {
        current = -1;
    }
}

public class Example
{
    public static void Main(string[] args)
    {
        var playlist = new Playlist();
        playlist.AddSong("Song 4");

        foreach (string song in playlist)
        {
            Console.WriteLine(song);
        }
    }
}
```