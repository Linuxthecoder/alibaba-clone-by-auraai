import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, User, LogOut, ChevronDown, Package } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-alibaba-dark text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span>Global B2B Marketplace</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/suppliers" className="hover:text-alibaba-orange transition-colors">Suppliers</Link>
            <Link to="/products" className="hover:text-alibaba-orange transition-colors">Products</Link>
            {isAuthenticated && (
              <Link to="/dashboard" className="hover:text-alibaba-orange transition-colors">Dashboard</Link>
            )}
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="text-2xl font-bold text-alibaba-orange tracking-tight">
              Alibaba<span className="text-alibaba-dark">Clone</span>
            </div>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl hidden md:flex">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search products, suppliers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-3 border-2 border-alibaba-orange rounded-l-lg focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-alibaba-orange hover:bg-orange-700 text-white px-8 py-3 rounded-r-lg font-semibold transition-colors flex items-center gap-2"
            >
              <Search size={18} />
              Search
            </button>
          </form>

          {/* Right actions */}
          <div className="flex items-center gap-4 ml-auto">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-alibaba-orange text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {user?.avatar || user?.name?.charAt(0) || 'U'}
                  </div>
                  <span className="hidden sm:block text-sm font-medium">{user?.name?.split(' ')[0]}</span>
                  <ChevronDown size={16} />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-semibold text-sm">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.company}</p>
                    </div>
                    <Link to="/dashboard" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm">
                      <User size={16} /> Dashboard
                    </Link>
                    <Link to="/cart" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm">
                      <ShoppingCart size={16} /> Cart ({cartCount})
                    </Link>
                    <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm w-full text-left text-red-600">
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-sm font-medium hover:text-alibaba-orange transition-colors">Sign In</Link>
                <Link to="/register" className="btn-primary text-sm">Join Free</Link>
              </div>
            )}

            <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ShoppingCart size={22} className="text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-alibaba-red text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <form onSubmit={handleSearch} className="mt-3 md:hidden flex">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 pl-4 pr-3 py-2 border-2 border-alibaba-orange rounded-l-lg focus:outline-none text-sm"
          />
          <button type="submit" className="bg-alibaba-orange text-white px-4 py-2 rounded-r-lg">
            <Search size={18} />
          </button>
        </form>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          <Link to="/products" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 py-2">
            <Package size={18} /> Products
          </Link>
          <Link to="/suppliers" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 py-2">
            <User size={18} /> Suppliers
          </Link>
          {isAuthenticated && (
            <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 py-2">
              <User size={18} /> Dashboard
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

