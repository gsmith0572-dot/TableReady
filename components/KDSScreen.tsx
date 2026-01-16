import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { KDS_ORDERS } from '../constants';

export const KDSScreen: React.FC = () => {
    const navigate = useNavigate();
    const { tenantId } = useParams<{ tenantId: string }>();

    const getStatusColors = (status: string) => {
        switch(status) {
            case 'critical': return { border: 'border-rose-900/50', bar: 'bg-rose-600', badge: 'bg-rose-600', text: 'text-white' };
            case 'warning': return { border: 'border-white/5', bar: 'bg-amber-500', badge: 'bg-amber-500', text: 'text-black' };
            case 'fresh': return { border: 'border-white/5', bar: 'bg-emerald-500', badge: 'bg-emerald-500', text: 'text-black' };
            default: return { border: 'border-white/5', bar: 'bg-emerald-500', badge: 'bg-emerald-500', text: 'text-black' };
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display h-screen w-screen overflow-hidden flex flex-col select-none">
            {/* Top Status Bar */}
            <header className="h-16 shrink-0 flex items-center justify-between px-6 bg-surface-dark border-b border-white/5 z-20 shadow-md">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(`/pos/${tenantId}`)} className="flex items-center gap-2">
                         <span className="material-symbols-outlined text-white">arrow_back</span>
                    </button>
                    <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">restaurant</span>
                        Kitchen Display
                    </h1>
                    <div className="h-6 w-[1px] bg-white/10 mx-2"></div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                            <span className="material-symbols-outlined text-gray-400 text-[18px]">schedule</span>
                            <span className="text-sm font-semibold">Avg: <span className="text-white">12m</span></span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                            <span className="material-symbols-outlined text-gray-400 text-[18px]">receipt_long</span>
                            <span className="text-sm font-semibold">Pending: <span className="text-white">5</span></span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-emerald-500 text-xs font-bold uppercase tracking-wider">Online • Zero-Lag</span>
                    </div>
                    <button className="flex items-center justify-center h-10 w-10 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
                        <span className="material-symbols-outlined">wifi</span>
                    </button>
                </div>
            </header>

            {/* Main Content Area: Horizontal Scrolling Cards */}
            <main className="flex-1 overflow-x-auto overflow-y-hidden flex items-center px-4 py-4 gap-4 bg-background-dark">
                {KDS_ORDERS.map(order => {
                    const colors = getStatusColors(order.status);
                    
                    return (
                        <article key={order.id} className={`h-full w-[360px] md:w-[400px] shrink-0 flex flex-col bg-card-dark rounded-3xl border-2 ${colors.border} shadow-2xl relative overflow-hidden group`}>
                            {/* Alert Glow for critical status */}
                            <div className={`absolute top-0 left-0 w-full h-1 ${colors.bar} z-10`}></div>
                            
                            {/* Card Header */}
                            <div className="px-5 pt-5 pb-3 flex justify-between items-start">
                                <div className="flex flex-col">
                                    <h2 className="text-2xl font-bold text-white leading-none">{order.table}</h2>
                                    <span className="text-gray-400 text-sm mt-1">Order #{order.id} • {order.mode}</span>
                                </div>
                                {/* Timer Badge */}
                                <div className={`flex items-center gap-1 ${colors.badge} ${colors.text} px-3 py-1.5 rounded-full shadow-lg ${order.status === 'critical' ? 'animate-pulse' : ''}`}>
                                    <span className="material-symbols-outlined text-[20px] fill-current">timer</span>
                                    <span className="text-lg font-bold tracking-tight">{order.timer}</span>
                                </div>
                            </div>
                            <div className="h-[1px] bg-white/10 w-full"></div>
                            
                            {/* Scrollable Items List */}
                            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-6">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white font-bold text-lg shadow-lg shadow-blue-900/50">{item.qty}</div>
                                        <div className="flex flex-col gap-2 w-full">
                                            <p className="text-xl font-extrabold text-white leading-tight">{item.name}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {item.alert && (
                                                    <span className="px-2 py-1 rounded-full bg-rose-600 text-white text-xs font-bold uppercase tracking-wide border border-rose-400">{item.alert}</span>
                                                )}
                                                {item.mods.map((mod, mIdx) => (
                                                    <span key={mIdx} className="px-2 py-1 rounded-full bg-white/10 text-gray-300 text-xs font-semibold">{mod}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Bump Button Area */}
                            <div className="p-4 bg-gradient-to-t from-card-dark to-card-dark/95 pt-2">
                                <button className={`w-full h-16 rounded-full ${order.status === 'critical' ? 'bg-primary hover:bg-blue-500 shadow-lg shadow-blue-900/40' : 'bg-white/10 hover:bg-white/20 border border-white/10'} active:scale-95 transition-all flex items-center justify-center gap-3`}>
                                    <span className="text-2xl font-bold text-white tracking-widest">BUMP</span>
                                    {order.status === 'critical' && <span className="material-symbols-outlined text-white text-3xl">check_circle</span>}
                                </button>
                            </div>
                        </article>
                    );
                })}
            </main>
        </div>
    );
};