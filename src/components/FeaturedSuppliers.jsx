import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Award, TrendingUp, CheckCircle } from 'lucide-react';
import db from '../lib/db';

export default function FeaturedSuppliers() {
  const suppliers = db.getAll('suppliers').slice(0, 4);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title mb-0">Featured Suppliers</h2>
          <Link to="/suppliers" className="text-alibaba-orange font-medium hover:underline flex items-center gap-1">
            View All <TrendingUp size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {suppliers.map((supplier) => (
            <div key={supplier.id} className="card p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-alibaba-orange to-orange-600 text-white rounded-lg flex items-center justify-center text-lg font-bold">
                  {supplier.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate">{supplier.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin size={12} /> {supplier.location}
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-medium">{supplier.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Transactions</span>
                  <span className="font-medium">{supplier.transactions.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Response</span>
                  <span className="font-medium">{supplier.responseRate}%</span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                {supplier.goldSupplier && (
                  <span className="inline-flex items-center gap-1 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                    <Award size={12} /> Gold
                  </span>
                )}
                {supplier.verified && (
                  <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    <CheckCircle size={12} /> Verified
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

