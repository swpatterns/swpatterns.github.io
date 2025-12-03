---
title: "N-tier - Ruby"
date: 2025-12-03T14:39:46.945-05:00
draft: false
pattern_usage: ["N-tier"]
language: ["Ruby"]
---
The N-tier pattern organizes an application into distinct layers, each with a specific responsibility. This separation improves maintainability, testability, and scalability. A typical N-tier architecture includes a presentation tier (UI), a business logic tier (services), and a data access tier (repositories).

This Ruby example demonstrates a simple 3-tier architecture for managing user data. The `UserInterface` handles input/output. The `UserService` encapsulates the business logic for user operations. The `UserRepository` interacts directly with a simplified "database" (an array in this case) for data persistence. The `UserService` depends on the `UserRepository`, isolating the business logic from the data storage details. This structure is very Ruby-esque by leveraging object composition and clear separation of concerns, making it easy to test each tier independently.

```ruby
# app/models/user.rb
class User
  attr_accessor :id, :name, :email

  def initialize(id, name, email)
    @id = id
    @name = name
    @email = email
  end
end

# app/repositories/user_repository.rb
class UserRepository
  def initialize
    @users = []
  end

  def all
    @users
  end

  def find(id)
    @users.find { |user| user.id == id }
  end

  def create(name, email)
    user = User.new(next_id, name, email)
    @users << user
    user
  end

  private

  def next_id
    @users.empty? ? 1 : @users.map(&:id).max + 1
  end
end

# app/services/user_service.rb
class UserService
  def initialize(user_repository)
    @user_repository = user_repository
  end

  def list_users
    @user_repository.all
  end

  def get_user(id)
    @user_repository.find(id)
  end

  def create_user(name, email)
    @user_repository.create(name, email)
  end
end

# app/user_interface.rb
class UserInterface
  def initialize(user_service)
    @user_service = user_service
  end

  def run
    loop do
      puts "\nChoose an action:"
      puts "1. List users"
      puts "2. Get user by ID"
      puts "3. Create user"
      puts "4. Exit"

      choice = gets.chomp.to_i

      case choice
      when 1
        users = @user_service.list_users
        users.each { |user| puts "#{user.id}: #{user.name} (#{user.email})" }
      when 2
        puts "Enter user ID:"
        id = gets.chomp.to_i
        user = @user_service.get_user(id)
        puts "User found: #{user.name} (#{user.email})" if user
      when 3
        puts "Enter user name:"
        name = gets.chomp
        puts "Enter user email:"
        email = gets.chomp
        user = @user_service.create_user(name, email)
        puts "User created with ID: #{user.id}"
      when 4
        break
      else
        puts "Invalid choice."
      end
    end
  end
end

# main.rb
user_repository = UserRepository.new
user_service = UserService.new(user_repository)
user_interface = UserInterface.new(user_service)

user_interface.run
```