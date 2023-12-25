import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = 'http://localhost:3000/text'; // Passe die URL an deine Server-URL an

  constructor(private http: HttpClient) { }

  getText(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  postText(user: string, text: string): Observable<any> {
    return this.http.post(this.apiUrl, { user, text });
  }
}
