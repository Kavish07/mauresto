# Mauresto

A restaurant web app covering table booking and, as of this design, online ordering for takeaway.

## Language

**Customer**:
The guest placing a Booking or an Order, identified by name and phone number. There is no account or login — a Customer is never authenticated, just recorded per Booking/Order.
_Avoid_: Account, User, Client

**MenuItem**:
A dish available for ordering, with a name, description, and price, persisted server-side as the source of truth for what can be ordered and at what price.
_Avoid_: Dish, Product

**Order**:
A Customer's request to purchase one or more MenuItems for pickup at the restaurant, paid for in person at collection.
_Avoid_: Purchase, Transaction, Cart (Cart is the pre-submission, in-progress state; not yet modeled server-side)

**OrderItem**:
A single MenuItem and quantity within an Order, recording the item's price at the time the Order was placed.
_Avoid_: Line item, Cart item
