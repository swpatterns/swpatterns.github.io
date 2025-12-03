---
title: "Builder - C#"
date: 2025-12-03T10:53:28.488-05:00
draft: false
pattern_usage: ["Builder"]
language: ["C#"]
---
The Builder pattern is a creational design pattern that lets you construct complex objects step by step. It allows for the separation of construction logic from the object's representation, enabling different variations of the object to be created using the same construction process.

The C# code demonstrates the Builder pattern for constructing a `Computer` object.  The `ComputerBuilder` class provides a fluent interface (`WithProcessor`, `WithRam`, `WithStorage`) to set the computer's components. A `Director` class orchestrates the building process using the builder. This approach keeps the `Computer` class simple and focuses the construction complexity within the builder, promoting code readability and maintainability. The use of a fluent interface is a common and idiomatic practice in C# for builder patterns.

```csharp
// Computer class - the complex object to build
public class Computer
{
    public string Processor { get; set; }
    public int Ram { get; set; }
    public string Storage { get; set; }
    public bool HasGpu { get; set; }

    private Computer(string processor, int ram, string storage, bool hasGpu)
    {
        Processor = processor;
        Ram = ram;
        Storage = storage;
        HasGpu = hasGpu;
    }

    public override string ToString()
    {
        return $"Processor: {Processor}, Ram: {Ram}GB, Storage: {Storage}, GPU: {HasGpu}";
    }

    // Inner Builder class
    public class Builder
    {
        private string processor;
        private int ram;
        private string storage;
        private bool hasGpu;

        public Builder WithProcessor(string processor)
        {
            this.processor = processor;
            return this;
        }

        public Builder WithRam(int ram)
        {
            this.ram = ram;
            return this;
        }

        public Builder WithStorage(string storage)
        {
            this.storage = storage;
            return this;
        }

        public Builder WithGpu(bool hasGpu)
        {
            this.hasGpu = hasGpu;
            return this;
        }

        public Computer Build()
        {
            return new Computer(processor, ram, storage, hasGpu);
        }
    }
}

// Director class - orchestrates the building process
public class Director
{
    public Computer ConstructGamingComputer(Computer.Builder builder)
    {
        return builder.WithProcessor("Intel i9")
                      .WithRam(32)
                      .WithStorage("2TB SSD")
                      .WithGpu(true)
                      .Build();
    }

    public Computer ConstructOfficeComputer(Computer.Builder builder)
    {
        return builder.WithProcessor("Intel i5")
                      .WithRam(16)
                      .WithStorage("512GB SSD")
                      .WithGpu(false)
                      .Build();
    }
}

// Example Usage
public class Example
{
    public static void Main(string[] args)
    {
        Director director = new Director();

        Computer gamingComputer = director.ConstructGamingComputer(new Computer.Builder());
        Console.WriteLine(gamingComputer);

        Computer officeComputer = director.ConstructOfficeComputer(new Computer.Builder());
        Console.WriteLine(officeComputer);
    }
}
```
