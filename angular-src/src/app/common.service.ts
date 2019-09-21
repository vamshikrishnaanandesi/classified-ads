import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  _config = config;
  constructor(private http: HttpClient) { }

  register(data: any): Observable<any> {
    return this.http.post(this._config.urls.api + 'users/register', data)
  }

  login(data: any): Observable<any> {
    return this.http.post(this._config.urls.api + 'users/authenticate', data)
  }
}
