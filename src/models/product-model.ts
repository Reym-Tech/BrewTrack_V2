import { supabase } from './supabase-client'
import type { Product } from '../types/product'

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(id, name)')
    .eq('is_available', true)
    .order('name')

  if (error) throw new Error(error.message)
  return data ?? []
}

export async function fetchProductsByCategory(categoryId: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(id, name)')
    .eq('category_id', categoryId)
    .eq('is_available', true)
    .order('name')

  if (error) throw new Error(error.message)
  return data ?? []
}
