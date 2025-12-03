---
title: "Module - PHP"
date: 2025-12-03T12:51:27.076-05:00
draft: false
pattern_usage: ["Module"]
language: ["PHP"]
---
The Module pattern in PHP aims to encapsulate functionality and data within a single unit, exposing only a public interface while keeping internal details private. This promotes code organization, reduces global namespace pollution, and enhances maintainability.  The implementation uses a closure to create a private scope. Variables and functions defined within the closure are only accessible through the returned public methods. This approach is idiomatic PHP as it leverages closures, a core language feature, to achieve encapsulation without requiring classes in simpler scenarios. It's a lightweight alternative when full object-oriented structure isn't necessary.

```php
<?php
/**
 * Module Pattern Example in PHP
 */

$module = function() {
  // Private variables and functions
  $privateVariable = 'Secret Value';

  function privateFunction() {
    return 'This is a private function.';
  }

  // Public interface
  return [
    'getPrivateVariable' => function() use ($privateVariable) {
      return $privateVariable;
    },
    'publicFunction' => function() {
      return 'This is a public function that calls a private one: ' . privateFunction();
    },
  ];
};

// Usage
echo $module()['getPrivateVariable']() . "\n";
echo $module()['publicFunction']() . "\n";

// Attempting to access private parts directly will result in an error
// echo $module()['privateVariable']; // Fatal error: Uncaught Error: Call to undefined function
?>
```