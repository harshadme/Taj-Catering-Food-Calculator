export type Ingredient = {
  name: string;
  qty: number;
  unit: "g" | "kg" | "l";
};

export type Dish = {
  name: string;
  baseQty: number; // base quantity (e.g. 10 kg)
  ingredients: Ingredient[];
};

export const DISHES: Dish[] = [
  {
    name: "Chicken Mendi",
    baseQty: 10,
    ingredients: [
      { name: "Rice", qty: 5, unit: "kg" },
      { name: "Chicken", qty: 5, unit: "kg" },
      { name: "Oil", qty: 1, unit: "l" }
    ]
  },
  {
    name: "Chicken Fry",
    baseQty: 10,
    ingredients: [
      { name: "Chicken", qty: 6, unit: "kg" },
      { name: "Oil", qty: 1.5, unit: "l" }
    ]
  }
];
