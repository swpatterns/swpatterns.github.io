---
title: Defense in Depth
date: 2023-10-27T10:00:00-00:00
draft: false
pattern_types: ["security", "architectural"]
wikipedia: https://en.wikipedia.org/wiki/Defense_in_depth
diagramtype: "sequence"
diagram: sequenceDiagram
    participant User
    participant Network
    participant System
    participant Application
    participant Data

    User->>Network: Request Access
    Network->>System: Traffic Inspection
    alt Firewall Blocking
        Network--x User: Request Denied
    else Traffic Allowed
        Network->>System: Forwarded Request
        System->>Application: Process Request
        alt Input Validation Failed
            System--x Application: Request Denied
        else Valid Request
            Application->>Data: Access Data
            alt Authorization Failed
                Application--x Data: Access Denied
            else Data Access Granted
                Data->>Application: Data Response
                Application->>System: Return Response
                System->>Network: Forward Response
                Network->>User: Response Received
            end
        end
    end
code: false
---

Defense in Depth is a security strategy that employs multiple layers of security controls to protect valuable assets. Instead of relying on a single line of defense, this pattern aims to make it more difficult for an attacker to succeed by requiring them to overcome numerous obstacles. Each layer represents a different security mechanism, and the failure of one layer doesn’t necessarily compromise the entire system.

This pattern acknowledges that no single security control is perfect and that vulnerabilities can exist in any system. By implementing multiple, diverse security controls, the potential impact of any single breach is minimized. It focuses on redundancy and diversity, aiming to delay, detect, and respond to attacks more effectively.

## Usage

Defense in Depth is broadly applied in modern security architectures across various scenarios:

- **Network Security:** Protecting a network with firewalls, intrusion detection/prevention systems, and network segmentation.
- **Application Security:** Secure coding practices, input validation, output encoding, authentication, and authorization controls.
- **Data Security:** Encryption at rest and in transit, access control lists, data masking, and regular backups.
- **Endpoint Security:** Antivirus software, host-based firewalls, device encryption, and endpoint detection and response (EDR) systems.
- **Cloud Security:** Utilizing cloud provider security services, implementing strong IAM policies, and configuring security groups.
- **Physical Security:** Locks, alarms, surveillance cameras, and physical access controls.

## Examples

1. **Modern Banking Systems:** Banks employ multiple layers of security. They include physical security for bank vaults, network firewalls to protect internal systems, application-level security with strong authentication and fraud detection, and data encryption both during transmission and storage.  Even if one layer is bypassed (e.g., phishing compromises user credentials), others like transaction monitoring and multi-factor authentication aim to prevent fraudulent activity.

2. **Operating System Security (Windows/macOS/Linux):** Operating systems implement Defense in Depth through several mechanisms. This includes user account control (UAC) which requires elevated privileges for certain actions, kernel-level protection to prevent unauthorized code execution, application sandboxing to isolate applications, and regular security updates. If malware bypasses the firewall, the OS's built in defenses still apply.

3. **AWS Security:** Amazon Web Services provides a wide range of security services that promote a Defense in Depth approach. These include VPCs (network segmentation), Security Groups (firewall rules), IAM (identity and access management), KMS (key management service for encryption), and GuardDuty (threat detection). A customer can layer these services to build a robust security posture.