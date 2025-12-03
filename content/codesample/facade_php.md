---
title: "Facade - PHP"
date: 2025-12-03T11:45:10.239-05:00
draft: false
pattern_usage: ["Facade"]
language: ["PHP"]
---
The Facade pattern provides a simplified interface to a complex subsystem. It defines a high-level interface that hides the intricacies of the underlying components. This makes the subsystem easier to use for clients who don't need to know the details.

The code demonstrates a `VideoConversionFacade` that encapsulates the complexity of video conversion – including file format checking, codec selection, and actual conversion using separate `FileFormatChecker`, `CodecFactory`, and `VideoConverter` classes.  Clients interact *only* with the Facade, simplifying their code and reducing dependencies on the subsystem's internal workings. This is idiomatic PHP as it leverages classes to represent components and promotes loose coupling through a dedicated interface, enhancing maintainability and testability.

```php
<?php

/**
 * Subsystem classes - these are complex and clients shouldn't interact with them directly.
 */
class FileFormatChecker {
    public function isValid(string $file): bool {
        // Simulate format checking
        return strtolower(pathinfo($file, PATHINFO_EXTENSION)) === 'mp4';
    }
}

class CodecFactory {
    public function createCodec(string $format): Codec {
        // Simulate codec creation based on format
        if ($format === 'h264') {
            return new H264Codec();
        }
        return new MPEG4Codec();
    }
}

interface Codec {
    public function encode(string $file): string;
}

class H264Codec implements Codec {
    public function encode(string $file): string {
        return "Encoding $file to H.264";
    }
}

class MPEG4Codec implements Codec {
    public function encode(string $file): string {
        return "Encoding $file to MPEG4";
    }
}

class VideoConverter {
    private Codec $codec;

    public function __construct(Codec $codec) {
        $this->codec = $codec;
    }

    public function convert(string $file, string $format): string {
        return $this->codec->encode($file);
    }
}

/**
 * The Facade class.
 */
class VideoConversionFacade {
    private FileFormatChecker $formatChecker;
    private CodecFactory $codecFactory;
    private VideoConverter $converter;

    public function __construct() {
        $this->formatChecker = new FileFormatChecker();
        $this->codecFactory = new CodecFactory();
    }

    public function convertVideo(string $file, string $format): string {
        if (!$this->formatChecker->isValid($file)) {
            return "Invalid file format.";
        }

        $codec = $this->codecFactory->createCodec($format);
        $this->converter = new VideoConverter($codec);

        return $this->converter->convert($file, $format);
    }
}

// Client code
$facade = new VideoConversionFacade();
echo $facade->convertVideo("video.mp4", "h264") . "\n";
echo $facade->convertVideo("image.jpg", "h264") . "\n";

?>
```