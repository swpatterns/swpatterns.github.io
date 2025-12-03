---
title: "Policy - TypeScript"
date: 2025-12-03T13:55:38.177-05:00
draft: false
pattern_usage: ["Policy"]
language: ["TypeScript"]
---
The Policy pattern defines a family of algorithms and encapsulates each one into a separate class. It then allows the client to select the appropriate algorithm at runtime. This promotes loose coupling and allows for easy extension of functionality without modifying existing code.

This TypeScript implementation uses an interface `ValidationPolicy` to define the contract for validation logic. Concrete policies like `RequiredFieldPolicy` and `EmailFormatPolicy` implement this interface, each providing a specific validation rule. A `Validator` class accepts a `ValidationPolicy` via dependency injection and applies it to a given data object. This approach is idiomatic TypeScript due to its strong typing, use of interfaces for abstraction, and reliance on composition over inheritance.

```typescript
// ValidationPolicy Interface
interface ValidationPolicy {
  validate(data: any): string | null;
}

// Concrete Policy 1: Required Field
class RequiredFieldPolicy implements ValidationPolicy {
  private fieldName: string;

  constructor(fieldName: string) {
    this.fieldName = fieldName;
  }

  validate(data: any): string | null {
    if (!data[this.fieldName]) {
      return `${this.fieldName} is required.`;
    }
    return null;
  }
}

// Concrete Policy 2: Email Format
class EmailFormatPolicy implements ValidationPolicy {
  validate(data: any): string | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return "Invalid email format.";
    }
    return null;
  }
}

// Validator Class
class Validator {
  private policy: ValidationPolicy;

  constructor(policy: ValidationPolicy) {
    this.policy = policy;
  }

  validate(data: any): string | null {
    return this.policy.validate(data);
  }
}

// Example Usage
const userData = {
  name: "John Doe",
  email: "invalid-email"
};

const requiredNamePolicy = new RequiredFieldPolicy("name");
const emailFormatPolicy = new EmailFormatPolicy();

const nameValidator = new Validator(requiredNamePolicy);
const emailValidator = new Validator(emailFormatPolicy);

const nameError = nameValidator.validate(userData);
const emailError = emailValidator.validate(userData);

if (nameError) {
  console.error("Name Validation Error:", nameError);
}

if (emailError) {
  console.error("Email Validation Error:", emailError);
}
```