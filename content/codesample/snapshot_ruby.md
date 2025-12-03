---
title: "Snapshot - Ruby"
date: 2025-12-03T14:02:15.564-05:00
draft: false
pattern_usage: ["Snapshot"]
language: ["Ruby"]
---
The Snapshot pattern allows saving and restoring the internal state of an object. This is useful for implementing features like undo/redo, checkpoints, or transaction rollback.  The core idea is to encapsulate the object's state into a separate snapshot object, enabling reverting to that saved state without affecting the original object's class definition. This Ruby implementation uses a simple hash to store the object's state and provides methods to take and apply snapshots. Ruby's dynamic nature and hash-based data structures make this a concise and natural fit.

```ruby
# frozen_string_literal: true

class Account
  attr_accessor :balance, :transactions

  def initialize(balance = 0)
    @balance = balance
    @transactions = []
  end

  def deposit(amount)
    @balance += amount
    @transactions << amount
  end

  def withdraw(amount)
    raise "Insufficient funds" if @balance < amount
    @balance -= amount
    @transactions << -amount
  end

  def take_snapshot
    Snapshot.new(balance: @balance, transactions: @transactions.dup) # Deep copy transactions
  end

  def restore_snapshot(snapshot)
    @balance = snapshot.balance
    @transactions = snapshot.transactions.dup # Deep copy transactions
  end

  def to_s
    "Balance: #{@balance}, Transactions: #{@transactions}"
  end
end

class Snapshot
  attr_reader :balance, :transactions

  def initialize(balance:, transactions:)
    @balance = balance
    @transactions = transactions
  end
end

# Example Usage
account = Account.new(100)
puts "Initial Account: #{account}"

snapshot = account.take_snapshot
account.deposit(50)
puts "After Deposit: #{account}"

account.withdraw(25)
puts "After Withdrawal: #{account}"

account.restore_snapshot(snapshot)
puts "Restored Account: #{account}"
```