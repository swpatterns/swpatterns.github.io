---
title: "Flyweight - Java"
date: 2025-12-03T11:45:55.205-05:00
draft: false
pattern_usage: ["Flyweight"]
language: ["Java"]
---
The Flyweight pattern aims to minimize memory usage by sharing as much data as possible between similar objects. It achieves this by separating an object's state into intrinsic (shared) and extrinsic (unique) components.  Intrinsic state is stored in the flyweight object, while extrinsic state is passed to the flyweight when needed.

This Java example demonstrates the Flyweight pattern with `SecuritySector` as the flyweight.  The sector's security level (intrinsic state) is shared.  The coordinates (extrinsic state) are unique to each instance and passed in during use.  `SecuritySectorFactory` manages the flyweight instances, ensuring only one exists for each security level. This is idiomatic Java due to its use of interfaces (`SecuritySector`), a factory class (`SecuritySectorFactory`) for controlled instantiation, and leveraging the immutability of strings for the intrinsic state.

```java
import java.util.HashMap;
import java.util.Map;

interface SecuritySector {
    void deploy(int x, int y);
}

class ConcreteSecuritySector implements SecuritySector {
    private final String securityLevel;

    ConcreteSecuritySector(String securityLevel) {
        this.securityLevel = securityLevel;
    }

    @Override
    public void deploy(int x, int y) {
        System.out.println("Deploying " + securityLevel + " sector at (" + x + ", " + y + ")");
    }
}

class SecuritySectorFactory {
    private final Map<String, SecuritySector> sectors = new HashMap<>();

    public SecuritySector getSecuritySector(String securityLevel) {
        return sectors.computeIfAbsent(securityLevel, level -> new ConcreteSecuritySector(level));
    }
}

public class FlyweightDemo {
    public static void main(String[] args) {
        SecuritySectorFactory factory = new SecuritySectorFactory();

        SecuritySector sectorA = factory.getSecuritySector("High");
        SecuritySector sectorB = factory.getSecuritySector("Low");
        SecuritySector sectorC = factory.getSecuritySector("High"); // Reuse existing "High" sector

        sectorA.deploy(10, 20);
        sectorB.deploy(30, 40);
        sectorC.deploy(50, 60);
    }
}
```