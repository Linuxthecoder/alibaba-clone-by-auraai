import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Share2, CheckCircle, Truck, Shield, MessageCircle, ChevronLeft, Minus, Plus, Award, MapPin } from 'lucide-react';
import db from '../lib/db';
import { formatPrice } from '../lib/utils';
import { useCart } from '../context/CartContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlistItems } = useCart();
  const [product, setProduct] = useState(null);
  const [supplier, setSupplier] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    const prod = db.getById('products', id);
    if (prod) {
      setProduct(prod);
      setSupplier(db.getById('suppliers', prod.supplierId));
      setReviews(db.getProductReviews(prod.id));
      setQuantity(prod.moq || 1);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500">Product not found.</p>
        <button onClick={() => navigate('/products')} className="btn-primary mt-4">
          Browse Products
        </button>
      </div>
    );
  }

  const isWishlisted = wishlistItems.some(w => w.productId === product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-alibaba-orange mb-4">
        <ChevronLeft size={16} /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Images */}
        <div>
          <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4">
            <img
              src={product.images?.[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/600?text=No+Image'; }}
            />
          </div>
          <div className="flex gap-2">
            {product.images?.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${selectedImage === idx ? 'border-alibaba-orange' : 'border-transparent'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
              ))}
            </div>
            <span className="text-sm text-gray-500">{product.rating} ({product.reviews} reviews)</span>
          </div>

          <div className="bg-gray-50 rounded-xl p-5 mb-6">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-bold text-alibaba-orange">{formatPrice(product.price)}</span>
              <span className="text-gray-500">/ {product.unit}</span>
            </div>
            <div className="text-sm text-gray-500">
              MOQ: <span className="font-medium text-gray-700">{product.moq} {product.unit}s</span>
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-medium text-gray-700">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(product.moq, quantity - 1))}
                className="px-3 py-2 hover:bg-gray-100"
              >
                <Minus size={16} />
              </button>
              <span className="px-4 py-2 min-w-[60px] text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 hover:bg-gray-100"
              >
                <Plus size={16} />
              </button>
            </div>
            <span className="text-sm text-gray-500">{product.unit}s</span>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button
              onClick={handleAddToCart}
              className="flex-1 btn-primary py-3 flex items-center justify-center gap-2"
            >
              <ShoppingCart size={18} /> Add to Cart
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 border-2 transition-colors ${isWishlisted ? 'border-red-500 text-red-500 bg-red-50' : 'border-gray-300 text-gray-700 hover:border-alibaba-orange hover:text-alibaba-orange'}`}
            >
              <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} /> {isWishlisted ? 'Saved' : 'Save'}
            </button>
            <button className="p-3 border-2 border-gray-300 rounded-lg hover:border-alibaba-orange hover:text-alibaba-orange transition-colors">
              <Share2 size={18} />
            </button>
          </div>

          {/* Supplier info */}
          {supplier && (
            <div className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-12 bg-gradient-to-br from-alibaba-orange to-orange-600 text-white rounded-lg flex items-center justify-center font-bold">
                  {supplier.logo}
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{supplier.name}</h4>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <MapPin size={12} /> {supplier.location}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {supplier.verified && (
                  <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    <CheckCircle size={12} /> Verified
                  </span>
                )}
                {supplier.goldSupplier && (
                  <span className="inline-flex items-center gap-1 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                    <Award size={12} /> Gold Supplier
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex gap-6">
          {['details', 'specs', 'shipping', 'reviews'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium capitalize border-b-2 transition-colors ${activeTab === tab ? 'border-alibaba-orange text-alibaba-orange' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-12">
        {activeTab === 'details' && (
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                <Shield className="text-green-600" size={24} />
                <div>
                  <div className="font-medium text-sm">Trade Assurance</div>
                  <div className="text-xs text-gray-500">Protected payments</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <Truck className="text-blue-600" size={24} />
                <div>
                  <div className="font-medium text-sm">Fast Shipping</div>
                  <div className="text-xs text-gray-500">Reliable logistics</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                <MessageCircle className="text-purple-600" size={24} />
                <div>
                  <div className="font-medium text-sm">24/7 Support</div>
                  <div className="text-xs text-gray-500">Always available</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {Object.entries(product.specs || {}).map(([key, value]) => (
                  <tr key={key} className="border-b border-gray-100 last:border-0">
                    <td className="px-6 py-3 bg-gray-50 font-medium text-gray-700 capitalize w-1/3">{key}</td>
                    <td className="px-6 py-3 text-gray-600">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h4 className="font-semibold mb-3">Shipping Methods</h4>
              <p className="text-gray-600 text-sm">{product.shipping?.method}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h4 className="font-semibold mb-3">Port</h4>
              <p className="text-gray-600 text-sm">{product.shipping?.port}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h4 className="font-semibold mb-3">Lead Time</h4>
              <p className="text-gray-600 text-sm">{product.shipping?.leadTime}</p>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            {reviews.length === 0 ? (
              <p className="text-gray-500">No reviews yet.</p>
            ) : (
              <div className="space-y-4">
                {reviews.map(review => (
                  <div key={review.id} className="bg-white rounded-xl border border-gray-100 p-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold">
                          {review.userName?.charAt(0) || 'U'}
                        </div>
                        <span className="font-medium text-sm">{review.userName}</span>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

