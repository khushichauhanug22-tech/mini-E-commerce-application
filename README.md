# Mini E-Commerce Product & Cart

A React-based e-commerce UI demonstrating component design, state management, and React fundamentals.

## Features

### 1. Product Listing
- Display 20 products in a responsive grid layout
- Each product shows:
  - Product name
  - Price
  - Category
  - Stock status (In stock / Out of stock)
- Add to Cart button (disabled if out of stock)

### 2. Filters & Search
- Search products by name (with debouncing)
- Filter products by category
- Sort products by price (Low → High, High → Low)
- Clear all filters button
- Filters work together (search + category + sort)

### 3. Cart
- Add items to cart
- Remove items from cart
- Update item quantity
- Shows total items in cart
- Shows total price
- Quantity cannot exceed available stock
- Cart updates reflect immediately

### 4. UI & State
- Product list uses React.memo to prevent unnecessary re-renders
- Cart state managed with Context + Reducer pattern
- Empty states for no products found and empty cart
- Cart persisted in localStorage (Bonus)
- Debounced search (Bonus)

## Technical Implementation

- **React** (functional components only)
- **No UI libraries** - Custom CSS Modules
- **State Management** - Context API + useReducer
- **Performance** - React.memo, useCallback, useMemo
- **Data** - Fetches from dummyjson.com API with mock data fallback

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install Node.js from https://nodejs.org/

2. Navigate to the project directory:
```bash
cd ecommerce-cart
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm start
```

5. Open http://localhost:3000 in your browser

## Project Structure

```
ecommerce-cart/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Cart/
│   │   │   ├── Cart.js
│   │   │   ├── Cart.module.css
│   │   │   └── index.js
│   │   ├── Filters/
│   │   │   ├── Filters.js
│   │   │   ├── Filters.module.css
│   │   │   └── index.js
│   │   ├── Header/
│   │   │   ├── Header.js
│   │   │   ├── Header.module.css
│   │   │   └── index.js
│   │   ├── ProductCard/
│   │   │   ├── ProductCard.js
│   │   │   ├── ProductCard.module.css
│   │   │   └── index.js
│   │   └── ProductList/
│   │       ├── ProductList.js
│   │       ├── ProductList.module.css
│   │       └── index.js
│   ├── context/
│   │   └── CartContext.js
│   ├── data/
│   │   └── products.js
│   ├── hooks/
│   │   └── useDebounce.js
│   ├── App.css
│   ├── App.js
│   ├── index.css
│   └── index.js
└── package.json
```

## Key Design Decisions

1. **Separated Cart Context**: Cart state is separate from product state to prevent unnecessary re-renders of the product list when cart changes.

2. **Memoized Components**: ProductCard and ProductList use React.memo to optimize performance.

3. **Custom Hooks**: useDebounce hook for search input to reduce API calls and re-renders.

4. **CSS Modules**: Scoped styling without external dependencies.

5. **localStorage Persistence**: Cart items survive page refresh.

## Author

Created as part of a React assessment demonstrating:
- React fundamentals and component design
- State modeling and updates
- Clean code and readability
- Handling of edge cases
- Overall UI and UX clarity
