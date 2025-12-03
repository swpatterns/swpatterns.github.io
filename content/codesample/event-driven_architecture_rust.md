---
title: "Event-Driven Architecture - Rust"
date: 2025-12-03T14:53:48.727-05:00
draft: false
pattern_usage: ["Event-Driven Architecture"]
language: ["Rust"]
---
The Event-Driven Architecture (EDA) decouples system components by having them communicate through events. Components (event producers) emit events without knowing who will handle them, and other components (event consumers) subscribe to events they're interested in. This promotes scalability and flexibility.

This Rust example uses the `crossbeam-channel` crate for a simple, in-memory event bus.  `Event` is a trait representing all events. `EventHandler` is another trait that defines how components react to events.  The `EventBus` manages subscriptions and dispatches events to registered handlers.  The code demonstrates an event producer (`TemperatureSensor`) sending temperature events and a consumer (`HeaterController`) reacting to them. Using traits for `Event` and `EventHandler` allows for easy extension with new event types and handlers. `crossbeam-channel` is a suitable choice for Rust's concurrency model and efficient event passing.

```rust
use std::sync::Arc;
use crossbeam_channel::{unbounded, Receiver, Sender};
use std::thread;

// Define the Event trait
trait Event {
    fn event_type(&self) -> &'static str;
}

// Define the EventHandler trait
trait EventHandler: Send + Sync {
    fn handle_event(&self, event: &dyn Event);
}

// EventBus struct
struct EventBus {
    sender: Sender<Box<dyn Event>>,
    handlers: Arc<Vec<Box<dyn EventHandler>>>,
}

impl EventBus {
    fn new() -> Self {
        let (sender, receiver) = unbounded();
        let handlers = Arc::new(Vec::new());
        let bus = EventBus { sender, handlers };

        let handlers_clone = handlers.clone();
        thread::spawn(move || {
            let mut receiver = receiver;
            loop {
                let event = receiver.recv().unwrap();
                for handler in handlers_clone.iter() {
                    handler.handle_event(&*event);
                }
            }
        });

        bus
    }

    fn subscribe(&mut self, handler: Box<dyn EventHandler>) {
        self.handlers.push(handler);
    }

    fn publish(&self, event: Box<dyn Event>) {
        self.sender.send(event).unwrap();
    }
}

// Example Event: TemperatureEvent
struct TemperatureEvent {
    temperature: f32,
}

impl Event for TemperatureEvent {
    fn event_type(&self) -> &'static str {
        "TemperatureEvent"
    }
}

// Example EventHandler: HeaterController
struct HeaterController;

impl EventHandler for HeaterController {
    fn handle_event(&self, event: &dyn Event) {
        if let Some(temp_event) = event.downcast_ref::<TemperatureEvent>() {
            if temp_event.temperature < 20.0 {
                println!("Temperature is low: {}. Turning on heater.", temp_event.temperature);
            } else {
                println!("Temperature is okay: {}. Heater is off.", temp_event.temperature);
            }
        }
    }
}

// Example Event Producer: TemperatureSensor
struct TemperatureSensor {
    bus: Arc<EventBus>,
}

impl TemperatureSensor {
    fn new(bus: Arc<EventBus>) -> Self {
        TemperatureSensor { bus }
    }

    fn simulate_temperature_reading(&self, temperature: f32) {
        let event = Box::new(TemperatureEvent { temperature });
        self.bus.publish(event);
    }
}

fn main() {
    let bus = Arc::new(EventBus::new());

    let heater_controller = Box::new(HeaterController);
    bus.subscribe(heater_controller);

    let sensor = TemperatureSensor::new(bus.clone());

    sensor.simulate_temperature_reading(15.0);
    sensor.simulate_temperature_reading(22.0);
    sensor.simulate_temperature_reading(18.0);

    thread::sleep(std::time::Duration::from_secs(1)); // Allow events to be processed
}
```