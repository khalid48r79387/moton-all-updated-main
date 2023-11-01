import { CartItem } from './cartItem';
import { shippingAddress } from './shippingAddress';
import { UserProfile } from './userProfile';

export interface IOrder {
  user: UserProfile;
  cartItems: CartItem[];
  taxPrice: number;
  shippingAddress: shippingAddress;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  paidAt: Date;
  isDelivered: boolean;
  deliveredAt: Date;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
