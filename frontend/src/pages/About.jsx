const TEAM = [
  { initials: 'AR', name: 'Chef Arjun Ramsamy',  role: 'Head Chef & Founder',       cuisine: 'Mauritian & Indian',  bio: 'Third-generation Mauritian, trained at the Escoffier School in Kuala Lumpur with 25 years behind the stove.' },
  { initials: 'LW', name: 'Chef Li Wei',          role: 'Chinese Cuisine Chef',       cuisine: 'Chinese',              bio: 'Born in Guangzhou, Chef Li has been mastering Cantonese and Sichuan techniques for over 22 years.' },
  { initials: 'MD', name: 'Chef Marco De Luca',   role: 'Italian Cuisine Chef',       cuisine: 'Italian',              bio: 'Roman-born Marco learned his craft from his grandmother before completing his training in Milan.' },
  { initials: 'IM', name: 'Chef Isabelle Moreau', role: 'Continental Cuisine Chef',   cuisine: 'Continental',          bio: 'Paris-trained with experience at two Michelin-starred restaurants in Lyon before moving to Mauritius.' },
]

const HOURS = [
  { days: 'Monday',            time: 'Closed'              },
  { days: 'Tuesday – Friday',  time: '12:00 PM – 10:30 PM' },
  { days: 'Saturday',          time: '11:00 AM – 11:30 PM' },
  { days: 'Sunday',            time: '11:00 AM – 9:30 PM'  },
  { days: 'Public Holidays',   time: '12:00 PM – 9:00 PM'  },
]

function About() {
  return (
    <div className="about-page">
      <div className="page-header">
        <h1>About Mauresto</h1>
        <p className="page-subtitle">Our Story, Our Passion, Our Promise</p>
      </div>

      <section className="about-story">
        <div className="about-story-content">
          <h2>Born from the Island Spirit</h2>
          <p>
            Mauresto was founded in 2010 by the Ramsamy family, whose roots trace back three generations across India and Mauritius. Growing up surrounded by the island's extraordinary culinary melting pot, founder Arjun Ramsamy dreamed of a restaurant that celebrated every thread of Mauritius' multicultural tapestry. The name blends <em>Mauritius</em> and <em>Ristorante</em> — a fitting symbol of that ambition.
          </p>
          <p>
            Our kitchen is home to chefs trained in Port Louis, Mumbai, Shanghai, Rome and Paris — each a master of their heritage, each learning alongside one another every day. The result is a menu where a bowl of Dholl Puri sits comfortably beside Tiramisu, and where the same family that orders Butter Chicken on Monday returns for Grilled Salmon on Friday.
          </p>
          <p>
            We believe food is the greatest bridge between cultures. Every dish at Mauresto is an invitation to explore and celebrate the flavours that make our island, and our world, so wonderfully diverse.
          </p>
        </div>
        <div className="about-story-image">
          <div className="about-placeholder">
            <span>🏝️</span>
            <p>Est. 2010</p>
            <p>Curepipe, Mauritius</p>
          </div>
        </div>
      </section>

      <section className="values-section">
        <h2>Our Values</h2>
        <div className="values-grid">
          {[
            { icon: '🌿', title: 'Fresh & Local',       desc: 'We source vegetables, fish and meat from local Mauritian farmers and fishermen, supporting the community that supports us.' },
            { icon: '🤝', title: 'Inclusive Welcome',    desc: 'Every guest — regardless of background, dietary need, or budget — deserves to feel at home at our table.' },
            { icon: '👨‍🍳', title: 'Craft & Authenticity', desc: 'We never cut corners. Our chefs grind their own spices, make pasta from scratch and marinate meat overnight.' },
            { icon: '♻️', title: 'Sustainability',       desc: 'Minimal food waste, compostable takeaway packaging, and a kitchen powered 60% by solar energy.' },
          ].map(v => (
            <div key={v.title} className="value-card">
              <div className="value-icon">{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="team-section">
        <h2>Meet the Team</h2>
        <div className="team-grid">
          {TEAM.map(member => (
            <div key={member.name} className="team-card">
              <div className="team-avatar">{member.initials}</div>
              <h3>{member.name}</h3>
              <span className="team-role">{member.role}</span>
              <span className="team-cuisine">{member.cuisine} Specialist</span>
              <p>{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-hours">
        <h2>Opening Hours</h2>
        <div className="hours-table">
          {HOURS.map(row => (
            <div key={row.days} className="hours-row">
              <span className="hours-days">{row.days}</span>
              <span className="hours-time">{row.time}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default About
