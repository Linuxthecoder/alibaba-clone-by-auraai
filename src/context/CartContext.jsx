    import React, { createContext, useContext, useState, useEffect } from 'react';
import db from '../lib/db';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    if (user) {
      setCartItems(db.getCart(user.id));
      setWishlistItems(db.getWishlist(user.id));
    } else {
      setCartItems([]);
      setWishlistItems([]);
    }
  }, [user]);

  const addToCart = (product, quantity = 1) => {
    if (!user) return { success: false, error: 'Please login first' };
    const existing = db.findOne('cart', c => c.userId === user.id && c.productId === product.id);
    if (existing) {
      db.update('cart', existing.id, { quantity: existing.quantity + quantity });
    } else {
      db.insert('cart', {
        userId: user.id,
        productId: product.id,
        productName: product.name,
        productImage: product.images[0],
        price: product.price,
        quantity,
        unit: product.unit,
        supplierId: product.supplierId,
      });
    }
    setCartItems(db.getCart(user.id));
    return { success: true };
  };

  const removeFromCart = (cartId) => {
    db.delete('cart', cartId);
    setCartItems(db.getCart(user?.id));
  };

  const updateCartQuantity = (cartId, quantity) => {
    if (quantity < 1) {
      removeFromCart(cartId);
      return;
    }
    db.update('cart', cartId, { quantity });
    setCartItems(db.getCart(user?.id));
  };

  const clearCart = () => {
    const items = db.getCart(user?.id);
    items.forEach(item => db.delete('cart', item.id));
    setCartItems([]);
  };

  const toggleWishlist = (product) => {
    if (!user) return { success: false, error: 'Please login first' };
    const existing = db.findOne('wishlist', w => w.userId === user.id && w.productId === product.id);
    if (existing) {
      db.delete('wishlist', existing.id);
      setWishlistItems(db.getWishlist(user.id));
      return { success: true, action: 'removed' };
    }
    db.insert('wishlist', {
      userId: user.id,
      productId: product.id,
      productName: product.name,
      productImage: product.images[0],
      price: product.price,
      supplierId: product.supplierId,
    });
    setWishlistItems(db.getWishlist(user.id));
    return { success: true, action: 'added' };
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      wishlistItems,
      cartCount,
      cartTotal,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      toggleWishlist,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

export default CartContext;

