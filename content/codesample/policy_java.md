---
title: "Policy - Java"
date: 2025-12-03T13:54:45.567-05:00
draft: false
pattern_usage: ["Policy"]
language: ["Java"]
---
The Policy pattern allows for runtime selection of algorithms or behaviors based on configurable rules. It decouples the decision-making process (the policy) from the specific implementations (the strategies). This promotes flexibility and avoids hardcoding logic.

The Java implementation uses an interface `ValidationPolicy` to define the validation logic. Concrete policies like `EmailValidationPolicy` and `LengthValidationPolicy` implement this interface. A `PolicyHandler` class encapsulates a list of policies and iterates through them, applying each to the input data. This approach is idiomatic Java due to its use of interfaces for abstraction and classes for concrete implementations, leveraging polymorphism for dynamic behavior selection. The `PolicyHandler` acts as a context, managing the policies.

```java
// ValidationPolicy.java
interface ValidationPolicy {
    boolean validate(String data);
    String getErrorMessage();
}

// EmailValidationPolicy.java
class EmailValidationPolicy implements ValidationPolicy {
    @Override
    public boolean validate(String data) {
        return data.matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
    }

    @Override
    public String getErrorMessage() {
        return "Invalid email format";
    }
}

// LengthValidationPolicy.java
class LengthValidationPolicy implements ValidationPolicy {
    private final int minLength;
    private final int maxLength;

    public LengthValidationPolicy(int minLength, int maxLength) {
        this.minLength = minLength;
        this.maxLength = maxLength;
    }

    @Override
    public boolean validate(String data) {
        return data.length() >= minLength && data.length() <= maxLength;
    }

    @Override
    public String getErrorMessage() {
        return "Data length must be between " + minLength + " and " + maxLength + " characters.";
    }
}

// PolicyHandler.java
import java.util.List;
import java.util.ArrayList;

class PolicyHandler {
    private final List<ValidationPolicy> policies;

    public PolicyHandler(List<ValidationPolicy> policies) {
        this.policies = new ArrayList<>(policies);
    }

    public ValidationResult validate(String data) {
        for (ValidationPolicy policy : policies) {
            if (!policy.validate(data)) {
                return new ValidationResult(false, policy.getErrorMessage());
            }
        }
        return new ValidationResult(true, null);
    }
}

// ValidationResult.java
class ValidationResult {
    private final boolean isValid;
    private final String errorMessage;

    public ValidationResult(boolean isValid, String errorMessage) {
        this.isValid = isValid;
        this.errorMessage = errorMessage;
    }

    public boolean isValid() {
        return isValid;
    }

    public String getErrorMessage() {
        return errorMessage;
    }
}

// Example Usage (Main.java)
public class Main {
    public static void main(String[] args) {
        List<ValidationPolicy> policies = new ArrayList<>();
        policies.add(new EmailValidationPolicy());
        policies.add(new LengthValidationPolicy(5, 20));

        PolicyHandler policyHandler = new PolicyHandler(policies);

        ValidationResult result1 = policyHandler.validate("test@example.com");
        System.out.println("Data: test@example.com, Valid: " + result1.isValid() + ", Error: " + result1.getErrorMessage());

        ValidationResult result2 = policyHandler.validate("short");
        System.out.println("Data: short, Valid: " + result2.isValid() + ", Error: " + result2.getErrorMessage());

        ValidationResult result3 = policyHandler.validate("thisisareallylongstringthatwillfailthevalidation");
        System.out.println("Data: thisisareallylongstringthatwillfailthevalidation, Valid: " + result3.isValid() + ", Error: " + result3.getErrorMessage());
    }
}
```