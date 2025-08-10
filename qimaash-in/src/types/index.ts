// A plain object representation of a Product.
// This is safe to pass from Server to Client Components.
export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

// A plain object representation of a CartItem.
export interface CartItem {
  product: Product; // Use the plain Product type
  quantity: number;
}

// A plain object representation of a Cart.
export interface Cart {
  _id: string;
  sessionId: string;
  items: CartItem[];
  createdAt: string;
  updatedAt:string;
}
