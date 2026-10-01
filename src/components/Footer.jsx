const links = [
  { id: 'home',    label: 'Home' },
  { id: 'menu',    label: 'Menu' },
  { id: 'about',   label: 'About Us' },
  { id: 'book',    label: 'Book a Table' },
  { id: 'contact', label: 'Contact' },
]

function Footer({ navigate }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">Mauresto</span>
          <p>Bringing the flavors of the world to your table, with a Mauritian heart. Proudly serving Curepipe since 2010.</p>
        </div>
        <div className="footer-links">
          <h4>Navigate</h4>
          {links.map(({ id, label }) => (
            <button key={id} onClick={() => navigate(id)}>{label}</button>
          ))}
        </div>
        <div className="footer-contact">
          <h4>Find Us</h4>
          <p>42 Royal Road, Curepipe</p>
          <p>Mauritius 74201</p>
          <p style={{ marginTop: '10px' }}>+230 5 123 4567</p>
          <p>hello@mauresto.mu</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Mauresto. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
