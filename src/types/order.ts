export type OrderStatus = 'pending' | 'completed' | 'cancelled'
export type PaymentMethod = 'cash' | 'card' | 'e-wallet'
export type DiscountType = 'percentage' | 'fixed'

export interface Order {
  id: string
  status: OrderStatus
  total_amount: number
  tax_amount: number
  discount_amount: number
  discount_type: DiscountType | null
  discount_value: number | null
  notes: string | null
  payment_method: PaymentMethod | null
  created_at: string
}

export interface DiscountInput {
  type: DiscountType
  value: number
}
