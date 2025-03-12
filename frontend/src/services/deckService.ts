import { api } from "../lib/axios";
import { Deck, Card } from "../types/flashcard";

class DeckService {
  private static instance: DeckService;

  static getInstance(): DeckService {
    if (!DeckService.instance) {
      DeckService.instance = new DeckService();
    }
    return DeckService.instance;
  }

  async getAllDecks(): Promise<Deck[]> {
    const response = await api.get<Deck[]>("/decks");
    return response.data;
  }

  async getDeck(deckId: string): Promise<Deck> {
    const response = await api.get<Deck>(`/deck/${deckId}`);
    return response.data;
  }

  async createDeck(deck: Partial<Deck>): Promise<Deck> {
    const response = await api.post<Deck>("/decks", deck);
    return response.data;
  }

  async updateDeck(deckId: string, deck: Partial<Deck>): Promise<Deck> {
    const response = await api.put<Deck>(`/decks/${deckId}`, deck);
    return response.data;
  }

  async deleteDeck(deckId: string): Promise<void> {
    await api.delete(`/decks/${deckId}`);
  }

  async createCard(deckId: string, card: Partial<Card>): Promise<Card> {
    const response = await api.post<Card>(`/decks/${deckId}/cards`, card);
    return response.data;
  }

  async updateCard(deckId: string, cardId: string, card: Partial<Card>): Promise<Card> {
    const response = await api.put<Card>(`/decks/${deckId}/cards/${cardId}`, card);
    return response.data;
  }
}

export const deckService = DeckService.getInstance();
