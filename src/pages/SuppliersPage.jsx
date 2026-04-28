import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, MapPin, Award, CheckCircle, TrendingUp, Filter, ChevronDown } from 'lucide-react';
import db from '../lib/db';

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVerified, setFilterVerified] = useState(false);
  const [filterGold, setFilterGold] = useState(false);
  const [sortBy, setSortBy] = useState('rating');

  useEffect(() => {
    setSuppliers(db.getAll('suppliers'));
  }, []);

  const filteredSuppliers = suppliers
    .filter(s => !searchQuery || s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.location.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(s => !filterVerified || s.verified)
    .filter(s => !filterGold || s.goldSupplier)
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'transactions') return b.transactions - a.transactions;
      if (sortBy === 'years') return b.years - a.years;
      if (sortBy === 'response') return b.responseRate - a.responseRate;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Verified Suppliers</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Connect with trusted manufacturers and wholesalers from around the world. All suppliers are verified for quality and reliability.
        </p>
      </div>

      {/* Search & filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search suppliers by name or location..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-alibaba-orange"
            />
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-alibaba-orange"
            >
              <option value="rating">Highest Rated</option>
              <option value="transactions">Most Transactions</option>
              <option value="years">Most Experienced</option>
              <option value="response">Best Response</option>
            </select>
            <label className="flex items-center gap-2 px-3 py-2.5 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 text-sm">
              <input
                type="checkbox"
                checked={filterVerified}
                onChange={(e) => setFilterVerified(e.target.checked)}
                className="rounded text-alibaba-orange"
              />
              <CheckCircle size={14} /> Verified
            </label>
            <label className="flex items-center gap-2 px-3 py-2.5 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 text-sm">
              <input
                type="checkbox"
                checked={filterGold}
                onChange={(e) => setFilterGold(e.target.checked)}
                className="rounded text-alibaba-orange"
              />
              <Award size={14} /> Gold
            </label>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-alibaba-orange">{suppliers.length}</div>
          <div className="text-xs text-gray-500">Total Suppliers</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{suppliers.filter(s => s.verified).length}</div>
          <div className="text-xs text-gray-500">Verified</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">{suppliers.filter(s => s.goldSupplier).length}</div>
          <div className="text-xs text-gray-500">Gold Suppliers</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {suppliers.reduce((sum, s) => sum + s.transactions, 0).toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">Total Transactions</div>
        </div>
      </div>

      {/* Supplier grid */}
      {filteredSuppliers.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500">No suppliers match your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSuppliers.map(supplier => (
            <div key={supplier.id} className="card p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-alibaba-orange to-orange-600 text-white rounded-xl flex items-center justify-center text-xl font-bold shadow-sm">
                    {supplier.logo}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{supplier.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <MapPin size={14} /> {supplier.location}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center gap-1 text-lg font-bold">
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                    {supplier.rating}
                  </div>
                  <div className="text-xs text-gray-500">Rating</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold">{supplier.transactions.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Transactions</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold">{supplier.years}y</div>
                  <div className="text-xs text-gray-500">Experience</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold">{supplier.responseRate}%</div>
                  <div className="text-xs text-gray-500">Response</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {supplier.goldSupplier && (
                  <span className="inline-flex items-center gap-1 text-xs bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-full font-medium">
                    <Award size={12} /> Gold Supplier
                  </span>
                )}
                {supplier.verified && (
                  <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-medium">
                    <CheckCircle size={12} /> Verified
                  </span>
                )}
              </div>

              <button className="w-full py-2.5 border-2 border-alibaba-orange text-alibaba-orange rounded-lg font-medium hover:bg-alibaba-orange hover:text-white transition-colors">
                Contact Supplier
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

