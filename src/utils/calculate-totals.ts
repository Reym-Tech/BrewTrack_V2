import type { CartItem } from '../types/cart-item'
import type { DiscountInput } from '../types/order'
import { TAX_RATE } from '../constants/tax-rate'

export function calculateSubtotal(cartItems: CartItem[]): number {
  return cartItems.reduce((sum, item) => sum + item.subtotal, 0)
}

export function calculateDiscount(subtotal: number, discount: DiscountInput | null): number {
  if (!discount || discount.value <= 0) return 0
  if (discount.type === 'percentage') {
    const pct = Math.min(discount.value, 100)
    return parseFloat(((subtotal * pct) / 100).toFixed(2))
  }
  return parseFloat(Math.min(discount.value, subtotal).toFixed(2))
}

export function calculateTax(subtotal: number, discountAmount: number): number {
  const taxable = Math.max(subtotal - discountAmount, 0)
  return parseFloat((taxable * TAX_RATE).toFixed(2))
}

export function calculateTotal(subtotal: number, discountAmount: number, tax: number): number {
  return parseFloat((Math.max(subtotal - discountAmount, 0) + tax).toFixed(2))
}
