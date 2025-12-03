---
title: "Module - Java"
date: 2025-12-03T12:49:01.766-05:00
draft: false
pattern_usage: ["Module"]
language: ["Java"]
---
The Module Pattern, in Java, leverages the principles of encapsulation and information hiding to create self-contained units of code with well-defined interfaces.  Java 9 introduced the official `java.base` module system, but the pattern can be emulated even in older versions using careful class design. This example demonstrates a simple module with public and private components. The `api` package exposes the public interface, while the `internal` package contains implementation details hidden from external access. This promotes maintainability, reduces coupling, and allows for independent evolution of the module's internals.  The use of packages mirrors the modular structure, and access modifiers (`public`, `private`) enforce the module's boundaries.

```java
// api/MyModule.java
package com.example.mymodule.api;

public class MyModule {

    private final com.example.mymodule.internal.Implementation impl;

    public MyModule() {
        this.impl = new com.example.mymodule.internal.Implementation();
    }

    public String doSomething(String input) {
        return impl.internalLogic(input);
    }
}

// internal/Implementation.java
package com.example.mymodule.internal;

class Implementation {

    String internalLogic(String input) {
        return "Module processed: " + input;
    }
}

// Example Usage (in a separate file/module)
/*
package com.example.usermodule;

import com.example.mymodule.api.MyModule;

public class User {
    public static void main(String[] args) {
        MyModule module = new MyModule();
        System.out.println(module.doSomething("Hello"));
        // Cannot access Implementation directly
    }
}
*/
```