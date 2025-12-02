
---
title: Infrastructure as Code
date: 2024-02-29T16:24:00Z
draft: false
pattern_types: ["DDD", "operational", "automation"]
wikipedia: https://en.wikipedia.org/wiki/Infrastructure_as_Code
diagramtype: "sequence"
diagram: mermaid
sequenceDiagram
    participant Developer
    participant IAC_Tool
    participant Infrastructure

    Developer->>IAC_Tool: Define Infrastructure (YAML, JSON, DSL)
    activate IAC_Tool
    IAC_Tool->>Infrastructure: Provision/Modify Infrastructure
    Infrastructure-->>IAC_Tool: Status/Confirmation
    deactivate IAC_Tool
    Developer-->>Infrastructure: Deploy Application
    
code: true
---

Infrastructure as Code (IaC) is the practice of managing and provisioning infrastructure through code, rather than through manual processes. This means that infrastructure – servers, virtual machines, networks, load balancers, databases, etc. – is treated as code, stored in version control, and automated through continuous integration/continuous delivery pipelines.  IaC promotes consistency, speed, and reduces errors by automating infrastructure setup and changes.

## Usage

IaC is crucial for modern DevOps practices and cloud environments. It’s commonly used in:

*   **Cloud Provisioning:** Automating the creation and management of resources on platforms like AWS, Azure, and Google Cloud.
*   **Application Deployment Pipelines:** Integrating infrastructure changes seamlessly into deployment processes.
*   **Disaster Recovery:**  Easily recreating infrastructure in a different location.
*   **Configuration Management:** Ensuring consistent configurations across all servers and environments.
*   **Test Environments:** Rapidly creating and destroying test environments as needed.

## Examples

1.  **Terraform (HashiCorp):** Terraform is a popular open-source IaC tool that allows users to define infrastructure in a declarative configuration language (HCL). It supports multiple cloud providers and has a robust ecosystem of modules for common patterns. For instance, a Terraform script can define an entire AWS VPC with subnets, security groups, and EC2 instances, then provision all those resources with a single command like `terraform apply`.

2.  **AWS CloudFormation:**  AWS CloudFormation is a native IaC service within Amazon Web Services.  Users define their infrastructure using YAML or JSON templates, detailing the AWS resources needed. CloudFormation then provisions and manages those resources, handling dependencies and updates.  For example, setting up a containerized application using ECS and related resources (VPC, security groups, load balancers) can be entirely automated via a CloudFormation template.

3. **Ansible (Red Hat):** While capable of configuration management, Ansible is also frequently used for IaC. It's agentless and uses a simple YAML-based playbook syntax to define infrastructure state. It can be used to install software, configure services, and provision cloud resources, like within Azure, making it suitable for defining the setup of virtual machines and network configurations.
