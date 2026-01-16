import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TABLES, MOCK_TENANTS } from '../constants';
import { Table } from '../types';

export const DashboardScreen: React.FC = () => {
    const navigate = useNavigate();
    const { tenantId } = useParams<{ tenantId: string }>();

    // Resolve Tenant Data
    const currentTenant = useMemo(() => {
        return MOCK_TENANTS.find(t => t.id === tenantId);
    }, [tenantId]);

    const tenantLogo = currentTenant?.logoUrl || "https://cdn-icons-png.flaticon.com/512/123/123278.png"; // Fallback logo

    const handleNavigation = (path: string) => {
        navigate(`/pos/${tenantId}${path}`);
    };

    return (
        <div className="bg-background-light dark:bg-background-dark h-screen w-full flex flex-col relative pb-20 overflow-hidden">
            {/* Header */}
            <header className="sticky top-0 z-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
                <div className="flex items-center justify-between p-4 pb-2">
                    <div className="flex items-center gap-3">
                        {/* User Avatar */}
                        <div className="relative">
                            <div className="bg-center bg-no-repeat bg-cover rounded-full size-12 ring-2 ring-primary/20" style={{backgroundImage: 'url("https://i.pravatar.cc/150?u=sarah")'}}></div>
                            <div className="absolute bottom-0 right-0 size-3 bg-emerald-500 border-2 border-background-light dark:border-background-dark rounded-full"></div>
                        </div>
                        
                        {/* Greeting & Tenant Logo */}
                        <div className="flex flex-col justify-center">
                             {/* Dynamic Sub-account Logo */}
                            {currentTenant ? (
                                <img 
                                    src={tenantLogo} 
                                    alt={currentTenant.name} 
                                    className="h-6 w-auto object-contain object-left mb-0.5"
                                />
                            ) : (
                                <span className="text-[10px] font-bold text-primary uppercase tracking-wide">TableReady</span>
                            )}
                            
                            <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-none">Hi, Sarah</h2>
                            
                            {/* Time */}
                            <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-0.5">
                                <span className="material-symbols-outlined text-[12px]">schedule</span>
                                <span>04:23 hrs</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                         <button onClick={() => navigate('/')} className="flex items-center gap-1 bg-surface-dark/10 dark:bg-surface-dark px-3 py-1.5 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                            <span className="material-symbols-outlined text-[16px]">logout</span>
                            Exit
                        </button>
                        <button className="relative flex size-10 cursor-pointer items-center justify-center rounded-full bg-surface-dark/10 dark:bg-surface-dark text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                            <span className="material-symbols-outlined text-[24px]">notifications</span>
                            <span className="absolute top-2 right-2 flex size-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full size-2.5 bg-primary"></span>
                            </span>
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="px-4 pb-2">
                    <div className="flex w-full items-center rounded-xl bg-white dark:bg-surface-dark h-12 shadow-sm border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-center pl-4 text-slate-400 dark:text-slate-500">
                            <span className="material-symbols-outlined">search</span>
                        </div>
                        <input className="flex-1 w-full bg-transparent border-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-0 px-3 text-base" placeholder="Search tables, orders..."/>
                        <button className="pr-4 text-primary font-medium text-sm">Scan</button>
                    </div>
                </div>

                {/* Chips */}
                <div className="flex gap-2 px-4 pb-3 overflow-x-auto hide-scrollbar">
                    <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 transition-transform active:scale-95">
                        <span className="text-sm font-bold">All</span>
                    </button>
                    <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 px-4 transition-transform active:scale-95">
                        <span className="material-symbols-outlined text-[18px] text-primary">person</span>
                        <span className="text-slate-700 dark:text-slate-200 text-sm font-medium">My Zone</span>
                    </button>
                    <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 px-4 transition-transform active:scale-95">
                        <span className="material-symbols-outlined text-[18px] text-rose-500">warning</span>
                        <span className="text-slate-700 dark:text-slate-200 text-sm font-medium">Alerts</span>
                        <span className="flex items-center justify-center bg-rose-500 text-white text-[10px] font-bold h-4 w-4 rounded-full">3</span>
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 px-4 py-4 overflow-y-auto pb-24">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-slate-900 dark:text-white text-xl font-bold tracking-tight">Active Tables</h3>
                    <span className="text-slate-500 text-sm font-medium">12/24 Occupied</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 pb-24">
                    {TABLES.map(table => {
                         // Logic to match the HTML styles based on status
                         let cardClass = "group relative flex flex-col justify-between p-4 rounded-[1.5rem] shadow-sm active:scale-[0.98] transition-all duration-200 cursor-pointer overflow-hidden ";
                         let statusContent = null;

                         if (table.status === 'order-ready') {
                             cardClass += "bg-white dark:bg-surface-dark border-2 border-rose-500/50 dark:border-rose-500/30";
                             statusContent = (
                                <>
                                    <div className="absolute inset-0 bg-rose-500/5 dark:bg-rose-500/10 z-0"></div>
                                    <div className="relative z-10 flex justify-between items-start mb-3">
                                        <span className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tighter">{table.number}</span>
                                        <div className="flex items-center justify-center size-8 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 animate-pulse">
                                            <span className="material-symbols-outlined text-[20px]">soup_kitchen</span>
                                        </div>
                                    </div>
                                    <div className="relative z-10 space-y-1">
                                        <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-bold text-sm">
                                            <span className="size-2 rounded-full bg-rose-500"></span>
                                            Order Ready
                                        </div>
                                        <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">{table.guests} Guests • {table.time}</p>
                                    </div>
                                </>
                             );
                         } else if (table.status === 'pay-requested') {
                            cardClass += "bg-white dark:bg-surface-dark border border-amber-500/30";
                            statusContent = (
                                <>
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tighter">{table.number}</span>
                                        <span className="material-symbols-outlined text-amber-500">payments</span>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-amber-600 dark:text-amber-400 font-bold text-sm">Pay Requested</p>
                                            <p className="text-slate-900 dark:text-white text-lg font-bold tabular-nums">${table.amount?.toFixed(2)}</p>
                                        </div>
                                        <button className="w-full h-8 flex items-center justify-center rounded-full bg-amber-500 text-white text-xs font-bold gap-1 shadow-md shadow-amber-500/20">
                                            Process
                                            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                        </button>
                                    </div>
                                </>
                            );
                         } else if (table.status === 'occupied') {
                             const isMyZone = table.id === 't12'; // Mock logic for 'You'
                             cardClass += isMyZone ? "bg-white dark:bg-surface-dark border-l-4 border-l-primary" : "bg-white dark:bg-surface-dark border border-transparent dark:border-slate-800";
                             statusContent = (
                                 <>
                                    <div className="flex justify-between items-start mb-6">
                                        <span className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tighter">{table.number}</span>
                                        {isMyZone ? (
                                            <div className="flex items-center gap-1 text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                                                <span className="material-symbols-outlined text-[14px]">person</span>
                                                <span className="text-xs font-bold">You</span>
                                            </div>
                                        ) : (
                                            <span className="material-symbols-outlined text-slate-400">restaurant</span>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-slate-900 dark:text-white font-bold text-sm">Occupied</p>
                                        <div className="flex items-center justify-between">
                                            <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">{table.guests} Guests</p>
                                            <p className="text-slate-400 dark:text-slate-500 text-xs font-medium tabular-nums">{table.time}</p>
                                        </div>
                                    </div>
                                 </>
                             );
                         } else if (table.status === 'available') {
                            cardClass += "bg-slate-50 dark:bg-surface-dark/40 border border-dashed border-slate-300 dark:border-slate-700";
                            statusContent = (
                                <>
                                    <div className="flex justify-between items-start mb-6">
                                        <span className="text-4xl font-extrabold text-slate-400 dark:text-slate-600 tracking-tighter">{table.number}</span>
                                        <span className="material-symbols-outlined text-emerald-500 opacity-50">check_circle</span>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-emerald-600 dark:text-emerald-500 font-bold text-sm">Available</p>
                                        <p className="text-slate-400 dark:text-slate-500 text-xs font-medium">{table.guests || 4} Seats</p>
                                    </div>
                                </>
                            );
                         } else if (table.status === 'cleaning') {
                            cardClass += "bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 shadow-sm opacity-80";
                            statusContent = (
                                <>
                                    <div className="flex justify-between items-start mb-6">
                                        <span className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tighter">{table.number}</span>
                                        <span className="material-symbols-outlined text-purple-400">cleaning_services</span>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-purple-500 dark:text-purple-400 font-bold text-sm">Cleaning</p>
                                        <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">Mark Ready</p>
                                    </div>
                                </>
                            );
                         }

                         return (
                             <div key={table.id} onClick={() => handleNavigation('/order')} className={cardClass}>
                                 {statusContent}
                             </div>
                         );
                    })}
                </div>
            </main>

            {/* FAB */}
            <div className="fixed bottom-24 right-4 z-30">
                <button className="flex items-center justify-center gap-2 h-14 pl-5 pr-6 bg-primary text-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:bg-blue-600 active:scale-95 transition-all">
                    <span className="material-symbols-outlined text-[24px]">point_of_sale</span>
                    <span className="font-bold text-base">Quick Sale</span>
                </button>
            </div>

            {/* Bottom Nav */}
            <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-surface-dark border-t border-slate-200 dark:border-slate-800 pb-5 pt-3 px-6 z-40">
                <div className="flex justify-between items-end">
                    <button className="flex flex-col items-center gap-1 w-12 text-primary">
                        <span className="material-symbols-outlined text-[26px]">grid_view</span>
                        <span className="text-[10px] font-medium">Floor</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 w-12 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 transition" onClick={() => handleNavigation('/kds')}>
                        <span className="material-symbols-outlined text-[26px]">receipt_long</span>
                        <span className="text-[10px] font-medium">KDS</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 w-12 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 transition">
                        <span className="material-symbols-outlined text-[26px]">menu_book</span>
                        <span className="text-[10px] font-medium">Menu</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 w-12 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 transition">
                        <span className="material-symbols-outlined text-[26px]">settings</span>
                        <span className="text-[10px] font-medium">More</span>
                    </button>
                </div>
            </nav>
        </div>
    );
};