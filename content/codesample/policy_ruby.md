---
title: "Policy - Ruby"
date: 2025-12-03T13:57:52.031-05:00
draft: false
pattern_usage: ["Policy"]
language: ["Ruby"]
---
The Policy pattern encapsulates business rules and logic related to permissions and authorization within dedicated policy objects. This promotes separation of concerns, making the code more maintainable and testable. Instead of scattering authorization checks throughout the application, a central policy determines if an action is permitted based on the user and the resource.

This Ruby implementation defines a `Document` class and a `DocumentPolicy`. The policy has a `can_edit?` method that checks if a user has permission to edit a document, based on the user's role. The `Document#can_edit?(user)` method delegates to the policy, keeping the document model clean of authorization logic. This approach is idiomatic Ruby due to its emphasis on object-oriented design and the principle of "Don't Repeat Yourself" (DRY).  Using a dedicated class for policy makes testing and modification of permissions straightforward.

```ruby
# app/models/document.rb
class Document
  attr_reader :title, :content, :owner

  def initialize(title, content, owner)
    @title = title
    @content = content
    @owner = owner
  end

  def can_edit?(user)
    DocumentPolicy.new(user, self).can_edit?
  end
end

# app/policies/document_policy.rb
class DocumentPolicy
  def initialize(user, document)
    @user = user
    @document = document
  end

  def can_edit?
    @user.role == 'admin' || @user.id == @document.owner
  end
end

# Example Usage
class User
  attr_reader :role, :id

  def initialize(role, id)
    @role = role
    @id = id
  end
end

document = Document.new("My Report", "Some data", 123)
admin = User.new("admin", 456)
owner = User.new("user", 123)
regular_user = User.new("user", 789)

puts "Admin can edit: #{document.can_edit?(admin)}" # true
puts "Owner can edit: #{document.can_edit?(owner)}" # true
puts "Regular user can edit: #{document.can_edit?(regular_user)}" # false
```