---
title: "Hexagonal Architecture - Ruby"
date: 2025-12-03T14:10:53.647-05:00
draft: false
pattern_usage: ["Hexagonal Architecture"]
language: ["Ruby"]
---
The Hexagonal Architecture (also known as Ports and Adapters) aims to create loosely coupled software by separating the core business logic from external concerns like databases, UI, and messaging systems. The core communicates via *ports* (interfaces), while external systems connect through *adapters* (implementations of those interfaces). This allows for swapping implementations without impacting the core.

This Ruby example demonstrates a simplified Hexagonal Architecture for a 'user' service.  The core (`UserService`) operates on user data defined by a `User` model.  It interacts with a `UserRepository` port. `InMemoryUserRepository` and `FileUserRepository` are adapters providing concrete user storage.  A simple CLI adapter exposes functionality.  The separation promotes testability and flexibility -- switching storage mechanisms requires only adapting the repository. Ruby's use of duck typing and mixins facilitates defining ports and swapping implementations easily.

```ruby
# core/user.rb
class User
  attr_reader :id, :name

  def initialize(id, name)
    @id = id
    @name = name
  end
end

# core/user_service.rb
require_relative 'user'

class UserService
  def initialize(user_repository)
    @user_repository = user_repository
  end

  def create_user(name)
    user = User.new(rand(1000), name)
    @user_repository.save(user)
    user
  end

  def get_user(id)
    @user_repository.find(id)
  end
end

# ports/user_repository.rb
module UserRepository
  def save(user)
    raise NotImplementedError
  end

  def find(id)
    raise NotImplementedError
  end
end

# adapters/in_memory_user_repository.rb
require_relative '../ports/user_repository'

class InMemoryUserRepository
  include UserRepository

  def initialize
    @users = {}
  end

  def save(user)
    @users[user.id] = user
  end

  def find(id)
    @users[id]
  end
end

# adapters/file_user_repository.rb
require_relative '../ports/user_repository'
require 'json'

class FileUserRepository
  include UserRepository

  def initialize(filepath = 'users.json')
    @filepath = filepath
    load_users
  end

  def save(user)
    users = load_users
    users[user.id] = user.to_h
    File.open(@filepath, 'w') { |f| f.write(JSON.pretty_generate(users))}
  end

  def find(id)
    users = load_users
    user_data = users[id]
    user_data ? User.new(user_data[:id], user_data[:name]) : nil
  end

  private

  def load_users
    if File.exist?(@filepath)
      JSON.parse(File.read(@filepath), symbolize_names: true)
    else
      {}
    end
  end
end

# adapters/cli_adapter.rb
require_relative '../core/user_service'
require_relative '../adapters/in_memory_user_repository' # or FileUserRepository

class CliAdapter
  def initialize(user_service)
    @user_service = user_service
  end

  def run
    loop do
      puts "Choose an action: (1) create user, (2) get user, (3) exit"
      action = gets.chomp.to_i

      case action
      when 1
        puts "Enter user name:"
        name = gets.chomp
        user = @user_service.create_user(name)
        puts "Created user with ID: #{user.id}"
      when 2
        puts "Enter user ID:"
        id = gets.chomp.to_i
        user = @user_service.get_user(id)
        if user
          puts "User name: #{user.name}"
        else
          puts "User not found."
        end
      when 3
        break
      else
        puts "Invalid action."
      end
    end
  end
end

# main.rb
require_relative 'core/user_service'
require_relative 'adapters/in_memory_user_repository'
require_relative 'adapters/cli_adapter'

repository = InMemoryUserRepository.new # or FileUserRepository.new
user_service = UserService.new(repository)
cli_adapter = CliAdapter.new(user_service)

cli_adapter.run
```