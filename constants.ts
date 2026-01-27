import { MenuItem } from './types';

// PepeBetos Menu - Real menu from their restaurant
export const PEPEBETOS_MENU: MenuItem[] = [
  // Botanas / Shareables
  { id: '1', name: 'Queso Dip', price: 6.00, category: 'Botanas', image: '🧀' },
  { id: '2', name: "Beto's Nachos", price: 12.00, category: 'Botanas', image: '🌮' },
  { id: '3', name: 'Street Corn (Elote)', price: 6.00, category: 'Botanas', image: '🌽' },
  { id: '4', name: 'Guacamole', price: 8.00, category: 'Botanas', image: '🥑' },
  
  // Tacos - Most Popular
  { id: '5', name: 'Quesabirrias (3)', price: 18.00, category: 'Tacos', image: '🌮' },
  { id: '6', name: 'Taco Carne Asada', price: 4.50, category: 'Tacos', image: '🌮' },
  { id: '7', name: 'Cochinita Pibil Tacos', price: 4.50, category: 'Tacos', image: '🌮' },
  { id: '8', name: 'Carnitas Tacos', price: 4.50, category: 'Tacos', image: '🌮' },
  { id: '9', name: 'Birria Tacos (3)', price: 16.00, category: 'Tacos', image: '🌮' },
  
  // From The Grill
  { id: '10', name: 'Happy Plate', price: 16.00, category: 'From The Grill', image: '🥩' },
  { id: '11', name: 'Chicken Fajitas', price: 18.00, category: 'From The Grill', image: '🍗' },
  { id: '12', name: 'Steak Fajitas', price: 20.00, category: 'From The Grill', image: '🥩' },
  { id: '13', name: 'Shrimp Fajitas', price: 22.00, category: 'From The Grill', image: '🍤' },
  { id: '14', name: 'Parrillada (For Two)', price: 45.00, category: 'From The Grill', image: '🍖' },
  { id: '15', name: 'Carnitas Plate', price: 16.00, category: 'From The Grill', image: '🍖' },
  
  // Seafood
  { id: '16', name: 'Camarones al Ajo', price: 18.00, category: 'Seafood', image: '🍤' },
  { id: '17', name: 'Fish Tacos (3)', price: 14.00, category: 'Seafood', image: '🐟' },
  { id: '18', name: 'Shrimp Cocktail', price: 16.00, category: 'Seafood', image: '🍤' },
  
  // Enchiladas
  { id: '19', name: 'Enchiladas Bandera', price: 14.00, category: 'Enchiladas', image: '🫔' },
  { id: '20', name: 'Enchiladas Verdes', price: 13.00, category: 'Enchiladas', image: '🫔' },
  { id: '21', name: 'Enchiladas Rojas', price: 13.00, category: 'Enchiladas', image: '🫔' },
  
  // Burritos
  { id: '22', name: 'Fajita Burrito', price: 14.00, category: 'Burritos', image: '🌯' },
  { id: '23', name: 'Chimichanga', price: 13.00, category: 'Burritos', image: '🌯' },
  { id: '24', name: 'Wet Burrito', price: 14.00, category: 'Burritos', image: '🌯' },
  
  // Quesadillas
  { id: '25', name: 'Fajita Quesadilla', price: 16.00, category: 'Quesadillas', image: '🫓' },
  { id: '26', name: 'Cheese Quesadilla', price: 10.00, category: 'Quesadillas', image: '🫓' },
  
  // Specialties
  { id: '27', name: 'Chile Poblano', price: 15.00, category: 'Specialties', image: '🌶️' },
  { id: '28', name: 'Torta Loca', price: 12.00, category: 'Specialties', image: '🥪' },
  { id: '29', name: 'Fajita Taco Salad', price: 13.00, category: 'Salads', image: '🥗' },
  
  // Kids Menu
  { id: '30', name: 'Kids Taco Plate', price: 7.00, category: 'Kids', image: '🌮' },
  { id: '31', name: 'Kids Quesadilla', price: 7.00, category: 'Kids', image: '🫓' },
  { id: '32', name: 'Chicken Tenders', price: 7.00, category: 'Kids', image: '🍗' },
  
  // Sides
  { id: '33', name: 'Mexican Rice', price: 3.00, category: 'Sides', image: '🍚' },
  { id: '34', name: 'Refried Beans', price: 3.00, category: 'Sides', image: '🫘' },
  { id: '35', name: 'French Fries', price: 3.00, category: 'Sides', image: '🍟' },
  { id: '36', name: 'Tortillas (3)', price: 1.50, category: 'Sides', image: '🫓' },
  
  // Desserts - Homemade with Love
  { id: '37', name: 'Nutella Banana Cheesecake Chimichanga', price: 8.00, category: 'Desserts', image: '🍰' },
  { id: '38', name: 'Flan', price: 6.00, category: 'Desserts', image: '🍮' },
  { id: '39', name: 'Churros', price: 6.00, category: 'Desserts', image: '🍩' },
  { id: '40', name: 'Sopapillas', price: 5.00, category: 'Desserts', image: '🥐' },
  
  // Beverages
  { id: '41', name: 'Margarita on the Rocks', price: 8.00, category: 'Drinks', image: '🍹' },
  { id: '42', name: 'Frozen Margarita', price: 8.00, category: 'Drinks', image: '🍹' },
  { id: '43', name: 'Modelo Draft', price: 5.00, category: 'Drinks', image: '🍺' },
  { id: '44', name: 'Mexican Soda', price: 3.00, category: 'Drinks', image: '🥤' },
  { id: '45', name: 'Horchata', price: 3.50, category: 'Drinks', image: '🥛' },
  { id: '46', name: 'Fountain Drink', price: 2.50, category: 'Drinks', image: '🥤' },
];

// Default demo menu for other tenants
export const MENU_ITEMS: MenuItem[] = [
  { id: '1', name: 'Classic Burger', price: 12.99, category: 'Burgers', image: '🍔' },
  { id: '2', name: 'Cheeseburger', price: 13.99, category: 'Burgers', image: '🍔' },
  { id: '3', name: 'Caesar Salad', price: 9.99, category: 'Salads', image: '🥗' },
  { id: '4', name: 'French Fries', price: 4.99, category: 'Sides', image: '🍟' },
  { id: '5', name: 'Onion Rings', price: 5.99, category: 'Sides', image: '🧅' },
  { id: '6', name: 'Grilled Chicken', price: 15.99, category: 'Entrees', image: '🍗' },
  { id: '7', name: 'Steak', price: 24.99, category: 'Entrees', image: '🥩' },
  { id: '8', name: 'Fish & Chips', price: 14.99, category: 'Seafood', image: '🐟' },
  { id: '9', name: 'Pasta Alfredo', price: 13.99, category: 'Pasta', image: '🍝' },
  { id: '10', name: 'Margherita Pizza', price: 11.99, category: 'Pizza', image: '🍕' },
  { id: '11', name: 'Chocolate Cake', price: 6.99, category: 'Desserts', image: '🍰' },
  { id: '12', name: 'Ice Cream', price: 4.99, category: 'Desserts', image: '🍦' },
  { id: '13', name: 'Soda', price: 2.99, category: 'Drinks', image: '🥤' },
  { id: '14', name: 'Coffee', price: 3.49, category: 'Drinks', image: '☕' },
  { id: '15', name: 'Iced Tea', price: 2.99, category: 'Drinks', image: '🧋' },
];

// PepeBetos restaurant info
export const PEPEBETOS_INFO = {
  id: 'pepebetos-001',
  name: 'Pepe Betos Mexican Kitchen & Cantina',
  slug: 'pepebetos',
  address: '1102 Carter St, Vidalia, LA 71373',
  phone: '(318) 414-3053',
  hours: {
    sunday: '11:00 AM - 7:40 PM',
    monday: '11:00 AM - 8:40 PM',
    tuesday: '11:00 AM - 8:40 PM',
    wednesday: '11:00 AM - 8:40 PM',
    thursday: '11:00 AM - 8:40 PM',
    friday: '11:00 AM - 9:40 PM',
    saturday: '11:00 AM - 9:40 PM'
  },
  branding: {
    primaryColor: '#D32F2F', // Mexican Red
    secondaryColor: '#FFA000', // Gold/Yellow
    accentColor: '#388E3C' // Green
  }
};

export const CATEGORIES = ['All', 'Burgers', 'Salads', 'Sides', 'Entrees', 'Seafood', 'Pasta', 'Pizza', 'Desserts', 'Drinks'];

export const PEPEBETOS_CATEGORIES = [
  'All',
  'Botanas',
  'Tacos',
  'From The Grill',
  'Seafood',
  'Enchiladas',
  'Burritos',
  'Quesadillas',
  'Specialties',
  'Salads',
  'Kids',
  'Sides',
  'Desserts',
  'Drinks'
];

// Seat configuration
export const SEATS = [
  { id: '1', label: 'Seat 1', icon: '1️⃣' },
  { id: '2', label: 'Seat 2', icon: '2️⃣' },
  { id: '3', label: 'Seat 3', icon: '3️⃣' },
  { id: '4', label: 'Seat 4', icon: '4️⃣' },
  { id: '5', label: 'Seat 5', icon: '5️⃣' },
  { id: '6', label: 'Seat 6', icon: '6️⃣' },
];

// Mock tables data
export const TABLES = [
  { id: '1', number: '1', status: 'available' as const },
  { id: '2', number: '2', status: 'occupied' as const, guests: 4, time: '25m', amount: 45.50, server: 'Sarah' },
  { id: '3', number: '3', status: 'available' as const },
  { id: '4', number: '4', status: 'occupied' as const, guests: 2, time: '12m', amount: 23.00, server: 'Mike' },
  { id: '5', number: '5', status: 'order-ready' as const, guests: 6, time: '45m', amount: 98.75, server: 'Sarah' },
  { id: '6', number: '6', status: 'available' as const },
  { id: '7', number: '7', status: 'pay-requested' as const, guests: 3, time: '58m', amount: 67.25, server: 'Mike' },
  { id: '8', number: '8', status: 'available' as const },
  { id: '9', number: '9', status: 'occupied' as const, guests: 2, time: '8m', amount: 15.00, server: 'Emma' },
  { id: '10', number: '10', status: 'cleaning' as const },
];

// Mock tenants data for admin dashboard
export const MOCK_TENANTS = [
  {
    id: 'pepebetos-001',
    name: 'Pepe Betos Mexican Kitchen & Cantina',
    owner: 'Pepe Betos Management',
    email: 'info@pepebetos.com',
    status: 'active' as const,
    mrr: 199,
    joinedDate: '2026-01-24'
  },
  {
    id: 'demo-restaurant',
    name: 'Demo Restaurant',
    owner: 'John Smith',
    email: 'john@demo.com',
    status: 'active' as const,
    mrr: 99,
    joinedDate: '2026-01-15'
  },
  {
    id: 'pizza-palace',
    name: 'Pizza Palace',
    owner: 'Maria Garcia',
    email: 'maria@pizzapalace.com',
    status: 'active' as const,
    mrr: 149,
    joinedDate: '2026-01-10'
  }
];

// Mock KDS (Kitchen Display System) orders
export const KDS_ORDERS = [
  {
    id: '1',
    table: '5',
    mode: 'Dine In',
    timer: '12:34',
    status: 'fresh' as const,
    items: [
      { name: 'Chicken Fajitas', qty: 2, mods: ['No onions', 'Extra cheese'] },
      { name: 'Steak Burrito', qty: 1, mods: ['Medium rare'] },
    ]
  },
  {
    id: '2',
    table: '2',
    mode: 'Dine In',
    timer: '08:15',
    status: 'warning' as const,
    items: [
      { name: 'Quesabirrias', qty: 3, mods: [] },
      { name: 'Street Corn', qty: 2, mods: [] },
    ]
  },
  {
    id: '3',
    table: 'Bar',
    mode: 'Takeout',
    timer: '15:42',
    status: 'critical' as const,
    items: [
      { name: 'Happy Plate', qty: 1, mods: ['NO BEANS'], alert: 'ALLERGY' },
    ]
  }
];
