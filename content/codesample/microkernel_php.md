---
title: "Microkernel - PHP"
date: 2025-12-03T14:23:30.746-05:00
draft: false
pattern_usage: ["Microkernel"]
language: ["PHP"]
---
The Microkernel pattern aims to create a small, core system that provides minimal functionality, with additional features implemented as plugins or extensions. This fosters modularity, flexibility, and testability.  The core handles only essential tasks, delegating everything else.

This PHP example implements a basic microkernel for greeting users. The `Kernel` class is the core, handling request routing. `GreetingPlugin` is a simple plugin that adds a greeting functionality. Plugins are registered with the kernel and their methods are invoked based on matching routes.  This is idiomatic PHP, demonstrating the usage of classes, interfaces, and simple array-based configuration for plugin registration – a pattern common in extensible PHP applications and frameworks (though typically leveraging autoloading and more robust plugin management).

```php
<?php

interface PluginInterface {
    public function getRoutes(): array;
    public function handleRoute(string $route): string;
}

class Kernel {
    private $plugins = [];

    public function register(PluginInterface $plugin): void {
        $this->plugins[] = $plugin;
    }

    public function handleRequest(string $route): string {
        foreach ($this->plugins as $plugin) {
            $routes = $plugin->getRoutes();
            if (isset($routes[$route])) {
                return $plugin->handleRoute($route);
            }
        }
        return "Route not found.";
    }
}

class GreetingPlugin implements PluginInterface {
    public function getRoutes(): array {
        return [
            'greet' => 'greetHandler',
        ];
    }

    public function greetHandler(string $name = 'World'): string {
        return "Hello, $name!";
    }

    public function handleRoute(string $route): string {
        if ($route === 'greet') {
            return $this->greetHandler();
        }
        return "Route not handled by GreetingPlugin";
    }
}

// Example Usage
$kernel = new Kernel();
$kernel->register(new GreetingPlugin());

echo $kernel->handleRequest('greet') . "\n"; // Output: Hello, World!
echo $kernel->handleRequest('greet?name=Alice') . "\n"; // Output: Route not found. - No route for "greet?name=Alice"
echo $kernel->handleRequest('unknown') . "\n"; // Output: Route not found.
?>
```