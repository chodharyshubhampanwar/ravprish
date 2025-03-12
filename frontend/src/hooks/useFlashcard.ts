
// import axios from 'axios'
// import { Deck, Card } from '../types/flashcard'

// const API_URL = import.meta.env.VITE_API_URL

// export const useDecks = () => {
//   return useQuery({
//     queryKey: ['decks'],
//     queryFn: async () => {
//       const { data } = await axios.get<Deck[]>(`${API_URL}/decks`)
//       return data
//     },
//   })
// }

// export const useDeck = (deckId: string) => {
//   return useQuery({
//     queryKey: ['deck', deckId],
//     queryFn: async () => {
//       const { data } = await axios.get<Deck>(`${API_URL}/decks/${deckId}`)
//       return data
//     },
//     enabled: !!deckId,
//   })
// }

// export const useCreateDeck = () => {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: async (newDeck: Partial<Deck>) => {
//       const { data } = await axios.post<Deck>(`${API_URL}/decks`, newDeck)
//       return data
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['decks'] })
//     },
//   })
// }

// export const useUpdateDeck = (deckId: string) => {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: async (updatedDeck: Partial<Deck>) => {
//       const { data } = await axios.put<Deck>(
//         `${API_URL}/decks/${deckId}`,
//         updatedDeck
//       )
//       return data
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['decks'] })
//       queryClient.invalidateQueries({ queryKey: ['deck', deckId] })
//     },
//   })
// }

// export const useDeleteDeck = () => {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: async (deckId: string) => {
//       await axios.delete(`${API_URL}/decks/${deckId}`)
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['decks'] })
//     },
//   })
// }

// // Cards hooks
// export const useCreateCard = (deckId: string) => {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: async (newCard: Partial<Card>) => {
//       const { data } = await axios.post<Card>(
//         `${API_URL}/decks/${deckId}/cards`,
//         newCard
//       )
//       return data
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['deck', deckId] })
//     },
//   })
// }

// export const useUpdateCard = (deckId: string, cardId: string) => {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: async (updatedCard: Partial<Card>) => {
//       const { data } = await axios.put<Card>(
//         `${API_URL}/decks/${deckId}/cards/${cardId}`,
//         updatedCard
//       )
//       return data
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['deck', deckId] })
//     },
//   })
// }