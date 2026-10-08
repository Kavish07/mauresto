import { useState } from 'react'

const MENU = {
  mauritian: {
    label: 'Mauritian', emoji: '🏝️',
    description: 'Authentic island flavours — a unique blend of African, Indian, Chinese & French culinary heritage.',
    items: [
      { name: 'Dholl Puri',             price: 25,  desc: 'Thin flatbreads stuffed with ground yellow split peas, served with pickles & chutneys.' },
      { name: 'Roti Chaud',             price: 20,  desc: 'Soft wholemeal flatbread served with your choice of curry.' },
      { name: 'Mine Frite',             price: 180, desc: 'Stir-fried egg noodles with vegetables, egg & your choice of protein.' },
      { name: 'Bol Renversé',           price: 240, desc: 'Fragrant rice with stir-fried vegetables & protein, served inverted in a bowl.' },
      { name: 'Chicken Briyani',        price: 280, desc: 'Aromatic basmati rice slow-cooked with tender chicken, whole spices & caramelised onion.' },
      { name: 'Mutton Briyani',         price: 320, desc: 'Slow-cooked mutton in fragrant basmati rice with whole spices & fresh mint.' },
      { name: 'Octopus Curry',          price: 380, desc: 'Tender octopus simmered in a rich tomato-based Creole curry sauce.' },
      { name: 'Fish Vindaye',           price: 320, desc: 'Traditional pickled fish with turmeric, mustard seeds, garlic & vinegar.' },
      { name: 'Rougaille Saucisse',     price: 190, desc: 'Mauritian tomato-based stew with smoked sausages, herbs & spices.' },
      { name: 'Gateaux Piment (4 pcs)', price: 40,  desc: 'Crispy fried chili cakes made with split peas, fresh chili & herbs.' },
      { name: 'Alouda',                 price: 60,  desc: 'Chilled Mauritian milkshake with basil seeds, agar jelly & vanilla ice cream.' },
      { name: 'Mango Achard',           price: 35,  desc: 'Spicy raw mango pickle with mustard, turmeric & fresh chilies.' },
    ],
  },
  chinese: {
    label: 'Chinese', emoji: '🥢',
    description: 'Traditional Chinese recipes honouring centuries of culinary heritage, wok-tossed to order.',
    items: [
      { name: 'Chicken Fried Rice',    price: 195, desc: 'Wok-tossed jasmine rice with chicken, egg, spring onions & soy sauce.' },
      { name: 'Mixed Fried Rice',      price: 220, desc: 'Wok-tossed rice with chicken, shrimp, vegetables & egg.' },
      { name: 'Chicken Chow Mein',     price: 210, desc: 'Stir-fried egg noodles with chicken, bok choy & oyster sauce.' },
      { name: 'Spring Rolls (3 pcs)',  price: 130, desc: 'Crispy rolls filled with seasoned vegetables and glass noodles.' },
      { name: 'Dim Sum (4 pcs)',       price: 160, desc: 'Steamed dumplings with pork, shrimp and bamboo shoots.' },
      { name: 'Sweet & Sour Pork',     price: 295, desc: 'Crispy pork pieces with bell peppers & pineapple in tangy sauce.' },
      { name: 'Honey Lemon Chicken',   price: 280, desc: 'Crispy chicken glazed in a sweet honey lemon reduction.' },
      { name: 'Wonton Soup',           price: 170, desc: 'Delicate pork wontons in a fragrant ginger-sesame broth.' },
      { name: 'Fried Wonton (6 pcs)',  price: 150, desc: 'Golden fried wontons stuffed with seasoned pork, served with dipping sauce.' },
      { name: 'Beef with Black Bean',  price: 310, desc: 'Tender beef strips with black bean sauce, capsicum & onion.' },
    ],
  },
  indian: {
    label: 'Indian', emoji: '🫕',
    description: 'Rich, aromatic dishes bursting with hand-ground spices and generations of culinary tradition.',
    items: [
      { name: 'Butter Chicken',           price: 295, desc: 'Tender tandoori chicken in a velvety tomato-cream sauce with fenugreek.' },
      { name: 'Chicken Tikka Masala',     price: 310, desc: 'Grilled chicken tikka in a rich, spiced creamy tomato-based sauce.' },
      { name: 'Palak Paneer',             price: 265, desc: 'Fresh cottage cheese cubes in a spiced spinach gravy.' },
      { name: 'Dal Makhani',              price: 225, desc: 'Black lentils slow-cooked overnight with butter, cream & whole spices.' },
      { name: 'Lamb Rogan Josh',          price: 345, desc: 'Succulent Kashmiri lamb in a fragrant sauce of whole spices & aromatics.' },
      { name: 'Tandoori Chicken (half)',   price: 330, desc: 'Marinated chicken grilled in a clay oven, served with mint chutney & salad.' },
      { name: 'Garlic Naan',              price: 65,  desc: 'Soft leavened bread brushed with garlic butter, baked in the tandoor.' },
      { name: 'Samosas (2 pcs)',          price: 85,  desc: 'Crispy pastry filled with spiced potatoes & peas, with tamarind chutney.' },
      { name: 'Mango Lassi',              price: 80,  desc: 'Chilled yogurt drink blended with fresh Alphonso mango & cardamom.' },
      { name: 'Gulab Jamun (3 pcs)',      price: 95,  desc: 'Soft milk-solid dumplings soaked in rose-flavoured sugar syrup.' },
    ],
  },
  italian: {
    label: 'Italian', emoji: '🍝',
    description: 'Classic Italian fare crafted with imported ingredients and time-honoured Old World techniques.',
    items: [
      { name: 'Margherita Pizza (10")', price: 360, desc: 'Tomato base, fresh mozzarella & basil leaves on a hand-stretched crust.' },
      { name: 'Pepperoni Pizza (10")',  price: 420, desc: 'Tomato base, mozzarella & generous pepperoni on a hand-stretched crust.' },
      { name: 'Pasta Carbonara',        price: 285, desc: 'Spaghetti with guanciale, eggs, pecorino romano & cracked black pepper.' },
      { name: 'Spaghetti Bolognese',    price: 295, desc: 'Slow-cooked beef ragù with San Marzano tomatoes on al dente spaghetti.' },
      { name: 'Lasagna al Forno',       price: 325, desc: 'Layered pasta with beef ragù, béchamel & Parmigiano-Reggiano.' },
      { name: 'Risotto ai Funghi',      price: 310, desc: 'Creamy arborio rice with wild mushrooms, white wine & parmesan.' },
      { name: 'Caesar Salad',           price: 210, desc: 'Romaine hearts, croutons & parmesan with house Caesar dressing.' },
      { name: 'Bruschetta',             price: 155, desc: 'Grilled sourdough with heirloom tomatoes, garlic, basil & extra virgin olive oil.' },
      { name: 'Tiramisu',               price: 190, desc: 'Classic Italian dessert with espresso-soaked ladyfingers & mascarpone cream.' },
      { name: 'Panna Cotta',            price: 175, desc: 'Silky vanilla cream topped with seasonal berry coulis.' },
    ],
  },
  continental: {
    label: 'Continental', emoji: '🥩',
    description: 'European classics executed with precision and the finest imported & local ingredients.',
    items: [
      { name: 'Grilled Salmon',       price: 490, desc: 'Atlantic salmon fillet with lemon-dill butter, capers & seasonal vegetables.' },
      { name: 'Beef Tenderloin',       price: 560, desc: '200 g prime beef with truffle jus, roasted potatoes & French beans.' },
      { name: 'Lamb Rack',             price: 580, desc: 'French-trimmed rack of lamb with herb crust, redcurrant jus & ratatouille.' },
      { name: 'Chicken Cordon Bleu',   price: 430, desc: 'Stuffed chicken breast with ham & Gruyère, panko-crusted and golden-fried.' },
      { name: 'French Onion Soup',     price: 185, desc: 'Slow-caramelised onion broth topped with croutons & melted Gruyère.' },
      { name: 'Quiche Lorraine',       price: 255, desc: 'Buttery pastry filled with eggs, cream, smoked bacon & Gruyère.' },
      { name: 'Club Sandwich',         price: 225, desc: 'Triple-decker with chicken, bacon, egg, lettuce, tomato & mayo.' },
      { name: 'Garden Salad',          price: 175, desc: 'Mixed greens, cherry tomatoes, cucumber & radish with balsamic vinaigrette.' },
      { name: 'Crème Brûlée',          price: 205, desc: 'Classic vanilla custard with a perfectly caramelised sugar crust.' },
      { name: 'Chocolate Fondant',     price: 220, desc: 'Warm dark chocolate cake with a molten centre, served with vanilla ice cream.' },
    ],
  },
}

function Menu() {
  const [active, setActive] = useState('mauritian')
  const category = MENU[active]

  return (
    <div className="menu-page">
      <div className="page-header">
        <h1>Our Menu</h1>
        <p className="page-subtitle">All prices in Mauritian Rupees (Rs) · Dine-in &amp; Takeaway</p>
      </div>

      <div className="menu-tabs">
        {Object.entries(MENU).map(([key, cat]) => (
          <button
            key={key}
            className={`menu-tab${active === key ? ' active' : ''}`}
            onClick={() => setActive(key)}
          >
            <span className="tab-emoji">{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      <div className="menu-category-header">
        <h2>{category.emoji} {category.label} Cuisine</h2>
        <p>{category.description}</p>
      </div>

      <div className="menu-grid">
        {category.items.map(item => (
          <div key={item.name} className="menu-item">
            <div className="menu-item-info">
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
            </div>
            <div className="menu-item-price">Rs {item.price}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Menu
