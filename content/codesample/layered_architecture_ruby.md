---
title: "Layered Architecture - Ruby"
date: 2025-12-03T14:06:20.631-05:00
draft: false
pattern_usage: ["Layered Architecture"]
language: ["Ruby"]
---
The Layered Architecture pattern organizes an application into distinct layers, each performing a specific role. This promotes separation of concerns and makes the system more maintainable and testable. Common layers include Presentation, Business Logic, and Data Access. Our Ruby example utilizes classes to represent each layer. The `Application` class orchestrates interactions between them. Data flows unidirectionally – Presentation calls Business Logic, which in turn calls Data Access.  This implementation emphasizes Ruby's object-oriented capabilities, using clear class definitions and method calls for communication.  It eschews complex configuration in favor of direct object instantiation, aligning with Ruby's focus on simplicity and readability.

```ruby
# app/application.rb
class Application
  def initialize(business_logic, presentation)
    @business_logic = business_logic
    @presentation = presentation
  end

  def run(request)
    result = @business_logic.process(request)
    @presentation.display(result)
  end
end

# app/business_logic.rb
class BusinessLogic
  def initialize(data_access)
    @data_access = data_access
  end

  def process(request)
    data = @data_access.fetch_data(request)
    # Perform some business logic on the data
    "Business Logic says: #{data.upcase}"
  end
end

# app/data_access.rb
class DataAccess
  def fetch_data(request)
    # Simulate fetching data from a database or external source
    if request == "get_data"
      "some data"
    else
      "default data"
    end
  end
end

# app/presentation.rb
class Presentation
  def display(data)
    puts data
  end
end

# main.rb
require_relative 'app/application'
require_relative 'app/business_logic'
require_relative 'app/data_access'
require_relative 'app/presentation'

data_access = DataAccess.new
business_logic = BusinessLogic.new(data_access)
presentation = Presentation.new
application = Application.new(business_logic, presentation)

application.run("get_data")
application.run("other_request")
```