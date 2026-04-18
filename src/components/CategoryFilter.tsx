import type { Category } from '../types/category'

interface Props {
  categories: Category[]
  selectedId: string | null
  onSelect: (id: string | null) => void
}

export function CategoryFilter({ categories, selectedId, onSelect }: Props) {
  return (
    <div className="flex gap-2 flex-wrap mb-4">
      <button
        onClick={() => onSelect(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          selectedId === null
            ? 'bg-[#606c38] text-[#fefae0] shadow-md'
            : 'bg-white/30 backdrop-blur-sm border border-white/40 text-[#283618] hover:bg-white/50'
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedId === cat.id
              ? 'bg-[#606c38] text-[#fefae0] shadow-md'
              : 'bg-white/30 backdrop-blur-sm border border-white/40 text-[#283618] hover:bg-white/50'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )
}
