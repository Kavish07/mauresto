const FEATURED = [
  { name: 'Bol Renversé',       cuisine: 'Mauritian',   price: 240, desc: 'Fragrant rice with stir-fried vegetables & your choice of protein, served inverted in a bowl.' },
  { name: 'Butter Chicken',     cuisine: 'Indian',      price: 295, desc: 'Tender tandoori chicken in a velvety tomato-cream sauce with fenugreek.' },
  { name: 'Spaghetti Carbonara',cuisine: 'Italian',     price: 285, desc: 'Classic Roman pasta with guanciale, eggs, pecorino romano & cracked black pepper.' },
  { name: 'Grilled Salmon',     cuisine: 'Continental', price: 490, desc: 'Atlantic salmon fillet with lemon-dill butter, capers & seasonal vegetables.' },
  { name: 'Sweet & Sour Pork',  cuisine: 'Chinese',     price: 295, desc: 'Crispy pork pieces with bell peppers & pineapple in a tangy sweet-sour sauce.' },
  { name: 'Fish Vindaye',       cuisine: 'Mauritian',   price: 320, desc: 'Traditional pickled fish with turmeric, mustard seeds, garlic & vinegar.' },
]

function Home({ navigate }) {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tagline">Five Cuisines · One Island Soul</span>
          <h1>A Culinary Journey Through Mauritius &amp; Beyond</h1>
          <p>Experience the rich tapestry of Mauritian, Chinese, Indian, Italian &amp; Continental flavours — all under one welcoming roof.</p>
          <div className="hero-cta">
            <button className="btn-primary" onClick={() => navigate('menu')}>Explore Our Menu</button>
            <button className="btn-secondary" onClick={() => navigate('book')}>Reserve a Table</button>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="features-grid">
          {[
            { icon: '🌿', title: 'Fresh & Local',    desc: 'Seasonal produce sourced from Mauritian farmers and fishermen daily.' },
            { icon: '👨‍🍳', title: 'Master Chefs',    desc: 'Our team brings decades of expertise across five distinct culinary traditions.' },
            { icon: '🏝️', title: 'Island Ambiance', desc: 'A warm, tropical atmosphere that transports you to the heart of Mauritius.' },
            { icon: '🌍', title: 'Five Cuisines',    desc: 'Mauritian, Chinese, Indian, Italian & Continental — a world of flavour.' },
          ].map(f => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="featured-section">
        <h2>Our Signature Dishes</h2>
        <p className="page-subtitle" style={{ marginBottom: '48px' }}>A glimpse of the culinary delights awaiting you</p>
        <div className="featured-grid">
          {FEATURED.map(dish => (
            <div key={dish.name} className="dish-card">
              <div className="dish-card-header">
                <span className="dish-cuisine">{dish.cuisine}</span>
                <span className="dish-price">Rs {dish.price}</span>
              </div>
              <h3>{dish.name}</h3>
              <p>{dish.desc}</p>
            </div>
          ))}
        </div>
        <button className="btn-primary" onClick={() => navigate('menu')}>View Full Menu</button>
      </section>

      <section className="hours-banner">
        <div className="hours-content">
          <h2>Come Dine With Us</h2>
          <div className="hours-grid">
            <div><strong>Monday</strong><span>Closed</span></div>
            <div><strong>Tuesday – Friday</strong><span>12:00 PM – 10:30 PM</span></div>
            <div><strong>Saturday</strong><span>11:00 AM – 11:30 PM</span></div>
            <div><strong>Sunday</strong><span>11:00 AM – 9:30 PM</span></div>
          </div>
          <button className="btn-gold" onClick={() => navigate('book')}>Make a Reservation</button>
        </div>
      </section>
    </div>
  )
}

export default Home
