import React from 'react';

interface TenantData {
  tenant: {
    id: string;
    name: string;
    slug: string;
    owner: string;
    email: string;
    phone: string;
    address: string;
    status: string;
    mrr: number;
    joinedDate: string;
    subscriptionPlan: string;
    logoUrl?: string;
    branding?: {
      primaryColor: string;
      secondaryColor: string;
      accentColor: string;
    };
    hours?: Record<string, string>;
  };
  menu: {
    categories: Array<{
      id: string;
      name: string;
      description?: string;
      items: Array<{
        id: string;
        name: string;
        price: number;
        description: string;
        image: string;
        popular?: boolean;
      }>;
    }>;
  };
}

// Mock tenant data loader
export const loadTenantData = async (tenantId: string): Promise<TenantData | null> => {
  // In production, this would fetch from Firebase/API
  // For now, return PepeBetos data if tenantId matches
  
  if (tenantId === 'pepebetos' || tenantId === 'pepebetos-001') {
    return PEPEBETOS_DATA;
  }
  
  return null;
};

// PepeBetos tenant data
const PEPEBETOS_DATA: TenantData = {
  "tenant": {
    "id": "pepebetos-001",
    "name": "Pepe Betos Mexican Kitchen & Cantina",
    "slug": "pepebetos",
    "owner": "Pepe Betos Management",
    "email": "info@pepebetos.com",
    "phone": "(318) 414-3053",
    "address": "1102 Carter St, Vidalia, LA 71373",
    "status": "active",
    "mrr": 199,
    "joinedDate": "2026-01-24",
    "subscriptionPlan": "premium",
    "branding": {
      "primaryColor": "#D32F2F",
      "secondaryColor": "#FFA000",
      "accentColor": "#388E3C"
    },
    "hours": {
      "sunday": "11:00 AM - 7:40 PM",
      "monday": "11:00 AM - 8:40 PM",
      "tuesday": "11:00 AM - 8:40 PM",
      "wednesday": "11:00 AM - 8:40 PM",
      "thursday": "11:00 AM - 8:40 PM",
      "friday": "11:00 AM - 9:40 PM",
      "saturday": "11:00 AM - 9:40 PM"
    }
  },
  "menu": {
    "categories": [
      {
        "id": "botanas",
        "name": "Botanas / Shareables",
        "items": [
          {
            "id": "queso-dip",
            "name": "Queso Dip",
            "price": 6.00,
            "description": "Creamy cheese dip served with tortilla chips",
            "image": "/menu/queso-dip.jpg"
          },
          {
            "id": "betos-nachos",
            "name": "Beto's Nachos",
            "price": 12.00,
            "description": "Loaded nachos with choice of meat, beans, cheese, jalapeños",
            "image": "/menu/nachos.jpg"
          },
          {
            "id": "street-corn",
            "name": "Street Corn (Elote)",
            "price": 6.00,
            "description": "Mexican street corn with mayo, cotija cheese, chili powder",
            "image": "/menu/elote.jpg"
          }
        ]
      },
      {
        "id": "tacos",
        "name": "Tacos",
        "items": [
          {
            "id": "quesabirrias",
            "name": "Quesabirrias (3)",
            "price": 18.00,
            "description": "Three quesabirria tacos with consomé for dipping. #1 Most Liked!",
            "image": "/menu/quesabirrias.jpg",
            "popular": true
          },
          {
            "id": "taco-carne-asada",
            "name": "Taco Carne Asada",
            "price": 4.50,
            "description": "Grilled steak taco with onions and cilantro",
            "image": "/menu/taco-asada.jpg",
            "popular": true
          },
          {
            "id": "taco-cochinita-pibil",
            "name": "Cochinita Pibil Tacos",
            "price": 4.50,
            "description": "Slow-cooked pork in citrus and achiote marinade",
            "image": "/menu/cochinita-pibil.jpg"
          },
          {
            "id": "birria-tacos",
            "name": "Birria Tacos (3)",
            "price": 16.00,
            "description": "Three authentic birria tacos with consomé",
            "image": "/menu/birria-tacos.jpg"
          }
        ]
      },
      {
        "id": "from-the-grill",
        "name": "From The Grill",
        "items": [
          {
            "id": "happy-plate",
            "name": "Happy Plate",
            "price": 16.00,
            "description": "Grilled steak with rice, beans, and tortillas. #2 Most Liked!",
            "image": "/menu/happy-plate.jpg",
            "popular": true
          },
          {
            "id": "fajitas-chicken",
            "name": "Chicken Fajitas",
            "price": 18.00,
            "description": "Sizzling chicken fajitas with peppers and onions",
            "image": "/menu/fajitas-chicken.jpg"
          },
          {
            "id": "fajitas-steak",
            "name": "Steak Fajitas",
            "price": 20.00,
            "description": "Sizzling steak fajitas with peppers and onions",
            "image": "/menu/fajitas-steak.jpg"
          },
          {
            "id": "parrillada",
            "name": "Parrillada (For Two)",
            "price": 45.00,
            "description": "Mixed grill platter with steak, chicken, shrimp, chorizo - serves 2",
            "image": "/menu/parrillada.jpg"
          }
        ]
      },
      {
        "id": "enchiladas",
        "name": "Enchiladas",
        "items": [
          {
            "id": "enchiladas-bandera",
            "name": "Enchiladas Bandera",
            "price": 14.00,
            "description": "Three enchiladas with red, white, and green sauces",
            "image": "/menu/enchiladas-bandera.jpg"
          }
        ]
      },
      {
        "id": "burritos",
        "name": "House Burritos",
        "items": [
          {
            "id": "chimichanga",
            "name": "Chimichanga",
            "price": 13.00,
            "description": "Fried burrito with choice of meat",
            "image": "/menu/chimichanga.jpg"
          }
        ]
      },
      {
        "id": "desserts",
        "name": "Desserts",
        "description": "All of our desserts are homemade, with love",
        "items": [
          {
            "id": "nutella-chimichanga",
            "name": "Nutella Banana Cheesecake Chimichanga",
            "price": 8.00,
            "description": "Fried dessert chimichanga with Nutella, banana, and cheesecake",
            "image": "/menu/dessert-chimichanga.jpg"
          },
          {
            "id": "flan",
            "name": "Flan",
            "price": 6.00,
            "description": "Traditional Mexican caramel custard",
            "image": "/menu/flan.jpg"
          }
        ]
      },
      {
        "id": "drinks",
        "name": "Beverages",
        "items": [
          {
            "id": "margarita-rocks",
            "name": "Margarita on the Rocks",
            "price": 8.00,
            "description": "Classic margarita with fresh mixers",
            "image": "/menu/margarita.jpg"
          },
          {
            "id": "modelo-draft",
            "name": "Modelo Draft",
            "price": 5.00,
            "description": "Icy Modelo draft beer",
            "image": "/menu/modelo.jpg"
          },
          {
            "id": "mexican-soda",
            "name": "Mexican Soda",
            "price": 3.00,
            "description": "Jarritos, Coca-Cola Mexicana, etc.",
            "image": "/menu/jarritos.jpg"
          }
        ]
      }
    ]
  }
};

export type { TenantData };
