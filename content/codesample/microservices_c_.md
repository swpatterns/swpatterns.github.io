---
title: "Microservices - C#"
date: 2025-12-03T14:42:35.529-05:00
draft: false
pattern_usage: ["Microservices"]
language: ["C_sharp"]
---
The Microservices pattern structures an application as a collection of loosely coupled, independently deployable services, modeled around a business domain. Each service owns its data and communicates via lightweight mechanisms, often a RESTful API. This example demonstrates a simplified order and customer service interaction.  It uses ASP.NET Core Web APIs for each service, showcasing C#'s strong typing and asynchronous capabilities. Dependency Injection is used for loose coupling.  The services are intentionally minimal to focus on the pattern's core concept of independent deployment and communication.  Real-world implementations would involve more robust error handling, security, and service discovery.

```csharp
// OrderService/OrderController.cs
using Microsoft.AspNetCore.Mvc;

namespace OrderService
{
    [ApiController]
    [Route("[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly ICustomerService _customerService;

        public OrderController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet("{orderId}")]
        public async Task<IActionResult> GetOrder(int orderId)
        {
            // Simulate order retrieval
            var order = new Order { Id = orderId, CustomerId = 1 };

            // Call Customer Service to get customer details
            var customer = await _customerService.GetCustomer(order.CustomerId);

            if (customer == null)
            {
                return NotFound($"Customer with ID {order.CustomerId} not found.");
            }

            return Ok(new { Order = order, Customer = customer });
        }
    }

    public class Order { public int Id { get; set; } public int CustomerId { get; set; } }
}

// CustomerService/CustomerController.cs
using Microsoft.AspNetCore.Mvc;

namespace CustomerService
{
    [ApiController]
    [Route("[controller]")]
    public class CustomerController : ControllerBase
    {
        [HttpGet("{customerId}")]
        public Customer GetCustomer(int customerId)
        {
            // Simulate customer retrieval
            return new Customer { Id = customerId, Name = "Alice" };
        }
    }

    public class Customer { public int Id { get; set; } public string Name { get; set; } }
}

// Shared Interface (for inter-service communication)
public interface ICustomerService
{
    Task<Customer?> GetCustomer(int customerId);
}

//OrderService/Program.cs (Example of dependency injection)
using OrderService;
using CustomerService;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddScoped<ICustomerService, CustomerServiceProxy>(); // Use a proxy for external service calls

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();

//CustomerService/Program.cs
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();

//OrderService/CustomerServiceProxy.cs (Proxy to call external service)
using System.Net.Http;
using System.Threading.Tasks;
using CustomerService;
using Newtonsoft.Json;

namespace OrderService
{
    public class CustomerServiceProxy : ICustomerService
    {
        private readonly HttpClient _httpClient;

        public CustomerServiceProxy(IConfiguration configuration)
        {
            _httpClient = new HttpClient();
            _httpClient.BaseAddress = new Uri(configuration["CustomerServiceUrl"]);
        }

        public async Task<Customer?> GetCustomer(int customerId)
        {
            var response = await _httpClient.GetAsync($"Customer/{customerId}");
            response.EnsureSuccessStatusCode();
            var customerJson = await response.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<Customer>(customerJson);
        }
    }
}
```