import { Component, output } from '@angular/core';
import { SuggestionCard } from '../suggestion-card/suggestion-card';

export interface Suggestion {
  title: string;
  description: string;
  icon: string;
  prompt: string;
}

@Component({
  selector: 'app-empty-chat',
  imports: [SuggestionCard],
  templateUrl: './empty-chat.html',
  styleUrl: './empty-chat.css'
})
export class EmptyChat {
  suggestionSelected = output<string>();

  suggestions: Suggestion[] = [
    {
      title: 'Explain JWT',
      description: 'Explain JSON Web Tokens in simple terms',
      icon: 'lock',
      prompt: 'Explain JWT Authentication'
    },
    {
      title: 'Spring Boot API',
      description: 'Generate a boilerplate REST API controller',
      icon: 'code',
      prompt: 'Generate Spring Boot REST API'
    },
    {
      title: 'Summarize Text',
      description: 'Extract key points from a mock document',
      icon: 'file-text',
      prompt: 'Summarize this document'
    },
    {
      title: 'Plan a Trip',
      description: 'Draft a Saturday/Sunday activity itinerary',
      icon: 'map',
      prompt: 'Plan my weekend trip'
    }
  ];

  selectSuggestion(prompt: string) {
    this.suggestionSelected.emit(prompt);
  }
}
