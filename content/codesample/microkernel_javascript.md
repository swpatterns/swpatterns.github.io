---
title: "Microkernel - JavaScript"
date: 2025-12-03T14:20:54.716-05:00
draft: false
pattern_usage: ["Microkernel"]
language: ["JavaScript"]
---
The Microkernel pattern aims to create a minimal core system (the kernel) and delegate specialized functionalities to plugins or extensions. This promotes modularity, flexibility, and ease of extension. The kernel provides a basic event system and communication mechanisms.  This JavaScript example defines a simple kernel with `register` and `dispatch` methods. Plugins register themselves with the kernel and listen for specific events. The kernel then dispatches events to the registered plugins. This implementation uses JavaScript's flexible object system and event handling capabilities, fitting the language's dynamic nature. It avoids complex inheritance and favors a more composable approach.

```javascript
/**
 * Microkernel Implementation in JavaScript
 */

class Microkernel {
  constructor() {
    this.plugins = {};
  }

  register(pluginName, plugin) {
    if (typeof plugin === 'object' && plugin !== null && typeof plugin.handle === 'function') {
      this.plugins[pluginName] = plugin;
      console.log(`Plugin registered: ${pluginName}`);
    } else {
      throw new Error('Invalid plugin. Plugin must be an object with a handle function.');
    }
  }

  dispatch(event, data) {
    for (const pluginName in this.plugins) {
      const plugin = this.plugins[pluginName];
      if (plugin.handle && plugin.handle(event, data)) {
          console.log(`Event '${event}' handled by plugin: ${pluginName}`);
      }
    }
  }
}

// Example Plugins
const loggingPlugin = {
  handle: (event, data) => {
    if (event === 'userAction') {
      console.log(`User performed action: ${data.action}`);
      return true; // Indicate event was handled.
    }
    return false;
  }
};

const analyticsPlugin = {
  handle: (event, data) => {
    if (event === 'userAction') {
      console.log(`Sending action '${data.action}' to analytics.`);
      return true;
    }
    return false;
  }
};

// Usage
const kernel = new Microkernel();
kernel.register('logging', loggingPlugin);
kernel.register('analytics', analyticsPlugin);

kernel.dispatch('userAction', { action: 'clickedButton' });
kernel.dispatch('systemEvent', { message: 'Something happened' });
```