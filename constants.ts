import { MenuItem, MenuModifier } from './types';

// ==================== MODIFIERS ====================

export const MEAT_TEMPERATURE: MenuModifier = {
    id: 'meat-temp',
    name: 'Meat Temperature',
    required: false,
    multiSelect: false,
    options: [
        { id: 'rare', name: 'Rare' },
        { id: 'medium-rare', name: 'Medium Rare' },
        { id: 'medium', name: 'Medium' },
        { id: 'medium-well', name: 'Medium Well' },
        { id: 'well-done', name: 'Well Done' }
    ]
};

export const SPICE_LEVEL: MenuModifier = {
    id: 'spice-level',
    name: 'Spice Level',
    required: false,
    multiSelect: false,
    options: [
        { id: 'mild', name: 'Mild' },
        { id: 'medium', name: 'Medium' },
        { id: 'hot', name: 'Hot' },
        { id: 'extra-hot', name: 'Extra Hot' }
    ]
};

export const TORTILLA_TYPE: MenuModifier = {
    id: 'tortilla-type',
    name: 'Tortilla Type',
    required: false,
    multiSelect: false,
    options: [
        { id: 'flour', name: 'Flour (Harina)' },
        { id: 'corn', name: 'Corn (Maíz)' }
    ]
};

export const PROTEIN_CHOICE: MenuModifier = {
    id: 'protein-choice',
    name: 'Choose Your Protein',
    required: true,
    multiSelect: false,
    options: [
        { id: 'chicken', name: 'Chicken' },
        { id: 'steak', name: 'Steak', priceModifier: 2.00 },
        { id: 'carnitas', name: 'Carnitas (Pork)' },
        { id: 'ground-beef', name: 'Ground Beef' }
    ]
};

export const REMOVE_ITEMS: MenuModifier = {
    id: 'remove-items',
    name: 'Remove Items',
    required: false,
    multiSelect: true,
    options: [
        { id: 'no-onions', name: 'No Onions' },
        { id: 'no-cilantro', name: 'No Cilantro' },
        { id: 'no-tomatoes', name: 'No Tomatoes' }
    ]
};

export const EXTRAS: MenuModifier = {
    id: 'extras',
    name: 'Add Extras',
    required: false,
    multiSelect: true,
    options: [
        { id: 'extra-cheese', name: 'Extra Cheese', priceModifier: 1.50 },
        { id: 'guacamole', name: 'Add Guacamole', priceModifier: 2.00 }
    ]
};

export const SIDES: MenuModifier = {
    id: 'sides',
    name: 'Choose Your Side',
    required: true,
    multiSelect: false,
    options: [
        { id: 'rice-beans', name: 'Rice & Beans' },
        { id: 'fries', name: 'French Fries' }
    ]
};

// ==================== PEPEBETOS MENU ====================

export const PEPEBETOS_MENU: MenuItem[] = [
  // Botanas / Shareables
  { id: '1', name: 'Queso Dip', price: 6.00, category: 'Botanas', image: '🧀', modifiers: [SPICE_LEVEL] },
  { id: '2', name: "Beto's Nachos", price: 12.00, category: 'Botanas', image: '🌮', modifiers: [PROTEIN_CHOICE, EXTRAS, REMOVE_ITEMS] },
  { id: '3', name: 'Street Corn (Elote)', price: 6.00, category: 'Botanas', image: '🌽', modifiers: [SPICE_LEVEL] },
  { id: '4', name: 'Guacamole', price: 8.00, category: 'Botanas', image: '🥑', modifiers: [SPICE_LEVEL] },
  
  // Tacos
  { id: '5', name: 'Quesabirrias (3)', price: 18.00, category: 'Tacos', image: '🌮', description: '#1 Most Liked!', modifiers: [TORTILLA_TYPE, SPICE_LEVEL, REMOVE_ITEMS, EXTRAS] },
  { id: '6', name: 'Taco Carne Asada', price: 4.50, category: 'Tacos', image: '🌮', modifiers: [MEAT_TEMPERATURE, TORTILLA_TYPE, REMOVE_ITEMS, EXTRAS] },
  { id: '7', name: 'Cochinita Pibil Tacos', price: 4.50, category: 'Tacos', image: '🌮', modifiers: [TORTILLA_TYPE, REMOVE_ITEMS, EXTRAS] },
  { id: '8', name: 'Carnitas Tacos', price: 4.50, category: 'Tacos', image: '🌮', modifiers: [TORTILLA_TYPE, REMOVE_ITEMS, EXTRAS] },
  { id: '9', name: 'Birria Tacos (3)', price: 16.00, category: 'Tacos', image: '🌮', modifiers: [TORTILLA_TYPE, SPICE_LEVEL, REMOVE_ITEMS, EXTRAS] },
  
  // From The Grill
  { id: '10', name: 'Happy Plate', price: 16.00, category: 'From The Grill', image: '🥩', description: '#2 Most Liked!', modifiers: [MEAT_TEMPERATURE, SIDES, TORTILLA_TYPE] },
  { id: '11', name: 'Chicken Fajitas', price: 18.00, category: 'From The Grill', image: '🍗', modifiers: [SIDES, TORTILLA_TYPE, SPICE_LEVEL, REMOVE_ITEMS, EXTRAS] },
  { id: '12', name: 'Steak Fajitas', price: 20.00, category: 'From The Grill', image: '🥩', modifiers: [MEAT_TEMPERATURE, SIDES, TORTILLA_TYPE, SPICE_LEVEL, REMOVE_ITEMS, EXTRAS] },
  { id: '13', name: 'Shrimp Fajitas', price: 22.00, category: 'From The Grill', image: '🍤', modifiers: [SIDES, TORTILLA_TYPE, SPICE_LEVEL, REMOVE_ITEMS, EXTRAS] },
  { id: '14', name: 'Parrillada (For Two)', price: 45.00, category: 'From The Grill', image: '🍖', modifiers: [MEAT_TEMPERATURE, SIDES, TORTILLA_TYPE, SPICE_LEVEL] },
  { id: '15', name: 'Carnitas Plate', price: 16.00, category: 'From The Grill', image: '🍖', modifiers: [SIDES, TORTILLA_TYPE] },
  
  // Seafood
  { id: '16', name: 'Camarones al Ajo', price: 18.00, category: 'Seafood', image: '🍤', modifiers: [SPICE_LEVEL, SIDES] },
  { id: '17', name: 'Fish Tacos (3)', price: 14.00, category: 'Seafood', image: '🐟', modifiers: [TORTILLA_TYPE, REMOVE_ITEMS, EXTRAS] },
  { id: '18', name: 'Camarones Diabla', price: 18.00, category: 'Seafood', image: '🍤', modifiers: [SPICE_LEVEL, SIDES] },
  
  // Enchiladas
  { id: '19', name: 'Enchiladas Bandera', price: 14.00, category: 'Enchiladas', image: '🫔', modifiers: [PROTEIN_CHOICE, SIDES, SPICE_LEVEL] },
  { id: '20', name: 'Enchiladas Verdes', price: 13.00, category: 'Enchiladas', image: '🫔', modifiers: [SIDES, SPICE_LEVEL] },
  { id: '21', name: 'Enchiladas Rojas', price: 13.00, category: 'Enchiladas', image: '🫔', modifiers: [PROTEIN_CHOICE, SIDES, SPICE_LEVEL] },
  
  // Burritos
  { id: '22', name: 'Fajita Burrito', price: 14.00, category: 'Burritos', image: '🌯', modifiers: [PROTEIN_CHOICE, SPICE_LEVEL, REMOVE_ITEMS, EXTRAS] },
  { id: '23', name: 'Chimichanga', price: 13.00, category: 'Burritos', image: '🌯', modifiers: [PROTEIN_CHOICE, SIDES, REMOVE_ITEMS, EXTRAS] },
  { id: '24', name: 'California Burrito', price: 15.00, category: 'Burritos', image: '🌯', modifiers: [PROTEIN_CHOICE, SPICE_LEVEL, REMOVE_ITEMS, EXTRAS] },
  
  // Quesadillas
  { id: '25', name: 'Fajita Quesadilla', price: 16.00, category: 'Quesadillas', image: '🫓', modifiers: [PROTEIN_CHOICE, SPICE_LEVEL, REMOVE_ITEMS, EXTRAS] },
  { id: '26', name: 'Cheese Quesadilla', price: 10.00, category: 'Quesadillas', image: '🫓', modifiers: [EXTRAS] },
  
  // Specialties
  { id: '27', name: 'Chile Poblano', price: 15.00, category: 'Specialties', image: '🌶️', modifiers: [SIDES, SPICE_LEVEL] },
  { id: '28', name: 'Torta Loca', price: 12.00, category: 'Specialties', image: '🥪', modifiers: [PROTEIN_CHOICE, REMOVE_ITEMS, EXTRAS] },
  { id: '29', name: 'Flautas (3)', price: 12.00, category: 'Specialties', image: '🌮', modifiers: [PROTEIN_CHOICE, SIDES] },
  
  // Kids Menu
  { id: '30', name: 'Kids Taco Plate', price: 7.00, category: 'Kids', image: '🌮', modifiers: [PROTEIN_CHOICE, SIDES] },
  { id: '31', name: 'Kids Quesadilla', price: 7.00, category: 'Kids', image: '🫓', modifiers: [SIDES] },
  { id: '32', name: 'Chicken Tenders', price: 7.00, category: 'Kids', image: '🍗' },
  
  // Sides
  { id: '33', name: 'Mexican Rice', price: 3.00, category: 'Sides', image: '🍚' },
  { id: '34', name: 'Refried Beans', price: 3.00, category: 'Sides', image: '🫘' },
  { id: '35', name: 'French Fries', price: 3.00, category: 'Sides', image: '🍟' },
  { id: '36', name: 'Tortillas (4)', price: 1.50, category: 'Sides', image: '🫓', modifiers: [TORTILLA_TYPE] },
  
  // Desserts
  { id: '37', name: 'Nutella Banana Cheesecake Chimichanga', price: 8.00, category: 'Desserts', image: '🍰' },
  { id: '38', name: 'Flan', price: 6.00, category: 'Desserts', image: '🍮' },
  { id: '39', name: 'Churros', price: 6.00, category: 'Desserts', image: '🍩' },
  { id: '40', name: 'Sopapillas', price: 6.00, category: 'Desserts', image: '🍩' },
  
  // Beverages
  { id: '41', name: 'Margarita on the Rocks', price: 8.00, category: 'Drinks', image: '🍹' },
  { id: '42', name: 'Frozen Margarita', price: 8.00, category: 'Drinks', image: '🍹' },
  { id: '43', name: 'Modelo Draft', price: 5.00, category: 'Drinks', image: '🍺' },
  { id: '44', name: 'Mexican Soda', price: 3.00, category: 'Drinks', image: '🥤' },
  { id: '45', name: 'Horchata', price: 3.50, category: 'Drinks', image: '🥛' },
  { id: '46', name: 'Fountain Drink', price: 2.50, category: 'Drinks', image: '🥤' },
];

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
  'Kids',
  'Sides',
  'Desserts',
  'Drinks'
];

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
    primaryColor: '#D32F2F',
    secondaryColor: '#FFA000',
    accentColor: '#388E3C'
  }
};

export const SEATS = [
  { id: '1', label: 'Seat 1', icon: '1️⃣' },
  { id: '2', label: 'Seat 2', icon: '2️⃣' },
  { id: '3', label: 'Seat 3', icon: '3️⃣' },
  { id: '4', label: 'Seat 4', icon: '4️⃣' },
  { id: '5', label: 'Seat 5', icon: '5️⃣' },
  { id: '6', label: 'Seat 6', icon: '6️⃣' },
];

export const TABLES = [
  { id: '1', number: '1', status: 'available' as const },
  { id: '2', number: '2', status: 'occupied' as const },
  { id: '3', number: '3', status: 'available' as const },
  { id: '4', number: '4', status: 'occupied' as const },
  { id: '5', number: '5', status: 'available' as const },
  { id: '6', number: '6', status: 'available' as const },
  { id: '7', number: '7', status: 'occupied' as const },
  { id: '8', number: '8', status: 'available' as const },
  { id: '9', number: '9', status: 'occupied' as const },
  { id: '10', number: '10', status: 'available' as const },
];

export const MOCK_TENANTS = [
  {
    id: 'pepebetos-001',
    name: 'Pepe Betos Mexican Kitchen & Cantina',
    owner: 'Pepe Betos Management',
    email: 'info@pepebetos.com',
    status: 'active' as const,
    mrr: 199,
    joinedDate: '2026-01-24'
  }
];

export const KDS_ORDERS = [
  {
    id: '1',
    table: '5',
    waiterName: 'Maria',
    mode: 'Dine In',
    timer: '12:34',
    status: 'fresh' as const,
    timestamp: new Date().toISOString(),
    items: [
      { name: 'Chicken Fajitas', qty: 2, mods: ['No onions', 'Extra cheese'] },
      { name: 'Steak Burrito', qty: 1, mods: ['Medium rare'] },
    ]
  }
];
