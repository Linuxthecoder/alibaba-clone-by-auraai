import { generateId } from './utils';
import db from './db';

export const categories = [
  { id: 'cat-machinery', name: 'Machinery', icon: 'Cog', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400', subcategories: ['Construction Machinery', 'Agricultural Machinery', 'Machine Tools'] },
  { id: 'cat-consumer', name: 'Consumer Electronics', icon: 'Smartphone', image: 'https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?w=400', subcategories: ['Mobile Phones', 'Computer Hardware', 'Home Audio'] },
  { id: 'cat-apparel', name: 'Apparel & Textiles', icon: 'Shirt', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400', subcategories: ['Mens Clothing', 'Womens Clothing', 'Fabrics'] },
  { id: 'cat-home', name: 'Home & Garden', icon: 'Home', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', subcategories: ['Furniture', 'Kitchen', 'Lighting'] },
  { id: 'cat-beauty', name: 'Beauty & Personal Care', icon: 'Sparkles', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400', subcategories: ['Skincare', 'Makeup', 'Hair Care'] },
  { id: 'cat-sports', name: 'Sports & Entertainment', icon: 'Dumbbell', image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400', subcategories: ['Fitness Equipment', 'Outdoor Sports', 'Team Sports'] },
  { id: 'car-auto', name: 'Automobiles & Motorcycles', icon: 'Car', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400', subcategories: ['Auto Parts', 'Motorcycles', 'Car Care'] },
  { id: 'cat-packaging', name: 'Packaging & Printing', icon: 'Package', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400', subcategories: ['Packaging Boxes', 'Bags', 'Labels'] },
];

export const suppliers = [
  { id: 'sup-1', name: 'Zhejiang Tech Industries Co., Ltd.', location: 'Hangzhou, China', verified: true, goldSupplier: true, years: 12, responseRate: 95, rating: 4.8, transactions: 3420, logo: 'ZT' },
  { id: 'sup-2', name: 'Guangdong Sunrise Electronics', location: 'Shenzhen, China', verified: true, goldSupplier: true, years: 8, responseRate: 88, rating: 4.6, transactions: 1890, logo: 'GS' },
  { id: 'sup-3', name: 'Shanghai Global Textiles', location: 'Shanghai, China', verified: true, goldSupplier: false, years: 5, responseRate: 92, rating: 4.5, transactions: 760, logo: 'SG' },
  { id: 'sup-4', name: 'Dongguan Precision Machinery', location: 'Dongguan, China', verified: true, goldSupplier: true, years: 15, responseRate: 97, rating: 4.9, transactions: 5600, logo: 'DP' },
  { id: 'sup-5', name: 'Jiangsu Home Products Ltd.', location: 'Nanjing, China', verified: false, goldSupplier: true, years: 6, responseRate: 85, rating: 4.3, transactions: 430, logo: 'JH' },
  { id: 'sup-6', name: 'Shenzhen Future Hardware', location: 'Shenzhen, China', verified: true, goldSupplier: true, years: 10, responseRate: 93, rating: 4.7, transactions: 2100, logo: 'SF' },
  { id: 'sup-7', name: 'Ningbo Auto Parts Factory', location: 'Ningbo, China', verified: true, goldSupplier: false, years: 9, responseRate: 90, rating: 4.4, transactions: 1200, logo: 'NA' },
  { id: 'sup-8', name: 'Yiwu Packaging Solutions', location: 'Yiwu, China', verified: true, goldSupplier: true, years: 7, responseRate: 94, rating: 4.6, transactions: 3100, logo: 'YP' },
];

const productImages = [
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600',
  'https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=600',
  'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=600',
  'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=600',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
  'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
  'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600',
  'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600',
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600',
  'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600',
  'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600',
  'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600',
  'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600',
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600',
  'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600',
  'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=600',
  'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600',
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600',
  'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600',
  'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600',
  'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=600',
  'https://images.unsplash.com/photo-1564466021188-1e17010c5352?w=600',
  'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600',
  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600',
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600',
  'https://images.unsplash.com/photo-1503602642458-232111445657?w=600',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
];

const productTemplates = [
  { name: 'Industrial CNC Milling Machine', categoryId: 'cat-machinery', price: 45000, moq: 1, unit: 'Set', specs: { power: '7.5KW', voltage: '380V', weight: '2800kg' } },
  { name: 'Hydraulic Press Brake Machine', categoryId: 'cat-machinery', price: 12000, moq: 1, unit: 'Set', specs: { power: '5.5KW', voltage: '380V', weight: '4500kg' } },
  { name: 'Automatic Laser Cutting Machine', categoryId: 'cat-machinery', price: 28000, moq: 1, unit: 'Set', specs: { power: '3KW', voltage: '220V', weight: '1500kg' } },
  { name: '5G Android Smartphone 256GB', categoryId: 'cat-consumer', price: 189, moq: 50, unit: 'Piece', specs: { screen: '6.7"', battery: '5000mAh', camera: '108MP' } },
  { name: 'Wireless Bluetooth Earbuds Pro', categoryId: 'cat-consumer', price: 12.5, moq: 100, unit: 'Piece', specs: { battery: '30hrs', version: 'BT 5.3', waterproof: 'IPX5' } },
  { name: '15.6" Gaming Laptop i7 RTX4060', categoryId: 'cat-consumer', price: 899, moq: 10, unit: 'Piece', specs: { ram: '16GB', storage: '512GB SSD', display: '144Hz' } },
  { name: 'Organic Cotton T-Shirt Wholesale', categoryId: 'cat-apparel', price: 3.5, moq: 500, unit: 'Piece', specs: { material: '100% Cotton', weight: '180gsm', sizes: 'S-XXL' } },
  { name: 'Custom Embroidered Baseball Cap', categoryId: 'cat-apparel', price: 2.8, moq: 300, unit: 'Piece', specs: { material: 'Cotton/Poly', size: 'Adjustable', colors: '12 options' } },
  { name: 'Women\'s Summer Floral Dress', categoryId: 'cat-apparel', price: 8.9, moq: 100, unit: 'Piece', specs: { material: 'Chiffon', sizes: 'XS-XL', styles: '5 designs' } },
  { name: 'Modern Sectional Sofa Set', categoryId: 'cat-home', price: 650, moq: 5, unit: 'Set', specs: { material: 'Linen/Fabric', seats: '5-6', color: 'Grey/Beige' } },
  { name: 'LED Smart Ceiling Light', categoryId: 'cat-home', price: 25, moq: 50, unit: 'Piece', specs: { wattage: '48W', control: 'App/Voice', color: 'RGB+CCT' } },
  { name: 'Kitchen Ceramic Cookware Set', categoryId: 'cat-home', price: 45, moq: 20, unit: 'Set', specs: { pieces: '12pc', material: 'Ceramic', coating: 'Non-stick' } },
  { name: 'Anti-Aging Vitamin C Serum', categoryId: 'cat-beauty', price: 4.5, moq: 200, unit: 'Piece', specs: { volume: '30ml', ingredients: 'Vitamin C, HA', type: 'Serum' } },
  { name: 'Professional Hair Dryer 2000W', categoryId: 'cat-beauty', price: 18, moq: 50, unit: 'Piece', specs: { power: '2000W', speed: '3 levels', ions: 'Negative' } },
  { name: 'Adjustable Dumbbell Set 40kg', categoryId: 'cat-sports', price: 120, moq: 10, unit: 'Set', specs: { weight: '5-40kg', material: 'Cast Iron', plates: '16pcs' } },
  { name: 'Yoga Mat Exercise Mat TPE', categoryId: 'cat-sports', price: 7.5, moq: 100, unit: 'Piece', specs: { thickness: '6mm', material: 'TPE', size: '183x61cm' } },
  { name: 'Electric Mountain Bike 750W', categoryId: 'car-auto', price: 580, moq: 5, unit: 'Piece', specs: { motor: '750W', battery: '48V 15Ah', range: '60km' } },
  { name: 'Car LED Headlight Bulbs H7', categoryId: 'car-auto', price: 8.5, moq: 100, unit: 'Pair', specs: { lumens: '12000LM', wattage: '60W', lifespan: '50000hrs' } },
  { name: 'Kraft Paper Gift Boxes Custom', categoryId: 'cat-packaging', price: 0.45, moq: 1000, unit: 'Piece', specs: { material: 'Kraft Paper', size: 'Custom', print: 'CMYK' } },
  { name: 'Reusable Non-Woven Shopping Bag', categoryId: 'cat-packaging', price: 0.35, moq: 2000, unit: 'Piece', specs: { material: 'Non-woven', size: '40x35x10cm', print: 'Screen' } },
];

export function generateProducts() {
  const products = [];
  productTemplates.forEach((template, idx) => {
    const supplier = suppliers[idx % suppliers.length];
    products.push({
      id: `prod-${idx + 1}`,
      name: template.name,
      description: `High quality ${template.name.toLowerCase()} manufactured by ${supplier.name}. Perfect for wholesale buyers looking for reliable suppliers with competitive pricing and fast shipping.`,
      categoryId: template.categoryId,
      supplierId: supplier.id,
      price: template.price,
      moq: template.moq,
      unit: template.unit,
      images: [
        productImages[idx % productImages.length],
        productImages[(idx + 5) % productImages.length],
        productImages[(idx + 10) % productImages.length],
      ],
      specs: template.specs,
      rating: (3.5 + Math.random() * 1.5).toFixed(1),
      reviews: Math.floor(Math.random() * 200) + 10,
      inStock: true,
      shipping: {
        method: 'FOB, CIF, EXW',
        port: 'Shanghai, Ningbo, Shenzhen',
        leadTime: `${Math.floor(Math.random() * 20) + 5} days`,
      },
      certifications: ['ISO9001', 'CE', 'RoHS'].slice(0, Math.floor(Math.random() * 3) + 1),
      featured: idx < 8,
      trending: idx < 4 || idx > 15,
    });
  });
  return products;
}

export function seedDatabase() {
  // Only seed if empty
  if (db.getAll('categories').length === 0) {
    categories.forEach(cat => db.insert('categories', cat));
  }
  if (db.getAll('suppliers').length === 0) {
    suppliers.forEach(sup => db.insert('suppliers', sup));
  }
  if (db.getAll('products').length === 0) {
    generateProducts().forEach(prod => db.insert('products', prod));
  }
  if (db.getAll('users').length === 0) {
    db.insert('users', {
      id: 'user-buyer-1',
      email: 'buyer@demo.com',
      password: 'demo123',
      name: 'John Smith',
      company: 'Global Imports LLC',
      role: 'buyer',
      avatar: 'JS',
      location: 'New York, USA',
      phone: '+1 555-0100',
      verified: true,
      memberSince: '2023-01-15',
    });
    db.insert('users', {
      id: 'user-seller-1',
      email: 'seller@demo.com',
      password: 'demo123',
      name: 'Li Wei',
      company: 'Zhejiang Tech Industries Co., Ltd.',
      role: 'seller',
      avatar: 'LW',
      location: 'Hangzhou, China',
      phone: '+86 138-0013-8000',
      verified: true,
      memberSince: '2022-06-10',
    });
  }
  if (db.getAll('orders').length === 0) {
    const products = db.getAll('products');
    const buyer = db.findOne('users', u => u.role === 'buyer');
    
    const orderStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    
    for (let i = 0; i < 12; i++) {
      const prod = products[i % products.length];
      const qty = Math.floor(Math.random() * 100) + prod.moq;
      db.insert('orders', {
        buyerId: buyer.id,
        sellerId: prod.supplierId,
        productId: prod.id,
        productName: prod.name,
        quantity: qty,
        unitPrice: prod.price,
        total: +(qty * prod.price).toFixed(2),
        status: orderStatuses[i % orderStatuses.length],
        shippingAddress: '123 Business Ave, New York, NY 10001',
        trackingNumber: i % 3 === 0 ? `TRK${Date.now()}${i}` : null,
      });
    }
  }
  if (db.getAll('messages').length === 0) {
    const buyer = db.findOne('users', u => u.role === 'buyer');
    const seller = db.findOne('users', u => u.role === 'seller');
    
    const messageTexts = [
      'Hi, I am interested in your products. Can you provide more details?',
      'Hello! Thank you for your inquiry. Yes, we can provide samples.',
      'What is the best price for 500 units?',
      'For 500 units, we can offer a 5% discount.',
      'Can you customize the packaging with our logo?',
      'Yes, OEM/ODM is available. There is a $200 setup fee.',
      'What is the lead time for production?',
      'Standard lead time is 15-20 days after order confirmation.',
    ];
    
    messageTexts.forEach((text, i) => {
      db.insert('messages', {
        senderId: i % 2 === 0 ? buyer.id : seller.id,
        receiverId: i % 2 === 0 ? seller.id : buyer.id,
        content: text,
        read: i < 5,
      });
    });
  }
  if (db.getAll('reviews').length === 0) {
    const products = db.getAll('products');
    const buyer = db.findOne('users', u => u.role === 'buyer');
    
    products.slice(0, 10).forEach((prod, i) => {
      db.insert('reviews', {
        productId: prod.id,
        userId: buyer.id,
        userName: buyer.name,
        rating: [4, 5, 5, 4, 5][i % 5],
        comment: ['Great quality product', 'Fast shipping, good packaging', 'Exactly as described', 'Excellent supplier, will order again', 'Good value for money'][i % 5],
      });
    });
  }
}

export default seedDatabase;

