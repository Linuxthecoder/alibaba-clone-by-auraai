import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-alibaba-dark text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <div className="text-2xl font-bold text-white mb-4">
              Alibaba<span className="text-alibaba-orange">Clone</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Global B2B marketplace connecting buyers with verified suppliers worldwide. Find quality products at factory prices.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail size={14} /> support@alibabaclone.com
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} /> +1 800-123-4567
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} /> New York, USA
              </div>
            </div>
          </div>

          {/* Buyer links */}
          <div>
            <h4 className="text-white font-semibold mb-4">For Buyers</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products" className="hover:text-alibaba-orange transition-colors">Browse Products</Link></li>
              <li><Link to="/suppliers" className="hover:text-alibaba-orange transition-colors">Find Suppliers</Link></li>
              <li><Link to="/search" className="hover:text-alibaba-orange transition-colors">Search RFQs</Link></li>
              <li><Link to="/register" className="hover:text-alibaba-orange transition-colors">Register as Buyer</Link></li>
            </ul>
          </div>

          {/* Supplier links */}
          <div>
            <h4 className="text-white font-semibold mb-4">For Suppliers</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/register" className="hover:text-alibaba-orange transition-colors">Join as Supplier</Link></li>
              <li><Link to="/dashboard" className="hover:text-alibaba-orange transition-colors">Seller Dashboard</Link></li>
              <li><span className="hover:text-alibaba-orange transition-colors cursor-pointer">Advertising</span></li>
              <li><span className="hover:text-alibaba-orange transition-colors cursor-pointer">Verification</span></li>
            </ul>
          </div>

          {/* Help & social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Help & Support</h4>
            <ul className="space-y-2 text-sm mb-6">
              <li><span className="hover:text-alibaba-orange transition-colors cursor-pointer">Help Center</span></li>
              <li><span className="hover:text-alibaba-orange transition-colors cursor-pointer">Safety & Security</span></li>
              <li><span className="hover:text-alibaba-orange transition-colors cursor-pointer">Privacy Policy</span></li>
              <li><span className="hover:text-alibaba-orange transition-colors cursor-pointer">Terms of Service</span></li>
            </ul>
            <div className="flex items-center gap-4">
              <Globe size={20} className="hover:text-alibaba-orange cursor-pointer" />
              <Facebook size={20} className="hover:text-alibaba-orange cursor-pointer" />
              <Twitter size={20} className="hover:text-alibaba-orange cursor-pointer" />
              <Linkedin size={20} className="hover:text-alibaba-orange cursor-pointer" />
              <Instagram size={20} className="hover:text-alibaba-orange cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
          <p> Alibaba Clone. All rights reserved. This is a demo project.</p>
        </div>
      </div>
    </footer>
  );
}

