import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userLoggedIn = false;
  loggedInUserData: any;
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  signIn(body: { email: string, password: string }): Observable<any> {
    return this.http.post<any[]>(`${this.baseUrl}/user/signin`, body);
  }

  createProfile(body: any): Observable<any> {
    return this.http.post<any[]>(`${this.baseUrl}/user/signup`, body);
  }
}
