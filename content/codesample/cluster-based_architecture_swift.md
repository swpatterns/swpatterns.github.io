---
title: "Cluster-based Architecture - Swift"
date: 2025-12-03T15:18:11.598-05:00
draft: false
pattern_usage: ["Cluster-based Architecture"]
language: ["Swift"]
---
The Cluster-based Architecture pattern organizes components into independent, interchangeable “clusters” each managing a specific aspect of the application. This promotes modularity, scalability, and easier maintenance. A central coordinator or manager (often a facade) interacts with these clusters, shielding the core application from their internal complexities.

This Swift example demonstrates a simple cluster setup for handling different media types (Image, Video, Audio). Each media type has its own `MediaCluster` conforming to a common protocol, responsible for loading and processing. A `MediaManager` acts as the coordinator, delegating to the appropriate cluster based on the file extension.  This uses protocols for abstraction, a common Swift practice, and leverages enums for clear type representation which fits well with Swift’s strong typing and safety focus.

```swift
// Define a common protocol for Media Clusters
protocol MediaCluster {
    func load(filePath: String) -> Data?
    func process(data: Data) -> String
}

// Image Cluster
class ImageCluster: MediaCluster {
    func load(filePath: String) -> Data? {
        print("Loading image from: \(filePath)")
        return Data(contentsOfFile: filePath) // Simplified for example
    }

    func process(data: Data) -> String {
        print("Processing image data")
        return "Image processed successfully."
    }
}

// Video Cluster
class VideoCluster: MediaCluster {
    func load(filePath: String) -> Data? {
        print("Loading video from: \(filePath)")
        return Data(contentsOfFile: filePath) // Simplified for example
    }

    func process(data: Data) -> String {
        print("Processing video data")
        return "Video processed successfully."
    }
}

// Audio Cluster
class AudioCluster: MediaCluster {
    func load(filePath: String) -> Data? {
        print("Loading audio from: \(filePath)")
        return Data(contentsOfFile: filePath) // Simplified for example
    }

    func process(data: Data) -> String {
        print("Processing audio data")
        return "Audio processed successfully."
    }
}

// Media Manager - the Coordinator
class MediaManager {
    private var imageCluster: ImageCluster = ImageCluster()
    private var videoCluster: VideoCluster = VideoCluster()
    private var audioCluster: AudioCluster = AudioCluster()

    enum MediaType {
        case image, video, audio, unknown
    }

    func getMediaType(filePath: String) -> MediaType {
        let extensionValue = filePath.split(separator: ".").last?.lowercased()
        switch extensionValue {
        case "jpg", "jpeg", "png":
            return .image
        case "mp4", "mov":
            return .video
        case "mp3", "wav":
            return .audio
        default:
            return .unknown
        }
    }

    func processMedia(filePath: String) -> String {
        let mediaType = getMediaType(filePath: filePath)
        guard let data = loadMedia(filePath: filePath, type: mediaType) else {
            return "Failed to load media."
        }

        switch mediaType {
        case .image:
            return imageCluster.process(data: data)
        case .video:
            return videoCluster.process(data: data)
        case .audio:
            return audioCluster.process(data: data)
        case .unknown:
            return "Unsupported media type."
        }
    }

    private func loadMedia(filePath: String, type: MediaType) -> Data? {
        switch type {
        case .image: return imageCluster.load(filePath: filePath)
        case .video: return videoCluster.load(filePath: filePath)
        case .audio: return audioCluster.load(filePath: filePath)
        case .unknown: return nil
        }
    }
}

// Example Usage
let mediaManager = MediaManager()
print(mediaManager.processMedia(filePath: "video.mp4"))
print(mediaManager.processMedia(filePath: "image.jpg"))
print(mediaManager.processMedia(filePath: "audio.mp3"))
print(mediaManager.processMedia(filePath: "document.pdf"))
```