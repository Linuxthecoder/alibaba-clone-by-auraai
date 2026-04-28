import React from 'react';
import { Link } from 'react-router-dom';
import { Cog, Smartphone, Shirt, Home, Sparkles, Dumbbell, Car, Package } from 'lucide-react';

const iconMap = {
  Cog, Smartphone, Shirt, Home, Sparkles, Dumbbell, Car, Package
};

export default function CategoryGrid() {
  const categories = [
    { id: 'cat-machinery', name: 'Machinery', icon: 'Cog', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400' },
    { id: 'cat-consumer', name: 'Consumer Electronics', icon: 'Smartphone', image: 'https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?w=400' },
    { id: 'cat-apparel', name: 'Apparel & Textiles', icon: 'Shirt', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400' },
    { id: 'cat-home', name: 'Home & Garden', icon: 'Home', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400' },
    { id: 'cat-beauty', name: 'Beauty & Personal Care', icon: 'Sparkles', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400' },
    { id: 'cat-sports', name: 'Sports & Entertainment', icon: 'Dumbbell', image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400' },
    { id: 'car-auto', name: 'Automobiles & Motorcycles', icon: 'Car', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400' },
    { id: 'cat-packaging', name: 'Packaging & Printing', icon: 'Package', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400' },
  ];

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="section-title">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const IconComp = iconMap[cat.icon] || Package;
            return (
              <Link
                key={cat.id}
                to={`/products?category=${cat.id}`}
                className="group relative overflow-hidden rounded-xl aspect-[4/3] bg-gray-100"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=Category'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="flex items-center gap-2">
                    <IconComp size={20} />
                    <span className="font-semibold text-sm">{cat.name}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

