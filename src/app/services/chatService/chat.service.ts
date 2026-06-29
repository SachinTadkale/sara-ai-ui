import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { chatResponse } from '../../model/chatResponse';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient) {}
  baseUrl = environment.apiUrl;

  sendMessage(message: string) {
    return this.http.post<chatResponse>(`${this.baseUrl}/chat`, { message });
  }
}
