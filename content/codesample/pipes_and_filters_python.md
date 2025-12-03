---
title: "Pipes and Filters - Python"
date: 2025-12-03T15:19:36.249-05:00
draft: false
pattern_usage: ["Pipes and Filters"]
language: ["Python"]
---
The Pipes and Filters pattern processes a stream of data through a series of independent processing components (filters) connected by channels (pipes). Each filter performs a specific transformation on the data, passing the result to the next filter in the pipeline. This promotes modularity, reusability, and simplifies complex processing tasks.

The Python code utilizes generators to represent both pipes and filters. Each filter is a generator function that yields transformed data.  The pipe is implicitly created by chaining generator expressions or method calls. This approach is very Pythonic, leveraging the language’s strengths in data streaming and functional programming without requiring explicit class definitions for pipes. The use of generators avoids loading the entire dataset into memory, making it efficient for large datasets.

```python
def load_data(filename):
    """Filter 1: Loads data from a file (simulated here)."""
    with open(filename, 'r') as f:
        for line in f:
            yield line.strip()

def filter_long_lines(data, max_length):
    """Filter 2: Filters lines longer than max_length."""
    for line in data:
        if len(line) <= max_length:
            yield line

def uppercase_lines(data):
    """Filter 3: Converts lines to uppercase."""
    for line in data:
        yield line.upper()

def remove_duplicates(data):
    """Filter 4: Removes duplicate lines."""
    seen = set()
    for line in data:
        if line not in seen:
            yield line
            seen.add(line)

def main():
    """Creates and runs the pipe and filter pipeline."""
    filename = 'data.txt'
    # Create a dummy data file
    with open(filename, 'w') as f:
        f.write("apple\n")
        f.write("banana\n")
        f.write("orange\n")
        f.write("apple\n")
        f.write("kiwi long line\n")
        f.write("grape\n")

    processed_data = remove_duplicates(
        uppercase_lines(
            filter_long_lines(
                load_data(filename),
                10
            )
        )
    )

    for line in processed_data:
        print(line)

if __name__ == "__main__":
    main()
```