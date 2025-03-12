import { useQuery, useMutation, useQueryClient } from "react-query";
import { deckService } from "../services/deckService";
import { Deck, Card } from "../types/flashcard";

export const useDecks = () => {
  return useQuery({
    queryKey: ["decks"],
    queryFn: () => deckService.getAllDecks(),
  });
};

export const useDeck = (deckId: string) => {
  return useQuery({
    queryKey: ["deck", deckId],
    queryFn: () => deckService.getDeck(deckId),
    enabled: !!deckId,
  });
};

export const useCreateDeck = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newDeck: Partial<Deck>) => deckService.createDeck(newDeck),
    onSuccess: () => {
      queryClient.invalidateQueries(["decks"]);
    },
  });
};

export const useUpdateDeck = (deckId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedDeck: Partial<Deck>) => deckService.updateDeck(deckId, updatedDeck),
    onSuccess: () => {
      queryClient.invalidateQueries(["decks"]);
      queryClient.invalidateQueries(["deck", deckId]);
    },
  });
};

export const useDeleteDeck = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (deckId: string) => deckService.deleteDeck(deckId),
    onSuccess: () => {
      queryClient.invalidateQueries(["decks"]);
    },
  });
};

export const useCard = () => {
  const queryClient = useQueryClient();

  const createCard = useMutation({
    mutationFn: ({ deckId, card }: { deckId: string; card: Partial<Card> }) =>
      deckService.createCard(deckId, card),
    onSuccess: (_, { deckId }) => {
      queryClient.invalidateQueries(["deck", deckId]);
    },
  });

  const updateCard = useMutation({
    mutationFn: ({ deckId, cardId, card }: { deckId: string; cardId: string; card: Partial<Card> }) =>
      deckService.updateCard(deckId, cardId, card),
    onSuccess: (_, { deckId }) => {
      queryClient.invalidateQueries(["deck", deckId]);
    },
  });

  return { createCard, updateCard };
};
