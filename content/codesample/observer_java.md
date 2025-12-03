---
title: "Observer - Java"
date: 2025-12-03T13:23:28.601-05:00
draft: false
pattern_usage: ["Observer"]
language: ["Java"]
---
The Observer pattern defines a one-to-many dependency between objects. When the state of one object (the Subject) changes, all its dependent objects (the Observers) are notified and updated automatically. This promotes loose coupling, as the Subject doesn't need to know specific Observer details.

The code demonstrates this with a `Subject` (WeatherData) that maintains weather data and a list of `Observers` (DisplayElements). When the weather data changes (temperature, humidity, pressure), the `Subject` iterates through its registered `Observers` and calls their `update()` methods, passing the new data.  This is implemented using Java interfaces for `Observer` and `Subject`, facilitating flexibility and allowing different displays to react to the same data source without modification to the source. This approach adheres to Java’s principles of interface-based programming and promotes maintainability.

```java
import java.util.ArrayList;
import java.util.List;

// Observer Interface
interface Observer {
    void update(float temperature, float humidity, float pressure);
}

// Subject Interface
interface Subject {
    void registerObserver(Observer observer);
    void removeObserver(Observer observer);
    void notifyObservers();
    float getTemperature();
    float getHumidity();
    float getPressure();
}

// Concrete Subject
class WeatherData implements Subject {
    private List<Observer> observers = new ArrayList<>();
    private float temperature;
    private float humidity;
    private float pressure;

    public void setWeatherData(float temperature, float humidity, float pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
        notifyObservers();
    }

    @Override
    public void registerObserver(Observer observer) {
        observers.add(observer);
    }

    @Override
    public void removeObserver(Observer observer) {
        observers.remove(observer);
    }

    @Override
    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(temperature, humidity, pressure);
        }
    }

    public float getTemperature() {
        return temperature;
    }

    public float getHumidity() {
        return humidity;
    }

    public float getPressure() {
        return pressure;
    }
}

// Concrete Observers
class CurrentConditionsDisplay implements Observer {
    private float temperature;
    private float humidity;
    private float pressure;
    private WeatherData weatherData;

    public CurrentConditionsDisplay(WeatherData weatherData) {
        this.weatherData = weatherData;
        weatherData.registerObserver(this);
    }

    @Override
    public void update(float temperature, float humidity, float pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
        display();
    }

    public void display() {
        System.out.println("Current conditions: " + temperature + "F degrees and " + humidity + "% humidity, " + pressure + " pressure");
    }
}

class ForecastDisplay implements Observer {
    private float temperature;
    private float humidity;
    private float pressure;
    private WeatherData weatherData;

    public ForecastDisplay(WeatherData weatherData) {
        this.weatherData = weatherData;
        weatherData.registerObserver(this);
    }

    @Override
    public void update(float temperature, float humidity, float pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
        display();
    }

    public void display() {
        System.out.println("Forecast: Temperature will be " + temperature + "F, humidity " + humidity + "%");
    }
}

// Main Class (for testing)
public class ObserverExample {
    public static void main(String[] args) {
        WeatherData weatherData = new WeatherData();

        CurrentConditionsDisplay currentConditions = new CurrentConditionsDisplay(weatherData);
        ForecastDisplay forecastConditions = new ForecastDisplay(weatherData);

        weatherData.setWeatherData(80, 60, 1013);
        weatherData.setWeatherData(82, 70, 1015);
        weatherData.removeObserver(forecastConditions);
        weatherData.setWeatherData(83, 65, 1014);
    }
}
```