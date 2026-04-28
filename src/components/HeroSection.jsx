import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Truck, Headphones, Award } from 'lucide-react';
import SearchBar from './SearchBar';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-alibaba-dark via-gray-900 to-alibaba-dark text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 relative">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Global B2B Marketplace for
            <span className="text-alibaba-orange"> Wholesale Trade</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Connect with verified manufacturers and suppliers. Source millions of products at factory prices.
          </p>
          <div className="flex justify-center mb-10">
            <SearchBar large />
          </div>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link to="/products" className="btn-primary flex items-center gap-2">
              Browse Products <ArrowRight size={18} />
            </Link>
            <Link to="/register" className="btn-secondary text-white border-white/30 hover:bg-white hover:text-alibaba-dark">
              Start Selling
            </Link>
          </div>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
            <Shield size={32} className="text-alibaba-orange mb-2" />
            <span className="font-semibold">Verified Suppliers</span>
            <span className="text-sm text-gray-400">100% authenticated</span>
          </div>
          <div className="flex flex-center flex-col items-center text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
            <Truck size={32} className="text-alibaba-orange mb-2" />
            <span className="font-semibold">Global Shipping</span>
            <span className="text-sm text-gray-400">To 190+ countries</span>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
            <Headphones size={32} className="text-alibaba-orange mb-2" />
            <span className="font-semibold">24/7 Support</span>
            <span className="text-sm text-gray-400">Expert assistance</span>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
            <Award size={32} className="text-alibaba-orange mb-2" />
            <span className="font-semibold">Trade Assurance</span>
            <span className="text-sm text-gray-400">Order protection</span>
          </div>
        </div>
      </div>
    </section>
  );
}

