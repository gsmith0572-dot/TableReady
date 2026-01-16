export interface MenuItem {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
}

export interface OrderItem {
    id: string;
    menuId: string;
    name: string;
    price: number;
    seatId: string;
    notes?: string[];
    status: 'pending' | 'sent';
}

export interface Seat {
    id: string;
    label: string;
    icon: string;
}

export interface Table {
    id: string;
    number: string;
    status: 'available' | 'occupied' | 'order-ready' | 'pay-requested' | 'cleaning';
    guests?: number;
    time?: string; // e.g. "12m" or "45m"
    amount?: number;
    server?: string;
}

export interface KDSItem {
    name: string;
    qty: number;
    mods: string[];
    alert?: string; // e.g. "ALLERGY"
}

export interface KDSOrder {
    id: string;
    table: string;
    mode: string; // Dine In, Takeout, Bar
    timer: string;
    status: 'critical' | 'warning' | 'fresh';
    items: KDSItem[];
}

export interface Tenant {
    id: string;
    name: string;
    owner: string;
    email: string;
    status: 'active' | 'pending_payment' | 'suspended';
    logoUrl?: string;
    mrr: number; // Monthly Recurring Revenue value
    joinedDate: string;
}

export enum AppRoute {
    LOGIN = '/',
    ADMIN_DASHBOARD = '/admin',
    POS_DASHBOARD = '/pos/:tenantId',
    POS_ORDER = '/pos/:tenantId/order',
    POS_KDS = '/pos/:tenantId/kds'
}