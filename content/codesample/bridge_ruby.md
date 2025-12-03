---
title: "Bridge - Ruby"
date: 2025-12-03T11:33:03.104-05:00
draft: false
pattern_usage: ["Bridge"]
language: ["Ruby"]
---
The Bridge pattern is a structural design pattern that lets you split an abstraction from its implementation so that objects can have different implementations. This is useful when there is a need to avoid a hard coupling between an abstraction and its implementation, allowing both to vary independently.

The code demonstrates a `Device` abstraction and two concrete implementations: `Radio` and `TV`. A `RemoteControl` acts as the 'remote' (the abstraction) and can operate on either implementation without knowing the specifics. This separation is achieved by the `RemoteControl` holding an instance of the `Device` interface. Ruby's duck typing and flexible nature make this pattern a natural fit, as the `RemoteControl` doesn't enforce a strict class hierarchy, but relies on the `Device` objects responding to the necessary methods.

```ruby
# Device interface
module Device
  def button_pressed
    raise NotImplementedError
  end

  def get_volume
    raise NotImplementedError
  end

  def set_volume(volume)
    raise NotImplementedError
  end
end

# Concrete Implementations
class Radio
  include Device

  def initialize
    @volume = 3
  end

  def button_pressed
    puts "Radio is playing!"
  end

  def get_volume
    @volume
  end

  def set_volume(volume)
    @volume = volume
  end
end

class TV
  include Device

  def initialize
    @volume = 5
    @channel = 1
  end

  def button_pressed
    puts "TV is displaying!"
  end

  def get_volume
    @volume
  end

  def set_volume(volume)
    @volume = volume
  end
end

# Abstraction
class RemoteControl
  def initialize(device)
    @device = device
  end

  def button_pressed
    @device.button_pressed
  end

  def volume_up
    @device.set_volume(@device.get_volume + 1)
  end

  def volume_down
    @device.set_volume(@device.get_volume - 1)
  end

  def display_volume
    puts "Current volume: #{@device.get_volume}"
  end
end

# Usage
radio = Radio.new
tv = TV.new

remote_radio = RemoteControl.new(radio)
remote_tv = RemoteControl.new(tv)

remote_radio.button_pressed
remote_radio.volume_up
remote_radio.display_volume

remote_tv.button_pressed
remote_tv.volume_down
remote_tv.display_volume
```