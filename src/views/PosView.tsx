import { useState, useEffect } from 'react'
import type { Category } from '../types/category'
import type { Product } from '../types/product'
import type { PaymentMethod, DiscountInput } from '../types/order'
import { fetchCategories } from '../models/category-model'
import { fetchProducts, fetchProductsByCategory } from '../models/product-model'
import { createOrder } from '../models/order-model'
import { useCartController } from '../controllers/use-cart-controller'
import {
  calculateSubtotal,
  calculateDiscount,
  calculateTax,
  calculateTotal,
} from '../utils/calculate-totals'
import { CategoryFilter } from '../components/CategoryFilter'
import { ProductCard } from '../components/ProductCard'
import { CartItemRow } from '../components/CartItemRow'
import { CartSummary } from '../components/CartSummary'
import { ReceiptModal } from '../components/ReceiptModal'

export function PosView() {
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [pendingPayment, setPendingPayment] = useState<PaymentMethod | null>(null)
  const [discount, setDiscount] = useState<DiscountInput | null>(null)
  const [notes, setNotes] = useState<string>('')

  const { cartItems, addToCart, removeFromCart, updateQuantity, clearCart } = useCartController()

  const subtotal = calculateSubtotal(cartItems)
  const discountAmount = calculateDiscount(subtotal, discount)
  const tax = calculateTax(subtotal, discountAmount)
  const total = calculateTotal(subtotal, discountAmount, tax)

  useEffect(() => {
    fetchCategories().then(setCategories)
    fetchProducts().then(setProducts)
  }, [])

  useEffect(() => {
    if (selectedCategory === null) {
      fetchProducts().then(setProducts)
    } else {
      fetchProductsByCategory(selectedCategory).then(setProducts)
    }
  }, [selectedCategory])

  function handleCheckoutRequest(method: PaymentMethod) {
    if (cartItems.length === 0) return
    setPendingPayment(method)
  }

  async function handleConfirmOrder() {
    if (!pendingPayment || cartItems.length === 0) return
    setIsLoading(true)
    try {
      await createOrder(cartItems, total, tax, discountAmount, discount, pendingPayment, notes)
      clearCart()
      setDiscount(null)
      setNotes('')
      setPendingPayment(null)
      setStatusMessage(`Order confirmed via ${pendingPayment}.`)
      setTimeout(() => setStatusMessage(null), 3000)
    } catch {
      setStatusMessage('Order failed. Please try again.')
      setTimeout(() => setStatusMessage(null), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  function handleCancelModal() {
    if (!isLoading) setPendingPayment(null)
  }

  return (
    <div className="flex flex-1 overflow-hidden p-4 gap-4">

      {statusMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 bg-[#283618]/90 backdrop-blur-sm text-[#fefae0] px-5 py-2.5 rounded-xl text-sm font-medium shadow-lg">
          {statusMessage}
        </div>
      )}

      {/* Product Panel */}
      <div className="flex-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-4 overflow-y-auto shadow-lg">
        <h2 className="text-sm font-bold text-[#283618] uppercase tracking-widest mb-3">Menu</h2>
        <CategoryFilter
          categories={categories}
          selectedId={selectedCategory}
          onSelect={setSelectedCategory}
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={addToCart} />
          ))}
        </div>
      </div>

      {/* Cart Panel */}
      <div className="w-80 bg-white/25 backdrop-blur-md border border-white/30 rounded-2xl flex flex-col p-4 shadow-lg">
        <h2 className="text-sm font-bold text-[#283618] uppercase tracking-widest mb-3">
          Current Order
        </h2>

        <div className="flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="text-center mt-12">
              <p className="text-sm text-[#606c38] font-medium">No items added.</p>
              <p className="text-xs text-[#606c38]/70 mt-1">
                Select a product from the menu.
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <CartItemRow
                key={item.product.id}
                item={item}
                onRemove={removeFromCart}
                onUpdateQuantity={updateQuantity}
              />
            ))
          )}
        </div>

        <CartSummary
          subtotal={subtotal}
          discountAmount={discountAmount}
          tax={tax}
          total={total}
          discount={discount}
          notes={notes}
          onDiscountChange={setDiscount}
          onNotesChange={setNotes}
          onCheckout={handleCheckoutRequest}
          onClear={() => {
            clearCart()
            setDiscount(null)
            setNotes('')
          }}
          isLoading={isLoading}
          hasItems={cartItems.length > 0}
        />
      </div>

      {pendingPayment && (
        <ReceiptModal
          cartItems={cartItems}
          subtotal={subtotal}
          discountAmount={discountAmount}
          tax={tax}
          total={total}
          paymentMethod={pendingPayment}
          notes={notes}
          isLoading={isLoading}
          onConfirm={handleConfirmOrder}
          onCancel={handleCancelModal}
        />
      )}

    </div>
  )
}
