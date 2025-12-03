---
title: "Command - Go"
date: 2025-12-03T13:02:28.756-05:00
draft: false
pattern_usage: ["Command"]
language: ["Go"]
---
The Command pattern encapsulates a request as an object, allowing for parameterization of clients with different requests, queuing or logging of requests, and support for undoable operations. This example defines a `Command` interface with an `Execute` method. Concrete commands like `BuyCommand` and `SellCommand` implement this interface, holding the necessary data to perform the action on a `StockTrader` receiver.  An `Invoker` (broker) manages the commands and executes them.  This Go implementation uses interfaces to define the command structure, making it flexible and testable, and aligns with Go's preference for composition over inheritance.

```go
// main.go
package main

import "fmt"

// Command interface
type Command interface {
	Execute()
}

// StockTrader receiver
type StockTrader struct {
	cash int
	shares int
}

func (s *StockTrader) Buy(quantity, price int) {
	cost := quantity * price
	if s.cash >= cost {
		s.cash -= cost
		s.shares += quantity
		fmt.Printf("Bought %d shares at %d. Cash: %d, Shares: %d\n", quantity, price, s.cash, s.shares)
	} else {
		fmt.Println("Insufficient funds")
	}
}

func (s *StockTrader) Sell(quantity, price int) {
	if s.shares >= quantity {
		s.cash += quantity * price
		s.shares -= quantity
		fmt.Printf("Sold %d shares at %d. Cash: %d, Shares: %d\n", quantity, price, s.cash, s.shares)
	} else {
		fmt.Println("Insufficient shares")
	}
}

// Concrete Commands
type BuyCommand struct {
	trader   *StockTrader
	quantity int
	price    int
}

func (b *BuyCommand) Execute() {
	b.trader.Buy(b.quantity, b.price)
}

type SellCommand struct {
	trader   *StockTrader
	quantity int
	price    int
}

func (s *SellCommand) Execute() {
	s.trader.Sell(s.quantity, s.price)
}

// Invoker / Broker
type Broker struct {
	commands []Command
}

func (b *Broker) AddCommand(command Command) {
	b.commands = append(b.commands, command)
}

func (b *Broker) ExecuteCommands() {
	for _, command := range b.commands {
		command.Execute()
	}
}

func main() {
	trader := &StockTrader{cash: 1000, shares: 0}
	broker := &Broker{}

	broker.AddCommand(&BuyCommand{trader: trader, quantity: 10, price: 50})
	broker.AddCommand(&SellCommand{trader: trader, quantity: 5, price: 60})
	broker.AddCommand(&BuyCommand{trader: trader, quantity: 20, price: 40}) // Might fail

	broker.ExecuteCommands()
}
```