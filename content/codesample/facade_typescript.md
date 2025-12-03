---
title: "Facade - TypeScript"
date: 2025-12-03T11:42:42.350-05:00
draft: false
pattern_usage: ["Facade"]
language: ["TypeScript"]
---
The Facade pattern provides a simplified interface to a complex subsystem. It hides the intricacies of the underlying components and offers a higher-level, easier-to-use API. This improves code readability and reduces dependencies between the client code and the subsystem.

The TypeScript example demonstrates a `VideoConversionFacade` that encapsulates the complexities of video file processing – including reading the file, decoding it, applying filters, and encoding it to a new format.  The client only interacts with the facade, unaware of the individual steps. This implementation leverages TypeScript's class-based structure and type safety for a clean and maintainable facade.  It's idiomatic because it uses clear interfaces and avoids exposing internal implementation details.

```typescript
// Subsystem classes
class VideoFileReader {
  read(filename: string): string {
    console.log(`Reading video file: ${filename}`);
    return `Video data from ${filename}`;
  }
}

class VideoDecoder {
  decode(data: string): string {
    console.log("Decoding video data...");
    return `Decoded video data from ${data}`;
  }
}

class VideoFilter {
  apply(data: string): string {
    console.log("Applying video filters...");
    return `Filtered video data from ${data}`;
  }
}

class VideoEncoder {
  encode(data: string, format: string): string {
    console.log(`Encoding video data to ${format}...`);
    return `Encoded video data in ${format} from ${data}`;
  }
}

// Facade class
class VideoConversionFacade {
  private reader: VideoFileReader;
  private decoder: VideoDecoder;
  private filter: VideoFilter;
  private encoder: VideoEncoder;

  constructor() {
    this.reader = new VideoFileReader();
    this.decoder = new VideoDecoder();
    this.filter = new VideoFilter();
    this.encoder = new VideoEncoder();
  }

  convert(filename: string, format: string): string {
    const data = this.reader.read(filename);
    const decodedData = this.decoder.decode(data);
    const filteredData = this.filter.apply(decodedData);
    const encodedData = this.encoder.encode(filteredData, format);
    return encodedData;
  }
}

// Client code
const facade = new VideoConversionFacade();
const result = facade.convert("input.mp4", "avi");
console.log(result);
```