import type { CartItem } from '../types/cart-item'
import type { PaymentMethod } from '../types/order'
import { formatCurrency } from '../utils/format-currency'

interface Props {
  cartItems: CartItem[]
  subtotal: number
  discountAmount: number
  tax: number
  total: number
  paymentMethod: PaymentMethod
  notes: string
  isLoading: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function ReceiptModal({
  cartItems,
  subtotal,
  discountAmount,
  tax,
  total,
  paymentMethod,
  notes,
  isLoading,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />

      <div className="relative z-10 w-full max-w-md mx-4 bg-[#fefae0]/80 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl p-6">

        <div className="text-center mb-5">
          <h2 className="text-lg font-bold text-[#283618] uppercase tracking-widest">
            Order Summary
          </h2>
          <p className="text-xs text-[#606c38] mt-1">
            Payment via{' '}
            <span className="font-semibold capitalize text-[#bc6c25]">
              {paymentMethod}
            </span>
          </p>
        </div>

        <div className="border-t border-[#dda15e]/40 mb-4" />

        <div className="space-y-2 max-h-44 overflow-y-auto mb-4">
          {cartItems.map((item) => (
            <div key={item.product.id} className="flex justify-between items-center text-sm">
              <div className="flex-1 min-w-0">
                <span className="text-[#283618] font-medium truncate block">
                  {item.product.name}
                </span>
                <span className="text-xs text-[#606c38]">
                  {item.quantity} x {formatCurrency(item.product.price)}
                </span>
              </div>
              <span className="font-semibold text-[#283618] ml-4">
                {formatCurrency(item.subtotal)}
              </span>
            </div>
          ))}
        </div>

        {notes.trim() && (
          <div className="bg-[#dda15e]/10 border border-[#dda15e]/30 rounded-xl px-4 py-2 mb-4">
            <p className="text-xs font-semibold text-[#606c38] uppercase tracking-widest mb-1">
              Notes
            </p>
            <p className="text-sm text-[#283618]">{notes}</p>
          </div>
        )}

        <div className="border-t border-[#dda15e]/40 mb-4" />

        <div className="space-y-1 mb-5">
          <div className="flex justify-between text-sm text-[#606c38]">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          {discountAmount > 0 && (
            <div className="flex justify-between text-sm text-[#bc6c25]">
              <span>Discount</span>
              <span>- {formatCurrency(discountAmount)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm text-[#606c38]">
            <span>VAT (12%)</span>
            <span>{formatCurrency(tax)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-[#283618] pt-1">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="py-3 rounded-xl border border-[#bc6c25]/30 text-[#bc6c25] text-sm font-semibold hover:bg-[#bc6c25]/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="py-3 rounded-xl bg-[#606c38] text-[#fefae0] text-sm font-bold hover:bg-[#283618] disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-md"
          >
            {isLoading ? 'Processing...' : 'Confirm Order'}
          </button>
        </div>

      </div>
    </div>
  )
}
