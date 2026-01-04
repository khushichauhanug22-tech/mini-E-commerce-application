import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { CartProvider } from './context/CartContext';
import { fetchProducts, getCategories, mockProducts } from './data/products';
import Header from './components/Header';
import Filters from './components/Filters';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import './App.css';

function AppContent() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    sort: ''
  });

  // Fetch products on mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products');
        // Fallback to mock data
        setProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    return getCategories(products);
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(product =>
        product.title.toLowerCase().includes(searchLower)
      );
    }

    // Category filter
    if (filters.category) {
      result = result.filter(product =>
        product.category === filters.category
      );
    }

    // Sort
    if (filters.sort === 'low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sort === 'high-low') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, filters]);

  // Handle filter changes
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  // Toggle cart visibility
  const toggleCart = useCallback(() => {
    setIsCartOpen(prev => !prev);
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <Header onCartClick={toggleCart} isCartOpen={isCartOpen} />
      
      <main className="main">
        <div className="container">
          <Filters 
            categories={categories}
            onFilterChange={handleFilterChange}
            currentFilters={filters}
          />

          {error && (
            <div className="error-message">
              {error} - Showing demo products instead
            </div>
          )}

          <div className={`content ${isCartOpen ? 'with-cart' : ''}`}>
            <div className="products-section">
              <div className="products-header">
                <h2 className="section-title">Products</h2>
                <span className="product-count">
                  {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                </span>
              </div>
              <ProductList products={filteredProducts} />
            </div>

            {isCartOpen && (
              <aside className="cart-section">
                <Cart />
              </aside>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
