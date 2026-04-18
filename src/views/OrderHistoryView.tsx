import { useState, useEffect } from 'react'
import type { Order } from '../types/order'
import { fetchRecentOrders } from '../models/order-model'
import { OrderHistoryRow } from '../components/OrderHistoryRow'

export function OrderHistoryView() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    fetchRecentOrders(50)
      .then(setOrders)
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-sm font-bold text-[#283618] uppercase tracking-widest">
              Order History
            </h2>
            <p className="text-xs text-[#606c38] mt-0.5">
              Showing last {orders.length} orders
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-16">
            <p className="text-sm text-[#606c38]">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-sm text-[#606c38] font-medium">No orders yet.</p>
            <p className="text-xs text-[#606c38]/70 mt-1">
              Completed orders will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <OrderHistoryRow key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
