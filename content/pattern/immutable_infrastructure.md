---
title: Immutable Infrastructure
date: 2024-02-29T15:30:00-00:00
draft: false
pattern_types: ["architectural", "DevOps", "operational", "cloud"]
wikipedia: "https://en.wikipedia.org/wiki/Immutable_infrastructure"
diagramtype: "sequence"
diagram: "sequenceDiagram\n  participant Provisioner\n  participant Builder\n  participant Image Store\n  participant Deployment\n\n  Provisioner->>Builder: Create Image Definition\n  Builder->>Image Store: Build Image\n  activate Image Store\n  Image Store-->>Builder: Immutable Image\n  deactivate Image Store\n  Builder-->>Provisioner: Image ID\n  Provisioner->>Deployment: Deploy Image\n  Deployment->>Infrastructure: Launch New Instances with Image ID\n  activate Infrastructure\n  Infrastructure-->>Deployment: Instances Running\n  deactivate Infrastructure\n  Deployment-->>Provisioner: Deployment Complete"
code: true
---

Immutable infrastructure is a practice where servers are never modified after they’re provisioned. Instead, if a change is required, a new server is provisioned with the updated configuration, and the old server is replaced. This approach treats infrastructure as code, emphasizing version control and repeatability. It drastically reduces configuration drift, simplifies updates and rollbacks, increases security by minimizing the attack surface, and improves overall system reliability.

This pattern contrasts with traditional infrastructure management, where servers are often updated in place.  Immutable infrastructure promotes a "replace, don't repair" philosophy, meaning that any intervention on a server beyond its initial provisioning is avoided. This leads to more predictable and consistent environments.

## Usage

Immutable Infrastructure is commonly used in:

*   **Cloud Environments:** Ideal for platforms like AWS, Azure, and Google Cloud where infrastructure can be rapidly provisioned and deprovisioned.
*   **Continuous Delivery Pipelines:** Integrates seamlessly with CI/CD pipelines, enabling automated and reliable deployments of updated infrastructure.
*   **Microservices Architectures:** Supports the frequent updates and scaling requirements of independent microservices.
*   **Disaster Recovery:** Simplifies recovery by allowing for quick and consistent recreation of infrastructure from images.
*   **Security Hardening:** Reduces the window of vulnerability by minimizing the need for patching existing servers.

## Examples

*   **Docker:** Docker containers are a prime example of immutable infrastructure. Once a container image is built, it's not modified. To update an application, a new image is built and deployed, replacing the old container.  Docker Hub and other container registries serve as the image stores.
*   **AWS Machine Images (AMIs) / Azure Managed Images / Google Compute Images:**  Cloud providers offer mechanisms to create and store immutable images of virtual machine configurations. These images can be used to launch new instances, ensuring consistency across deployments.  Terraform or CloudFormation can then be used to codify the image creation and instance launch processes, solidifying the immutability and repeatability.
*   **Packer:** HashiCorp Packer automates the creation of machine images for various platforms (AWS, Azure, Google Cloud, VMware, etc.). Packer outputs identical machine images every time, even if the underlying infrastructure changes, promoting immutability.
*   **Kubernetes:** Kubernetes utilizes immutable containers and declarative configuration to manage application deployments. Updates are performed by rolling out new container versions, rather than modifying existing ones.