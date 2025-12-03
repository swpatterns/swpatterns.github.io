---
title: "Singleton - JavaScript"
date: 2025-12-03T11:05:16.158-05:00
draft: false
pattern_usage: ["Singleton"]
language: ["JavaScript"]
---
The Singleton pattern ensures a class has only one instance and provides a global point of access to it. This is useful for managing resources like database connections or configuration settings where multiple instances would be detrimental.  The JavaScript implementation uses a closure to encapsulate the instance and a static method to provide access.  This approach is idiomatic because JavaScript's flexible nature allows for this kind of self-managing object creation without strict class definitions (though a class can be used, this is a common functional style). The `getInstance()` method lazily initializes the instance only when it's first requested.

```javascript
// config.js
const Config = (function() {
  let instance;

  function createConfig(settings) {
    const config = {
      ...settings,
      get: (key) => config[key]
    };
    return config;
  }

  return {
    getInstance: function(settings) {
      if (!instance) {
        instance = createConfig(settings);
      }
      return instance;
    }
  };
})();

export default Config;

// app.js
import Config from './config.js';

// First instance with initial settings
const config1 = Config.getInstance({ apiUrl: 'https://api.example.com', theme: 'light' });
console.log(config1.get('apiUrl')); // Output: https://api.example.com

// Second request - returns the same instance
const config2 = Config.getInstance({ apiKey: 'someKey' }); // Settings are ignored.
console.log(config2.get('apiUrl')); // Output: https://api.example.com
console.log(config1 === config2); // Output: true

//Demonstrate Config can be extended with more functions
config1.logSettings = function() {
  console.log("API URL:", this.get('apiUrl'), "Theme:", this.get('theme'));
}

config1.logSettings(); //Output: API URL: https://api.example.com Theme: light
```