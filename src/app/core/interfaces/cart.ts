import { CartItem } from './cartItem';

export interface Cart {
  cartItems: CartItem[];
  totalCartPrice: number;
  _id: string;
}
