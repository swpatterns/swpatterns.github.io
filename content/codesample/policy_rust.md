---
title: "Policy - Rust"
date: 2025-12-03T13:57:02.557-05:00
draft: false
pattern_usage: ["Policy"]
language: ["Rust"]
---
The Policy pattern allows you to decouple the logic that determines *if* an operation is allowed from the operation itself. It achieves this by defining a "policy" – a trait or interface – that encapsulates the authorization rules.  Different policies can be swapped in at runtime to change the behavior without modifying the core operation.

This Rust implementation defines a `Policy` trait with a `check()` method. A concrete `AdminPolicy` and `ReadOnlyPolicy` implement this trait, representing different access levels. The `perform_action` function takes a `Policy` as input, allowing it to execute the action only if the policy permits it. This is idiomatic Rust due to its use of traits for polymorphism and ownership/borrowing to ensure safe access control.  The use of a trait object allows for flexible policy selection at runtime.

```rust
// Define the Policy trait
trait Policy {
    fn check(&self, user_role: &str) -> bool;
}

// Concrete Policy: AdminPolicy
struct AdminPolicy;

impl Policy for AdminPolicy {
    fn check(&self, user_role: &str) -> bool {
        user_role == "admin"
    }
}

// Concrete Policy: ReadOnlyPolicy
struct ReadOnlyPolicy;

impl Policy for ReadOnlyPolicy {
    fn check(&self, user_role: &str) -> bool {
        user_role == "admin" || user_role == "user"
    }
}

// The operation that uses the policy
fn perform_action(policy: &dyn Policy, user_role: &str) {
    if policy.check(user_role) {
        println!("Action performed successfully by user with role: {}", user_role);
    } else {
        println!("Permission denied for user with role: {}", user_role);
    }
}

fn main() {
    let admin_policy = AdminPolicy;
    let read_only_policy = ReadOnlyPolicy;

    perform_action(&admin_policy, "admin"); // Action performed
    perform_action(&admin_policy, "user");  // Permission denied
    perform_action(&read_only_policy, "user"); // Action performed
    perform_action(&read_only_policy, "guest"); // Permission denied
}
```