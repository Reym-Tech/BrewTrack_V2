import type { Product } from '../types/product'
import { formatCurrency } from '../utils/format-currency'

interface Props {
  product: Product
  onAdd: (product: Product) => void
}

export function ProductCard({ product, onAdd }: Props) {
  return (
    <button
      onClick={() => onAdd(product)}
      className="bg-white/30 backdrop-blur-md border border-white/50 rounded-2xl p-4 text-left hover:bg-white/50 hover:border-[#dda15e] hover:shadow-lg transition-all active:scale-95 shadow-sm"
    >
      <div className="w-full h-16 bg-[#dda15e]/20 rounded-xl mb-3 flex items-center justify-center">
        <span className="text-xs font-semibold text-[#bc6c25] uppercase tracking-widest">
          {product.category?.name ?? 'Item'}
        </span>
      </div>
      <p className="font-semibold text-[#283618] text-sm leading-tight">{product.name}</p>
      <p className="text-[#bc6c25] font-bold mt-1 text-sm">{formatCurrency(product.price)}</p>
    </button>
  )
}
