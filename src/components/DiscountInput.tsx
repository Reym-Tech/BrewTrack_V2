import type { DiscountInput as DiscountInputType, DiscountType } from '../types/order'

interface Props {
  discount: DiscountInputType | null
  onChange: (discount: DiscountInputType | null) => void
}

export function DiscountInput({ discount, onChange }: Props) {
  function handleTypeChange(type: DiscountType) {
    onChange({ type, value: discount?.value ?? 0 })
  }

  function handleValueChange(raw: string) {
    const value = parseFloat(raw)
    if (isNaN(value) || value < 0) {
      onChange(discount ? { ...discount, value: 0 } : null)
      return
    }
    onChange({ type: discount?.type ?? 'fixed', value })
  }

  function handleClear() {
    onChange(null)
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-[#606c38] uppercase tracking-widest">
          Discount
        </p>
        {discount && discount.value > 0 && (
          <button
            onClick={handleClear}
            className="text-xs text-[#bc6c25] hover:underline"
          >
            Remove
          </button>
        )}
      </div>

      <div className="flex gap-2">
        <div className="flex rounded-lg overflow-hidden border border-white/40 text-xs font-semibold">
          <button
            onClick={() => handleTypeChange('fixed')}
            className={`px-3 py-1.5 transition-colors ${
              discount?.type === 'fixed' || !discount
                ? 'bg-[#606c38] text-[#fefae0]'
                : 'bg-white/20 text-[#283618] hover:bg-white/30'
            }`}
          >
            ₱
          </button>
          <button
            onClick={() => handleTypeChange('percentage')}
            className={`px-3 py-1.5 transition-colors ${
              discount?.type === 'percentage'
                ? 'bg-[#606c38] text-[#fefae0]'
                : 'bg-white/20 text-[#283618] hover:bg-white/30'
            }`}
          >
            %
          </button>
        </div>

        <input
          type="number"
          min="0"
          max={discount?.type === 'percentage' ? 100 : undefined}
          placeholder="0"
          value={discount?.value || ''}
          onChange={(e) => handleValueChange(e.target.value)}
          className="flex-1 bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg px-3 py-1.5 text-sm text-[#283618] placeholder-[#606c38]/50 focus:outline-none focus:border-[#dda15e]"
        />
      </div>
    </div>
  )
}
