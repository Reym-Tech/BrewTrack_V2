import type { CartItem } from '../types/cart-item'
import { formatCurrency } from '../utils/format-currency'

interface Props {
  item: CartItem
  onRemove: (productId: string) => void
  onUpdateQuantity: (productId: string, quantity: number) => void
}

export function CartItemRow({ item, onRemove, onUpdateQuantity }: Props) {
  return (
    <div className="flex items-center gap-2 py-3 border-b border-white/30">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#283618] truncate">{item.product.name}</p>
        <p className="text-xs text-[#606c38]">{formatCurrency(item.product.price)} each</p>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
          className="w-7 h-7 rounded-lg bg-[#e2e7d1]/60 text-[#283618] font-bold text-sm hover:bg-[#c5d0a3] transition-colors"
        >
          -
        </button>
        <span className="w-6 text-center text-sm font-bold text-[#283618]">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
          className="w-7 h-7 rounded-lg bg-[#e2e7d1]/60 text-[#283618] font-bold text-sm hover:bg-[#c5d0a3] transition-colors"
        >
          +
        </button>
      </div>
      <p className="text-sm font-bold text-[#bc6c25] w-16 text-right">{formatCurrency(item.subtotal)}</p>
      <button
        onClick={() => onRemove(item.product.id)}
        className="text-[#bc6c25]/50 hover:text-red-500 text-sm ml-1 font-bold transition-colors"
      >
        x
      </button>
    </div>
  )
}
