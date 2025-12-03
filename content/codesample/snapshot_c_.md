---
title: "Snapshot - C#"
date: 2025-12-03T14:00:17.880-05:00
draft: false
pattern_usage: ["Snapshot"]
language: ["C#"]
---
The Snapshot pattern captures the internal state of an object and allows restoring it to that state later. This is useful for implementing undo/redo functionality, save/restore features, or creating checkpoints in a complex process.  The code defines a `Snapshot` class to hold the state and a `Document` class that can create and revert to snapshots.  It utilizes immutable data for the state to ensure consistency. This implementation is idiomatic C# due to its use of classes, properties, and the clear separation of concerns between the origin object and its snapshots. The use of a list to store snapshots is a common and efficient approach in C#.

```csharp
// Snapshot.cs
public class Snapshot
{
    public string Text { get; }
    public int CursorPosition { get; }

    public Snapshot(string text, int cursorPosition)
    {
        Text = text;
        CursorPosition = cursorPosition;
    }
}

// Document.cs
public class Document
{
    private string text = "";
    private int cursorPosition = 0;
    private List<Snapshot> snapshots = new List<Snapshot>();

    public string Text
    {
        get { return text; }
        set { text = value; }
    }

    public int CursorPosition
    {
        get { return cursorPosition; }
        set { cursorPosition = value; }
    }

    public void Type(char c)
    {
        text += c;
        cursorPosition++;
    }

    public void Delete()
    {
        if (cursorPosition > 0)
        {
            text = text.Remove(cursorPosition - 1, 1);
            cursorPosition--;
        }
    }

    public Snapshot CreateSnapshot()
    {
        snapshots.Add(new Snapshot(text, cursorPosition));
        return new Snapshot(text, cursorPosition);
    }

    public void RevertToSnapshot(Snapshot snapshot)
    {
        text = snapshot.Text;
        cursorPosition = snapshot.CursorPosition;
    }

    public void PrintDocument()
    {
        Console.WriteLine($"Text: {text}, Cursor: {cursorPosition}");
    }
}

// Example Usage (can be in a separate Program.cs)
public class Example
{
    public static void Main(string[] args)
    {
        Document doc = new Document();
        doc.Type('H');
        doc.Type('e');
        doc.Type('l');
        doc.PrintDocument(); // Output: Text: Hel, Cursor: 3

        Snapshot snapshot1 = doc.CreateSnapshot();

        doc.Type('l');
        doc.Type('o');
        doc.PrintDocument(); // Output: Text: Hello, Cursor: 5

        doc.RevertToSnapshot(snapshot1);
        doc.PrintDocument(); // Output: Text: Hel, Cursor: 3
    }
}
```