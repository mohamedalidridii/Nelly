import { Quiz } from '@/cms-types'
import { create } from 'zustand'
import {
  createJSONStorage,
  persist,
} from 'zustand/middleware'

export type CartItem = {
  quiz: Quiz
}

type QuizState = {
  items: CartItem[]
  addItem: (quiz: Quiz) => void
  removeItem: (quizId: string) => void
  clearCart: () => void
}

export const useQuiz = create<QuizState>()(
  persist(
    (set) => ({
      items: [],
      
      addItem: (quiz) =>
        set((state) => {
          console.log('Adding Quiz:', quiz);
          console.log('All Items:', state.items.concat({ quiz })); // Log all items after adding

          return { items: [...state.items, { quiz }]  }
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter(
            // @ts-expect-error
            (item) => item.quiz.id !== id
          ),
        })),
      clearCart: () => set({ items: [] }),
    
    }),
    
    {
      name: 'quiz-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
