// services/weather-app.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherAppService {

  constructor(private http: HttpClient) { }

  getWeatherData(cityName: string): Observable<any> {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=d57209a1bae985ab72c34e413089e144`;
    
    return this.http.get(apiUrl).pipe(
      map((response: any) => {
        // Arrotonda tutti i campi numerici a una cifra dopo il punto
        if (response.main) {
          for (const key in response.main) {
            if (typeof response.main[key] === 'number') {
              response.main[key] = response.main[key].toFixed(1);
            }
          }
        }
        return response;
      })
    );
  }
}
