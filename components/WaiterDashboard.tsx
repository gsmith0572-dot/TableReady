import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TABLES, PEPEBETOS_INFO } from '../constants';

export const WaiterDashboard: React.FC = () => {
    const navigate = useNavigate();
    const { tenantId } = useParams<{ tenantId: string }>();
    const [waiterInfo, setWaiterInfo] = useState<any>(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const waiterData = localStorage.getItem('currentWaiter');
        if (waiterData) {
            setWaiterInfo(JSON.parse(waiterData));
        } else {
            navigate('/');
        }

        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, [navigate]);

    const handleClockOut = () => {
        if (confirm('Are you sure you want to clock out?')) {
            const waiterData = JSON.parse(localStorage.getItem('currentWaiter') || '{}');
            waiterData.clockOut = new Date().toISOString();
            
            const clockIn = new Date(waiterData.clockIn);
            const clockOut = new Date(waiterData.clockOut);
            const hoursWorked = ((clockOut.getTime() - clockIn.getTime()) / (1000 * 60 * 60)).toFixed(2);
            
            alert(`Shift completed!\nHours worked: ${hoursWorked} hours`);
            
            localStorage.removeItem('currentWaiter');
            navigate('/');
        }
    };

    const handleTableClick = (tableNumber: string) => {
        navigate(`/waiter/${tenantId}/table/${tableNumber}`);
    };

    const getShiftDuration = () => {
        if (!waiterInfo?.clockIn) return '0:00:00';
        
        const clockIn = new Date(waiterInfo.clockIn);
        const now = currentTime;
        const diff = now.getTime() - clockIn.getTime();
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    if (!waiterInfo) {
        return null;
    }

    return (
        <div className="h-screen bg-background-dark text-white flex flex-col">
            {/* Header - Fixed */}
            <div className="bg-surface-dark border-b border-white/10 px-4 py-3 flex-shrink-0">
                <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                        <h1 className="text-lg font-bold truncate">{PEPEBETOS_INFO.name}</h1>
                        <p className="text-white/60 text-xs truncate">{PEPEBETOS_INFO.address}</p>
                    </div>
                    <div className="text-right ml-2">
                        <div className="text-xs text-white/60">Time</div>
                        <div className="text-sm font-mono font-bold">
                            {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Waiter Info Bar - Fixed */}
            <div className="bg-green-900/30 border-b border-green-500/20 px-4 py-3 flex-shrink-0">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-xl text-white">person</span>
                        </div>
                        <div className="min-w-0">
                            <div className="font-bold truncate">{waiterInfo.name}</div>
                            <div className="text-xs text-white/60">Server</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <div className="text-right">
                            <div className="text-xs text-white/60">Shift</div>
                            <div className="text-sm font-mono font-bold text-green-400">
                                {getShiftDuration()}
                            </div>
                        </div>
                        <button
                            onClick={handleClockOut}
                            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-all flex-shrink-0 active:scale-95"
                        >
                            <span className="material-symbols-outlined text-xl">logout</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="p-4 bg-surface-dark/50 border-b border-white/10 flex-shrink-0">
                <button
                    onClick={() => navigate(`/waiter/${tenantId}/active-orders`)}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                    <span className="material-symbols-outlined">receipt_long</span>
                    View Active Orders
                </button>
            </div>

            {/* Main Content - Scrollable */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-4">
                    <div className="mb-4">
                        <h2 className="text-xl font-bold mb-1">Select a Table</h2>
                        <p className="text-white/60 text-sm">Tap a table to take an order</p>
                    </div>

                    {/* Tables Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-6">
                        {TABLES.map(table => (
                            <button
                                key={table.id}
                                onClick={() => handleTableClick(table.number)}
                                className={`aspect-square rounded-xl p-4 transition-all border-2 flex flex-col items-center justify-center gap-2 active:scale-95 ${
                                    table.status === 'available'
                                        ? 'bg-green-500/10 border-green-500/30 active:bg-green-500/20'
                                        : 'bg-orange-500/10 border-orange-500/30 active:bg-orange-500/20'
                                }`}
                            >
                                <span className="material-symbols-outlined text-4xl">
                                    {table.status === 'available' ? 'table_restaurant' : 'restaurant'}
                                </span>
                                <div className="text-center">
                                    <div className="text-xl font-bold">Table {table.number}</div>
                                    <div className={`text-xs font-semibold ${
                                        table.status === 'available' ? 'text-green-400' : 'text-orange-400'
                                    }`}>
                                        {table.status === 'available' ? 'Available' : 'Occupied'}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-surface-dark rounded-xl p-4 border border-white/10">
                            <div className="text-white/60 text-xs mb-1">Available</div>
                            <div className="text-2xl font-bold text-green-400">
                                {TABLES.filter(t => t.status === 'available').length}
                            </div>
                        </div>
                        <div className="bg-surface-dark rounded-xl p-4 border border-white/10">
                            <div className="text-white/60 text-xs mb-1">Occupied</div>
                            <div className="text-2xl font-bold text-orange-400">
                                {TABLES.filter(t => t.status === 'occupied').length}
                            </div>
                        </div>
                        <div className="bg-surface-dark rounded-xl p-4 border border-white/10">
                            <div className="text-white/60 text-xs mb-1">Total</div>
                            <div className="text-2xl font-bold text-primary">
                                {TABLES.length}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
