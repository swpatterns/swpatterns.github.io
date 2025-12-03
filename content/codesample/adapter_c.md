---
title: "Adapter - C"
date: 2025-12-03T11:27:56.662-05:00
draft: false
pattern_usage: ["Adapter"]
language: ["C"]
---
The Adapter pattern converts the interface of a class into another interface clients expect. It lets classes work together that couldn't otherwise because of incompatible interfaces. This is achieved by creating a wrapper class (the adapter) that translates calls to the adaptee's interface into calls that the client understands.  In C, this is often done using function pointers, effectively creating a new interface that calls the old one. The example adapts a specific temperature reporting system (Celsius) to a more general one (Kelvin), allowing clients expecting Kelvin to work with the Celsius system without modification. This is idiomatic C because it’s type-safe utilizing function pointers for interface mapping.

```c
#include <stdio.h>

// Existing system (Adaptee) - reports temperature in Celsius
typedef struct {
  float (*get_celsius)(void);
} CelsiusReporter;

float get_celsius_impl(void) {
  // Simulate reading from a Celsius sensor
  return 25.0;
}

// Target interface - reports temperature in Kelvin
typedef struct {
  float (*get_kelvin)(void);
} KelvinReporter;

// Adapter - adapts CelsiusReporter to KelvinReporter
typedef struct {
  CelsiusReporter* celsius_reporter;
} KelvinAdapter;

KelvinAdapter* create_kelvin_adapter(CelsiusReporter* celsius_reporter) {
  KelvinAdapter* adapter = (KelvinAdapter*)malloc(sizeof(KelvinAdapter));
  adapter->celsius_reporter = celsius_reporter;
  return adapter;
}

float get_kelvin_from_celsius(KelvinAdapter* adapter) {
  float celsius = adapter->celsius_reporter->get_celsius();
  return celsius + 273.15;
}

//Implement KelvinReporter interface with the adapter
float get_kelvin(void *opaque_adapter){
    return get_kelvin_from_celsius((KelvinAdapter*)opaque_adapter);
}
// Client code
int main() {
  CelsiusReporter celsius_system;
  celsius_system.get_celsius = get_celsius_impl;

  KelvinAdapter* adapter = create_kelvin_adapter(&celsius_system);

  // Client expects Kelvin
  KelvinReporter kelvin_system;
  kelvin_system.get_kelvin = get_kelvin;
  
  float kelvin_temperature = kelvin_system.get_kelvin((void*)adapter);

  printf("Temperature in Kelvin: %.2f\n", kelvin_temperature);

  free(adapter);
  return 0;
}
```