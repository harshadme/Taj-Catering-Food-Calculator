import { create } from "zustand";

type MenuState = {
  selectedDishes: string[];
  quantities: Record<string, number>;
  toggleDish: (dishId: string) => void;
  setQuantity: (dishId: string, qty: number) => void;
};

export const useMenuStore = create<MenuState>((set, get) => ({
  selectedDishes: [],
  quantities: {},

  toggleDish: (dishId) => {
    const { selectedDishes } = get();
    const exists = selectedDishes.includes(dishId);

    set({
      selectedDishes: exists
        ? selectedDishes.filter((d) => d !== dishId)
        : [...selectedDishes, dishId],
    });
  },

  setQuantity: (dishId, qty) =>
    set((state) => ({
      quantities: { ...state.quantities, [dishId]: qty },
    })),
}));
