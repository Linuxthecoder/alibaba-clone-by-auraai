import { generateId } from './utils';

const DB_VERSION = '1.0';
const DB_KEY = 'alibaba_clone_db';
const AUTH_KEY = 'alibaba_clone_auth';

const defaultDB = {
  version: DB_VERSION,
  users: [],
  products: [],
  categories: [],
  orders: [],
  messages: [],
  rfqs: [],
  cart: [],
  wishlist: [],
  reviews: [],
  suppliers: [],
  notifications: [],
  activities: [],
};

export class Database {
  constructor() {
    this.data = this.load();
    this.init();
  }

  load() {
    try {
      const stored = localStorage.getItem(DB_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.version === DB_VERSION) return parsed;
      }
    } catch (e) {
      console.error('DB load error:', e);
    }
    return JSON.parse(JSON.stringify(defaultDB));
  }

  save() {
    try {
      localStorage.setItem(DB_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error('DB save error:', e);
    }
  }

  init() {
    this.save();
  }

  reset() {
    this.data = JSON.parse(JSON.stringify(defaultDB));
    this.save();
  }

  // Generic CRUD
  getAll(collection) {
    return this.data[collection] || [];
  }

  getById(collection, id) {
    return this.data[collection]?.find(item => item.id === id) || null;
  }

  find(collection, predicate) {
    return this.data[collection]?.filter(predicate) || [];
  }

  findOne(collection, predicate) {
    return this.data[collection]?.find(predicate) || null;
  }

  insert(collection, item) {
    if (!this.data[collection]) this.data[collection] = [];
    const newItem = { ...item, id: item.id || generateId(), createdAt: new Date().toISOString() };
    this.data[collection].push(newItem);
    this.save();
    return newItem;
  }

  update(collection, id, updates) {
    const index = this.data[collection]?.findIndex(item => item.id === id);
    if (index === -1 || index === undefined) return null;
    this.data[collection][index] = { ...this.data[collection][index], ...updates, updatedAt: new Date().toISOString() };
    this.save();
    return this.data[collection][index];
  }

  delete(collection, id) {
    const initialLength = this.data[collection]?.length || 0;
    this.data[collection] = this.data[collection]?.filter(item => item.id !== id) || [];
    this.save();
    return this.data[collection].length < initialLength;
  }

  // Auth helpers
  getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem(AUTH_KEY)) || null;
    } catch {
      return null;
    }
  }

  setCurrentUser(user) {
    if (user) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
  }

  logout() {
    localStorage.removeItem(AUTH_KEY);
  }

  // Specific helpers
  getProductsByCategory(categoryId) {
    return this.find('products', p => p.categoryId === categoryId);
  }

  getProductsBySupplier(supplierId) {
    return this.find('products', p => p.supplierId === supplierId);
  }

  getOrdersByUser(userId) {
    return this.find('orders', o => o.buyerId === userId || o.sellerId === userId);
  }

  getMessagesBetween(userId1, userId2) {
    return this.find('messages', m => 
      (m.senderId === userId1 && m.receiverId === userId2) ||
      (m.senderId === userId2 && m.receiverId === userId1)
    ).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }

  getUnreadMessages(userId) {
    return this.find('messages', m => m.receiverId === userId && !m.read);
  }

  getCart(userId) {
    return this.find('cart', c => c.userId === userId);
  }

  getWishlist(userId) {
    return this.find('wishlist', w => w.userId === userId);
  }

  getProductReviews(productId) {
    return this.find('reviews', r => r.productId === productId);
  }

  getNotifications(userId) {
    return this.find('notifications', n => n.userId === userId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  getActivities(userId) {
    return this.find('activities', a => a.userId === userId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
}

export const db = new Database();
export default db;

