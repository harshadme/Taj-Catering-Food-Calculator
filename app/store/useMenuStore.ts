import { create } from "zustand";

type MenuStore = {
  selectedDishes: number[];
  quantities: Record<number, number>;
  toggleDish: (dishId: number) => void;
  setQuantity: (dishId: number, qty: number) => void;
};

export const useMenuStore = create<MenuStore>((set) => ({
  selectedDishes: [],
  quantities: {},

  toggleDish: (dishId: number) =>
    set((state) => {
      const exists = state.selectedDishes.includes(dishId);
      return {
        selectedDishes: exists
          ? state.selectedDishes.filter((d) => d !== dishId)
          : [...state.selectedDishes, dishId],
      };
    }),

  setQuantity: (dishId: number, qty: number) =>
    set((state) => ({
      quantities: {
        ...state.quantities,
        [dishId]: qty,
      },
    })),
}));
