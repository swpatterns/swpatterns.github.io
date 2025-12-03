---
title: "Snapshot - Rust"
date: 2025-12-03T14:01:32.706-05:00
draft: false
pattern_usage: ["Snapshot"]
language: ["Rust"]
---
The Snapshot pattern captures and stores the internal state of an object at a specific point in time, allowing for rollback to that state. This is useful for implementing undo/redo functionality, checkpoints, or transaction management. The Rust implementation uses the `Clone` trait to create copies of the object's state. A `Snapshot` struct holds this cloned state.  The `restore()` method then replaces the current state with the saved snapshot. This approach leverages Rust's ownership and borrowing rules to ensure memory safety during cloning and restoration, and the `Clone` trait is a natural fit for creating immutable copies of the object's data.

```rust
#[derive(Clone)]
struct Document {
    content: String,
    version: u32,
}

impl Document {
    fn new(initial_content: String) -> Self {
        Document {
            content: initial_content,
            version: 1,
        }
    }

    fn edit(&mut self, new_content: String) {
        self.content = new_content;
        self.version += 1;
    }

    fn take_snapshot(&self) -> Snapshot {
        Snapshot {
            document: self.clone(),
        }
    }

    fn restore(&mut self, snapshot: &Snapshot) {
        self.content = snapshot.document.content.clone();
        self.version = snapshot.document.version;
    }
}

struct Snapshot {
    document: Document,
}

fn main() {
    let mut doc = Document::new("Initial content".to_string());

    println!("Original content: {}", doc.content);

    doc.edit("First edit".to_string());
    println!("After first edit: {}", doc.content);

    let snapshot = doc.take_snapshot();

    doc.edit("Second edit".to_string());
    println!("After second edit: {}", doc.content);

    doc.restore(&snapshot);
    println!("Restored content: {}", doc.content);
}
```