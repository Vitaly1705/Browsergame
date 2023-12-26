import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private chatUrl = 'http://localhost:3000/text';
  private APIUrl = 'http://localhost:3000';
  private Key = ""

  constructor(private http: HttpClient) { }

  getText(): Observable<any> {
    return this.http.get(this.chatUrl);
  }

  postText(id: number, user: string, text: string): Observable<any> {
    return this.http.post(this.chatUrl, { id, user, text });
  }

  register(user: any): Observable<any> {
    console.log(user)
    return this.http.post(`${this.APIUrl}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.APIUrl}/login`, credentials);
  }
}
