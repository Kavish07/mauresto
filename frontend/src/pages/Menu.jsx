import { useEffect, useMemo, useState } from 'react'
import { createOrder, fetchMenuItems } from '../api/orderApi'

const CATEGORY_META = {
  mauritian: {
    label: 'Mauritian', emoji: '🏝️',
    description: 'Authentic island flavours — a unique blend of African, Indian, Chinese & French culinary heritage.',
  },
  chinese: {
    label: 'Chinese', emoji: '🥢',
    description: 'Traditional Chinese recipes honouring centuries of culinary heritage, wok-tossed to order.',
  },
  indian: {
    label: 'Indian', emoji: '🫕',
    description: 'Rich, aromatic dishes bursting with hand-ground spices and generations of culinary tradition.',
  },
  italian: {
    label: 'Italian', emoji: '🍝',
    description: 'Classic Italian fare crafted with imported ingredients and time-honoured Old World techniques.',
  },
  continental: {
    label: 'Continental', emoji: '🥩',
    description: 'European classics executed with precision and the finest imported & local ingredients.',
  },
}

function Menu() {
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)
  const [active, setActive] = useState(null)

  const [cart, setCart] = useState([])
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [form, setForm] = useState({ customerName: '', customerPhone: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [order, setOrder] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const items = await fetchMenuItems()
        if (cancelled) return
        setMenuItems(items)
        setActive(items[0]?.category ?? null)
      } catch (err) {
        if (!cancelled) setLoadError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  const categories = useMemo(() => {
    const byCategory = {}
    for (const item of menuItems) {
      if (!byCategory[item.category]) byCategory[item.category] = []
      byCategory[item.category].push(item)
    }
    return Object.entries(byCategory).map(([key, items]) => ({
      key,
      items,
      ...(CATEGORY_META[key] ?? { label: key, emoji: '🍽️', description: '' }),
    }))
  }, [menuItems])

  const activeCategory = categories.find(c => c.key === active)

  function qtyInCart(id) {
    return cart.find(c => c.menuItemId === id)?.quantity ?? 0
  }

  function addItem(item) {
    setCart(prev => {
      const existing = prev.find(c => c.menuItemId === item.id)
      if (existing) {
        return prev.map(c => c.menuItemId === item.id ? { ...c, quantity: c.quantity + 1 } : c)
      }
      return [...prev, { menuItemId: item.id, name: item.name, price: Number(item.price), quantity: 1 }]
    })
  }

  function changeQty(id, delta) {
    setCart(prev => prev.flatMap(c => {
      if (c.menuItemId !== id) return [c]
      const quantity = c.quantity + delta
      return quantity <= 0 ? [] : [{ ...c, quantity }]
    }))
  }

  function removeItem(id) {
    setCart(prev => prev.filter(c => c.menuItemId !== id))
  }

  const cartCount = cart.reduce((sum, c) => sum + c.quantity, 0)
  const cartTotal = cart.reduce((sum, c) => sum + c.price * c.quantity, 0)

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError(null)
    try {
      const response = await createOrder({
        customerName: form.customerName,
        customerPhone: form.customerPhone,
        items: cart.map(c => ({ menuItemId: c.menuItemId, quantity: c.quantity })),
      })
      setOrder(response)
      setCart([])
    } catch (err) {
      setSubmitError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  function startNewOrder() {
    setOrder(null)
    setCheckoutOpen(false)
    setForm({ customerName: '', customerPhone: '' })
  }

  return (
    <div className="menu-page">
      <div className="page-header">
        <h1>Our Menu</h1>
        <p className="page-subtitle">All prices in Mauritian Rupees (Rs) · Dine-in &amp; Takeaway</p>
      </div>

      {loading && <p className="book-prompt">Loading menu…</p>}
      {loadError && <p className="book-error">{loadError}</p>}

      {!loading && !loadError && activeCategory && (
        <>
          <div className="menu-tabs">
            {categories.map(cat => (
              <button
                key={cat.key}
                className={`menu-tab${active === cat.key ? ' active' : ''}`}
                onClick={() => setActive(cat.key)}
              >
                <span className="tab-emoji">{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          <div className="menu-category-header">
            <h2>{activeCategory.emoji} {activeCategory.label} Cuisine</h2>
            <p>{activeCategory.description}</p>
          </div>

          <div className="menu-grid">
            {activeCategory.items.map(item => {
              const qty = qtyInCart(item.id)
              return (
                <div key={item.id} className="menu-item">
                  <div className="menu-item-info">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div className="menu-item-action">
                    <div className="menu-item-price">Rs {Number(item.price)}</div>
                    {qty === 0 ? (
                      <button className="btn-sm" onClick={() => addItem(item)}>Add to order</button>
                    ) : (
                      <div className="qty-stepper">
                        <button className="qty-btn" type="button" onClick={() => changeQty(item.id, -1)}>−</button>
                        <span>{qty}</span>
                        <button className="qty-btn" type="button" onClick={() => changeQty(item.id, 1)}>+</button>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}

      {cartCount > 0 && !checkoutOpen && (
        <div className="order-bar">
          <div className="order-bar-info"><strong>{cartCount}</strong> item{cartCount === 1 ? '' : 's'} · Rs {cartTotal}</div>
          <button className="btn-primary" onClick={() => setCheckoutOpen(true)}>Review order</button>
        </div>
      )}

      {checkoutOpen && (
        <div className="booking-form-overlay" onClick={() => !order && setCheckoutOpen(false)}>
          {order ? (
            <div className="form-success" onClick={e => e.stopPropagation()}>
              <div className="success-icon">✓</div>
              <h2>Order #{order.id} confirmed</h2>
              <p>
                {order.items.length} item{order.items.length === 1 ? '' : 's'} for Rs {order.totalAmount} ·
                Pay on pickup · We'll have it ready as soon as possible, {order.customerName}.
              </p>
              <button className="btn-primary" onClick={startNewOrder}>Start a new order</button>
            </div>
          ) : (
            <form className="booking-form" onClick={e => e.stopPropagation()} onSubmit={handleSubmit}>
              <h2>Your order</h2>

              {cart.map(c => (
                <div key={c.menuItemId} className="order-item-row">
                  <span className="order-item-name">{c.name} × {c.quantity}</span>
                  <div className="qty-stepper">
                    <button className="qty-btn" type="button" onClick={() => changeQty(c.menuItemId, -1)}>−</button>
                    <span>{c.quantity}</span>
                    <button className="qty-btn" type="button" onClick={() => changeQty(c.menuItemId, 1)}>+</button>
                    <button type="button" className="qty-btn" onClick={() => removeItem(c.menuItemId)}>×</button>
                  </div>
                </div>
              ))}
              <div className="order-total"><span>Total</span><span>Rs {cartTotal}</span></div>

              <div className="form-group">
                <label htmlFor="orderCustomerName">Full Name</label>
                <input
                  id="orderCustomerName"
                  required
                  placeholder="Your name"
                  value={form.customerName}
                  onChange={e => setForm(f => ({ ...f, customerName: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label htmlFor="orderCustomerPhone">Phone</label>
                <input
                  id="orderCustomerPhone"
                  type="tel"
                  required
                  placeholder="+230 5 xxx xxxx"
                  value={form.customerPhone}
                  onChange={e => setForm(f => ({ ...f, customerPhone: e.target.value }))}
                />
              </div>

              {submitError && <p className="book-error">{submitError}</p>}

              <div className="booking-form-actions">
                <button type="button" className="btn-outline" onClick={() => setCheckoutOpen(false)} disabled={submitting}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={submitting || cart.length === 0}>
                  {submitting ? 'Placing order…' : 'Place order'}
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  )
}

export default Menu
