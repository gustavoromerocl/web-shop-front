import { createReducer, on } from '@ngrx/store';
import { createAction, props } from '@ngrx/store';

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export interface ProductsState {
  items: Product[];
}

const initialState: ProductsState = {
  items: [
    { id: '1', name: 'Product 1', price: 100, stock: 10 },
    { id: '2', name: 'Product 2', price: 200, stock: 5 },
    // Datos iniciales de prueba
  ],
};

export const addProduct = createAction(
  '[Products] Add Product',
  props<{ product: Product }>()
);

export const removeProduct = createAction(
  '[Products] Remove Product',
  props<{ productId: string }>()
);

export const productsReducer = createReducer(
  initialState,
  on(addProduct, (state, { product }) => ({
    ...state,
    items: [...state.items, product],
  })),
  on(removeProduct, (state, { productId }) => ({
    ...state,
    items: state.items.filter((p) => p.id !== productId),
  }))
);
