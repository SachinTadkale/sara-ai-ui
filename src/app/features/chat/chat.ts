import { Component, ElementRef, ViewChild, signal } from '@angular/core';
import { ChatLayout } from '../../layouts/chat-layout/chat-layout';
import { EmptyChat } from '../../shared/components/empty-chat/empty-chat';
import { ChatMessage, Message } from '../../shared/components/chat-message/chat-message';
import { ChatInput } from '../../shared/components/chat-input/chat-input';
import { TypingIndicator } from '../../shared/components/typing-indicator/typing-indicator';

@Component({
  selector: 'app-chat',
  imports: [
    ChatLayout,
    EmptyChat,
    ChatMessage,
    ChatInput,
    TypingIndicator
  ],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {
  messages = signal<Message[]>([]);
  isTyping = signal<boolean>(false);

  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  onSendMessage(content: string) {
    if (!content.trim()) return;

    // 1. Add user message
    const userMessage: Message = {
      role: 'user',
      content: content.trim(),
      timestamp: new Date()
    };
    this.messages.update((prev) => [...prev, userMessage]);
    this.scrollToBottom();

    // 2. Set typing indicator
    this.isTyping.set(true);
    this.scrollToBottom();

    // 3. Mock AI response after short delay
    setTimeout(() => {
      this.isTyping.set(false);
      const aiResponse: Message = {
        role: 'assistant',
        content: this.getMockResponse(content),
        timestamp: new Date()
      };
      this.messages.update((prev) => [...prev, aiResponse]);
      this.scrollToBottom();
    }, 1500);
  }

  private scrollToBottom() {
    // Schedule scroll after DOM updates render new list elements
    setTimeout(() => {
      if (this.scrollContainer) {
        const el = this.scrollContainer.nativeElement;
        el.scrollTo({
          top: el.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, 50);
  }

  private getMockResponse(prompt: string): string {
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes('jwt')) {
      return `JSON Web Tokens (JWT) are an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.

Here is a quick overview of how JWTs are structured:
1. **Header**: Typically consists of two parts: the type of the token (JWT) and the signing algorithm (e.g., HMAC SHA256).
2. **Payload**: Contains the claims. Claims are statements about an entity (typically, the user) and additional data (e.g., issuer, expiration time).
3. **Signature**: Used to verify the message wasn't changed along the way. Created by taking the encoded header, the encoded payload, a secret, and signing them.

JWTs are commonly used for authorization and information exchange.`;
    }
    
    if (lowerPrompt.includes('spring boot') || lowerPrompt.includes('rest api')) {
      return `Here is a simple example of a Spring Boot RestController for managing items:

\`\`\`java
@RestController
@RequestMapping("/api/items")
public class ItemController {

    private final List<String> items = new ArrayList<>(List.of("Item 1", "Item 2"));

    @GetMapping
    public List<String> getAllItems() {
        return items;
    }

    @PostMapping
    public ResponseEntity<String> addItem(@RequestBody String item) {
        items.add(item);
        return ResponseEntity.status(HttpStatus.CREATED).body(item);
    }
}
\`\`\`

To start your Spring Boot application, make sure you have the \`@SpringBootApplication\` annotation on your main application class and run it.`;
    }
    
    if (lowerPrompt.includes('summarize')) {
      return `Here is a summary of the requested document:

**Key Takeaways:**
- **Objective**: Establish a clean, production-ready Angular standalone chat interface for SaraAI.
- **Styling**: Leverages Tailwind CSS exclusively for structural layout and spacing, keeping the actual aesthetic details in component-scoped CSS.
- **UX Features**: Independent chat scroll area, auto-scrolling message streams, responsive text sizes, a multi-line input textarea, and smooth typing indicators.`;
    }
    
    if (lowerPrompt.includes('weekend trip') || lowerPrompt.includes('plan')) {
      return `Here is a fun, balanced plan for your weekend trip:

**Saturday - Exploration & Culture:**
- *Morning*: Head to a local farmers' market for fresh breakfast pastries, followed by a walk through the historical city center.
- *Afternoon*: Visit the main museum or art gallery, then take a relaxing coffee break in a cozy garden cafe.
- *Evening*: Enjoy dinner at an authentic restaurant, followed by a stroll along the riverfront.

**Sunday - Nature & Relaxation:**
- *Morning*: Take a light hike or walk in a nearby nature reserve or botanical garden.
- *Afternoon*: Have an outdoor picnic lunch, then spend a couple of hours shopping or visiting local boutiques.
- *Evening*: Wind down with a relaxing spa visit or movie night.`;
    }
    
    return `Hello! I received your prompt: "${prompt}".

Since this is a client-side UI demonstration of **SaraAI**, I'm simulated using Angular signals. However, my CSS layout is fully optimized to wrap code blocks, list elements, and long-form responses gracefully!

How else can I help test this interface?`;
  }
}
