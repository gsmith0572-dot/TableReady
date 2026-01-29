import { MenuModifier } from '../types';

// Common modifiers for Mexican food
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

export const SIDES: MenuModifier = {
    id: 'sides',
    name: 'Choose Your Side',
    required: true,
    multiSelect: false,
    options: [
        { id: 'rice-beans', name: 'Rice & Beans' },
        { id: 'fries', name: 'French Fries' },
        { id: 'salad', name: 'Side Salad' }
    ]
};

export const TORTILLA_TYPE: MenuModifier = {
    id: 'tortilla-type',
    name: 'Tortilla Type',
    required: false,
    multiSelect: false,
    options: [
        { id: 'flour', name: 'Flour Tortilla' },
        { id: 'corn', name: 'Corn Tortilla' }
    ]
};

export const EXTRAS: MenuModifier = {
    id: 'extras',
    name: 'Add Extras',
    required: false,
    multiSelect: true,
    options: [
        { id: 'extra-cheese', name: 'Extra Cheese', priceModifier: 1.50 },
        { id: 'extra-meat', name: 'Extra Meat', priceModifier: 3.00 },
        { id: 'guacamole', name: 'Add Guacamole', priceModifier: 2.00 },
        { id: 'sour-cream', name: 'Add Sour Cream', priceModifier: 0.50 },
        { id: 'jalapeños', name: 'Add Jalapeños', priceModifier: 0.75 }
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
        { id: 'no-cheese', name: 'No Cheese' },
        { id: 'no-sour-cream', name: 'No Sour Cream' }
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
        { id: 'shrimp', name: 'Shrimp', priceModifier: 3.00 },
        { id: 'carnitas', name: 'Carnitas (Pork)' },
        { id: 'ground-beef', name: 'Ground Beef' },
        { id: 'veggies', name: 'Vegetables Only' }
    ]
};

export const TACO_STYLE: MenuModifier = {
    id: 'taco-style',
    name: 'Taco Style',
    required: false,
    multiSelect: false,
    options: [
        { id: 'street-style', name: 'Street Style (Authentic)' },
        { id: 'american-style', name: 'American Style (Hard Shell)' }
    ]
};

export const SPECIAL_REQUESTS: MenuModifier = {
    id: 'special-requests',
    name: 'Special Requests / Allergies',
    required: false,
    multiSelect: true,
    options: [
        { id: 'gluten-free', name: '🚨 GLUTEN FREE' },
        { id: 'dairy-free', name: '🚨 DAIRY FREE' },
        { id: 'nut-allergy', name: '🚨 NUT ALLERGY' },
        { id: 'vegetarian', name: 'Vegetarian' },
        { id: 'vegan', name: 'Vegan' },
        { id: 'on-side', name: 'Sauce on the Side' }
    ]
};

// Export all modifiers grouped
export const ALL_MODIFIERS = {
    MEAT_TEMPERATURE,
    SPICE_LEVEL,
    SIDES,
    TORTILLA_TYPE,
    EXTRAS,
    REMOVE_ITEMS,
    PROTEIN_CHOICE,
    TACO_STYLE,
    SPECIAL_REQUESTS
};
