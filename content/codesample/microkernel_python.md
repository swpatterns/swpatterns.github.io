---
title: "Microkernel - Python"
date: 2025-12-03T14:20:39.922-05:00
draft: false
pattern_usage: ["Microkernel"]
language: ["Python"]
---
The Microkernel pattern aims to create a minimal core system (the microkernel) and extend functionality through plugins or extensions. This promotes modularity, flexibility, and easier maintenance as new features can be added without modifying the core.  The code demonstrates a simple text processing microkernel. The core handles loading and executing plugins, while plugins define specific text transformations. This approach is idiomatic Python as it leverages dynamic loading via `importlib` and utilizes the flexible nature of Python to accommodate varied plugin interfaces, promoting loose coupling and extensibility.  Plugins are treated as modules, a common practice in Python packaging and extension.

```python
# microkernel.py
import importlib
import sys

class Microkernel:
    def __init__(self):
        self.plugins = {}

    def load_plugin(self, plugin_name):
        try:
            module = importlib.import_module(plugin_name)
            self.plugins[plugin_name] = module
            print(f"Loaded plugin: {plugin_name}")
        except ImportError:
            print(f"Failed to load plugin: {plugin_name}")

    def execute_plugin(self, plugin_name, data):
        if plugin_name in self.plugins:
            plugin = self.plugins[plugin_name]
            if hasattr(plugin, 'process'):
                return plugin.process(data)
            else:
                print(f"Plugin {plugin_name} does not have a 'process' function.")
                return data
        else:
            print(f"Plugin {plugin_name} not found.")
            return data


if __name__ == "__main__":
    kernel = Microkernel()

    # Load plugins from command line arguments
    if len(sys.argv) > 1:
        for plugin_name in sys.argv[1:]:
            kernel.load_plugin(plugin_name)
    else:
        print("No plugins specified.  Usage: python microkernel.py plugin1 plugin2 ...")
        exit()

    text = "This is some sample text."
    for plugin_name in sys.argv[1:]:
        text = kernel.execute_plugin(plugin_name, text)
        print(f"After {plugin_name}: {text}")
```

```python
# plugin_uppercase.py
def process(data):
    return data.upper()
```

```python
# plugin_reverse.py
def process(data):
    return data[::-1]
```