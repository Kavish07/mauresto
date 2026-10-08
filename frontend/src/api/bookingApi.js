async function parseResponse(response) {
  const text = await response.text()
  const body = text ? JSON.parse(text) : null

  if (!response.ok) {
    throw new Error(body?.message || `Request failed with status ${response.status}`)
  }

  return body
}

export async function fetchTables({ date, timeSlot, seats } = {}) {
  const params = new URLSearchParams()
  if (date) params.set('date', date)
  if (timeSlot) params.set('timeSlot', timeSlot)
  if (seats) params.set('seats', seats)

  const response = await fetch(`/api/tables?${params.toString()}`)
  return parseResponse(response)
}

export async function createBooking(payload) {
  const response = await fetch('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return parseResponse(response)
}

export async function cancelBooking(id) {
  const response = await fetch(`/api/bookings/${id}`, { method: 'DELETE' })
  if (!response.ok) {
    const text = await response.text()
    const body = text ? JSON.parse(text) : null
    throw new Error(body?.message || `Request failed with status ${response.status}`)
  }
}
