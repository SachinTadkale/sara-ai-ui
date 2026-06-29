import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-suggestion-card',
  imports: [],
  templateUrl: './suggestion-card.html',
  styleUrl: './suggestion-card.css'
})
export class SuggestionCard {
  title = input.required<string>();
  description = input.required<string>();
  icon = input.required<string>();
  cardClick = output<void>();

  onClick() {
    this.cardClick.emit();
  }
}
