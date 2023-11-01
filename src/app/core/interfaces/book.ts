export interface Book {
  _id: string;
  authorName: string;
  bookName: string;
  bookSize: string;
  description: string;
  category: {
    name: string;
  };
  pdf: string;
  editionOfBook: string;
  image: string;
  language: string;
  numberOfCovers: string;
  delivaryPrice: number;
  price: number;
  publicationDate: string;
  publisherName: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  slug: string;
  sold: number;
  type: string;
  createdAt: string;
  updatedAt: string;
}
