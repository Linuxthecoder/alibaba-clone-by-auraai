import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, CheckCircle } from 'lucide-react';
import { formatPrice } from '../lib/utils';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlistItems } = useCart();
  const isWishlisted = wishlistItems.some(w => w.productId === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="card group overflow-hidden">
      <Link to={`/products/${product.id}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'; }}
          />
          {product.featured && (
            <span className="absolute top-2 left-2 bg-alibaba-orange text-white text-xs font-semibold px-2 py-1 rounded">
              Featured
            </span>
          )}
          {product.trending && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
              Hot
            </span>
          )}
          <button
            onClick={handleToggleWishlist}
            className={`absolute bottom-2 right-2 p-2 rounded-full shadow-md transition-colors ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-400 hover:text-red-500'}`}
          >
            <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 hover:text-alibaba-orange transition-colors text-sm">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-lg font-bold text-alibaba-orange">{formatPrice(product.price)}</span>
          <span className="text-xs text-gray-400">/ {product.unit}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            MOQ: <span className="font-medium">{product.moq} {product.unit}s</span>
          </div>
          <button
            onClick={handleAddToCart}
            className="p-2 bg-alibaba-orange/10 text-alibaba-orange rounded-lg hover:bg-alibaba-orange hover:text-white transition-colors"
            title="Add to cart"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

