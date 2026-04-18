import { useState } from 'react'
import type { Order } from '../types/order'
import type { OrderItem } from '../types/order-item'
import { formatCurrency } from '../utils/format-currency'
import { fetchOrderItems } from '../models/order-model'

interface Props {
  order: Order
}

export function OrderHistoryRow({ order }: Props) {
  const [expanded, setExpanded] = useState(false)
  const [items, setItems] = useState<OrderItem[]>([])
  const [loadingItems, setLoadingItems] = useState(false)

  async function handleExpand() {
    if (expanded) {
      setExpanded(false)
      return
    }
    setExpanded(true)
    if (items.length > 0) return
    setLoadingItems(true)
    try {
      const result = await fetchOrderItems(order.id)
      setItems(result)
    } finally {
      setLoadingItems(false)
    }
  }

  const date = new Date(order.created_at)
  const formattedDate = date.toLocaleDateString('en-PH', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
  const formattedTime = date.toLocaleTimeString('en-PH', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl overflow-hidden shadow-sm">

      {/* Row Header */}
      <button
        onClick={handleExpand}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/10 transition-all"
      >
        <div className="flex items-center gap-4 text-left">
          <div>
            <p className="text-xs text-[#606c38] font-medium uppercase tracking-widest">
              {formattedDate}
            </p>
            <p className="text-sm font-bold text-[#283618]">{formattedTime}</p>
          </div>
          <div className="h-8 w-px bg-[#dda15e]/40" />
          <div>
            <p className="text-xs text-[#606c38] uppercase tracking-widest">Payment</p>
            <p className="text-sm font-semibold text-[#283618] capitalize">
              {order.payment_method ?? '—'}
            </p>
          </div>
          <div className="h-8 w-px bg-[#dda15e]/40" />
          <div>
            <p className="text-xs text-[#606c38] uppercase tracking-widest">Status</p>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              order.status === 'completed'
                ? 'bg-[#606c38]/20 text-[#606c38]'
                : order.status === 'cancelled'
                ? 'bg-red-100 text-red-500'
                : 'bg-[#dda15e]/20 text-[#bc6c25]'
            }`}>
              {order.status}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-lg font-bold text-[#bc6c25]">{formatCurrency(order.total_amount)}</p>
          <span className={`text-[#606c38] text-xs transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </div>
      </button>

      {/* Expanded Items */}
      {expanded && (
        <div className="border-t border-white/30 px-5 py-4 bg-white/10">
          {loadingItems ? (
            <p className="text-sm text-[#606c38] text-center py-2">Loading items...</p>
          ) : items.length === 0 ? (
            <p className="text-sm text-[#606c38] text-center py-2">No items found.</p>
          ) : (
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <div>
                    <span className="font-medium text-[#283618]">
                      {item.product?.name ?? 'Unknown Item'}
                    </span>
                    <span className="text-[#606c38] ml-2 text-xs">
                      x{item.quantity} @ {formatCurrency(item.unit_price)}
                    </span>
                  </div>
                  <span className="font-semibold text-[#283618]">
                    {formatCurrency(item.subtotal)}
                  </span>
                </div>
              ))}
              <div className="border-t border-[#dda15e]/30 pt-2 mt-2 space-y-1">
                <div className="flex justify-between text-xs text-[#606c38]">
                  <span>VAT (12%)</span>
                  <span>{formatCurrency(order.tax_amount)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#283618]">
                  <span>Total</span>
                  <span>{formatCurrency(order.total_amount)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  )
}
