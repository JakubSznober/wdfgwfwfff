import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Product } from '../components/ProductCard'

export interface CartItem {
  product: Product
  quantity: number
}

export interface DiscountInfo {
  percent: number          // e.g. 5 or 10
  amount: number           // calculated € amount
  nextTier: { threshold: number; percent: number } | null
  amountToNextTier: number
}

const DISCOUNT_TIERS = [
  { threshold: 100, percent: 10 },
  { threshold: 75, percent: 5 },
]

function calcDiscount(subtotal: number): DiscountInfo {
  const applied = DISCOUNT_TIERS.find((t) => subtotal >= t.threshold) ?? { threshold: 0, percent: 0 }
  const amount = applied.percent > 0 ? subtotal * (applied.percent / 100) : 0
  const nextTier = DISCOUNT_TIERS.slice().reverse().find((t) => subtotal < t.threshold) ?? null
  const amountToNextTier = nextTier ? nextTier.threshold - subtotal : 0
  return { percent: applied.percent, amount, nextTier, amountToNextTier }
}

interface CartContextType {
  items: CartItem[]
  cartCount: number
  cartTotal: number
  discount: DiscountInfo
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  updateQty: (productId: number, delta: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | null>(null)

const STORAGE_KEY = 'blissbone_cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? (JSON.parse(stored) as CartItem[]) : []
    } catch {
      return []
    }
  })
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0)
  const cartTotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  const discount = calcDiscount(cartTotal)

  const addToCart = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id)
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId))
  }

  const updateQty = (productId: number, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.product.id === productId ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0)
    )
  }

  const clearCart = () => setItems([])

  return (
    <CartContext.Provider
      value={{
        items,
        cartCount,
        cartTotal,
        discount,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart moet binnen CartProvider gebruikt worden')
  return ctx
}
