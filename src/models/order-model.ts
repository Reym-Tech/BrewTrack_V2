import { supabase } from './supabase-client'
import type { Order, PaymentMethod, DiscountInput } from '../types/order'
import type { OrderItem } from '../types/order-item'
import type { CartItem } from '../types/cart-item'

export async function createOrder(
  cartItems: CartItem[],
  totalAmount: number,
  taxAmount: number,
  discountAmount: number,
  discount: DiscountInput | null,
  paymentMethod: PaymentMethod,
  notes: string
): Promise<Order> {
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      total_amount: totalAmount,
      tax_amount: taxAmount,
      discount_amount: discountAmount,
      discount_type: discount?.type ?? null,
      discount_value: discount?.value ?? null,
      notes: notes.trim() || null,
      payment_method: paymentMethod,
      status: 'completed',
    })
    .select()
    .single()

  if (orderError) throw new Error(orderError.message)

  const items = cartItems.map((item) => ({
    order_id: order.id,
    product_id: item.product.id,
    quantity: item.quantity,
    unit_price: item.product.price,
    subtotal: item.subtotal,
  }))

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(items)

  if (itemsError) throw new Error(itemsError.message)

  return order
}

export async function fetchRecentOrders(limit: number = 50): Promise<Order[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw new Error(error.message)
  return data ?? []
}

export async function fetchOrderItems(orderId: string): Promise<OrderItem[]> {
  const { data, error } = await supabase
    .from('order_items')
    .select('*, product:products(id, name, price)')
    .eq('order_id', orderId)
    .order('created_at')

  if (error) throw new Error(error.message)
  return data ?? []
}
