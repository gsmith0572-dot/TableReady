import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { OrderItem, MenuItem, SelectedModifier } from './types';
import { PEPEBETOS_MENU, PEPEBETOS_CATEGORIES } from './constants';

export const OrderEntryScreen: React.FC = () => {
    const navigate = useNavigate();
    const { tenantId, tableNumber } = useParams<{ tenantId: string; tableNumber: string }>();
    const [waiterInfo, setWaiterInfo] = useState<any>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
    const [selectedModifiers, setSelectedModifiers] = useState<SelectedModifier[]>([]);
    const [specialNotes, setSpecialNotes] = useState<string>('');
    const [showOrderSummary, setShowOrderSummary] = useState(false);

    useEffect(() => {
        const waiterData = localStorage.getItem('currentWaiter');
        if (waiterData) {
            setWaiterInfo(JSON.parse(waiterData));
        } else {
            navigate('/');
        }
    }, [navigate]);

    const filteredItems = PEPEBETOS_MENU.filter(item => {
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleItemClick = (menuItem: MenuItem) => {
        if (menuItem.modifiers && menuItem.modifiers.length > 0) {
            setSelectedItem(menuItem);
            setSelectedModifiers([]);
            setSpecialNotes('');
        } else {
            addItemToOrder(menuItem, [], '');
        }
    };

    const addItemToOrder = (menuItem: MenuItem, modifiers: SelectedModifier[], notes: string) => {
        const newItem: OrderItem = {
            id: Date.now().toString(),
            menuId: menuItem.id,
            name: menuItem.name,
            price: calculateItemPrice(menuItem, modifiers),
            tableNumber: tableNumber || '',
            waiterId: waiterInfo?.id || 'temp',
            waiterName: waiterInfo?.name || 'Unknown',
            notes: notes,
            selectedModifiers: modifiers,
            status: 'pending',
            timestamp: new Date().toISOString()
        };
        setOrderItems([...orderItems, newItem]);
        setSelectedItem(null);
    };

    const calculateItemPrice = (menuItem: MenuItem, modifiers: SelectedModifier[]): number => {
        let totalPrice = menuItem.price;
        modifiers.forEach(mod => {
            const modifier = menuItem.modifiers?.find(m => m.id === mod.modifierId);
            if (modifier) {
                mod.selectedOptions.forEach(optionName => {
                    const option = modifier.options.find(o => o.name === optionName);
                    if (option?.priceModifier) {
                        totalPrice += option.priceModifier;
                    }
                });
            }
        });
        return totalPrice;
    };

    const handleModifierChange = (modifierId: string, modifierName: string, optionName: string, isMultiSelect: boolean) => {
        setSelectedModifiers(prev => {
            const existing = prev.find(m => m.modifierId === modifierId);
            if (isMultiSelect) {
                if (existing) {
                    const hasOption = existing.selectedOptions.includes(optionName);
                    if (hasOption) {
                        const newOptions = existing.selectedOptions.filter(o => o !== optionName);
                        if (newOptions.length === 0) {
                            return prev.filter(m => m.modifierId !== modifierId);
                        }
                        return prev.map(m => m.modifierId === modifierId ? { ...m, selectedOptions: newOptions } : m);
                    } else {
                        return prev.map(m => m.modifierId === modifierId ? { ...m, selectedOptions: [...m.selectedOptions, optionName] } : m);
                    }
                } else {
                    return [...prev, { modifierId, modifierName, selectedOptions: [optionName] }];
                }
            } else {
                if (existing) {
                    return prev.map(m => m.modifierId === modifierId ? { ...m, selectedOptions: [optionName] } : m);
                } else {
                    return [...prev, { modifierId, modifierName, selectedOptions: [optionName] }];
                }
            }
        });
    };

    const removeItem = (id: string) => {
        setOrderItems(orderItems.filter(item => item.id !== id));
    };

    const sendToKitchen = () => {
        if (orderItems.length === 0) {
            alert('Please add items to the order');
            return;
        }
        const activeOrder = {
            id: Date.now().toString(),
            tableNumber: tableNumber || '',
            items: orderItems.map(item => ({
                name: item.name,
                quantity: 1,
                modifiers: item.selectedModifiers?.map(m => `${m.modifierName}: ${m.selectedOptions.join(', ')}`)
            })),
            total: orderTotal,
            sentAt: new Date().toISOString(),
            status: 'sent',
            waiterName: waiterInfo?.name || 'Unknown'
        };
        const existingOrders = JSON.parse(localStorage.getItem('activeOrders') || '[]');
        existingOrders.push(activeOrder);
        localStorage.setItem('activeOrders', JSON.stringify(existingOrders));
        alert(`Order sent!\nTable: ${tableNumber}\nItems: ${orderItems.length}\nTotal: $${orderTotal.toFixed(2)}`);
        setOrderItems([]);
        setShowOrderSummary(false);
        navigate(`/waiter/${tenantId}`);
    };

    const orderTotal = orderItems.reduce((sum, item) => sum + item.price, 0);
    if (!waiterInfo) return null;

    return (
        <div className="h-screen bg-background-dark text-white flex flex-col">
            <div className="bg-surface-dark border-b border-white/10 px-4 py-3 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate(`/waiter/${tenantId}`)} className="p-2 hover:bg-white/5 rounded-lg active:scale-95"><span className="material-symbols-outlined">arrow_back</span></button>
                    <div><h1 className="text-lg font-bold">Table {tableNumber}</h1><p className="text-xs text-white/60">{waiterInfo.name}</p></div>
                </div>
                <button onClick={() => setShowOrderSummary(!showOrderSummary)} className="md:hidden relative bg-primary text-white p-2 rounded-lg active:scale-95">
                    <span className="material-symbols-outlined">shopping_cart</span>
                    {orderItems.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">{orderItems.length}</span>}
                </button>
            </div>

            {showOrderSummary && (
                <div className="md:hidden fixed inset-0 bg-background-dark z-50 flex flex-col">
                    <div className="bg-surface-dark border-b border-white/10 px-4 py-4 flex items-center justify-between flex-shrink-0">
                        <div><h2 className="text-lg font-bold">Current Order</h2><p className="text-sm text-white/60">{orderItems.length} items</p></div>
                        <button onClick={() => setShowOrderSummary(false)} className="p-2"><span className="material-symbols-outlined">close</span></button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4">{orderItems.length === 0 ? (<div className="text-center text-white/40 mt-12"><span className="material-symbols-outlined text-6xl mb-4 opacity-20">restaurant_menu</span><p>No items</p></div>) : (<div className="space-y-3">{orderItems.map(item => (<div key={item.id} className="bg-surface-dark rounded-xl p-4 border border-white/10"><div className="flex justify-between mb-2"><div><h4 className="font-semibold">{item.name}</h4><p className="text-primary font-bold">${item.price.toFixed(2)}</p></div><button onClick={() => removeItem(item.id)} className="p-2 text-red-400"><span className="material-symbols-outlined">delete</span></button></div>{item.selectedModifiers && item.selectedModifiers.length > 0 && (<div className="text-sm text-white/60 space-y-1 mb-2">{item.selectedModifiers.map((mod, i) => (<div key={i}><span className="font-semibold">{mod.modifierName}:</span> {mod.selectedOptions.join(', ')}</div>))}</div>)}{item.notes && (<div className="text-sm text-yellow-400 flex items-start gap-1 mt-2 bg-yellow-500/10 p-2 rounded"><span className="material-symbols-outlined text-lg">edit_note</span><span>{item.notes}</span></div>)}</div>))}</div>)}</div>
                    <div className="border-t border-white/10 p-4 bg-surface-dark space-y-3 flex-shrink-0"><div className="flex justify-between"><span className="text-xl font-bold">Total</span><span className="text-2xl font-bold text-green-400">${orderTotal.toFixed(2)}</span></div><button disabled={orderItems.length === 0} onClick={sendToKitchen} className="w-full bg-green-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2"><span className="material-symbols-outlined">send</span>Send to Kitchen</button></div>
                </div>
            )}

            <div className="flex-1 flex overflow-hidden">
                <div className={`flex-1 flex flex-col overflow-hidden ${showOrderSummary ? 'hidden md:flex' : 'flex'}`}>
                    <div className="p-3 bg-surface-dark border-b border-white/10"><input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white" /></div>
                    <div className="px-3 py-2 bg-surface-dark border-b border-white/10 overflow-x-auto"><div className="flex gap-2">{PEPEBETOS_CATEGORIES.map(cat => (<button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap ${selectedCategory === cat ? 'bg-primary text-white' : 'bg-white/5 text-white/60'}`}>{cat}</button>))}</div></div>
                    <div className="flex-1 overflow-y-auto p-3"><div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">{filteredItems.map(item => (<button key={item.id} onClick={() => handleItemClick(item)} className="bg-surface-dark rounded-xl p-3 text-left border border-white/5 active:scale-95"><div className="text-3xl mb-2">{item.image}</div><h3 className="font-semibold text-sm mb-1 line-clamp-2">{item.name}</h3><p className="text-lg font-bold text-primary">${item.price.toFixed(2)}</p>{item.modifiers && item.modifiers.length > 0 && (<div className="mt-1 text-xs text-white/60 flex items-center gap-1"><span className="material-symbols-outlined text-xs">tune</span>Options</div>)}</button>))}</div></div>
                </div>
            </div>

            {selectedItem && (<div className="fixed inset-0 bg-black/80 flex items-end md:items-center justify-center z-50"><div className="bg-surface-dark rounded-t-3xl md:rounded-3xl w-full md:max-w-2xl max-h-[90vh] overflow-y-auto border-t border-white/10 md:border"><div className="sticky top-0 bg-surface-dark border-b border-white/10 p-4 flex items-center justify-between z-10"><div><h2 className="text-xl font-bold">{selectedItem.name}</h2><p className="text-primary font-bold">${selectedItem.price.toFixed(2)}</p></div><button onClick={() => setSelectedItem(null)} className="p-2 hover:bg-white/10 rounded-lg"><span className="material-symbols-outlined">close</span></button></div><div className="p-4 space-y-4 pb-24">{selectedItem.modifiers?.map(modifier => (<div key={modifier.id} className="space-y-2"><div className="flex items-center justify-between"><h3 className="font-bold">{modifier.name}</h3>{modifier.required && <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">Required</span>}</div><div className="grid grid-cols-2 gap-2">{modifier.options.map(option => {const isSelected = selectedModifiers.find(m => m.modifierId === modifier.id)?.selectedOptions.includes(option.name); return (<button key={option.id} onClick={() => handleModifierChange(modifier.id, modifier.name, option.name, modifier.multiSelect)} className={`p-3 rounded-xl border-2 text-left text-sm active:scale-95 ${isSelected ? 'bg-primary border-primary text-white' : 'bg-white/5 border-white/10'}`}><div className="font-semibold">{option.name}</div>{option.priceModifier && <div className="text-xs text-green-400">+${option.priceModifier.toFixed(2)}</div>}</button>);})}</div></div>))}<div className="space-y-2"><h3 className="font-bold">Special Instructions</h3><textarea value={specialNotes} onChange={(e) => setSpecialNotes(e.target.value)} placeholder="Any special requests..." className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary min-h-20" /></div></div><div className="sticky bottom-0 bg-surface-dark border-t border-white/10 p-4"><button onClick={() => {const missingRequired = selectedItem.modifiers?.filter(m => {if (!m.required) return false; return !selectedModifiers.find(sm => sm.modifierId === m.id);}); if (missingRequired && missingRequired.length > 0) {alert(`Please select: ${missingRequired.map(m => m.name).join(', ')}`); return;} addItemToOrder(selectedItem, selectedModifiers, specialNotes);}} className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg active:scale-95">Add to Order - ${calculateItemPrice(selectedItem, selectedModifiers).toFixed(2)}</button></div></div></div>)}
        </div>
    );
};
