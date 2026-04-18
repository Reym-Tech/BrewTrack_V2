interface Props {
  notes: string
  onChange: (notes: string) => void
}

export function OrderNotes({ notes, onChange }: Props) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-[#606c38] uppercase tracking-widest">
        Order Notes
      </p>
      <textarea
        value={notes}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. no sugar, extra shot..."
        rows={2}
        className="w-full bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg px-3 py-2 text-sm text-[#283618] placeholder-[#606c38]/50 focus:outline-none focus:border-[#dda15e] resize-none"
      />
    </div>
  )
}
