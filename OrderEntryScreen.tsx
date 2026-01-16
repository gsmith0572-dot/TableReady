import React, { useState, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { VoiceRecorder } from './components/VoiceRecorder';
import { EditItemModal } from './components/EditItemModal';
import { MenuItem, OrderItem } from './types';
import { MENU_ITEMS, CATEGORIES, SEATS } from './constants';

export const OrderEntryScreen: React.FC = () => {
    const navigate = useNavigate();
    const { tenantId } = useParams<{ tenantId: string }>();
    const [activeSeatId, setActiveSeatId] = useState<string>('seat-1');
    const [activeCategory, setActiveCategory] = useState<string>('Mains');
    const [editingItem, setEditingItem] = useState<OrderItem | null>(null);
    const [orderItems, setOrderItems] = useState<OrderItem[]>([
        { id: 'init-1', menuId: 'b2', name: 'Negroni', price: 14.00, seatId: 'seat-1', status: 'pending' },
        { id: 'init-2', menuId: 'p2', name: 'Ribeye Steak', price: 45.00, seatId: 'seat-1', notes: ['Medium Rare', 'No Sauce'], status: 'pending' },
        { id: 'init-3', menuId: 's3', name: 'Calamari', price: 16.00, seatId: 'seat-1', status: 'pending' }
    ]);

    // --- Actions ---

    const handleAddItem = (menuItem: MenuItem) => {
        const newItem: OrderItem = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
            menuId: menuItem.id,
            name: menuItem.name,
            price: menuItem.price,
            seatId: activeSeatId,
            status: 'pending'
        };
        setOrderItems(prev => [...prev, newItem]);
    };

    const handleRepeatItem = (item: OrderItem) => {
        const newItem: OrderItem = {
            ...item,
            id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
            status: 'pending'
        };
        setOrderItems(prev => [...prev, newItem]);
    };

    const handleAIOrderParsed = (parsedItems: any[]) => {
        if (parsedItems.length === 0) return;
        const newItems: OrderItem[] = [];
        parsedItems.forEach(parsed => {
            const matchedMenu = MENU_ITEMS.find(m => m.name.toLowerCase().includes(parsed.name.toLowerCase())) 
                             || MENU_ITEMS.find(m => parsed.name.toLowerCase().includes(m.name.toLowerCase()));
            if (matchedMenu) {
                for(let i=0; i< (parsed.quantity || 1); i++) {
                    newItems.push({
                        id: Date.now().toString() + Math.random().toString(36).substr(2, 9) + i,
                        menuId: matchedMenu.id,
                        name: matchedMenu.name,
                        price: matchedMenu.price,
                        seatId: parsed.targetSeat || activeSeatId,
                        notes: parsed.notes ? [parsed.notes] : undefined,
                        status: 'pending'
                    });
                }
            }
        });
        if (newItems.length > 0) {
            setOrderItems(prev => [...prev, ...newItems]);
        }
    };

    const currentSeatItems = useMemo(() => 
        orderItems.filter(item => item.seatId === activeSeatId),
    [orderItems, activeSeatId]);

    const filteredMenu = useMemo(() => 
        MENU_ITEMS.filter(item => item.category === activeCategory),
    [activeCategory]);

    const totalAmount = useMemo(() => 
        orderItems.reduce((sum, item) => sum + item.price, 0),
    [orderItems]);

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-gray-900 dark:text-white h-screen w-full overflow-hidden flex flex-col selection:bg-primary/30 relative">
            
            {/* Main Content (Blurred when modal is open) */}
            <div className={`flex flex-col h-full w-full transition-all duration-300 ${editingItem ? 'filter blur-sm brightness-50 pointer-events-none' : ''}`}>
                
                {/* Header */}
                <header className="shrink-0 flex items-center justify-between px-4 pt-4 pb-2 bg-background-light dark:bg-background-dark z-20">
                    <div className="flex items-center gap-3">
                        <button onClick={() => navigate(`/pos/${tenantId}`)} className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                            <span className="material-symbols-outlined text-gray-900 dark:text-white" style={{fontSize: "24px"}}>arrow_back</span>
                        </button>
                        <div className="flex flex-col">
                            <h2 className="text-base font-bold leading-tight">Table 4 • Walk-in</h2>
                            <span className="text-xs text-primary font-medium">Server: Sarah M.</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                            <span className="material-symbols-outlined text-gray-500 dark:text-[#92adc9]" style={{fontSize: "24px"}}>search</span>
                        </button>
                        <button className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                            <span className="material-symbols-outlined text-gray-500 dark:text-[#92adc9]" style={{fontSize: "24px"}}>more_vert</span>
                        </button>
                    </div>
                </header>

                {/* Split View */}
                <div className="flex flex-col flex-1 h-full overflow-hidden relative">
                    
                    {/* TOP PANE: Ticket View */}
                    <section className="shrink-0 h-[42%] flex flex-col bg-background-light dark:bg-background-dark border-b border-gray-200 dark:border-white/5 relative z-10 shadow-lg">
                        {/* Seat Tabs */}
                        <div className="px-4 py-2 shrink-0">
                            <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
                                {SEATS.map(seat => {
                                    const isActive = activeSeatId === seat.id;
                                    return (
                                        <button 
                                            key={seat.id}
                                            onClick={() => setActiveSeatId(seat.id)}
                                            className={`
                                                flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full pl-3 pr-4 transition-all
                                                ${isActive 
                                                    ? 'bg-primary text-white shadow-md shadow-primary/20 scale-95' 
                                                    : 'bg-gray-200 dark:bg-[#233648] text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-[#2f455a]'}
                                            `}
                                        >
                                            <span className="material-symbols-outlined text-[18px]">{seat.icon}</span>
                                            <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}>{seat.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Ticket List */}
                        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
                            {currentSeatItems.map(item => {
                                const menuItem = MENU_ITEMS.find(m => m.id === item.menuId);
                                return (
                                    <div key={item.id} className="flex items-center gap-3 p-2 -mx-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors group">
                                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-12 shadow-sm shrink-0" style={{backgroundImage: `url("${menuItem?.image}")`}}></div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-baseline">
                                                <p className="text-gray-900 dark:text-white text-base font-semibold truncate">1x {item.name}</p>
                                                <span className="text-gray-500 dark:text-[#92adc9] text-sm font-medium">${item.price.toFixed(2)}</span>
                                            </div>
                                            {item.notes && item.notes.length > 0 ? (
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                    {item.notes.map((note, idx) => (
                                                        <span key={idx} className="text-xs font-medium text-gray-500 dark:text-[#92adc9] bg-gray-200 dark:bg-[#233648] px-1.5 py-0.5 rounded">{note}</span>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-gray-500 dark:text-gray-400 text-xs truncate">Seat 1 • Standard</p>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => setEditingItem(item)} className="text-primary text-sm font-medium px-2 py-1 rounded hover:bg-primary/10">Edit</button>
                                            <button onClick={() => handleRepeatItem(item)} className="shrink-0 size-10 flex items-center justify-center rounded-full bg-primary/10 text-primary active:bg-primary active:text-white transition-colors">
                                                <span className="material-symbols-outlined">replay</span>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        {/* Drag Handle */}
                        <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-1 pointer-events-none">
                            <div className="w-12 h-1 bg-gray-300 dark:bg-white/20 rounded-full"></div>
                        </div>
                    </section>

                    {/* BOTTOM PANE: Menu Grid */}
                    <section className="flex-1 bg-surface-light dark:bg-surface-dark rounded-t-3xl -mt-4 pt-5 pb-24 shadow-[0_-4px_24px_rgba(0,0,0,0.1)] dark:shadow-none flex flex-col overflow-hidden relative z-20">
                        <div className="px-4 pb-4">
                            <div className="flex h-12 w-full items-center rounded-full bg-gray-100 dark:bg-[#101922] p-1 gap-1 overflow-x-auto hide-scrollbar">
                                {CATEGORIES.map(cat => (
                                    <button 
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`
                                            cursor-pointer h-full min-w-[80px] flex-1 flex items-center justify-center rounded-full transition-all
                                            ${activeCategory === cat 
                                                ? 'bg-white dark:bg-[#233648] text-primary shadow-sm font-bold' 
                                                : 'text-gray-500 dark:text-gray-400 font-medium'}
                                        `}
                                    >
                                        <span className="text-sm">{cat}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto px-4">
                            <div className="grid grid-cols-2 gap-3 pb-4">
                                {filteredMenu.map(item => (
                                    <button key={item.id} onClick={() => handleAddItem(item)} className="relative group flex flex-col h-40 rounded-2xl overflow-hidden bg-gray-50 dark:bg-[#233648] active:scale-[0.98] transition-all">
                                        <div className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-70 transition-opacity" style={{backgroundImage: `url("${item.image}")`}}></div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 w-full p-3 text-left">
                                            <span className="block text-white font-bold text-lg leading-tight mb-0.5">{item.name}</span>
                                            <span className="block text-gray-300 font-medium text-sm">${item.price.toFixed(2)}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Footer */}
                    <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-white via-white/95 to-transparent dark:from-background-dark dark:via-background-dark/95 z-30 pointer-events-none flex items-end">
                        <button className="pointer-events-auto w-full h-14 bg-primary text-white rounded-full flex items-center justify-between px-6 shadow-xl shadow-primary/30 active:scale-[0.99] transition-transform hover:bg-primary/90">
                            <span className="text-lg font-bold">Send to Kitchen</span>
                            <span className="text-lg font-bold opacity-90">${totalAmount.toFixed(2)}</span>
                        </button>
                    </div>

                    <VoiceRecorder onOrderParsed={handleAIOrderParsed} />
                </div>
            </div>

            {/* Edit Modal Overlay */}
            <EditItemModal 
                isOpen={!!editingItem} 
                onClose={() => setEditingItem(null)} 
                itemName={editingItem?.name || ''} 
                itemPrice={editingItem?.price || 0}
                category="Entrees"
            />
        </div>
    );
};