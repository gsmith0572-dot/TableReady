import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface ActiveOrder {
    id: string;
    tableNumber: string;
    items: Array<{
        name: string;
        quantity: number;
        modifiers?: string[];
    }>;
    total: number;
    sentAt: string;
    status: 'sent' | 'preparing' | 'ready' | 'delivered';
    waiterName: string;
}

export const ActiveOrdersScreen: React.FC = () => {
    const navigate = useNavigate();
    const { tenantId } = useParams<{ tenantId: string }>();
    const [waiterInfo, setWaiterInfo] = useState<any>(null);
    const [activeOrders, setActiveOrders] = useState<ActiveOrder[]>([]);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const waiterData = localStorage.getItem('currentWaiter');
        if (waiterData) {
            setWaiterInfo(JSON.parse(waiterData));
        } else {
            navigate('/');
        }

        // Load active orders from localStorage
        const ordersData = localStorage.getItem('activeOrders');
        if (ordersData) {
            setActiveOrders(JSON.parse(ordersData));
        }

        // Update timer every second
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, [navigate]);

    const getElapsedTime = (sentAt: string): string => {
        const sent = new Date(sentAt);
        const now = currentTime;
        const diffMs = now.getTime() - sent.getTime();
        const minutes = Math.floor(diffMs / 60000);
        const seconds = Math.floor((diffMs % 60000) / 1000);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const getOrderStatus = (sentAt: string): 'normal' | 'warning' | 'critical' => {
        const sent = new Date(sentAt);
        const now = currentTime;
        const minutes = Math.floor((now.getTime() - sent.getTime()) / 60000);
        
        if (minutes >= 15) return 'critical';
        if (minutes >= 10) return 'warning';
        return 'normal';
    };

    const markAsDelivered = (orderId: string) => {
        const updatedOrders = activeOrders.filter(o => o.id !== orderId);
        setActiveOrders(updatedOrders);
        localStorage.setItem('activeOrders', JSON.stringify(updatedOrders));
    };

    const filteredOrders = activeOrders.filter(order => 
        order.waiterName === waiterInfo?.name
    );

    if (!waiterInfo) {
        return null;
    }

    return (
        <div className="h-screen bg-background-dark text-white flex flex-col">
            {/* Header */}
            <div className="bg-surface-dark border-b border-white/10 px-4 py-3 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate(`/waiter/${tenantId}`)}
                        className="p-2 hover:bg-white/5 rounded-lg transition-colors active:scale-95"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <div>
                        <h1 className="text-lg font-bold">Active Orders</h1>
                        <p className="text-xs text-white/60">Your pending orders</p>
                    </div>
                </div>
                <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-bold">
                    {filteredOrders.length} Active
                </div>
            </div>

            {/* Orders List */}
            <div className="flex-1 overflow-y-auto p-4">
                {filteredOrders.length === 0 ? (
                    <div className="text-center text-white/40 mt-12">
                        <span className="material-symbols-outlined text-6xl mb-4 opacity-20">
                            receipt_long
                        </span>
                        <p>No active orders</p>
                        <p className="text-sm mt-2">Orders you send will appear here</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredOrders.map(order => {
                            const elapsedTime = getElapsedTime(order.sentAt);
                            const status = getOrderStatus(order.sentAt);
                            
                            return (
                                <div
                                    key={order.id}
                                    className={`rounded-xl p-4 border-2 ${
                                        status === 'critical' 
                                            ? 'bg-red-500/10 border-red-500' 
                                            : status === 'warning'
                                            ? 'bg-yellow-500/10 border-yellow-500'
                                            : 'bg-green-500/10 border-green-500/30'
                                    }`}
                                >
                                    {/* Order Header */}
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                                status === 'critical' 
                                                    ? 'bg-red-500' 
                                                    : status === 'warning'
                                                    ? 'bg-yellow-500'
                                                    : 'bg-green-500'
                                            }`}>
                                                <span className="material-symbols-outlined text-2xl">
                                                    restaurant
                                                </span>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold">Table {order.tableNumber}</h3>
                                                <p className="text-sm text-white/60">{order.items.length} items • ${order.total.toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className={`text-2xl font-mono font-bold ${
                                                status === 'critical' 
                                                    ? 'text-red-400' 
                                                    : status === 'warning'
                                                    ? 'text-yellow-400'
                                                    : 'text-green-400'
                                            }`}>
                                                {elapsedTime}
                                            </div>
                                            <div className="text-xs text-white/60">elapsed</div>
                                        </div>
                                    </div>

                                    {/* Status Badge */}
                                    <div className="mb-3">
                                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
                                            order.status === 'ready'
                                                ? 'bg-blue-500 text-white'
                                                : order.status === 'preparing'
                                                ? 'bg-orange-500 text-white'
                                                : 'bg-gray-500 text-white'
                                        }`}>
                                            {order.status === 'ready' && (
                                                <>
                                                    <span className="material-symbols-outlined text-lg">check_circle</span>
                                                    Ready for Pickup
                                                </>
                                            )}
                                            {order.status === 'preparing' && (
                                                <>
                                                    <span className="material-symbols-outlined text-lg">cooking</span>
                                                    Preparing
                                                </>
                                            )}
                                            {order.status === 'sent' && (
                                                <>
                                                    <span className="material-symbols-outlined text-lg">schedule</span>
                                                    Sent to Kitchen
                                                </>
                                            )}
                                        </span>
                                    </div>

                                    {/* Warning Messages */}
                                    {status === 'critical' && (
                                        <div className="mb-3 bg-red-500/20 border border-red-500 rounded-lg p-3 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-red-400">warning</span>
                                            <span className="text-sm font-semibold text-red-400">
                                                🚨 CRITICAL: Order taking too long! Check with kitchen.
                                            </span>
                                        </div>
                                    )}
                                    {status === 'warning' && (
                                        <div className="mb-3 bg-yellow-500/20 border border-yellow-500 rounded-lg p-3 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-yellow-400">schedule</span>
                                            <span className="text-sm font-semibold text-yellow-400">
                                                ⚠️ Order has been waiting for 10+ minutes
                                            </span>
                                        </div>
                                    )}

                                    {/* Order Items */}
                                    <div className="space-y-2 mb-3">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="bg-white/5 rounded-lg p-2">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <span className="font-semibold">{item.quantity}x {item.name}</span>
                                                        {item.modifiers && item.modifiers.length > 0 && (
                                                            <div className="text-xs text-white/60 mt-1">
                                                                {item.modifiers.join(', ')}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Actions */}
                                    {order.status === 'ready' && (
                                        <button
                                            onClick={() => markAsDelivered(order.id)}
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 active:scale-95"
                                        >
                                            <span className="material-symbols-outlined">done</span>
                                            Mark as Delivered
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};
