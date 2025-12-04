---
title: "Facade - C#"
date: 2025-12-03T11:43:02.270-05:00
draft: false
pattern_usage: ["Facade"]
language: ["C_sharp"]
---
The Facade pattern provides a simplified interface to a complex subsystem. It encapsulates multiple interactions within the subsystem into a single, higher-level interface, hiding the complexity from the client. This example demonstrates a media player facade, simplifying operations like playing music, video, and managing the audio/video components. The code uses C#'s class-based OOP approach to define the facade and the subsystem components. It's idiomatic C# due to its clear class structure, property usage, and method naming conventions, promoting encapsulation and ease of use.

```csharp
// Subsystem classes
public class AudioEngine
{
    public void Play(string fileName) => Console.WriteLine($"Audio: Playing {fileName}");
    public void Stop() => Console.WriteLine("Audio: Stopped");
}

public class VideoEngine
{
    public void Play(string fileName) => Console.WriteLine($"Video: Playing {fileName}");
    public void Stop() => Console.WriteLine("Video: Stopped");
}

// Facade class
public class MediaFacade
{
    private readonly AudioEngine _audioEngine = new();
    private readonly VideoEngine _videoEngine = new();

    public void PlayMedia(string fileName, MediaType type)
    {
        Console.WriteLine($"MediaFacade: Playing {fileName} ({type})");

        switch (type)
        {
            case MediaType.Audio:
                _audioEngine.Play(fileName);
                break;
            case MediaType.Video:
                _videoEngine.Play(fileName);
                break;
            default:
                Console.WriteLine("MediaFacade: Unsupported media type.");
                break;
        }
    }

    public void StopMedia()
    {
        Console.WriteLine("MediaFacade: Stopping media");
        _audioEngine.Stop();
        _videoEngine.Stop();
    }
}

// Enum for media types
public enum MediaType
{
    Audio,
    Video
}

// Client code
public class Client
{
    public static void Main(string[] args)
    {
        MediaFacade facade = new();

        facade.PlayMedia("song.mp3", MediaType.Audio);
        facade.PlayMedia("movie.mp4", MediaType.Video);
        facade.StopMedia();
    }
}
```