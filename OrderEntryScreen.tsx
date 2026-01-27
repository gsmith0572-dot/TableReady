import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { OrderItem, MenuItem } from './types';
import { MENU_ITEMS, CATEGORIES, PEPEBETOS_MENU, PEPEBETOS_CATEGORIES, PEPEBETOS_INFO } from './constants';
import { VoiceRecorder } from './components/VoiceRecorder';
import { SeatTabs } from './components/SeatTabs';
import { EditItemModal } from './components/EditItemModal';

export const OrderEntryScreen: React.FC = () => {
    const navigate = useNavigate();
    const { tenantId } = useParams<{ tenantId: string }>();
    
    // Determine if this is PepeBetos tenant
    const isPepeBetos = tenantId === 'pepebetos' || tenantId === 'pepebetos-001';
    
    // Use appropriate menu and categories based on tenant
    const menuItems = isPepeBetos ? PEPEBETOS_MENU : MENU_ITEMS;
    const categories = isPepeBetos ? PEPEBETOS_CATEGORIES : CATEGORIES;
    const restaurantInfo = isPepeBetos ? PEPEBETOS_INFO : null;
    
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    const [currentSeat, setCurrentSeat] = useState<string>('1');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [editingItem, setEditingItem] = useState<OrderItem | null>(null);
    const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);

    const filteredItems = menuItems.filter(item => {
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const addItem = (menuItem: MenuItem) => {
        const newItem: OrderItem = {
            id: Date.now().toString(),
            menuId: menuItem.id,
            name: menuItem.name,
            price: menuItem.price,
            seatId: currentSeat,
            status: 'pending'
        };
        setOrderItems([...orderItems, newItem]);
    };

    const removeItem = (id: string) => {
        setOrderItems(orderItems.filter(item => item.id !== id));
    };

    const editItem = (item: OrderItem) => {
        setEditingItem(item);
    };

    const saveItemEdits = (updatedItem: OrderItem) => {
        setOrderItems(orderItems.map(item => 
            item.id === updatedItem.id ? updatedItem : item
        ));
        setEditingItem(null);
    };

    const handleVoiceOrder = (transcription: string) => {
        console.log('Voice order:', transcription);
        // In production, this would use AI to parse the order
        setShowVoiceRecorder(false);
    };

    const seatOrders = orderItems.filter(item => item.seatId === currentSeat);
    const seatTotal = seatOrders.reduce((sum, item) => sum + item.price, 0);
    const grandTotal = orderItems.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="h-screen bg-background-dark text-white flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-surface-dark border-b border-white/10 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(`/pos/${tenantId}`)}
                        className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <div>
                        <h1 className="text-xl font-bold">
                            {isPepeBetos ? 'Pepe Betos - Order Entry' : 'New Order - Table 5'}
                        </h1>
                        {isPepeBetos && (
                            <p className="text-sm text-white/60">{restaurantInfo?.address}</p>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowVoiceRecorder(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark rounded-lg transition-colors"
                    >
                        <span className="material-symbols-outlined">mic</span>
                        <span className="font-semibold">Voice Order</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Left Side - Menu */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Search Bar */}
                    <div className="p-4 bg-surface-dark border-b border-white/10">
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
                                search
                            </span>
                            <input
                                type="text"
                                placeholder="Search menu..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="px-4 py-3 bg-surface-dark border-b border-white/10 overflow-x-auto hide-scrollbar">
                        <div className="flex gap-2 min-w-max">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-lg font-semibold transition-all whitespace-nowrap ${
                                        selectedCategory === category
                                            ? 'bg-primary text-white'
                                            : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Menu Items Grid */}
                    <div className="flex-1 overflow-y-auto p-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredItems.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => addItem(item)}
                                    className="bg-surface-dark hover:bg-white/10 rounded-2xl p-4 text-left transition-all border border-white/5 hover:border-primary/50 group"
                                >
                                    <div className="text-4xl mb-2">{item.image}</div>
                                    <h3 className="font-semibold text-white mb-1 group-hover:text-primary transition-colors">
                                        {item.name}
                                    </h3>
                                    <p className="text-sm text-white/40 mb-2">{item.category}</p>
                                    <p className="text-lg font-bold text-primary">
                                        ${item.price.toFixed(2)}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side - Order Summary */}
                <div className="w-96 bg-surface-dark border-l border-white/10 flex flex-col">
                    {/* Seat Tabs */}
                    <SeatTabs currentSeat={currentSeat} onSeatChange={setCurrentSeat} />

                    {/* Order Items */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {seatOrders.length === 0 ? (
                            <div className="text-center text-white/40 mt-12">
                                <span className="material-symbols-outlined text-6xl mb-4 opacity-20">
                                    restaurant_menu
                                </span>
                                <p>No items yet</p>
                                <p className="text-sm mt-2">Add items from the menu</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {seatOrders.map(item => (
                                    <div
                                        key={item.id}
                                        className="bg-white/5 rounded-xl p-3 border border-white/10"
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex-1">
                                                <h4 className="font-semibold">{item.name}</h4>
                                                <p className="text-primary font-bold">${item.price.toFixed(2)}</p>
                                            </div>
                                            <div className="flex gap-1">
                                                <button
                                                    onClick={() => editItem(item)}
                                                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-sm">edit</span>
                                                </button>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="p-1.5 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-sm">delete</span>
                                                </button>
                                            </div>
                                        </div>
                                        {item.notes && item.notes.length > 0 && (
                                            <div className="text-xs text-white/60 space-y-1">
                                                {item.notes.map((note, i) => (
                                                    <div key={i} className="flex items-start gap-1">
                                                        <span className="material-symbols-outlined text-xs">edit_note</span>
                                                        <span>{note}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Totals & Actions */}
                    <div className="border-t border-white/10 p-4 space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-white/60">Seat {currentSeat} Subtotal</span>
                            <span className="font-semibold">${seatTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold">
                            <span>Total (All Seats)</span>
                            <span className="text-primary">${grandTotal.toFixed(2)}</span>
                        </div>
                        <button
                            disabled={orderItems.length === 0}
                            className="w-full bg-primary hover:bg-primary-dark disabled:bg-white/10 disabled:text-white/40 text-white py-3 rounded-xl font-semibold transition-all disabled:cursor-not-allowed"
                        >
                            Send to Kitchen
                        </button>
                    </div>
                </div>
            </div>

            {/* Voice Recorder Modal */}
            {showVoiceRecorder && (
                <VoiceRecorder
                    onClose={() => setShowVoiceRecorder(false)}
                    onComplete={handleVoiceOrder}
                />
            )}

            {/* Edit Item Modal */}
            {editingItem && (
                <EditItemModal
                    item={editingItem}
                    onSave={saveItemEdits}
                    onClose={() => setEditingItem(null)}
                />
            )}
        </div>
    );
};
