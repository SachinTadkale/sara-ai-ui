import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { marked } from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'app-chat-message',
  imports: [DatePipe],
  templateUrl: './chat-message.html',
  styleUrl: './chat-message.css',
})
export class ChatMessage {
  message = input.required<Message>();
  htmlContent!: SafeHtml;

  ngOnChanges() {
    this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(
      marked.parse(this.message().content) as string,
    );
  }

  constructor(private sanitizer: DomSanitizer) {}
  get isUser(): boolean {
    return this.message().role === 'user';
  }
}
