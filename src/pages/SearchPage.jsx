import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import db from '../lib/db';
import ProductCard from '../components/ProductCard';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [searchInput, setSearchInput] = useState(query);
  const [sortBy, setSortBy] = useState('relevance');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    const allProducts = db.getAll('products');
    const allSuppliers = db.getAll('suppliers');

    if (!query.trim()) {
      setResults([]);
      setSuppliers([]);
      return;
    }

    const lowerQuery = query.toLowerCase();

    const productResults = allProducts.filter(p =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description?.toLowerCase().includes(lowerQuery) ||
      p.categoryId?.toLowerCase().includes(lowerQuery)
    );

    const supplierResults = allSuppliers.filter(s =>
      s.name.toLowerCase().includes(lowerQuery) ||
      s.location?.toLowerCase().includes(lowerQuery)
    );

    if (sortBy === 'price-low') productResults.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') productResults.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') productResults.sort((a, b) => b.rating - a.rating);

    setResults(productResults);
    setSuppliers(supplierResults);
  }, [query, sortBy]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() });
    }
  };

  const displayedProducts = filterType === 'suppliers' ? [] : results;
  const displayedSuppliers = filterType === 'products' ? [] : suppliers;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search header */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex max-w-2xl">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search products, suppliers..."
            className="flex-1 px-4 py-3 border-2 border-alibaba-orange rounded-l-lg focus:outline-none"
          />
          <button type="submit" className="bg-alibaba-orange hover:bg-orange-700 text-white px-8 py-3 rounded-r-lg font-semibold transition-colors flex items-center gap-2">
            <Search size={18} /> Search
          </button>
        </form>
      </div>

      {!query ? (
        <div className="text-center py-16">
          <Search size={48} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">Enter a search term</h2>
          <p className="text-gray-500 mt-2">Search for products, categories, or suppliers</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Results for "{query}"
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {displayedProducts.length} products, {displayedSuppliers.length} suppliers found
              </p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-alibaba-orange"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>

              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-3 py-2 text-sm ${filterType === 'all' ? 'bg-alibaba-orange text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterType('products')}
                  className={`px-3 py-2 text-sm ${filterType === 'products' ? 'bg-alibaba-orange text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  Products
                </button>
                <button
                  onClick={() => setFilterType('suppliers')}
                  className={`px-3 py-2 text-sm ${filterType === 'suppliers' ? 'bg-alibaba-orange text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  Suppliers
                </button>
              </div>
            </div>
          </div>

          {/* Products */}
          {(filterType === 'all' || filterType === 'products') && displayedProducts.length > 0 && (
            <div className="mb-10">
              <h2 className="text-lg font-semibold mb-4">Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}

          {/* Suppliers */}
          {(filterType === 'all' || filterType === 'suppliers') && displayedSuppliers.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Suppliers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedSuppliers.map(supplier => (
                  <div key={supplier.id} className="card p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-alibaba-orange to-orange-600 text-white rounded-lg flex items-center justify-center font-bold">
                        {supplier.logo}
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{supplier.name}</h3>
                        <p className="text-xs text-gray-500">{supplier.location}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-sm mb-3">
                      <div className="bg-gray-50 rounded p-2">
                        <div className="font-semibold">{supplier.rating}</div>
                        <div className="text-xs text-gray-500">Rating</div>
                      </div>
                      <div className="bg-gray-50 rounded p-2">
                        <div className="font-semibold">{supplier.years}y</div>
                        <div className="text-xs text-gray-500">Experience</div>
                      </div>
                      <div className="bg-gray-50 rounded p-2">
                        <div className="font-semibold">{supplier.responseRate}%</div>
                        <div className="text-xs text-gray-500">Response</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {supplier.goldSupplier && (
                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Gold</span>
                      )}
                      {supplier.verified && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Verified</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {displayedProducts.length === 0 && displayedSuppliers.length === 0 && (
            <div className="text-center py-16">
              <X size={48} className="mx-auto text-gray-300 mb-4" />
              <h2 className="text-xl font-semibold text-gray-700">No results found</h2>
              <p className="text-gray-500 mt-2">Try different keywords or browse categories</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

