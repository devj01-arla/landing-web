// Tipos para el chatbot

// Extender la interfaz Window para incluir las propiedades del chatbot
declare global {
  interface Window {
    chatbot: ChatBot;
    setChatbotApiKey: (apiKey: string) => void;
  }
}

// Clase ChatBot para el tipado
export class ChatBot {
  isOpen: boolean;
  chatClient: any;
  apiKey: string | null;
  toggleBtn: HTMLElement | null;
  chatWindow: HTMLElement | null;
  closeBtn: HTMLElement | null;
  messagesContainer: HTMLElement | null;
  input: HTMLInputElement | null;
  sendBtn: HTMLElement | null;
  suggestions: NodeListOf<HTMLElement> | null;

  constructor();
  setApiKey(apiKey: string): void;
  initializeElements(): void;
  bindEvents(): void;
  toggleChat(): void;
  openChat(): void;
  closeChat(): void;
  sendMessage(): Promise<void>;
  addMessage(text: string, sender: 'user' | 'bot'): void;
  showTypingIndicator(): void;
  removeTypingIndicator(): void;
  scrollToBottom(): void;
}

export interface ChatBotElement {
  toggleBtn: HTMLElement;
  chatWindow: HTMLElement;
  closeBtn: HTMLElement;
  messagesContainer: HTMLElement;
  input: HTMLInputElement;
  sendBtn: HTMLElement;
  suggestions: NodeListOf<HTMLElement>;
}

export interface ChatBotClass {
  isOpen: boolean;
  chatClient: any;
  toggleBtn: HTMLElement | null;
  chatWindow: HTMLElement | null;
  closeBtn: HTMLElement | null;
  messagesContainer: HTMLElement | null;
  input: HTMLInputElement | null;
  sendBtn: HTMLElement | null;
  suggestions: NodeListOf<HTMLElement> | null;
  initializeElements(): void;
  bindEvents(): void;
  toggleChat(): void;
  openChat(): void;
  closeChat(): void;
  sendMessage(): Promise<void>;
  addMessage(text: string, sender: 'user' | 'bot'): void;
  showTypingIndicator(): void;
  removeTypingIndicator(): void;
  scrollToBottom(): void;
}

export interface ChatBotData {
  company: any;
  services: any;
  faq: any;
  greetings: any;
}

export interface ChatBotConfig {
  security: {
    maxMessageLength: number;
    maxMessagesPerSession: number;
    allowedCharacters: RegExp;
    blockedWords: string[];
    rateLimit: {
      maxRequestsPerMinute: number;
      cooldownTime: number;
    };
  };
  responses: {
    maxResponseLength: number;
    typingDelay: number;
    fallbackMessages: string[];
  };
  ui: {
    animationDuration: number;
    autoScrollDelay: number;
    suggestionButtons: Array<{
      text: string;
      question: string;
    }>;
  };
  keywords: {
    [key: string]: string[];
  };
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}
