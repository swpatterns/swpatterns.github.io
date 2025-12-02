---
title: "Access Token"
date: 2024-02-29T16:18:00-00:00
draft: false
pattern_types: ["behavioral", "security"]
wikipedia: "https://en.wikipedia.org/wiki/Access_token"
diagramtype: "sequence"
diagram: `sequenceDiagram
    participant Client
    participant Authorization Server
    participant Resource Server

    Client->>Authorization Server: Request Authorization
    Authorization Server-->>Client: Authorization Grant
    Client->>Authorization Server: Request Access Token & Refresh Token (using Authorization Grant)
    Authorization Server-->>Client: Access Token & Refresh Token
    Client->>Resource Server: Access Resource (with Access Token)
    Resource Server->>Authorization Server: Validate Access Token
    alt Access Token Valid
        Resource Server-->>Client: Resource
    else Access Token Invalid
        Resource Server-->>Client: Error
    end
    Client->>Authorization Server: Request New Access Token (using Refresh Token)
    Authorization Server-->>Client: New Access Token
`
code: true
---

The Access Token pattern is a security mechanism that allows a client application to access protected resources on behalf of a user. Instead of the client directly managing user credentials (like usernames and passwords), it receives a temporary security credential – the access token – from an authorization server.  This token represents the authorization granted to the client and is presented when making requests to the resource server.

This pattern drastically improves security by limiting the scope of access and reducing credential exposure. Access tokens have a limited lifespan, mitigating the potential damage from compromise. They can also be scoped to specific resources or permissions, enforcing the principle of least privilege. The pattern also allows for easy revocation of access, enhancing control over resource access.

## Usage

The Access Token pattern is extensively used in modern web and mobile applications, particularly when dealing with third-party integrations or APIs. Here are some common usage scenarios:

*   **OAuth 2.0 and OpenID Connect:** The core of these widely adopted authorization frameworks relies on access tokens to grant clients access to user resources hosted by service providers.
*   **API Gateways:** Access tokens are frequently used to authenticate requests passing through API gateways, offering a centralized point for security enforcement.
*   **Microservices Architectures:**  In microservices, access tokens enable secure communication between different services, often managed by a dedicated identity provider.
*   **Single Sign-On (SSO):** Access tokens facilitate SSO solutions, so users can authenticate once and access multiple applications without re-entering credentials.

## Examples

*   **Google OAuth 2.0:** When you allow an app (like a photo editor) to access your Google Photos, Google's authorization server issues an access token to that app. The app then uses this token to request access to your photos from Google's Photos API, without ever having your password.  Google can also revoke the token at any time, denying the app access.
*   **Spotify Web API:** Developers building Spotify applications use access tokens to authorize user requests to the Spotify Web API. A user logs in via Spotify’s authorization flow, and the application receives an access token allowing it to control Spotify playback, access user data (playlists, listening history), etc., based on the permissions granted.
*  **Firebase Authentication:** Firebase utilizes access tokens (specifically JWTs - Json Web Tokens) to authenticate users. After a user logs in, Firebase provides a token that the client application includes in subsequent API requests to access Firebase services.