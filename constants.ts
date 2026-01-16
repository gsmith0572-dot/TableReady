import { MenuItem, Seat, Table, KDSOrder, Tenant } from './types';

export const SEATS: Seat[] = [
    { id: 'seat-1', label: 'Seat 1', icon: 'person' },
    { id: 'seat-2', label: 'Seat 2', icon: 'person' },
    { id: 'seat-3', label: 'Seat 3', icon: 'person' },
    { id: 'seat-shared', label: 'Shared', icon: 'group' },
];

export const MOCK_TENANTS: Tenant[] = [
    {
        id: 'pepe-betos',
        name: "Pepe Betos",
        owner: "Pepe González",
        email: "pepe@betos.com",
        status: 'active',
        mrr: 99.00,
        joinedDate: "2023-10-15",
        // Logo de Tacos/Comida Mexicana
        logoUrl: "https://cdn-icons-png.flaticon.com/512/123/123278.png" 
    },
    {
        id: 'marios-pizza',
        name: "Mario's Pizza",
        owner: "Mario Rossi",
        email: "mario@pizza.it",
        status: 'active',
        mrr: 149.00,
        joinedDate: "2023-11-02",
        // Logo de Pizza
        logoUrl: "https://cdn-icons-png.flaticon.com/512/6978/6978255.png"
    },
    {
        id: 'sushi-ko',
        name: "Sushi Ko",
        owner: "Kenji Sato",
        email: "kenji@sushiko.jp",
        status: 'pending_payment',
        mrr: 199.00,
        joinedDate: "2023-12-10",
        // Logo de Sushi
        logoUrl: "https://cdn-icons-png.flaticon.com/512/2252/2252075.png"
    }
];

export const MENU_ITEMS: MenuItem[] = [
    // Tacos
    {
        id: 't1',
        name: "Carne Asada Taco",
        price: 3.50,
        category: "Tacos",
        image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 't2',
        name: "Al Pastor Taco",
        price: 3.50,
        category: "Tacos",
        image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 't3',
        name: "Tripa Taco",
        price: 4.00,
        category: "Tacos",
        image: "https://images.unsplash.com/photo-1613514785940-daed07799d9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 't4',
        name: "Quesabirria (3 pcs)",
        price: 13.00,
        category: "Tacos",
        image: "https://images.unsplash.com/photo-1628813829029-478950882d95?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    // Burgers (Pepe Betos Specials)
    {
        id: 'h1',
        name: "Pepe's Burger",
        price: 12.50,
        category: "Burgers",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 'h2',
        name: "Hawaiian Burger",
        price: 11.50,
        category: "Burgers",
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 'h3',
        name: "Mexican Burger",
        price: 11.00,
        category: "Burgers",
        image: "https://images.unsplash.com/photo-1607011914787-e23a63619572?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    // Steaks / Mains
    {
        id: 'p1',
        name: "Carne Asada Plate",
        price: 16.99,
        category: "Mains",
        image: "https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 'p2',
        name: "Ribeye Steak 12oz",
        price: 24.00,
        category: "Mains",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    // Starters
    {
        id: 's1',
        name: "Choriqueso",
        price: 8.50,
        category: "Starters",
        image: "https://images.unsplash.com/photo-1574856344991-aaa31b6f4ce3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 's2',
        name: "Guacamole & Chips",
        price: 6.00,
        category: "Starters",
        image: "https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 's3',
        name: "Loaded Fries",
        price: 9.00,
        category: "Starters",
        image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    // Drinks
    {
        id: 'b1',
        name: "Mexican Coke",
        price: 3.50,
        category: "Drinks",
        image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 'b2',
        name: "Michelada",
        price: 9.00,
        category: "Drinks",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 'b3',
        name: "Margarita",
        price: 8.00,
        category: "Drinks",
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
];

export const CATEGORIES = ['Starters', 'Tacos', 'Burgers', 'Mains', 'Drinks'];

export const TABLES: Table[] = [
    { id: 't2', number: '02', status: 'order-ready', guests: 2, time: '12m' },
    { id: 't4', number: '04', status: 'pay-requested', guests: 3, amount: 145.50 },
    { id: 't12', number: '12', status: 'occupied', guests: 4, time: '45m' },
    { id: 't8', number: '08', status: 'occupied', guests: 2, time: '15m' },
    { id: 't9', number: '09', status: 'available', guests: 6 },
    { id: 't15', number: '15', status: 'cleaning' },
    { id: 't16', number: '16', status: 'available', guests: 4 },
    { id: 't18', number: '18', status: 'available', guests: 2 },
];

export const KDS_ORDERS: KDSOrder[] = [
    {
        id: '102',
        table: 'Table 4',
        mode: 'Dine In',
        timer: '24:00',
        status: 'critical',
        items: [
            { name: "DOUBLE BURGER", qty: 2, mods: ["Medium Rare", "Extra Cheese", "NO ONION"] },
            { name: "LG FRIES", qty: 1, mods: [], alert: "ALLERGY: NUTS" },
            { name: "COKE ZERO", qty: 1, mods: ["No Ice"] }
        ]
    },
    {
        id: '103',
        table: 'Table 7',
        mode: 'Takeout',
        timer: '12:45',
        status: 'warning',
        items: [
            { name: "PASTA CARBONARA", qty: 1, mods: ["Extra Sauce"], alert: "GLUTEN FREE" },
            { name: "CAESAR SALAD", qty: 1, mods: ["Dressing on side"] }
        ]
    },
    {
        id: '104',
        table: 'Table 9',
        mode: 'Dine In',
        timer: '02:15',
        status: 'fresh',
        items: [
            { name: "GRILLED SALMON", qty: 1, mods: ["Medium", "Steamed Veggies"] }
        ]
    },
    {
        id: '105',
        table: 'Table 2',
        mode: 'Bar',
        timer: '00:45',
        status: 'fresh',
        items: [
            { name: "BEER PINT", qty: 2, mods: ["IPA"] },
            { name: "NACHOS", qty: 1, mods: ["Extra Jalapenos"] }
        ]
    }
];