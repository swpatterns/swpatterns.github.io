---
title: "Bridge - JavaScript"
date: 2025-12-03T11:30:33.394-05:00
draft: false
pattern_usage: ["Bridge"]
language: ["JavaScript"]
---
The Bridge pattern is a structural design pattern that lets you split an abstraction from its implementation so that objects can represent different abstractions supported by different implementations. This is useful when there is a need to avoid a permanent binding between an abstraction and its implementation. This allows for both to be varied independently.

The code demonstrates this by separating a `Device` (abstraction) from its `RemoteControl` (implementation). Different device types (TV, Radio) can work with the same remote control types (Basic, Advanced), and vice-versa.  This is achieved through interfaces and composition. The `Device` class holds an instance of a `RemoteControl`, and each concrete device type utilizes a specific remote concrete implementation. This design is common in JavaScript, leveraging composition over inheritance for flexible relationships between objects.

```javascript
// Device Abstraction
class Device {
  constructor(remoteControl) {
    this.remoteControl = remoteControl;
  }

  operate() {
    this.remoteControl.buttonPressed();
  }
}

// Concrete Abstractions: TV and Radio
class TV extends Device {
  constructor(remoteControl) {
    super(remoteControl);
  }

  display() {
    console.log("Displaying TV content.");
  }
}

class Radio extends Device {
  constructor(remoteControl) {
    super(remoteControl);
  }

  play() {
    console.log("Playing radio.");
  }
}


// Remote Control Interface
class RemoteControl {
  buttonPressed() {
    throw new Error("Method 'buttonPressed()' must be implemented.");
  }
}

// Concrete Implementations: Basic and Advanced Remote Controls
class BasicRemoteControl extends RemoteControl {
  buttonPressed() {
    console.log("Basic remote control button pressed.");
  }
}

class AdvancedRemoteControl extends RemoteControl {
  buttonPressed() {
    console.log("Advanced remote control button pressed.");
  }
}

// Usage
const tv = new TV(new BasicRemoteControl());
tv.operate(); // Basic remote control button pressed.
tv.display();  // Displaying TV content.

const radio = new Radio(new AdvancedRemoteControl());
radio.operate(); // Advanced remote control button pressed.
radio.play();   // Playing radio.
```