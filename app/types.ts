export type Dish = {
  id: string;
  name: string;
  base_qty: number;
};

export type Ingredient = {
  id: string;
  dish_id: string;
  name: string;
  qty: number;
  unit: string;
};
