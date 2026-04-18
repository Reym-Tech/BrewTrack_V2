import type { PaymentMethod, DiscountInput as DiscountInputType } from '../types/order'
import { formatCurrency } from '../utils/format-currency'
import { DiscountInput } from './DiscountInput'
import { OrderNotes } from './OrderNotes'

interface Props {
  subtotal: number
  discountAmount: number
  tax: number
  total: number
  discount: DiscountInputType | null
  notes: string
  onDiscountChange: (discount: DiscountInputType | null) => void
  onNotesChange: (notes: string) => void
  onCheckout: (method: PaymentMethod) => void
  onClear: () => void
  isLoading: boolean
  hasItems: boolean
}

export function CartSummary({
  subtotal,
  discountAmount,
  tax,
  total,
  discount,
  notes,
  onDiscountChange,
  onNotesChange,
  onCheckout,
  onClear,
  isLoading,
  hasItems,
}: Props) {
  return (
    <div className="border-t border-white/40 pt-4 space-y-3">

      <DiscountInput discount={discount} onChange={onDiscountChange} />
      <OrderNotes notes={notes} onChange={onNotesChange} />

      <div className="space-y-1 pt-1">
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
        <div className="flex justify-between text-lg font-bold text-[#283618] pt-1">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {(['cash', 'card', 'e-wallet'] as PaymentMethod[]).map((method) => (
          <button
            key={method}
            onClick={() => onCheckout(method)}
            disabled={!hasItems || isLoading}
            className="py-2 rounded-xl bg-[#606c38] text-[#fefae0] text-sm font-bold capitalize hover:bg-[#283618] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md"
          >
            {method}
          </button>
        ))}
      </div>

      <button
        onClick={onClear}
        disabled={!hasItems}
        className="w-full py-2 rounded-xl border border-[#bc6c25]/30 text-[#bc6c25] text-sm font-medium hover:bg-[#bc6c25]/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        Clear Order
      </button>
    </div>
  )
}
