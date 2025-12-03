---
title: "Self-contained Systems - Rust"
date: 2025-12-03T14:30:06.961-05:00
draft: false
pattern_usage: ["Self-contained Systems"]
language: ["Rust"]
---
The Self-Contained System pattern aims to encapsulate all dependencies a component needs within that component itself, minimizing external reliance and improving portability and reproducibility. This is often achieved through embedding data, code, or configuration directly within the component. In Rust, this is naturally supported through its strong ownership model, lack of global state, and ability to embed data directly into structs and enums. The example below creates a simple image processing system where the image data *is* the system, avoiding external file paths or shared resources. Data cloning is used as needed to allow for non-mutative access.

```rust
// src/image_processor.rs

#[derive(Debug, Clone)]
pub struct Image {
    pub width: u32,
    pub height: u32,
    pub pixels: Vec<u8>,
}

impl Image {
    pub fn new(width: u32, height: u32, pixels: Vec<u8>) -> Self {
        Image {
            width,
            height,
            pixels,
        }
    }

    // A simple grayscale transformation for demonstration
    pub fn to_grayscale(&self) -> Image {
        let mut new_pixels = Vec::with_capacity(self.pixels.len());
        for &pixel in &self.pixels {
            let gray = (pixel as f32 * 0.299) as u8;
            new_pixels.push(gray);
        }
        Image::new(self.width, self.height, new_pixels)
    }
}

fn main() {
    // Example Usage:
    let image_data = vec![
        255, 0, 0, // Red
        0, 255, 0, // Green
        0, 0, 255, // Blue
    ];
    let image = Image::new(3, 1, image_data);

    println!("Original Image: {:?}", image);

    let grayscale_image = image.to_grayscale();
    println!("Grayscale Image: {:?}", grayscale_image);
}
```