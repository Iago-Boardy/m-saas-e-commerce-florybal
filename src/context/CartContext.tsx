// CartContext.tsx
import React, { createContext, useContext, useState } from 'react'

type CartItem = {
  productId: string
  name: string
  priceInCents: number
  quantity: number
  imagePath: string
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (itemId: string) => void
  clearCart: () => void
  updateItemQuantity: (itemId: string, action: 'increment' | 'decrement') => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((i) => i.productId === item.productId)
      if (itemIndex > -1) {
        const updatedCart = [...prevCart]
        updatedCart[itemIndex].quantity += item.quantity
        return updatedCart
      } else {
        return [...prevCart, item]
      }
    })
  }

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.productId !== itemId))
  }

  const clearCart = () => {
    setCart([])
  }

  const updateItemQuantity = (itemId: string, action: 'increment' | 'decrement') => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.productId === itemId) {
          const newQuantity =
            action === 'increment' ? item.quantity + 1 : item.quantity - 1
          return { ...item, quantity: Math.max(newQuantity, 1) }
        }
        return item
      })
    })
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateItemQuantity }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
