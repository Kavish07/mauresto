import { useState } from 'react'

const links = [
  { id: 'home',    label: 'Home' },
  { id: 'menu',    label: 'Menu' },
  { id: 'about',   label: 'About Us' },
  { id: 'book',    label: 'Book a Table' },
  { id: 'contact', label: 'Contact' },
]

function Navbar({ currentPage, navigate }) {
  const [open, setOpen] = useState(false)

  const handleNav = (page) => {
    navigate(page)
    setOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <button className="navbar-brand" onClick={() => handleNav('home')}>
          <svg className="navbar-logo" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="11" fill="currentColor" opacity="0.12" />
            <path
              d="M4 16.5h16M12 6.5V5m0 1.5a6 6 0 0 1 6 6H6a6 6 0 0 1 6-6Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Mauresto
        </button>

        <button
          className={`hamburger${open ? ' open' : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`nav-links${open ? ' open' : ''}`}>
          {links.map(({ id, label }) => (
            <li key={id}>
              <button
                className={currentPage === id ? 'active' : ''}
                onClick={() => handleNav(id)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
