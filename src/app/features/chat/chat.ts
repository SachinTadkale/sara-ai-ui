import { Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { ChatLayout } from '../../layouts/chat-layout/chat-layout';
import { EmptyChat } from '../../shared/components/empty-chat/empty-chat';
import { ChatMessage, Message } from '../../shared/components/chat-message/chat-message';
import { ChatInput } from '../../shared/components/chat-input/chat-input';
import { TypingIndicator } from '../../shared/components/typing-indicator/typing-indicator';
import { ChatService } from '../../services/chatService/chat.service';

@Component({
  selector: 'app-chat',
  imports: [ChatLayout, EmptyChat, ChatMessage, ChatInput, TypingIndicator],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {
  messages = signal<Message[]>([]);
  isTyping = signal<boolean>(false);
  private chatService = inject(ChatService);

  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  onSendMessage(content: string) {
    if (!content.trim()) return;

    this.addUserMessage(content);
    this.isTyping.set(true);
    this.scrollToBottom();

    this.chatService.sendMessage(content).subscribe({
      next: (res) => {
        const assistantMessage: Message = {
          role: 'assistant',
          content: res.response,
          timestamp: new Date(),
        };
        this.messages.update((prev) => [...prev, assistantMessage]);
        this.isTyping.set(false);
        this.scrollToBottom();
      },
      error: (err) => {
        console.error('Error sending message:', err);
        this.isTyping.set(false);
      },
    });
  }

  addUserMessage(content: string) {
    const userMessage: Message = {
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    this.messages.update((prev) => [...prev, userMessage]);
    this.scrollToBottom();
  }

  onStopMessage() {
    this.isTyping.set(false);
    this.scrollToBottom();
  }

  private scrollToBottom() {
    setTimeout(() => {
      if (this.scrollContainer) {
        const el = this.scrollContainer.nativeElement;
        el.scrollTo({
          top: el.scrollHeight,
          behavior: 'smooth',
        });
      }
    }, 50);
  }
}

