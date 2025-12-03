---
title: "Pipes and Filters - Java"
date: 2025-12-03T15:19:21.036-05:00
draft: false
pattern_usage: ["Pipes and Filters"]
language: ["Java"]
---
The Pipes and Filters pattern breaks down a complex processing task into a series of independent, reusable processing steps (filters) connected by channels (pipes) that pass data from one filter to the next. Each filter performs a specific transformation on the data without knowing the source or destination of that data. This promotes modularity, reusability, and simplifies error handling.

The Java code defines `Filter` interface which each processing stage implements.  Concrete filters `UpperCaseFilter` and `RemoveSpacesFilter` perform specific string manipulations. A `Pipeline` class orchestrates the filters, passing the input through each stage sequentially. This design leverages Java's interfaces and collection pipelines for a clean and extensible solution, aligning with the functional aspects common in modern Java.
```java
import java.util.Arrays;
import java.util.stream.Stream;

interface Filter {
    String process(String input);
}

class UpperCaseFilter implements Filter {
    @Override
    public String process(String input) {
        return input.toUpperCase();
    }
}

class RemoveSpacesFilter implements Filter {
    @Override
    public String process(String input) {
        return input.replaceAll("\\s+", "");
    }
}

class Pipeline {
    private final Stream<Filter> filters;

    public Pipeline(Filter... filters) {
        this.filters = Arrays.stream(filters);
    }

    public String run(String input) {
        return filters.map(filter -> filter.process(input))
                .reduce(input, (acc, filterResult) -> filterResult)
                .orElse(input); // handles empty filter stream
    }
}

public class PipesAndFilters {
    public static void main(String[] args) {
        Pipeline pipeline = new Pipeline(new UpperCaseFilter(), new RemoveSpacesFilter());
        String input = "  Hello world!  ";
        String result = pipeline.run(input);
        System.out.println("Input: " + input);
        System.out.println("Result: " + result);
    }
}
```