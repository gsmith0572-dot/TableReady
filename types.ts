// User roles and authentication
export interface User {
    id: string;
    email: string;
    name: string;
    role: 'super_admin' | 'restaurant_admin' | 'waiter';
    tenantId?: string;
    createdAt: string;
    lastLogin?: string;
}

export interface WaiterSession {
    waiterId: string;
    waiterName: string;
    clockIn: string;
    clockOut?: string;
    tenantId: string;
}

export interface ModifierOption {
    id: string;
    name: string;
    priceModifier?: number;
}

export interface MenuModifier {
    id: string;
    name: string;
    options: ModifierOption[];
    required: boolean;
    multiSelect: boolean;
}

export interface MenuItem {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    description?: string;
    modifiers?: MenuModifier[];
}

export interface SelectedModifier {
    modifierId: string;
    modifierName: string;
    selectedOptions: string[];
}

export interface OrderItem {
    id: string;
    menuId: string;
    name: string;
    price: number;
    tableNumber: string;
    waiterId: string;
    waiterName: string;
    notes?: string;
    selectedModifiers?: SelectedModifier[];
    status: 'pending' | 'sent_to_kitchen' | 'preparing' | 'ready' | 'served';
    timestamp: string;
}

export interface Table {
    id: string;
    number: string;
    status: 'available' | 'occupied' | 'reserved';
    currentWaiterId?: string;
    currentWaiterName?: string;
    guests?: number;
    orderStartTime?: string;
}

export interface Tenant {
    id: string;
    name: string;
    slug: string;
    owner: string;
    ownerEmail: string;
    phone: string;
    address: string;
    status: 'active' | 'pending_payment' | 'suspended';
    logoUrl?: string;
    mrr: number;
    joinedDate: string;
    subscriptionPlan: 'basic' | 'premium' | 'enterprise';
    adminUserId: string;
    branding?: {
        primaryColor: string;
        secondaryColor: string;
        accentColor: string;
    };
    hours?: Record<string, string>;
}

export interface KDSItem {
    name: string;
    qty: number;
    mods: string[];
    alert?: string;
}

export interface KDSOrder {
    id: string;
    table: string;
    waiterName: string;
    mode: string;
    timer: string;
    status: 'critical' | 'warning' | 'fresh';
    items: KDSItem[];
    timestamp: string;
}

export interface Seat {
    id: string;
    label: string;
    icon: string;
}
