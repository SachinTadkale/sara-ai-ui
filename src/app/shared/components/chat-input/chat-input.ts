import { Component, ElementRef, ViewChild, output, signal } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  imports: [],
  templateUrl: './chat-input.html',
  styleUrl: './chat-input.css'
})
export class ChatInput {
  send = output<string>();
  inputValue = signal<string>('');

  @ViewChild('textarea') textarea!: ElementRef<HTMLTextAreaElement>;

  onInput(event: Event) {
    const value = (event.target as HTMLTextAreaElement).value;
    this.inputValue.set(value);
    this.adjustHeight();
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevents newline
      this.triggerSend();
    }
  }

  triggerSend() {
    const val = this.inputValue().trim();
    if (val) {
      this.send.emit(val);
      this.inputValue.set('');
      if (this.textarea) {
        this.textarea.nativeElement.value = '';
        this.textarea.nativeElement.style.height = 'auto';
      }
    }
  }

  adjustHeight() {
    if (this.textarea) {
      const el = this.textarea.nativeElement;
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    }
  }
}
