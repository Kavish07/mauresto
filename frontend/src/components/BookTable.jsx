import { useEffect, useState } from 'react'
import { createBooking, fetchTables } from '../api/bookingApi'

const SEAT_SIZES = [2, 4, 6, 8, 10, 12]

const TIME_SLOTS = [
  { value: 'LUNCH_12', label: '12:00 Lunch' },
  { value: 'LUNCH_14', label: '14:00 Lunch' },
  { value: 'DINNER_18', label: '18:00 Dinner' },
  { value: 'DINNER_20', label: '20:00 Dinner' },
]

function today() {
  return new Date().toISOString().slice(0, 10)
}

function BookTable() {
  const [date, setDate] = useState('')
  const [timeSlot, setTimeSlot] = useState('')
  const [filter, setFilter] = useState('all')

  const [tables, setTables] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadError, setLoadError] = useState(null)

  const [selectedTable, setSelectedTable] = useState(null)
  const [form, setForm] = useState({ customerName: '', customerPhone: '', partySize: 2 })
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const [booked, setBooked] = useState(null)

  useEffect(() => {
    if (!date || !timeSlot) {
      return
    }

    let cancelled = false

    async function loadTables() {
      setLoading(true)
      setLoadError(null)
      try {
        const result = await fetchTables({ date, timeSlot, seats: filter === 'all' ? undefined : filter })
        if (!cancelled) setTables(result)
      } catch (err) {
        if (!cancelled) setLoadError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadTables()

    return () => { cancelled = true }
  }, [date, timeSlot, filter])

  function openBookingForm(table) {
    setSelectedTable(table)
    setSubmitError(null)
    setForm({ customerName: '', customerPhone: '', partySize: Math.min(2, table.seats) })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError(null)
    try {
      const response = await createBooking({
        tableId: selectedTable.id,
        customerName: form.customerName,
        customerPhone: form.customerPhone,
        partySize: Number(form.partySize),
        bookingDate: date,
        timeSlot,
      })
      setBooked(response)
      setSelectedTable(null)
    } catch (err) {
      setSubmitError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  function bookAnother() {
    setBooked(null)
    setSelectedTable(null)
    setDate('')
    setTimeSlot('')
    setFilter('all')
  }

  if (booked) {
    return (
      <div className="book-page">
        <div className="page-header">
          <h1>Book a Table</h1>
        </div>
        <div className="book-layout">
          <div className="form-success">
            <div className="success-icon">✓</div>
            <h2>Table {booked.tableId} reserved</h2>
            <p>
              Your {booked.partySize}-guest reservation for the {booked.seats}-seater at the{' '}
              {booked.location.toLowerCase()} is confirmed for {booked.bookingDate} ({booked.timeSlotLabel}).
            </p>
            <button className="btn-primary" onClick={bookAnother}>Book another table</button>
          </div>
        </div>
      </div>
    )
  }

  const groups = SEAT_SIZES
    .filter(s => filter === 'all' || s === Number(filter))
    .map(s => ({ seats: s, tables: tables.filter(t => t.seats === s) }))
    .filter(g => g.tables.length > 0)

  return (
    <div className="book-page">
      <div className="page-header">
        <h1>Book a Table</h1>
        <p className="page-subtitle">Pick a date and time, then choose a table — availability shown live</p>
      </div>

      <div className="book-layout">
        <div className="book-datetime">
          <div className="book-field">
            <label htmlFor="book-date">Date</label>
            <input
              id="book-date"
              type="date"
              min={today()}
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </div>
          <div className="book-field">
            <span>Time</span>
            <div className="book-filters">
              {TIME_SLOTS.map(slot => (
                <button
                  key={slot.value}
                  type="button"
                  className={`book-filter${timeSlot === slot.value ? ' active' : ''}`}
                  onClick={() => setTimeSlot(slot.value)}
                >
                  {slot.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {(!date || !timeSlot) && (
          <p className="book-prompt">Pick a date and time slot above to see table availability.</p>
        )}

        {date && timeSlot && (
          <>
            <div className="book-filters">
              <button
                type="button"
                className={`book-filter${filter === 'all' ? ' active' : ''}`}
                onClick={() => setFilter('all')}
              >
                Any size
              </button>
              {SEAT_SIZES.map(s => (
                <button
                  key={s}
                  type="button"
                  className={`book-filter${filter === String(s) ? ' active' : ''}`}
                  onClick={() => setFilter(String(s))}
                >
                  {s} seats
                </button>
              ))}
            </div>

            {loading && <p className="book-prompt">Loading availability…</p>}
            {loadError && <p className="book-error">{loadError}</p>}

            {!loading && !loadError && groups.map(({ seats, tables: group }) => (
              <section key={seats} className="book-group">
                <div className="book-group-title">
                  <h2>{seats}-Seater Tables</h2>
                  <span>{group.filter(t => t.available).length} of {group.length} available</span>
                </div>
                <div className="table-grid">
                  {group.map(table => (
                    <div
                      key={table.id}
                      className={`table-card${table.available ? '' : ' unavailable'}`}
                    >
                      <div className="table-card-top">
                        <span className="table-id">{table.id}</span>
                        <span className={`table-badge ${table.available ? 'open' : 'full'}`}>
                          {table.available ? 'Available' : 'Booked'}
                        </span>
                      </div>
                      <div className="table-seats">🪑 Seats {table.seats}</div>
                      <div className="table-location">📍 {table.location}</div>
                      <button
                        className="btn-sm"
                        disabled={!table.available}
                        onClick={() => openBookingForm(table)}
                      >
                        {table.available ? 'Select table' : 'Unavailable'}
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            ))}

            {selectedTable && (
              <div className="booking-form-overlay" onClick={() => setSelectedTable(null)}>
                <form className="booking-form" onClick={e => e.stopPropagation()} onSubmit={handleSubmit}>
                  <h2>Reserve table {selectedTable.id}</h2>
                  <p className="page-subtitle">
                    {selectedTable.seats}-seater · {selectedTable.location} · {date} ·{' '}
                    {TIME_SLOTS.find(s => s.value === timeSlot)?.label}
                  </p>

                  <div className="form-group">
                    <label htmlFor="customerName">Full Name</label>
                    <input
                      id="customerName"
                      required
                      placeholder="Your name"
                      value={form.customerName}
                      onChange={e => setForm(f => ({ ...f, customerName: e.target.value }))}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="customerPhone">Phone</label>
                    <input
                      id="customerPhone"
                      type="tel"
                      required
                      placeholder="+230 5 xxx xxxx"
                      value={form.customerPhone}
                      onChange={e => setForm(f => ({ ...f, customerPhone: e.target.value }))}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="partySize">Party Size</label>
                    <input
                      id="partySize"
                      type="number"
                      min="1"
                      max={selectedTable.seats}
                      required
                      value={form.partySize}
                      onChange={e => setForm(f => ({ ...f, partySize: e.target.value }))}
                    />
                  </div>

                  {submitError && <p className="book-error">{submitError}</p>}

                  <div className="booking-form-actions">
                    <button
                      type="button"
                      className="btn-outline"
                      onClick={() => setSelectedTable(null)}
                      disabled={submitting}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary" disabled={submitting}>
                      {submitting ? 'Booking…' : 'Confirm booking'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default BookTable
