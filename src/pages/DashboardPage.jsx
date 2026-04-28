import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingCart, MessageSquare, Heart, TrendingUp, DollarSign, Users, Star, Clock, ChevronRight, Bell, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import db from '../lib/db';
import { formatPrice, formatDate } from '../lib/utils';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const { wishlistItems } = useCart();
  const [activeTab, setActiveTab] = useState('overview');

  const orders = user ? db.getOrdersByUser(user.id) : [];
  const messages = user ? db.getUnreadMessages(user.id) : [];
  const notifications = user ? db.getNotifications(user.id) : [];
  const activities = user ? db.getActivities(user.id) : [];

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
  };

  const totalSpent = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-700',
      processing: 'bg-blue-100 text-blue-700',
      shipped: 'bg-purple-100 text-purple-700',
      delivered: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-24">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
              <div className="w-12 h-12 bg-alibaba-orange text-white rounded-full flex items-center justify-center text-lg font-bold">
                {user?.avatar || user?.name?.charAt(0) || 'U'}
              </div>
              <div>
                <h3 className="font-semibold text-sm">{user?.name}</h3>
                <p className="text-xs text-gray-500">{user?.company}</p>
              </div>
            </div>

            <nav className="space-y-1">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${activeTab === tab.id ? 'bg-alibaba-orange/10 text-alibaba-orange font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Icon size={18} /> {tab.label}
                  </button>
                );
              })}
            </nav>

            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors mt-6"
            >
              <LogOut size={18} /> Sign Out
            </button>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="card p-5">
                  <div className="flex items-center justify-between mb-2">
                    <Package size={20} className="text-alibaba-orange" />
                    <span className="text-xs text-gray-400">Total</span>
                  </div>
                  <div className="text-2xl font-bold">{orderStats.total}</div>
                  <div className="text-xs text-gray-500">Orders</div>
                </div>
                <div className="card p-5">
                  <div className="flex items-center justify-between mb-2">
                    <DollarSign size={20} className="text-green-600" />
                    <span className="text-xs text-gray-400">Spent</span>
                  </div>
                  <div className="text-2xl font-bold">{formatPrice(totalSpent)}</div>
                  <div className="text-xs text-gray-500">Total</div>
                </div>
                <div className="card p-5">
                  <div className="flex items-center justify-between mb-2">
                    <Heart size={20} className="text-red-500" />
                    <span className="text-xs text-gray-400">Saved</span>
                  </div>
                  <div className="text-2xl font-bold">{wishlistItems.length}</div>
                  <div className="text-xs text-gray-500">Wishlist</div>
                </div>
                <div className="card p-5">
                  <div className="flex items-center justify-between mb-2">
                    <MessageSquare size={20} className="text-blue-600" />
                    <span className="text-xs text-gray-400">New</span>
                  </div>
                  <div className="text-2xl font-bold">{messages.length}</div>
                  <div className="text-xs text-gray-500">Messages</div>
                </div>
              </div>

              {/* Recent orders */}
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Recent Orders</h3>
                  <button onClick={() => setActiveTab('orders')} className="text-sm text-alibaba-orange hover:underline flex items-center gap-1">
                    View All <ChevronRight size={14} />
                  </button>
                </div>
                {orders.length === 0 ? (
                  <p className="text-gray-500 text-sm">No orders yet.</p>
                ) : (
                  <div className="space-y-3">
                    {orders.slice(0, 5).map(order => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{order.productName}</p>
                          <p className="text-xs text-gray-500">{formatDate(order.createdAt)}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-sm">{formatPrice(order.total)}</p>
                          <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="card p-6">
              <h3 className="font-semibold text-lg mb-4">All Orders</h3>
              {orders.length === 0 ? (
                <p className="text-gray-500">No orders yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-2 font-medium text-gray-500">Product</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-500">Qty</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-500">Total</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-500">Status</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-500">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order.id} className="border-b border-gray-100 last:border-0">
                          <td className="py-3 px-2 font-medium">{order.productName}</td>
                          <td className="py-3 px-2">{order.quantity}</td>
                          <td className="py-3 px-2">{formatPrice(order.total)}</td>
                          <td className="py-3 px-2">
                            <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-gray-500">{formatDate(order.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="card p-6">
              <h3 className="font-semibold text-lg mb-4">Messages</h3>
              {messages.length === 0 ? (
                <p className="text-gray-500">No unread messages.</p>
              ) : (
                <div className="space-y-3">
                  {messages.map(msg => (
                    <div key={msg.id} className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="text-sm text-gray-700">{msg.content}</p>
                      <p className="text-xs text-gray-400 mt-1">{formatDate(msg.createdAt)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="card p-6">
              <h3 className="font-semibold text-lg mb-4">Wishlist</h3>
              {wishlistItems.length === 0 ? (
                <p className="text-gray-500">Your wishlist is empty.</p>
              ) : (
                <div className="space-y-3">
                  {wishlistItems.map(item => (
                    <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <img src={item.productImage} alt="" className="w-16 h-16 object-cover rounded-lg" />
                      <div className="flex-1">
                        <Link to={`/products/${item.productId}`} className="font-medium text-sm hover:text-alibaba-orange">
                          {item.productName}
                        </Link>
                        <p className="text-sm text-alibaba-orange font-semibold">{formatPrice(item.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="card p-6">
              <h3 className="font-semibold text-lg mb-4">Profile Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" defaultValue={user?.name} className="input-field" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" defaultValue={user?.email} className="input-field" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input type="text" defaultValue={user?.company} className="input-field" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input type="text" defaultValue={user?.location} className="input-field" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input type="text" defaultValue={user?.phone} className="input-field" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <input type="text" defaultValue={user?.role} className="input-field capitalize" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                  <input type="text" defaultValue={user?.memberSince} className="input-field" readOnly />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

