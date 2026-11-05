import { API_BASE_URL } from './apiBase'

async function parseResponse(response) {
  const text = await response.text()
  const body = text ? JSON.parse(text) : null

  if (!response.ok) {
    throw new Error(body?.message || `Request failed with status ${response.status}`)
  }

  return body
}

export async function fetchMenuItems() {
  const response = await fetch(`${API_BASE_URL}/api/menu-items`)
  return parseResponse(response)
}

export async function createOrder(payload) {
  const response = await fetch(`${API_BASE_URL}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return parseResponse(response)
}

export async function cancelOrder(id) {
  const response = await fetch(`${API_BASE_URL}/api/orders/${id}`, { method: 'DELETE' })
  if (!response.ok) {
    const text = await response.text()
    const body = text ? JSON.parse(text) : null
    throw new Error(body?.message || `Request failed with status ${response.status}`)
  }
}
