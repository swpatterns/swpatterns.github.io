---
title: "Builder - Ruby"
date: 2025-12-03T10:55:33.645-05:00
draft: false
pattern_usage: ["Builder"]
language: ["Ruby"]
---
The Builder pattern allows constructing complex objects step-by-step. It separates the construction process from the object's representation, enabling different variations of the object to be created using the same construction interface. This is achieved by creating a separate Builder class that defines methods for each step of the object's construction.  The client then uses the builder to construct the object incrementally. This Ruby implementation uses a dedicated `ComputerBuilder` class to construct a `Computer` object, demonstrating a clean and flexible approach to object creation. It leverages Ruby's method chaining and optional parameters for a concise and readable style.

```ruby
# frozen_string_literal: true

class Computer
  attr_reader :cpu, :ram, :storage, :graphics_card, :operating_system

  def initialize(cpu: nil, ram: nil, storage: nil, graphics_card: nil, operating_system: nil)
    @cpu = cpu
    @ram = ram
    @storage = storage
    @graphics_card = graphics_card
    @operating_system = operating_system
  end

  def to_s
    "CPU: #{@cpu}, RAM: #{@ram}, Storage: #{@storage}, Graphics: #{@graphics_card}, OS: #{@operating_system}"
  end
end

class ComputerBuilder
  def initialize
    @computer = Computer.new
  end

  def with_cpu(cpu)
    @computer = @computer.dup # Create a new instance to avoid modifying the original
    @computer.instance_variable_set(:@cpu, cpu)
    self
  end

  def with_ram(ram)
    @computer = @computer.dup
    @computer.instance_variable_set(:@ram, ram)
    self
  end

  def with_storage(storage)
    @computer = @computer.dup
    @computer.instance_variable_set(:@storage, storage)
    self
  end

  def with_graphics_card(graphics_card)
    @computer = @computer.dup
    @computer.instance_variable_set(:@graphics_card, graphics_card)
    self
  end

  def with_operating_system(operating_system)
    @computer = @computer.dup
    @computer.instance_variable_set(:@operating_system, operating_system)
    self
  end

  def build
    @computer
  end
end

# Example Usage
builder = ComputerBuilder.new
gaming_pc = builder.with_cpu("Intel i9").with_ram("32GB").with_graphics_card("Nvidia RTX 4090").with_storage("2TB SSD").with_operating_system("Windows 11").build
office_pc = builder.with_cpu("Intel i5").with_ram("16GB").with_storage("512GB SSD").with_operating_system("Windows 10").build

puts gaming_pc
puts office_pc
```