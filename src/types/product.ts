import type { Category } from './category'

export interface Product {
  id: string
  name: string
  price: number
  category_id: string
  is_available: boolean
  image_url: string | null
  created_at: string
  category?: Category
}
