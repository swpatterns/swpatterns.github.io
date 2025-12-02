
---
title: Pipes and Filters
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["behavioral", "data processing"]
wikipedia: https://en.wikipedia.org/wiki/Pipeline_pattern
diagramtype: "class"
diagram: "[Filter] -- 'processes' -> [Filter]\n[Filter] -- 'passes data to' -> [Pipe]\n[Pipe] -- 'transfers data' -> [Filter]\n[Source] -- 'produces' -> [Filter]\n[Filter] -- 'outputs to' -> [Sink]"
code: true
---

The Pipes and Filters pattern is a data processing paradigm where a series of independent processing components (Filters) are connected by channels (Pipes). Each Filter performs a specific transformation on the input data and passes the result to the next Filter in the pipeline.  The pattern promotes modularity, reusability, and simplifies complex data transformations by breaking them down into smaller, manageable steps.

This pattern is particularly useful when dealing with streaming data, ETL (Extract, Transform, Load) processes, and command-line utilities. It allows for easy modification and extension of the data processing flow by adding, removing, or reordering Filters without affecting other parts of the system.  It also facilitates parallel processing, as Filters can often operate independently.

## Usage

*   **Data Pipelines:** Building robust and scalable data pipelines for processing large datasets, common in data science and machine learning.
*   **Command-Line Tools:**  Creating flexible command-line tools where data is processed through a series of commands (filters) connected by pipes.  Examples include `grep`, `sed`, `awk` in Unix/Linux.
*   **Stream Processing:** Handling real-time data streams, such as logs or sensor data, by applying a sequence of filters to analyze and react to the data.
*   **Image/Video Processing:**  Applying a series of image or video filters (e.g., blurring, sharpening, color correction) in a pipeline.

## Examples

1.  **Unix Shell Pipelines:** The classic example. Commands like `ls`, `grep`, `sort`, and `uniq` can be chained together using the pipe symbol (`|`). For instance, `ls -l | grep ".txt" | sort -n | uniq` lists files, filters for text files, sorts them numerically, and then removes duplicate entries. Each command is a filter, and the pipe transfers the output of one to the input of the next.

2.  **Apache Kafka Streams:** Kafka Streams is a client library for building stream processing applications.  You define a topology of stream processors (Filters) that operate on data flowing through Kafka topics (Pipes).  For example, you might have a filter that transforms log messages, another that aggregates data, and a final filter that writes the results to a database.

3.  **Node.js Streams:** Node.js provides a powerful Streams API that embodies the Pipes and Filters pattern.  You can create Readable, Writable, Duplex, and Transform streams, and pipe them together to process data in a streaming fashion.  For example, reading a large file, compressing it, and then writing it to another file can be done using a pipeline of streams.
