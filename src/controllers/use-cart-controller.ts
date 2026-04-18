import { useState } from 'react'
import type { CartItem } from '../types/cart-item'
import type { Product } from '../types/product'

export function useCartController() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  function addToCart(product: Product) {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1, subtotal: (item.quantity + 1) * item.product.price }
            : item
        )
      }
      return [...prev, { product, quantity: 1, subtotal: product.price }]
    })
  }

  function removeFromCart(productId: string) {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId))
  }

  function updateQuantity(productId: string, quantity: number) {
    if (quantity < 1) return removeFromCart(productId)
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity, subtotal: quantity * item.product.price }
          : item
      )
    )
  }

  function clearCart() {
    setCartItems([])
  }

  return { cartItems, addToCart, removeFromCart, updateQuantity, clearCart }
}
