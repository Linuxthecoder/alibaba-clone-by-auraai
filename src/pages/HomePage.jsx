import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Truck, Headphones, RefreshCw, TrendingUp, Zap } from 'lucide-react';
import db from '../lib/db';
import CategoryGrid from '../components/CategoryGrid';
import ProductCard from '../components/ProductCard';
import FeaturedSuppliers from '../components/FeaturedSuppliers';
import SearchBar from '../components/SearchBar';

export default function HomePage() {
  const featuredProducts = db.getAll('products').filter(p => p.featured).slice(0, 8);
  const trendingProducts = db.getAll('products').filter(p => p.trending).slice(0, 4);

  return (
    <div>
      {/* Global B2B Marketplace - Always Visible Top Banner */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-alibaba-dark via-gray-800 to-alibaba-dark text-white text-center py-2.5 font-bold text-sm tracking-wide shadow-md border-b border-gray-700">
        Global B2B Marketplace
      </div>

      {/* Aura AI Demo Banner */}
      <div className="bg-gradient-to-r from-alibaba-orange via-orange-500 to-yellow-400 text-white text-center py-2 font-semibold text-sm tracking-wide shadow-sm">
        Made by Aura AI - Demo Project
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-alibaba-dark to-gray-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Global B2B Marketplace<br />
              <span className="text-alibaba-orange">for Wholesale Trade</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              Connect with verified manufacturers and suppliers. Source quality products at factory prices with secure payments and reliable shipping.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <SearchBar large />
            </div>
            <div className="flex flex-wrap gap-4 mt-6 text-sm text-gray-400">
              <span className="flex items-center gap-1"><Shield size={14} /> Verified Suppliers</span>
              <span className="flex items-center gap-1"><Truck size={14} /> Global Shipping</span>
              <span className="flex items-center gap-1"><Headphones size={14} /> 24/7 Support</span>
              <span className="flex items-center gap-1"><RefreshCw size={14} /> Trade Assurance</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-alibaba-orange">200K+</div>
              <div className="text-sm text-gray-500">Suppliers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-alibaba-orange">5M+</div>
              <div className="text-sm text-gray-500">Products</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-alibaba-orange">190+</div>
              <div className="text-sm text-gray-500">Countries</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-alibaba-orange">40M+</div>
              <div className="text-sm text-gray-500">Buyers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <CategoryGrid />

      {/* Featured Products */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="section-title mb-0">Featured Products</h2>
              <p className="text-gray-500 text-sm mt-1">Handpicked by our team for quality and value</p>
            </div>
            <Link to="/products" className="text-alibaba-orange font-medium hover:underline flex items-center gap-1">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-6">
            <Zap size={24} className="text-alibaba-orange" />
            <h2 className="section-title mb-0">Trending Now</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Suppliers */}
      <FeaturedSuppliers />

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-alibaba-orange to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Sourcing Today</h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            Join millions of buyers who trust our platform for their wholesale sourcing needs. Register free and start connecting with suppliers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="bg-white text-alibaba-orange px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Join as Buyer
            </Link>
            <Link to="/register" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Become a Supplier
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

