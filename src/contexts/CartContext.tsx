import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  totalPrice: number;
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  calculateTotalPrice: () => number;
  increaseItemQuantity: (name: string) => void;
  reduceItemQuantity: (name: string) => void;
  addNewItemToCart: (name: string, price: number, image: string) => void;
  isItemInCart: (name: string) => boolean;
}

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  setCartItems: () => {},
  calculateTotalPrice: () => 0,
  increaseItemQuantity: () => {},
  reduceItemQuantity: () => {},
  addNewItemToCart: () => {},
  isItemInCart: () => false,
});

export const CartContextProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    async function fetchCart() {
      try {
        const { data } = await axios.get("http://localhost:8001/cart");
        setCartItems(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCart();
  }, []);

  function calculateTotalPrice() {
    return cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  }

  async function increaseItemQuantity(name: string) {
    try {
      const item = cartItems.find((item) => item.name === name);
      if (item) {
        const updatedItem = {
          ...item,
          quantity: item.quantity + 1,
          totalPrice: item.price * (item.quantity + 1),
        };
        await axios.put(`http://localhost:8001/cart/${item.id}`, updatedItem);
        setCartItems((prevItems) =>
          prevItems.map((i) => (i.name === name ? updatedItem : i))
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function reduceItemQuantity(name: string) {
    try {
      const item = cartItems.find((item) => item.name === name);
      if (item && item.quantity > 1) {
        const updatedItem = {
          ...item,
          quantity: item.quantity - 1,
          totalPrice: item.price * (item.quantity - 1),
        };
        await axios.put(`http://localhost:8001/cart/${item.id}`, updatedItem);
        setCartItems((prevItems) =>
          prevItems.map((i) => (i.name === name ? updatedItem : i))
        );
      } else if (item && item.quantity === 1) {
        await axios.delete(`http://localhost:8001/cart/${item.id}`);
        setCartItems((prevItems) => prevItems.filter((i) => i.name !== name));
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function addNewItemToCart(name: string, price: number, image: string) {
    try {
      const newItem = {
        name,
        quantity: 1,
        price,
        totalPrice: price,
        image: image,
      };

      const { data } = await axios.post("http://localhost:8001/cart", newItem);
      setCartItems((prevItems) => [...prevItems, data]);
    } catch (error) {
      console.error(error);
    }
  }

  const isItemInCart = (name: string) => {
    return cartItems.some((item) => item.name === name);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        calculateTotalPrice,
        increaseItemQuantity,
        reduceItemQuantity,
        addNewItemToCart,
        isItemInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return context;
}
