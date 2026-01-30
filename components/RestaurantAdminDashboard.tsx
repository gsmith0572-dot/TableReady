import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PEPEBETOS_INFO, PEPEBETOS_MENU } from '../constants';

interface WaiterStats {
    id: string;
    name: string;
    email: string;
    status: 'active' | 'clocked-out';
    hoursToday: number;
    hoursThisWeek: number;
    hoursThisMonth: number;
    ordersToday: number;
    salesGenerated: number;
    lastClockIn?: string;
    consistency: number; // 0-100 score
}

interface ItemSalesData {
    itemName: string;
    category: string;
    quantitySold: number;
    revenue: number;
}

export const RestaurantAdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const { tenantId } = useParams<{ tenantId: string }>();
    const [activeTab, setActiveTab] = useState<'overview' | 'staff' | 'reports' | 'menu' | 'settings'>('overview');
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [showInviteCode, setShowInviteCode] = useState(false);
    const [newWaiterEmail, setNewWaiterEmail] = useState('');
    const [newWaiterName, setNewWaiterName] = useState('');
    const [reportPeriod, setReportPeriod] = useState<'today' | 'week' | 'month'>('today');

    // Mock data - en producción vendría de Firestore
    const [waiters] = useState<WaiterStats[]>([
        { id: '1', name: 'Maria Garcia', email: 'maria@pepebetos.com', status: 'active', hoursToday: 4.5, hoursThisWeek: 32, hoursThisMonth: 142, ordersToday: 12, salesGenerated: 487.50, lastClockIn: '2026-01-28T14:00:00', consistency: 98 },
        { id: '2', name: 'Juan Martinez', email: 'juan@pepebetos.com', status: 'clocked-out', hoursToday: 8.0, hoursThisWeek: 38, hoursThisMonth: 156, ordersToday: 24, salesGenerated: 892.00, lastClockIn: '2026-01-28T09:00:00', consistency: 95 },
        { id: '3', name: 'Sofia Rodriguez', email: 'sofia@pepebetos.com', status: 'active', hoursToday: 3.2, hoursThisWeek: 28, hoursThisMonth: 118, ordersToday: 8, salesGenerated: 324.75, lastClockIn: '2026-01-28T15:30:00', consistency: 87 }
    ]);

    // Mock sales data por item
    const [topItems] = useState<ItemSalesData[]>([
        { itemName: 'Quesabirrias (3)', category: 'Tacos', quantitySold: 87, revenue: 1566.00 },
        { itemName: 'Happy Plate', category: 'From The Grill', quantitySold: 64, revenue: 1024.00 },
        { itemName: 'Chicken Fajitas', category: 'From The Grill', quantitySold: 52, revenue: 936.00 },
        { itemName: 'Taco Carne Asada', category: 'Tacos', quantitySold: 48, revenue: 216.00 },
        { itemName: 'Street Corn (Elote)', category: 'Botanas', quantitySold: 45, revenue: 270.00 }
    ]);

    const [topDrinks] = useState<ItemSalesData[]>([
        { itemName: 'Margarita (Lime Classic)', category: 'Drinks', quantitySold: 124, revenue: 992.00 },
        { itemName: 'Horchata', category: 'Drinks', quantitySold: 89, revenue: 311.50 },
        { itemName: 'Margarita (Strawberry)', category: 'Drinks', quantitySold: 76, revenue: 608.00 },
        { itemName: 'Mimosa (Orange)', category: 'Drinks', quantitySold: 67, revenue: 536.00 },
        { itemName: 'Mexican Soda', category: 'Drinks', quantitySold: 54, revenue: 162.00 }
    ]);

    // Mock data para días/horas de mayor tráfico
    const [trafficData] = useState({
        busiestDay: 'Saturday',
        slowestDay: 'Tuesday',
        peakHours: '6:00 PM - 8:00 PM',
        slowHours: '2:00 PM - 4:00 PM',
        topHoliday: "Valentine's Day",
        dailyStats: [
            { day: 'Monday', sales: 847, orders: 34 },
            { day: 'Tuesday', sales: 623, orders: 28 },
            { day: 'Wednesday', sales: 892, orders: 36 },
            { day: 'Thursday', sales: 1124, orders: 42 },
            { day: 'Friday', sales: 1876, orders: 68 },
            { day: 'Saturday', sales: 2341, orders: 89 },
            { day: 'Sunday', sales: 1654, orders: 61 }
        ]
    });

    const todaySales = 1247.50;
    const todayOrders = 44;
    const avgOrderValue = todaySales / todayOrders;
    const activeWaiters = waiters.filter(w => w.status === 'active').length;
    const topWaiter = waiters.sort((a, b) => b.consistency - a.consistency)[0];

    const handleInviteWaiter = () => {
        setShowInviteModal(false);
        setShowInviteCode(true);
    };

    const copyToClipboard = () => {
        const message = `Hi ${newWaiterName}!

You've been invited to join Pepe Betos on TableTech.

📱 App: https://tabletech-5d7f1.web.app
🏪 Restaurant Code: PEPEBETOS
👤 Your Name: ${newWaiterName}

Welcome to the team! 🎉`;

        navigator.clipboard.writeText(message);
        alert('Invitation copied! Send it via WhatsApp, SMS, or Email to ' + newWaiterEmail);
        setShowInviteCode(false);
        setNewWaiterEmail('');
        setNewWaiterName('');
    };

    const handleLogout = () => {
        localStorage.removeItem('adminSession');
        navigate('/');
    };

    return (
        <div className="h-screen bg-background-dark text-white flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-surface-dark border-b border-white/10 px-6 py-4 flex-shrink-0">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">{PEPEBETOS_INFO.name}</h1>
                        <p className="text-white/60 text-sm">Restaurant Admin Dashboard</p>
                    </div>
                    <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-all">
                        <span className="material-symbols-outlined">logout</span>
                        Log Out
                    </button>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-surface-dark/50 border-b border-white/10 px-6 flex-shrink-0">
                <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto">
                    {[
                        { id: 'overview', icon: 'dashboard', label: 'Overview' },
                        { id: 'staff', icon: 'group', label: 'Staff' },
                        { id: 'reports', icon: 'analytics', label: 'Reports' },
                        { id: 'menu', icon: 'restaurant_menu', label: 'Menu' },
                        { id: 'settings', icon: 'settings', label: 'Settings' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all whitespace-nowrap ${
                                activeTab === tab.id
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-white/60 hover:text-white'
                            }`}
                        >
                            <span className="material-symbols-outlined">{tab.icon}</span>
                            <span className="font-semibold">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-7xl mx-auto p-6">
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold">Today's Overview</h2>
                            
                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="bg-surface-dark rounded-2xl p-6 border border-white/10">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                                            <span className="material-symbols-outlined text-2xl text-green-400">payments</span>
                                        </div>
                                        <div>
                                            <p className="text-white/60 text-sm">Today's Sales</p>
                                            <p className="text-3xl font-bold text-green-400">${todaySales.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-surface-dark rounded-2xl p-6 border border-white/10">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                                            <span className="material-symbols-outlined text-2xl text-blue-400">receipt_long</span>
                                        </div>
                                        <div>
                                            <p className="text-white/60 text-sm">Orders</p>
                                            <p className="text-3xl font-bold text-blue-400">{todayOrders}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-surface-dark rounded-2xl p-6 border border-white/10">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                                            <span className="material-symbols-outlined text-2xl text-purple-400">trending_up</span>
                                        </div>
                                        <div>
                                            <p className="text-white/60 text-sm">Avg Order Value</p>
                                            <p className="text-3xl font-bold text-purple-400">${avgOrderValue.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-surface-dark rounded-2xl p-6 border border-white/10">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                                            <span className="material-symbols-outlined text-2xl text-orange-400">group</span>
                                        </div>
                                        <div>
                                            <p className="text-white/60 text-sm">Active Staff</p>
                                            <p className="text-3xl font-bold text-orange-400">{activeWaiters}/{waiters.length}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Currently Working */}
                            <div className="bg-surface-dark rounded-2xl p-6 border border-white/10">
                                <h3 className="text-xl font-bold mb-4">Currently Working</h3>
                                <div className="space-y-3">
                                    {waiters.filter(w => w.status === 'active').map(waiter => (
                                        <div key={waiter.id} className="flex items-center justify-between bg-white/5 rounded-xl p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                                    <span className="material-symbols-outlined text-white">person</span>
                                                </div>
                                                <div>
                                                    <p className="font-semibold">{waiter.name}</p>
                                                    <p className="text-sm text-white/60">{waiter.ordersToday} orders • ${waiter.salesGenerated.toFixed(2)} sales</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-green-400">{waiter.hoursToday.toFixed(1)}h</p>
                                                <p className="text-xs text-white/60">clocked in</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'staff' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold">Staff Management</h2>
                                <button
                                    onClick={() => setShowInviteModal(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark rounded-xl transition-all"
                                >
                                    <span className="material-symbols-outlined">person_add</span>
                                    Invite New Waiter
                                </button>
                            </div>

                            {/* Staff List */}
                            <div className="bg-surface-dark rounded-2xl border border-white/10 overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-white/5">
                                        <tr>
                                            <th className="text-left p-4 font-semibold">Name</th>
                                            <th className="text-left p-4 font-semibold">Status</th>
                                            <th className="text-left p-4 font-semibold">Hours (Month)</th>
                                            <th className="text-left p-4 font-semibold">Orders</th>
                                            <th className="text-left p-4 font-semibold">Consistency</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {waiters.map(waiter => (
                                            <tr key={waiter.id} className="border-t border-white/10">
                                                <td className="p-4">
                                                    <div>
                                                        <p className="font-semibold">{waiter.name}</p>
                                                        <p className="text-xs text-white/60">{waiter.email}</p>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                                                        waiter.status === 'active' 
                                                            ? 'bg-green-500/20 text-green-400' 
                                                            : 'bg-gray-500/20 text-gray-400'
                                                    }`}>
                                                        <span className="w-2 h-2 rounded-full bg-current"></span>
                                                        {waiter.status === 'active' ? 'Active' : 'Clocked Out'}
                                                    </span>
                                                </td>
                                                <td className="p-4 font-semibold">{waiter.hoursThisMonth.toFixed(1)}h</td>
                                                <td className="p-4 font-semibold">{waiter.ordersToday}</td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                                                            <div className="bg-green-400 h-full" style={{width: `${waiter.consistency}%`}}></div>
                                                        </div>
                                                        <span className="text-sm font-semibold">{waiter.consistency}%</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'reports' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold">Sales & Performance Reports</h2>
                                <div className="flex gap-2">
                                    {(['today', 'week', 'month'] as const).map(period => (
                                        <button
                                            key={period}
                                            onClick={() => setReportPeriod(period)}
                                            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                                                reportPeriod === period
                                                    ? 'bg-primary text-white'
                                                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                                            }`}
                                        >
                                            {period.charAt(0).toUpperCase() + period.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Top Selling Items */}
                            <div className="bg-surface-dark rounded-2xl p-6 border border-white/10">
                                <h3 className="text-xl font-bold mb-4">🔥 Top Selling Items</h3>
                                <div className="space-y-2">
                                    {topItems.map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between bg-white/5 rounded-xl p-3">
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl font-bold text-white/40">#{idx + 1}</span>
                                                <div>
                                                    <p className="font-semibold">{item.itemName}</p>
                                                    <p className="text-xs text-white/60">{item.category}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-primary">${item.revenue.toFixed(2)}</p>
                                                <p className="text-xs text-white/60">{item.quantitySold} sold</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Top Selling Drinks */}
                            <div className="bg-surface-dark rounded-2xl p-6 border border-white/10">
                                <h3 className="text-xl font-bold mb-4">🍹 Top Selling Drinks</h3>
                                <div className="space-y-2">
                                    {topDrinks.map((drink, idx) => (
                                        <div key={idx} className="flex items-center justify-between bg-white/5 rounded-xl p-3">
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl font-bold text-white/40">#{idx + 1}</span>
                                                <div>
                                                    <p className="font-semibold">{drink.itemName}</p>
                                                    <p className="text-xs text-white/60">{drink.category}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-primary">${drink.revenue.toFixed(2)}</p>
                                                <p className="text-xs text-white/60">{drink.quantitySold} sold</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Traffic Analysis */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-surface-dark rounded-2xl p-6 border border-white/10">
                                    <h3 className="text-lg font-bold mb-4">📅 Daily Traffic</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-xl border border-green-500/30">
                                            <span className="font-semibold">Busiest Day</span>
                                            <span className="font-bold text-green-400">{trafficData.busiestDay}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-orange-500/10 rounded-xl border border-orange-500/30">
                                            <span className="font-semibold">Slowest Day</span>
                                            <span className="font-bold text-orange-400">{trafficData.slowestDay}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-surface-dark rounded-2xl p-6 border border-white/10">
                                    <h3 className="text-lg font-bold mb-4">⏰ Peak Hours</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center p-3 bg-blue-500/10 rounded-xl border border-blue-500/30">
                                            <span className="font-semibold">Peak Hours</span>
                                            <span className="font-bold text-blue-400">{trafficData.peakHours}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-purple-500/10 rounded-xl border border-purple-500/30">
                                            <span className="font-semibold">Slow Hours</span>
                                            <span className="font-bold text-purple-400">{trafficData.slowHours}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Top Holiday & Top Waiter */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-surface-dark rounded-2xl p-6 border border-white/10">
                                    <h3 className="text-lg font-bold mb-4">🎉 Top Holiday</h3>
                                    <div className="p-4 bg-primary/10 rounded-xl border border-primary/30 text-center">
                                        <p className="text-3xl font-bold text-primary">{trafficData.topHoliday}</p>
                                        <p className="text-sm text-white/60 mt-2">Highest sales & traffic</p>
                                    </div>
                                </div>

                                <div className="bg-surface-dark rounded-2xl p-6 border border-white/10">
                                    <h3 className="text-lg font-bold mb-4">⭐ Top Performer</h3>
                                    <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/30">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                                                <span className="material-symbols-outlined text-white text-2xl">star</span>
                                            </div>
                                            <div>
                                                <p className="text-xl font-bold">{topWaiter.name}</p>
                                                <p className="text-sm text-white/60">{topWaiter.consistency}% consistency • {topWaiter.hoursThisMonth}h this month</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Weekly Sales Chart */}
                            <div className="bg-surface-dark rounded-2xl p-6 border border-white/10">
                                <h3 className="text-xl font-bold mb-4">📊 Weekly Sales Overview</h3>
                                <div className="space-y-2">
                                    {trafficData.dailyStats.map(stat => {
                                        const maxSales = Math.max(...trafficData.dailyStats.map(s => s.sales));
                                        const width = (stat.sales / maxSales) * 100;
                                        return (
                                            <div key={stat.day} className="flex items-center gap-3">
                                                <span className="w-24 text-sm font-semibold">{stat.day}</span>
                                                <div className="flex-1 bg-white/10 rounded-full h-8 overflow-hidden relative">
                                                    <div 
                                                        className="bg-gradient-to-r from-primary to-primary-dark h-full flex items-center justify-end px-3 transition-all"
                                                        style={{width: `${width}%`}}
                                                    >
                                                        <span className="text-xs font-bold text-white">${stat.sales}</span>
                                                    </div>
                                                </div>
                                                <span className="text-sm text-white/60 w-16 text-right">{stat.orders} orders</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'menu' && (
                        <div className="text-center py-12">
                            <span className="material-symbols-outlined text-6xl text-white/20 mb-4">restaurant_menu</span>
                            <p className="text-white/60">Menu management coming soon</p>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold">Restaurant Settings</h2>
                            <div className="bg-surface-dark rounded-2xl p-6 border border-white/10">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Restaurant Name</label>
                                        <input type="text" value={PEPEBETOS_INFO.name} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" readOnly />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Address</label>
                                        <input type="text" value={PEPEBETOS_INFO.address} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" readOnly />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Phone</label>
                                        <input type="text" value={PEPEBETOS_INFO.phone} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" readOnly />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Invite Modal */}
            {showInviteModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-surface-dark rounded-3xl max-w-md w-full p-6 border border-white/10">
                        <h3 className="text-xl font-bold mb-4">Invite New Waiter</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={newWaiterName}
                                    onChange={(e) => setNewWaiterName(e.target.value)}
                                    placeholder="Maria Garcia"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Contact (Email/Phone)</label>
                                <input
                                    type="text"
                                    value={newWaiterEmail}
                                    onChange={(e) => setNewWaiterEmail(e.target.value)}
                                    placeholder="maria@pepebetos.com or 318-414-3053"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40"
                                />
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowInviteModal(false)}
                                    className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleInviteWaiter}
                                    disabled={!newWaiterName || !newWaiterEmail}
                                    className="flex-1 px-4 py-3 bg-primary hover:bg-primary-dark disabled:bg-white/10 disabled:text-white/40 rounded-xl transition-all"
                                >
                                    Generate Invite
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Invite Code Modal */}
            {showInviteCode && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-surface-dark rounded-3xl max-w-md w-full p-6 border border-white/10">
                        <h3 className="text-xl font-bold mb-4">✅ Invitation Ready!</h3>
                        <p className="text-white/60 mb-4">Copy this message and send it to {newWaiterName}:</p>
                        <div className="bg-white/5 rounded-xl p-4 mb-4 text-sm">
                            <p className="font-mono text-white/80 whitespace-pre-wrap">
                                Hi {newWaiterName}!{'\n\n'}
                                You've been invited to join Pepe Betos on TableTech.{'\n\n'}
                                📱 App: https://tabletech-5d7f1.web.app{'\n'}
                                🏪 Restaurant Code: PEPEBETOS{'\n'}
                                👤 Your Name: {newWaiterName}{'\n\n'}
                                Welcome to the team! 🎉
                            </p>
                        </div>
                        <button
                            onClick={copyToClipboard}
                            className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined">content_copy</span>
                            Copy & Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Add this import at the top:
// import { LogoUploader } from './LogoUploader';

// Add logo state near other useState declarations:
// const [restaurantLogo, setRestaurantLogo] = useState<string>('');

// In the Settings tab, replace the existing code with:
