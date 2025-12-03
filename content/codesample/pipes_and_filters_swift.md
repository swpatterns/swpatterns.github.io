---
title: "Pipes and Filters - Swift"
date: 2025-12-03T15:21:42.184-05:00
draft: false
pattern_usage: ["Pipes and Filters"]
language: ["Swift"]
---
The Pipes and Filters pattern breaks down a complex task into a series of independent, self-contained processing steps (filters) connected by channels (pipes) through which data flows. Each filter performs a specific transformation on the input data and passes the result to the next filter. This promotes modularity, reusability, and simplifies testing.

This Swift implementation uses a protocol `Filter` to define the interface for each filter, requiring an `execute` method. A simple `FilterChain` manages the sequence of filters. Data is passed as strings to illustrate the flow, but could be any type.  The code uses Swift’s protocol-oriented programming approach and functional style where appropriate (transformation within filters).  This avoids excessive subclassing and keeps the filters lightweight and focused.

```swift
protocol Filter {
    func execute(input: String) -> String
}

struct StringToUppercaseFilter: Filter {
    func execute(input: String) -> String {
        input.uppercased()
    }
}

struct RemoveWhitespaceFilter: Filter {
    func execute(input: String) -> String {
        input.trimmingCharacters(in: .whitespacesAndNewlines)
    }
}

struct ExclaimifyFilter: Filter {
    func execute(input: String) -> String {
        input + "!"
    }
}

class FilterChain {
    private let filters: [Filter]

    init(filters: [Filter]) {
        self.filters = filters
    }

    func execute(input: String) -> String {
        var result = input
        for filter in filters {
            result = filter.execute(input: result)
        }
        return result
    }
}

// Example Usage:
let filters = [
    StringToUppercaseFilter(),
    RemoveWhitespaceFilter(),
    ExclaimifyFilter()
]

let chain = FilterChain(filters: filters)
let finalResult = chain.execute(input: "  hello world ")

print(finalResult) // Output: HELLO WORLD!
```