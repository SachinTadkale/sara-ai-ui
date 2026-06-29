import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'app-chat-message',
  imports: [DatePipe],
  templateUrl: './chat-message.html',
  styleUrl: './chat-message.css'
})
export class ChatMessage {
  message = input.required<Message>();

  get isUser(): boolean {
    return this.message().role === 'user';
  }
}
