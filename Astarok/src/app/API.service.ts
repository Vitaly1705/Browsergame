import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private baseUrl = 'http://localhost:3000/text'; // Passe die URL an deine Server-URL an
  private Key = ""

  constructor(private http: HttpClient) { }

  getText(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  postText(id: number, user: string, text: string): Observable<any> {
    return this.http.post(this.baseUrl, { id, user, text });
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }
}
