---
title: "Pipes and Filters - PHP"
date: 2025-12-03T15:22:06.584-05:00
draft: false
pattern_usage: ["Pipes and Filters"]
language: ["PHP"]
---
The Pipes and Filters pattern structures a program as a series of processing steps (filters) connected by channels (pipes) that pass data from one filter to the next. Each filter has a specific responsibility and operates on the data independently. This promotes reusability, maintainability, and simplifies complex tasks by breaking them down.

This PHP implementation uses iterators and generators for the pipes and filters.  Each 'filter' is a generator function that yields modified data. These generators are chained using `yield from`, effectively forming the pipeline. Using generators is very memory-efficient as it doesn’t store the entire result in memory at once.  The entire process is initiated by providing the initial data to the first filter. This approach aligns with PHP’s support for iterables and leverages them in a clean, functional style.

```php
<?php

/**
 * Filter 1: Uppercase the input string
 */
function uppercaseFilter(iterable $input): iterable
{
    foreach ($input as $item) {
        yield strtoupper($item);
    }
}

/**
 * Filter 2: Remove spaces from the input string
 */
function removeSpacesFilter(iterable $input): iterable
{
    foreach ($input as $item) {
        yield str_replace(' ', '', $item);
    }
}

/**
 * Filter 3: Add a prefix to each string.
 */
function addPrefixFilter(iterable $input, string $prefix): iterable
{
    foreach ($input as $item) {
        yield $prefix . $item;
    }
}


// Initial data
$data = ["hello world", "php is fun"];

// Create the pipeline
$processedData = uppercaseFilter($data);
$processedData = removeSpacesFilter($processedData);
$processedData = addPrefixFilter($processedData, 'Processed: ');

// Consume the pipeline
foreach ($processedData as $item) {
    echo $item . PHP_EOL;
}

?>
```