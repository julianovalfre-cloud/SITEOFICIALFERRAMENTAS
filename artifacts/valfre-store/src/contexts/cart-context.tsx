import React, { createContext, useContext, useEffect, useState } from 'react';
import { generateSessionId } from '@/lib/utils';
import { 
  useGetCart, 
  useAddToCart, 
  useUpdateCartItem, 
  useRemoveCartItem,
  type Cart,
  type AddToCartRequest
} from '@workspace/api-client-react';

interface CartContextType {
  sessionId: string;
  cart: Cart | undefined;
  isLoading: boolean;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    let id = localStorage.getItem('valfre_session_id');
    if (!id) {
      id = generateSessionId();
      localStorage.setItem('valfre_session_id', id);
    }
    setSessionId(id);
  }, []);

  const { data: cart, isLoading, refetch } = useGetCart(
    { sessionId },
    { query: { enabled: !!sessionId } }
  );

  const addMutation = useAddToCart();
  const updateMutation = useUpdateCartItem();
  const removeMutation = useRemoveCartItem();

  const addToCart = async (productId: string, quantity: number = 1) => {
    if (!sessionId) return;
    await addMutation.mutateAsync({ data: { sessionId, productId, quantity } });
    refetch();
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!sessionId) return;
    await updateMutation.mutateAsync({ productId, data: { sessionId, quantity } });
    refetch();
  };

  const removeItem = async (productId: string) => {
    if (!sessionId) return;
    await removeMutation.mutateAsync({ productId, params: { sessionId } });
    refetch();
  };

  return (
    <CartContext.Provider
      value={{
        sessionId,
        cart,
        isLoading,
        addToCart,
        updateQuantity,
        removeItem,
        itemCount: cart?.itemCount || 0,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
