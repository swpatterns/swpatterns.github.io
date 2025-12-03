---
title: "Clean Architecture - Ruby"
date: 2025-12-03T14:19:22.588-05:00
draft: false
pattern_usage: ["Clean Architecture"]
language: ["Ruby"]
---
The Clean Architecture pattern aims to create systems independent of frameworks, databases, UI, and external agencies. This is achieved by structuring the application into concentric layers: Entities (core business rules), Use Cases (application-specific logic), Interface Adapters (translate data between layers), and Frameworks & Drivers (outermost layer, infrastructure).  The inner layers know nothing of the outer ones. This example demonstrates a basic implementation with Entities, a Use Case, and a rudimentary CLI interface as a Framework & Driver.  The code uses Ruby's inherent flexibility and a focus on small, testable classes which is idiomatic. Dependency Injection is used implicitly through method calls; a full DI container isn't needed for this simple case.

```ruby
# entities/user.rb
class User
  attr_reader :id, :name, :email

  def initialize(id, name, email)
    @id = id
    @name = name
    @email = email
  end
end

# use_cases/create_user.rb
class CreateUser
  def initialize(user_repository)
    @user_repository = user_repository
  end

  def call(name, email)
    user = User.new(SecureRandom.uuid, name, email)
    @user_repository.save(user)
    user
  end
end

# interface_adapters/user_repository_interface.rb
module UserRepositoryInterface
  def save(user)
    raise NotImplementedError
  end
end

# frameworks_and_drivers/in_memory_user_repository.rb
require 'uuid'

class InMemoryUserRepository
  include UserRepositoryInterface

  def initialize
    @users = []
  end

  def save(user)
    @users << user
  end

  def find_by_id(id)
    @users.find { |user| user.id == id }
  end
end

# frameworks_and_drivers/cli.rb
class CLI
  def initialize(create_user_use_case)
    @create_user_use_case = create_user_use_case
  end

  def run
    print "Enter user name: "
    name = gets.chomp
    print "Enter user email: "
    email = gets.chomp

    user = @create_user_use_case.call(name, email)
    puts "Created user with ID: #{user.id}"
  end
end

# main.rb
require_relative 'entities/user'
require_relative 'use_cases/create_user'
require_relative 'interface_adapters/user_repository_interface'
require_relative 'frameworks_and_drivers/in_memory_user_repository'
require_relative 'frameworks_and_drivers/cli'

user_repository = InMemoryUserRepository.new
create_user_use_case = CreateUser.new(user_repository)
cli = CLI.new(create_user_use_case)

cli.run
```