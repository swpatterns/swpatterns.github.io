---
title: Feature Toggle
date: 2024-02-29T10:30:00-00:00
draft: false
pattern_types: ["behavioral", "development", "release"]
wikipedia: https://en.wikipedia.org/wiki/Feature_toggle
diagramtype: "class"
diagram: "[Client] -- Uses --> [Toggle]
[Toggle] -- Returns --> [Feature]
[Feature] -- Implemented by --> [FeatureImplementationA]
[Feature] -- Implemented by --> [FeatureImplementationB]
[Toggle] [note: Configuration determines which implementation is used {bg:lightgreen}]
"
code: true
---

The Feature Toggle (also known as Feature Flag) pattern allows the modification of application behavior without requiring a deployment. It essentially involves wrapping a section of code within a conditional statement controlled by a toggle. This toggle can be dynamically switched at runtime, enabling or disabling a particular feature. This is useful for controlled rollouts, A/B testing, and emergency feature disabling.

Feature toggles are a powerful tool for continuous delivery, reducing the risk associated with new releases. By decoupling code deployment from feature release, teams can merge code more frequently and deploy it to production without immediately exposing new functionality to all users. This provides greater control over the user experience and allows for quicker iteration based on real-world feedback.

## Usage

Feature toggles are widely used in the following scenarios:

*   **Dark Launches:** Deploying new features to production but keeping them hidden from users until they are fully tested and ready for release.
*   **Canary Releases:** Releasing a feature to a small subset of users before rolling it out to the entire user base.
*   **A/B Testing:** Showing different versions of a feature to different user groups to determine which version performs better.
*   **Emergency Kill Switch:** Quickly disabling a problematic feature in production without requiring a rollback.
*   **Subscription-Based Features:** Enabling or disabling features based on a user's subscription level.
*   **Operational Toggles:** Controlling aspects of the application based on server load, time of day, or other operational factors.

## Examples

*   **Netflix:** Netflix uses feature toggles extensively to experiment with new UI features, algorithms, and pricing models. They can release changes to a small percentage of users, gather data, and then roll out the feature more broadly if it proves successful. If issues arise, they can instantly disable the toggle, reverting to the previous functionality without impacting all users.

*   **Firebase:** Firebase utilizes feature toggles for releasing new functionality within its suite of developer tools. This allows them to iterate quickly on new features, collect feedback from early adopters, and ensure a stable experience for all developers. Specifically, they use them to manage access to beta features and control the rollout of major updates.

*   **LaunchDarkly (Platform):** LaunchDarkly is a feature management platform dedicated to providing robust feature toggling capabilities. It offers a centralized system for managing toggles, targeting users based on various criteria, and monitoring the impact of feature changes, demonstrating the pattern implemented as a service.