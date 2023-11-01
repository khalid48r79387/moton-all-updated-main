export interface CartItem {
  _id: string;
  book: any;
  bookDetails: {
    bookName: string;
    image: string;
    type: string;
  };
  price: number;
  quantity: number;
}
