import { create } from "zustand";

export const useMenuStore = create((set) => ({
  selectedDishes: [],
  quantities: {},

  toggleDish: (dishId) =>
    set((state) => {
      const exists = state.selectedDishes.includes(dishId);
      return {
        selectedDishes: exists
          ? state.selectedDishes.filter(d => d !== dishId)
          : [...state.selectedDishes, dishId]
      };
    }),

  setQuantity: (dishId, qty) =>
    set((state) => ({
      quantities: { ...state.quantities, [dishId]: qty }
    }))
}));
