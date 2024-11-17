import { createReducer, on } from '@ngrx/store';
import { createAction, props } from '@ngrx/store';

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
  category: string;
}

export interface ProductsState {
  items: Product[];
}

const initialState: ProductsState = {
  items: [
    {
      id: '1',
      name: 'Tofu',
      price: 100,
      stock: 10,
      imageUrl: 'https://www.papillesetpupilles.fr/wp-content/uploads/2009/12/Tofu-%C2%A9iprachenko-shutterstock.jpg',
      category: 'Quesos',
    },
    {
      id: '2',
      name: 'Manzana',
      price: 200,
      stock: 5,
      imageUrl: 'https://th.bing.com/th/id/R.43fe532aba688ca2fd48c5ceb0c02ed2?rik=WlJCd0X8xfdDew&riu=http%3a%2f%2f4.bp.blogspot.com%2f-t9mjTSmTOKw%2fTgoEUwEkBxI%2fAAAAAAAACcc%2fukxBVYDWUSY%2fs1600%2fManzanas.jpg&ehk=uZE1ldjnZ%2fTVStm7a2p6GDJnJYq6SAAf4a7ZQ%2bdP284%3d&risl=&pid=ImgRaw&r=0',
      category: 'Frutas',
    },
    {
      id: '3',
      name: 'Garbanzos',
      price: 300,
      stock: 8,
      imageUrl: 'https://th.bing.com/th/id/OIP.y3FpI6iGRIrcIu4HQT7kuAHaHa?rs=1&pid=ImgDetMain',
      category: 'Legumbres',
    },
    {
      id: '4',
      name: 'Frutillas',
      price: 150,
      stock: 7,
      imageUrl: 'https://th.bing.com/th/id/OIP.8JpJYarD-AM_lbmlvb2NMAHaEg?rs=1&pid=ImgDetMain',
      category: 'Frutas',
    },
    {
      id: '5',
      name: 'Lentejas',
      price: 180,
      stock: 4,
      imageUrl: 'https://th.bing.com/th/id/OIP.DzJxaCszYMLAUMPSkE6qOgHaEK?w=318&h=180&c=7&r=0&o=5&pid=1.7',
      category: 'Legumbres',
    },
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
