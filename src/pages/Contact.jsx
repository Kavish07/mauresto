import { useState } from 'react'

const GUEST_OPTIONS = ['1','2','3','4','5','6','7','8','8+']

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', guests: '2', date: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="contact-page">
      <div className="page-header">
        <h1>Contact Us</h1>
        <p className="page-subtitle">Reservations, enquiries &amp; special occasions — we are here to help</p>
      </div>

      <div className="contact-layout">
        <aside className="contact-info">
          <h2>Visit Us</h2>

          <div className="contact-detail">
            <span className="contact-icon">📍</span>
            <div>
              <strong>Address</strong>
              <p>42 Royal Road, Curepipe</p>
              <p>Mauritius 74201</p>
            </div>
          </div>

          <div className="contact-detail">
            <span className="contact-icon">📞</span>
            <div>
              <strong>Phone</strong>
              <p>+230 5 123 4567</p>
              <p>+230 5 987 6543</p>
            </div>
          </div>

          <div className="contact-detail">
            <span className="contact-icon">✉️</span>
            <div>
              <strong>Email</strong>
              <p>hello@mauresto.mu</p>
              <p>reservations@mauresto.mu</p>
            </div>
          </div>

          <div className="contact-detail">
            <span className="contact-icon">🕐</span>
            <div>
              <strong>Opening Hours</strong>
              <p>Monday: Closed</p>
              <p>Tue – Fri: 12:00 PM – 10:30 PM</p>
              <p>Saturday: 11:00 AM – 11:30 PM</p>
              <p>Sunday: 11:00 AM – 9:30 PM</p>
            </div>
          </div>

          <div className="social-links">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#" className="social-link">Facebook</a>
              <a href="#" className="social-link">Instagram</a>
              <a href="#" className="social-link">TripAdvisor</a>
            </div>
          </div>
        </aside>

        <div className="contact-form-section">
          {submitted ? (
            <div className="form-success">
              <div className="success-icon">✓</div>
              <h2>Thank You!</h2>
              <p>Your reservation request has been received. We will be in touch within 24 hours to confirm your booking.</p>
              <button className="btn-primary" onClick={() => setSubmitted(false)}>Send Another Message</button>
            </div>
          ) : (
            <>
              <h2>Make a Reservation</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input id="name" name="name" type="text" required placeholder="Your name" value={form.name} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input id="email" name="email" type="email" required placeholder="your@email.com" value={form.email} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input id="phone" name="phone" type="tel" placeholder="+230 5 xxx xxxx" value={form.phone} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="guests">Number of Guests</label>
                    <select id="guests" name="guests" value={form.guests} onChange={handleChange}>
                      {GUEST_OPTIONS.map(n => (
                        <option key={n} value={n}>{n} {n === '1' ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="date">Preferred Date &amp; Time</label>
                  <input id="date" name="date" type="datetime-local" value={form.date} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message or Special Requests</label>
                  <textarea
                    id="message" name="message" rows={5}
                    placeholder="Dietary requirements, occasion details, seating preference..."
                    value={form.message} onChange={handleChange}
                  />
                </div>

                <button type="submit" className="btn-primary btn-full">Send Reservation Request</button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Contact
