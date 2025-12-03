---
title: "Proxy - C"
date: 2025-12-03T12:46:56.930-05:00
draft: false
pattern_usage: ["Proxy"]
language: ["C"]
---
The Proxy pattern provides a surrogate or placeholder for another object to control access to it. This is useful for scenarios like remote access, security checks, or lazy initialization.  Here, we proxy a `File` object with a `FileProxy` that handles file opening and reads. The `FileProxy` checks if the file is already open; if not, it opens it and stores the `File` pointer for subsequent use. This avoids repeatedly opening the file, improving performance. The implementation uses C's pointer-based approach to manage the underlying `File` object and demonstrates encapsulation through function pointers. It's a common pattern in C, leveraging its ability to work directly with memory addresses.

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Interface for the real object (File)
typedef struct File {
  char *filename;
  int data;
  int isOpen;
} File;

File *file_create(const char *filename) {
  File *f = (File *)malloc(sizeof(File));
  if (f) {
    f->filename = strdup(filename);
    f->data = 0;
    f->isOpen = 0;
  }
  return f;
}

void file_open(File *file) {
  printf("Opening file: %s\n", file->filename);
  file->isOpen = 1;
  // Simulate reading data from the file
  file->data = 42;
}

int file_read(File *file) {
  if (file->isOpen) {
    printf("Reading from file: %s\n", file->filename);
    return file->data;
  } else {
    printf("File is not open.\n");
    return -1;
  }
}

void file_close(File *file) {
  printf("Closing file: %s\n", file->filename);
  file->isOpen = 0;
}

void file_destroy(File *file) {
  if (file) {
    free(file->filename);
    free(file);
  }
}

// Proxy interface
typedef struct FileProxy {
  File *realFile;
  char *filename;
} FileProxy;

FileProxy *file_proxy_create(const char *filename) {
  FileProxy *proxy = (FileProxy *)malloc(sizeof(FileProxy));
  if (proxy) {
    proxy->realFile = NULL;
    proxy->filename = strdup(filename);
  }
  return proxy;
}

void file_proxy_open(FileProxy *proxy) {
  if (proxy->realFile == NULL) {
    proxy->realFile = file_create(proxy->filename);
    file_open(proxy->realFile);
  } else {
    printf("File already open.\n");
  }
}

int file_proxy_read(FileProxy *proxy) {
  if (proxy->realFile == NULL) {
    printf("File not opened yet.\n");
    return -1;
  }
  return file_read(proxy->realFile);
}

void file_proxy_close(FileProxy *proxy) {
  if (proxy->realFile != NULL) {
    file_close(proxy->realFile);
    file_destroy(proxy->realFile);
    proxy->realFile = NULL;
  }
}

void file_proxy_destroy(FileProxy *proxy) {
  if (proxy) {
    free(proxy->filename);
    free(proxy);
  }
}

int main() {
  FileProxy *proxy = file_proxy_create("my_file.txt");

  file_proxy_read(proxy); // File not opened yet.

  file_proxy_open(proxy);
  int data = file_proxy_read(proxy);
  printf("Data read: %d\n", data);

  file_proxy_open(proxy); // File already open.

  file_proxy_close(proxy);
  file_proxy_read(proxy); // File not opened yet.

  file_proxy_destroy(proxy);

  return 0;
}
```