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
        { id: 'hot', name: 'Hot 🌶️' },
        { id: 'extra-hot', name: 'Extra Hot 🌶️🌶️' }
    ]
};

export const TORTILLA_TYPE: MenuModifier = {
    id: 'tortilla-type',
    name: 'Tortilla Type',
    required: false,
    multiSelect: false,
    options: [
        { id: 'corn', name: 'Corn (Maíz)' },
        { id: 'flour', name: 'Flour (Harina)' }
    ]
};

export const PROTEIN_CHOICE: MenuModifier = {
    id: 'protein-choice',
    name: 'Choose Your Protein',
    required: true,
    multiSelect: false,
    options: [
        { id: 'ground-beef', name: 'Ground Beef' },
        { id: 'shredded-chicken', name: 'Shredded Chicken' },
        { id: 'grilled-chicken', name: 'Grilled Chicken', priceModifier: 2.00 },
        { id: 'steak', name: 'Steak', priceModifier: 3.00 },
        { id: 'shrimp', name: 'Shrimp', priceModifier: 4.00 },
        { id: 'carnitas', name: 'Carnitas/Pastor', priceModifier: 1.00 }
    ]
};

export const MEAT_CHOICE_FAJITA: MenuModifier = {
    id: 'fajita-meat',
    name: 'Choose Your Meat',
    required: true,
    multiSelect: false,
    options: [
        { id: 'chicken', name: 'Chicken' },
        { id: 'steak', name: 'Steak', priceModifier: 2.00 },
        { id: 'shrimp', name: 'Shrimp', priceModifier: 4.00 },
        { id: 'trio', name: 'Trio (Chicken/Steak/Shrimp)', priceModifier: 6.00 }
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
        { id: 'no-tomatoes', name: 'No Tomatoes' },
        { id: 'no-lettuce', name: 'No Lettuce' },
        { id: 'no-cheese', name: 'No Cheese' }
    ]
};

export const EXTRAS: MenuModifier = {
    id: 'extras',
    name: 'Add Extras',
    required: false,
    multiSelect: true,
    options: [
        { id: 'extra-cheese', name: 'Extra Cheese', priceModifier: 1.50 },
        { id: 'guacamole', name: 'Add Guacamole', priceModifier: 2.00 },
        { id: 'sour-cream', name: 'Add Sour Cream', priceModifier: 0.50 }
    ]
};

export const SIDE_CHOICE: MenuModifier = {
    id: 'side-choice',
    name: 'Choose Your Side',
    required: true,
    multiSelect: false,
    options: [
        { id: 'rice-beans', name: 'Rice & Beans' },
        { id: 'fries', name: 'French Fries' }
    ]
};

export const WING_SAUCE: MenuModifier = {
    id: 'wing-sauce',
    name: 'Wing Sauce',
    required: true,
    multiSelect: false,
    options: [
        { id: 'buffalo', name: 'Classic Buffalo' },
        { id: 'bbq', name: 'BBQ' },
        { id: 'sweet-chili', name: 'Asian Sweet Chili' },
        { id: 'mango-habanero', name: 'Mango Habanero' }
    ]
};

// ==================== COMPLETE PEPEBETOS MENU ====================

export const PEPEBETOS_MENU: MenuItem[] = [
  // APPETIZERS / BOTANAS
  { id: '1', name: 'Queso Dip', price: 6.00, category: 'Appetizers', image: '🧀', modifiers: [SPICE_LEVEL] },
  { id: '2', name: 'Guacamole Dip', price: 6.00, category: 'Appetizers', image: '🥑', modifiers: [SPICE_LEVEL] },
  { id: '3', name: "Beto's Nachos", price: 12.00, category: 'Appetizers', image: '🌮', modifiers: [PROTEIN_CHOICE, EXTRAS, REMOVE_ITEMS] },
  { id: '4', name: 'Street Corn (Elote)', price: 5.00, category: 'Appetizers', image: '🌽', modifiers: [SPICE_LEVEL] },
  { id: '5', name: 'Shrimp Basket', price: 15.00, category: 'Appetizers', image: '🍤' },
  { id: '6', name: 'Queso Fundido', price: 10.00, category: 'Appetizers', image: '🧀', modifiers: [PROTEIN_CHOICE] },
  { id: '7', name: 'Beans & gueso', price: 14.00, category: 'Appetizers', image: '🫘' },
  { id: '8', name: 'Chicken Wings (6 pcs)', price: 19.00, category: 'Appetizers', image: '🍗', modifiers: [WING_SAUCE] },
  { id: '9', name: 'Chicken Wings (12 pcs)', price: 19.00, category: 'Appetizers', image: '🍗', modifiers: [WING_SAUCE] },
  { id: '10', name: 'Sticky Fingerz', price: 13.00, category: 'Appetizers', image: '🍗', modifiers: [WING_SAUCE] },
  { id: '11', name: "Pepe's Sampler", price: 18.00, category: 'Appetizers', image: '🍽️', modifiers: [WING_SAUCE] },

  // SOUPS
  { id: '20', name: 'Chicken Tortilla Soup', price: 7.00, category: 'Soups', image: '🍲' },
  { id: '21', name: 'Charro Bean Soup', price: 4.00, category: 'Soups', image: '🫘' },

  // SALADS
  { id: '30', name: 'Strawberry Walnut Salad', price: 18.00, category: 'Salads', image: '🥗', modifiers: [PROTEIN_CHOICE] },
  { id: '31', name: 'Mexican Avocado Salad', price: 18.00, category: 'Salads', image: '🥑', modifiers: [PROTEIN_CHOICE] },
  { id: '32', name: 'Caesar Salad', price: 10.00, category: 'Salads', image: '🥗', modifiers: [PROTEIN_CHOICE] },
  { id: '33', name: 'Fajita Taco Salad', price: 15.00, category: 'Salads', image: '🥗', modifiers: [PROTEIN_CHOICE] },

  // TACOS
  { id: '40', name: 'Tacos Mexicanos (3)', price: 16.00, category: 'Tacos', image: '🌮', modifiers: [PROTEIN_CHOICE, TORTILLA_TYPE] },
  { id: '41', name: 'Gringo Tacos (2)', price: 13.00, category: 'Tacos', image: '🌮', modifiers: [PROTEIN_CHOICE] },
  { id: '42', name: 'Quesabirria (3)', price: 17.00, category: 'Tacos', image: '🌮', description: '⭐ Favorite!' },
  { id: '43', name: 'Elote Tacos (3)', price: 18.00, category: 'Tacos', image: '🌮', modifiers: [PROTEIN_CHOICE, TORTILLA_TYPE] },
  { id: '44', name: 'Fried Shrimp/Fish Tacos (3)', price: 17.00, category: 'Tacos', image: '🐟' },

  // FROM THE GRILL
  { id: '50', name: 'Special Fajitas (For 2)', price: 42.00, category: 'From The Grill', image: '🥩', modifiers: [MEAT_CHOICE_FAJITA, SPICE_LEVEL, TORTILLA_TYPE] },
  { id: '51', name: 'Fajitas', price: 20.00, category: 'From The Grill', image: '🥩', modifiers: [MEAT_CHOICE_FAJITA, SPICE_LEVEL, TORTILLA_TYPE] },
  { id: '52', name: 'Fajitas al Pastor', price: 20.00, category: 'From The Grill', image: '🥩', modifiers: [SPICE_LEVEL, TORTILLA_TYPE] },
  { id: '53', name: 'Potato Fajita', price: 22.00, category: 'From The Grill', image: '🥔', modifiers: [MEAT_CHOICE_FAJITA, SPICE_LEVEL] },
  { id: '54', name: 'Carne Asado', price: 24.00, category: 'From The Grill', image: '🥩', modifiers: [MEAT_TEMPERATURE, TORTILLA_TYPE] },
  { id: '55', name: 'Bistec a la Mexicana', price: 19.00, category: 'From The Grill', image: '🥩', modifiers: [SPICE_LEVEL, TORTILLA_TYPE] },
  { id: '56', name: 'Pollo Feliz', price: 19.00, category: 'From The Grill', image: '🍗', modifiers: [SPICE_LEVEL, TORTILLA_TYPE] },
  { id: '57', name: "Beto's Burger", price: 18.00, category: 'From The Grill', image: '🍔' },

  // SEAFOOD
  { id: '60', name: 'Camarones al Mojo de Ajo', price: 22.00, category: 'Seafood', image: '🍤', modifiers: [SPICE_LEVEL] },
  { id: '61', name: 'Camarones a la Diabla', price: 22.00, category: 'Seafood', image: '🍤', modifiers: [SPICE_LEVEL] },
  { id: '62', name: 'Mojarra (Whole Fried Fish)', price: 22.00, category: 'Seafood', image: '🐟' },
  { id: '63', name: 'Coctel de Camaron', price: 20.00, category: 'Seafood', image: '🍤' },
  { id: '64', name: 'Fried Fish & Shrimp Platter', price: 24.00, category: 'Seafood', image: '🐟' },

  // HOUSE SPECIALTIES
  { id: '70', name: 'Happy Plate', price: 16.00, category: 'Specialties', image: '🥩', description: '⭐ Favorite!', modifiers: [PROTEIN_CHOICE, SIDE_CHOICE, TORTILLA_TYPE] },
  { id: '71', name: 'Fajita Quesadilla', price: 17.00, category: 'Specialties', image: '🫓', modifiers: [MEAT_CHOICE_FAJITA] },
  { id: '72', name: 'Torta Loca (Mexican Po-Boy)', price: 12.00, category: 'Specialties', image: '🥪', modifiers: [PROTEIN_CHOICE] },
  { id: '73', name: 'Carnitas Dinner', price: 18.00, category: 'Specialties', image: '🍖', modifiers: [TORTILLA_TYPE] },
  { id: '74', name: 'La Gringa', price: 18.00, category: 'Specialties', image: '🌮', modifiers: [PROTEIN_CHOICE] },
  { id: '75', name: 'Tamale Dinner', price: 17.00, category: 'Specialties', image: '🫔' },
  { id: '76', name: 'Chile Poblano Dinner', price: 19.00, category: 'Specialties', image: '🌶️', modifiers: [SPICE_LEVEL] },
  { id: '77', name: 'Chimichanga', price: 18.00, category: 'Specialties', image: '🌯', modifiers: [PROTEIN_CHOICE, SIDE_CHOICE] },

  // ENCHILADAS
  { id: '80', name: 'Enchilada Supreme', price: 16.00, category: 'Enchiladas', image: '🫔', modifiers: [SIDE_CHOICE] },
  { id: '81', name: 'Enchiladas Suizas', price: 15.00, category: 'Enchiladas', image: '🫔', modifiers: [SIDE_CHOICE] },
  { id: '82', name: 'Enchiladas Bandera', price: 17.00, category: 'Enchiladas', image: '🫔', modifiers: [PROTEIN_CHOICE, SIDE_CHOICE] },
  { id: '83', name: 'Enchiladas Dinner', price: 14.00, category: 'Enchiladas', image: '🫔', modifiers: [PROTEIN_CHOICE, SIDE_CHOICE] },

  // VEGETARIAN
  { id: '90', name: 'Veggie Fajitas', price: 18.00, category: 'Vegetarian', image: '🥗', modifiers: [TORTILLA_TYPE] },
  { id: '91', name: 'Veggie Quesadillas', price: 17.00, category: 'Vegetarian', image: '🫓' },
  { id: '92', name: 'Cheese Enchiladas', price: 15.00, category: 'Vegetarian', image: '🫔', modifiers: [SIDE_CHOICE] },
  { id: '93', name: 'Veggie Combo', price: 14.00, category: 'Vegetarian', image: '🌯', modifiers: [SIDE_CHOICE] },

  // BURRITOS
  { id: '100', name: 'Burrito Supreme', price: 15.00, category: 'Burritos', image: '🌯', modifiers: [PROTEIN_CHOICE] },
  { id: '101', name: "Chonch's Burrito", price: 14.00, category: 'Burritos', image: '🌯' },
  { id: '102', name: 'Burrito Texano', price: 19.00, category: 'Burritos', image: '🌯', modifiers: [PROTEIN_CHOICE] },
  { id: '103', name: "Beto's Burrito", price: 16.00, category: 'Burritos', image: '🌯', modifiers: [PROTEIN_CHOICE] },

  // LUNCH SPECIALS
  { id: '110', name: 'Huevos al gusto', price: 12.00, category: 'Lunch', image: '🍳', modifiers: [PROTEIN_CHOICE] },
  { id: '111', name: 'Chilaquiles', price: 15.00, category: 'Lunch', image: '🌮', modifiers: [PROTEIN_CHOICE, SPICE_LEVEL] },
  { id: '112', name: 'Fajita Taco Salad', price: 13.00, category: 'Lunch', image: '🥗', modifiers: [PROTEIN_CHOICE] },
  { id: '113', name: 'Chorizo Burritos', price: 12.00, category: 'Lunch', image: '🌯' },
  { id: '114', name: 'Quesabirrias', price: 14.00, category: 'Lunch', image: '🌮' },
  { id: '115', name: 'Tacos Mexicanos', price: 12.00, category: 'Lunch', image: '🌮', modifiers: [PROTEIN_CHOICE, TORTILLA_TYPE] },
  { id: '116', name: 'Happy Plate', price: 13.00, category: 'Lunch', image: '🥩', modifiers: [PROTEIN_CHOICE, SIDE_CHOICE] },
  { id: '117', name: 'Gringo Tacos', price: 10.00, category: 'Lunch', image: '🌮', modifiers: [PROTEIN_CHOICE] },
  { id: '118', name: 'Quesadilla', price: 12.00, category: 'Lunch', image: '🫓', modifiers: [PROTEIN_CHOICE] },
  { id: '119', name: 'Fajita Quesadilla', price: 14.00, category: 'Lunch', image: '🫓', modifiers: [MEAT_CHOICE_FAJITA] },
  { id: '120', name: 'Enchiladas', price: 11.00, category: 'Lunch', image: '🫔', modifiers: [PROTEIN_CHOICE] },
  { id: '121', name: 'Chimichanga', price: 12.00, category: 'Lunch', image: '🌯', modifiers: [PROTEIN_CHOICE] },
  { id: '122', name: "Beto's Burger", price: 14.00, category: 'Lunch', image: '🍔' },
  { id: '123', name: 'Burrito Supreme', price: 11.00, category: 'Lunch', image: '🌯', modifiers: [PROTEIN_CHOICE] },
  { id: '124', name: "Chonch's Burrito", price: 11.00, category: 'Lunch', image: '🌯' },
  { id: '125', name: 'Pollo Feliz', price: 14.00, category: 'Lunch', image: '🍗', modifiers: [SPICE_LEVEL] },
  { id: '126', name: 'Fajitas', price: 17.00, category: 'Lunch', image: '🥩', modifiers: [MEAT_CHOICE_FAJITA, SPICE_LEVEL, TORTILLA_TYPE] },

  // KIDS MENU
  { id: '130', name: 'Kids Fruit Cup', price: 7.00, category: 'Kids', image: '🍓', modifiers: [SIDE_CHOICE] },
  { id: '131', name: 'Kids Cheese Burger', price: 7.00, category: 'Kids', image: '🍔', modifiers: [SIDE_CHOICE] },
  { id: '132', name: 'Kids Chicken Tenders', price: 7.00, category: 'Kids', image: '🍗', modifiers: [SIDE_CHOICE] },
  { id: '133', name: 'Kids Quesadilla Plate', price: 7.00, category: 'Kids', image: '🫓', modifiers: [PROTEIN_CHOICE, SIDE_CHOICE] },
  { id: '134', name: 'Kids Enchilada Plate', price: 7.00, category: 'Kids', image: '🫔', modifiers: [SIDE_CHOICE] },
  { id: '135', name: 'Kids Burrito Plate', price: 7.00, category: 'Kids', image: '🌯', modifiers: [PROTEIN_CHOICE, SIDE_CHOICE] },
  { id: '136', name: 'Kids Taco Plate', price: 7.00, category: 'Kids', image: '🌮', modifiers: [PROTEIN_CHOICE, SIDE_CHOICE] },

  // A LA CARTA
  { id: '140', name: 'Taco (Single)', price: 3.00, category: 'A La Carta', image: '🌮', modifiers: [PROTEIN_CHOICE, TORTILLA_TYPE] },
  { id: '141', name: 'Enchilada (Single)', price: 3.00, category: 'A La Carta', image: '🫔', modifiers: [PROTEIN_CHOICE] },
  { id: '142', name: 'Burrito (Single)', price: 7.00, category: 'A La Carta', image: '🌯', modifiers: [PROTEIN_CHOICE] },
  { id: '143', name: 'Quesadilla (Single)', price: 7.00, category: 'A La Carta', image: '🫓', modifiers: [PROTEIN_CHOICE] },
  { id: '144', name: 'Chimichanga (Single)', price: 7.00, category: 'A La Carta', image: '🌯', modifiers: [PROTEIN_CHOICE] },
  { id: '145', name: 'Chile Relleno', price: 5.00, category: 'A La Carta', image: '🌶️', modifiers: [PROTEIN_CHOICE] },
  { id: '146', name: 'Flauta (Single)', price: 5.00, category: 'A La Carta', image: '🌮', modifiers: [PROTEIN_CHOICE] },
  { id: '147', name: 'Pork Tamal', price: 4.00, category: 'A La Carta', image: '🫔' },

  // EXTRAS / SIDES
  { id: '150', name: 'Mexican Rice', price: 3.00, category: 'Extras', image: '🍚' },
  { id: '151', name: 'Beans', price: 3.00, category: 'Extras', image: '🫘' },
  { id: '152', name: 'Tortillas', price: 2.00, category: 'Extras', image: '🫓', modifiers: [TORTILLA_TYPE] },
  { id: '153', name: 'French Fries', price: 4.00, category: 'Extras', image: '🍟' },
  { id: '154', name: 'House/Caesar Salad', price: 5.00, category: 'Extras', image: '🥗' },
  { id: '155', name: 'Guacamole Salad', price: 5.00, category: 'Extras', image: '🥑' },
  { id: '156', name: 'Grilled Veggies', price: 4.00, category: 'Extras', image: '🥗' },
  { id: '157', name: 'Queso Dip', price: 2.00, category: 'Extras', image: '🧀' },
  { id: '158', name: 'Guacamole', price: 3.00, category: 'Extras', image: '🥑' },
  { id: '159', name: 'Sour Cream', price: 2.00, category: 'Extras', image: '🥛' },
  { id: '160', name: 'Shredded Cheese', price: 2.00, category: 'Extras', image: '🧀' },
  { id: '161', name: 'Homemade Salsa', price: 3.00, category: 'Extras', image: '🌶️' },

  // DESSERTS
  { id: '170', name: 'Nutella Banana Chimichanga', price: 6.00, category: 'Desserts', image: '🍰' },
  { id: '171', name: 'Sopapillas', price: 6.00, category: 'Desserts', image: '🍩' },
  { id: '172', name: 'Fried Ice Cream', price: 6.00, category: 'Desserts', image: '🍨' },
  { id: '173', name: 'Churros', price: 6.00, category: 'Desserts', image: '🍩' },
  { id: '174', name: 'Cheesecake', price: 6.00, category: 'Desserts', image: '🍰' },

  // DRINKS
  { id: '180', name: 'Coke/Diet Coke/Coke Zero', price: 3.00, category: 'Drinks', image: '🥤' },
  { id: '181', name: 'Sprite/Orange Fanta', price: 3.00, category: 'Drinks', image: '🥤' },
  { id: '182', name: 'Root Beer/Lemonade', price: 3.00, category: 'Drinks', image: '🥤' },
  { id: '183', name: 'Dr.Pepper', price: 3.00, category: 'Drinks', image: '🥤' },
  { id: '184', name: 'Flavored Lemonade (No Refills)', price: 4.00, category: 'Drinks', image: '🍋' },
  { id: '185', name: 'Strawberry', price: 4.00, category: 'Drinks', image: '🍓' },
  { id: '186', name: 'Watermelon', price: 4.00, category: 'Drinks', image: '🍉' },
  { id: '187', name: 'Blue', price: 4.00, category: 'Drinks', image: '🔵' },
  { id: '188', name: 'Mango', price: 4.00, category: 'Drinks', image: '🥭' },
  { id: "189", name: "Dragon Fruit", price: 4.00, category: "Drinks", image: "🐉" },
  { id: "190", name: "Margarita (Strawberry)", price: 8.00, category: "Drinks", image: "🍹" },
  { id: "191", name: "Margarita (Mango)", price: 8.00, category: "Drinks", image: "🍹" },
  { id: "192", name: "Margarita (Lime Classic)", price: 8.00, category: "Drinks", image: "🍹" },
  { id: "193", name: "Margarita (Peach)", price: 8.00, category: "Drinks", image: "🍹" },
  { id: "194", name: "Mimosa (Orange)", price: 8.00, category: "Drinks", image: "🍊" },
  { id: "195", name: "Mimosa (Strawberry)", price: 8.00, category: "Drinks", image: "🍓" },
  { id: "196", name: "Mimosa (Mango)", price: 8.00, category: "Drinks", image: "🥭" },
];

export const PEPEBETOS_CATEGORIES = [
  'All',
  'Appetizers',
  'Soups',
  'Salads',
  'Tacos',
  'From The Grill',
  'Seafood',
  'Specialties',
  'Enchiladas',
  'Vegetarian',
  'Burritos',
  'Lunch',
  'Kids',
  'A La Carta',
  'Extras',
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

// Adding new drink items to PEPEBETOS_MENU
export const NEW_DRINKS: MenuItem[] = [
  { id: '190', name: 'Margarita (Strawberry)', price: 8.00, category: 'Drinks', image: '🍹', modifiers: [] },
  { id: '191', name: 'Margarita (Mango)', price: 8.00, category: 'Drinks', image: '🍹', modifiers: [] },
  { id: '192', name: 'Margarita (Lime Classic)', price: 8.00, category: 'Drinks', image: '🍹', modifiers: [] },
  { id: '193', name: 'Margarita (Peach)', price: 8.00, category: 'Drinks', image: '🍹', modifiers: [] },
  { id: '194', name: 'Mimosa (Orange)', price: 8.00, category: 'Drinks', image: '🍊', modifiers: [] },
  { id: '195', name: 'Mimosa (Strawberry)', price: 8.00, category: 'Drinks', image: '🍓', modifiers: [] },
  { id: '196', name: 'Mimosa (Mango)', price: 8.00, category: 'Drinks', image: '🥭', modifiers: [] },
];

// Update PEPEBETOS_MENU to include new drinks
// Note: In production, append to existing menu
