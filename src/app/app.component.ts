import { Component } from '@angular/core';
import { WeatherAppService } from './services/weather-app.service';
import { environment } from 'src/environments/environment';

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weatherApp';
  weatherData: any;
  cityName: string = '';

  constructor(private weatherAppService: WeatherAppService) {}

  searchWeather(): void {
    const apiUrl = `${environment.apiUrl}&q=${this.cityName}`;
    console.log('API URL:', apiUrl);
  
    this.weatherAppService.getWeatherData(this.cityName)
      .subscribe(
        data => {
          this.weatherData = data;
          console.log('Dati meteo ricevuti:', this.weatherData);
        },
        error => {
          console.error('Errore nella chiamata API:', error);
          if (error.status === 404) {
            alert('Città non trovata. Verifica il nome della città e riprova.');
          } else {
            alert('Si è verificato un errore durante la richiesta dei dati meteo.');
          }
        }
      );
  }

  isRaining(): boolean {
    // Controlla se 'Rain' è presente nel campo 'main' dell'array 'weather'
    return this.weatherData.weather && this.weatherData.weather.some((w: Weather) => w.main === 'Rain');
  }
  
}
