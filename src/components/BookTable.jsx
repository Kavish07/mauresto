import { useState } from 'react'

const TABLES = [
  { id: 'T01', seats: 2,  location: 'Window side',         available: true  },
  { id: 'T02', seats: 2,  location: 'Window side',         available: false },
  { id: 'T03', seats: 2,  location: 'Bar counter',         available: true  },
  { id: 'T04', seats: 4,  location: 'Main hall',           available: true  },
  { id: 'T05', seats: 4,  location: 'Main hall',           available: true  },
  { id: 'T06', seats: 4,  location: 'Garden terrace',      available: false },
  { id: 'T07', seats: 6,  location: 'Garden terrace',      available: true  },
  { id: 'T08', seats: 6,  location: 'Main hall',           available: true  },
  { id: 'T09', seats: 8,  location: 'Private alcove',      available: true  },
  { id: 'T10', seats: 8,  location: 'Private alcove',      available: false },
  { id: 'T11', seats: 10, location: 'Private dining room', available: true  },
  { id: 'T12', seats: 12, location: 'Banquet corner',      available: true  },
]

const seatSizes = [...new Set(TABLES.map(t => t.seats))].sort((a, b) => a - b)

function BookTable() {
  const [filter, setFilter] = useState('all')
  const [booked, setBooked] = useState(null)

  const groups = seatSizes
    .filter(s => filter === 'all' || s === Number(filter))
    .map(s => ({ seats: s, tables: TABLES.filter(t => t.seats === s) }))

  if (booked) {
    return (
      <div className="book-page">
        <div className="page-header">
          <h1>Book a Table</h1>
        </div>
        <div className="book-layout">
          <div className="form-success">
            <div className="success-icon">✓</div>
            <h2>Table {booked.id} reserved</h2>
            <p>
              Your request for the {booked.seats}-seater at the {booked.location.toLowerCase()} has
              been received. We will confirm by phone within the hour.
            </p>
            <button className="btn-primary" onClick={() => setBooked(null)}>Book another table</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="book-page">
      <div className="page-header">
        <h1>Book a Table</h1>
        <p className="page-subtitle">Choose a table by party size — availability shown live</p>
      </div>

      <div className="book-layout">
        <div className="book-filters">
          <button
            className={`book-filter${filter === 'all' ? ' active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Any size
          </button>
          {seatSizes.map(s => (
            <button
              key={s}
              className={`book-filter${filter === String(s) ? ' active' : ''}`}
              onClick={() => setFilter(String(s))}
            >
              {s} seats
            </button>
          ))}
        </div>

        {groups.map(({ seats, tables }) => (
          <section key={seats} className="book-group">
            <div className="book-group-title">
              <h2>{seats}-Seater Tables</h2>
              <span>{tables.filter(t => t.available).length} of {tables.length} available</span>
            </div>
            <div className="table-grid">
              {tables.map(table => (
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
                    onClick={() => setBooked(table)}
                  >
                    {table.available ? 'Select table' : 'Unavailable'}
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export default BookTable
