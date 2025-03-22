import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userLoggedIn = false;
  baseUrl: any;

  constructor(private http: HttpClient) { }


  signIn(body: { email: string, password: string }): Observable<any> {
    return this.http.post<any[]>(`${this.baseUrl}/auth/signin`, body);
  }

  createProfile(body: any): Observable<any> {
    return this.http.post<any[]>(`${this.baseUrl}/auth/signup`, body);
  }
}
