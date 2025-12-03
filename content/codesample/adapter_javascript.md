---
title: "Adapter - JavaScript"
date: 2025-12-03T11:26:54.746-05:00
draft: false
pattern_usage: ["Adapter"]
language: ["JavaScript"]
---
The Adapter pattern converts the interface of a class into another interface clients expect. It lets classes work together that couldn't otherwise because of incompatible interfaces. This example demonstrates adapting a legacy logging service (with a `log()` method accepting a single string) to a modern logging interface (an `AdapterLogger` requiring objects with `level` and `message` properties).  The `LegacyLoggerAdapter` handles this conversion, allowing modern clients to use the old service without modification. This fits JavaScript's flexible object nature, leveraging objects as configuration to adapt behavior.

```javascript
// Legacy Logging Service: Incompatible interface
class LegacyLogger {
  log(message) {
    console.log(`LEGACY: ${message}`);
  }
}

// Modern Logging Interface: What clients expect
class AdapterLogger {
  log(logObject) {
    if (!logObject || !logObject.level || !logObject.message) {
      console.error("Invalid log object. Expected { level: '...', message: '...' }");
      return;
    }
    console.log(`ADAPTER: [${logObject.level}] ${logObject.message}`);
  }
}

// Adapter: Converts LegacyLogger's interface to AdapterLogger
class LegacyLoggerAdapter {
  constructor(legacyLogger) {
    this.legacyLogger = legacyLogger;
  }

  log(logObject) {
    if (!logObject || !logObject.message) {
      console.error("Invalid log object. Expected { message: '...' }");
      return;
    }
    this.legacyLogger.log(logObject.message);
  }
}

// Client Code: Uses the AdapterLogger interface
function clientCode(logger) {
  logger.log({ level: 'INFO', message: 'This is an informational message.' });
  logger.log({ level: 'WARNING', message: 'Something needs attention.' });
  logger.log({ message: 'Error from client code' });  //Will trigger error handling.
}

// Usage:
const legacyLogger = new LegacyLogger();
const adapter = new LegacyLoggerAdapter(legacyLogger);
const modernLogger = new AdapterLogger();

clientCode(adapter);
clientCode(modernLogger);
```