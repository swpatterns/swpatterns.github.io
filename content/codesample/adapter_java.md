---
title: "Adapter - Java"
date: 2025-12-03T11:26:26.681-05:00
draft: false
pattern_usage: ["Adapter"]
language: ["Java"]
---
The Adapter pattern converts the interface of a class into another interface clients expect. It lets classes work together that couldn't otherwise due to incompatible interfaces. This is achieved by creating a wrapper class (the adapter) that translates calls to the adaptee's interface.

This Java implementation adapts a `LegacyRectangularPeg` (which has a square peg interface) to fit into a `RoundHole` (requiring a round peg). The `SquarePegAdapter` implements the `RoundPeg` interface but internally uses a `LegacyRectangularPeg`. The `adapt()` method demonstrates how to use the adapter to make the rectangular peg fit into the round hole. This implementation is idiomatic Java by utilizing interfaces to define contracts and employing composition (the adapter *has-a* `LegacyRectangularPeg`) rather than inheritance when possible.

```java
// Target interface: Round peg
interface RoundPeg {
    void fitIntoHole(RoundHole hole);
}

// Client: Round hole
class RoundHole {
    private final double radius;

    public RoundHole(double radius) {
        this.radius = radius;
    }

    public double getRadius() {
        return radius;
    }
}

// Adaptee: Legacy rectangular peg
class LegacyRectangularPeg {
    private final double width;
    private final double height;

    public LegacyRectangularPeg(double width, double height) {
        this.width = width;
        this.height = height;
    }

    public double getWidth() {
        return width;
    }

    public double getHeight() {
        return height;
    }
}

// Adapter: Converts square peg to round peg
class SquarePegAdapter implements RoundPeg {
    private final LegacyRectangularPeg peg;

    public SquarePegAdapter(LegacyRectangularPeg peg) {
        this.peg = peg;
    }

    @Override
    public void fitIntoHole(RoundHole hole) {
        double reqRadius = hole.getRadius();
        double pegSize = peg.getWidth(); // Assuming square peg, width == height.  Reduced size for fitting.
		if(pegSize > 2 * reqRadius){
			System.out.println("Square peg is too large to fit into the round hole!");
		} else {

        System.out.println("Adapting square peg to fit into round hole.");
        }
    }
}

public class AdapterExample {
    public static void main(String[] args) {
        RoundHole hole = new RoundHole(5);
        LegacyRectangularPeg peg = new LegacyRectangularPeg(8, 8);

        SquarePegAdapter adapter = new SquarePegAdapter(peg);
        adapter.fitIntoHole(hole);

        LegacyRectangularPeg smallPeg = new LegacyRectangularPeg(3, 3);
        SquarePegAdapter smallAdapter = new SquarePegAdapter(smallPeg);
        smallAdapter.fitIntoHole(hole);
    }
}
```