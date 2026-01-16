import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_TENANTS } from '../constants';
import { Tenant } from '../types';

export const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [tenants, setTenants] = useState<Tenant[]>(MOCK_TENANTS);

    // Mock form state
    const [newClientName, setNewClientName] = useState('');
    const [newClientOwner, setNewClientOwner] = useState('');

    const handleCreateClient = () => {
        const newTenant: Tenant = {
            id: newClientName.toLowerCase().replace(/\s+/g, '-'),
            name: newClientName,
            owner: newClientOwner,
            email: `${newClientOwner.split(' ')[0].toLowerCase()}@example.com`,
            status: 'pending_payment',
            mrr: 99.00,
            joinedDate: new Date().toISOString().split('T')[0],
            logoUrl: `https://ui-avatars.com/api/?name=${newClientName}&background=random`
        };
        setTenants([...tenants, newTenant]);
        setShowCreateModal(false);
        setNewClientName('');
        setNewClientOwner('');
    };

    const totalMRR = tenants.reduce((acc, t) => acc + (t.status === 'active' ? t.mrr : 0), 0);

    return (
        <div className="bg-background-dark min-h-screen w-full text-white font-display overflow-hidden flex flex-col">
            {/* Admin Header */}
            <header className="h-16 border-b border-white/5 bg-surface-dark/50 flex items-center justify-between px-6">
                <div className="flex items-center gap-2">
                    <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-lg">admin_panel_settings</span>
                    </div>
                    <h1 className="text-lg font-bold">TableReady <span className="text-white/40 font-normal">Admin</span></h1>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/')} className="text-sm text-white/60 hover:text-white transition-colors">Log Out</button>
                    <div className="size-8 rounded-full bg-white/10 flex items-center justify-center border border-white/5">
                        <span className="material-symbols-outlined text-sm">person</span>
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-6 md:p-10">
                <div className="max-w-6xl mx-auto space-y-8">
                    
                    {/* Stats Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-card-dark border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <span className="material-symbols-outlined text-6xl">payments</span>
                            </div>
                            <p className="text-white/60 text-sm font-medium mb-1">Total MRR</p>
                            <h3 className="text-3xl font-bold">${totalMRR.toFixed(2)}</h3>
                            <div className="mt-2 text-xs text-emerald-400 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                                +12% vs last month
                            </div>
                        </div>
                        <div className="bg-card-dark border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <span className="material-symbols-outlined text-6xl">storefront</span>
                            </div>
                            <p className="text-white/60 text-sm font-medium mb-1">Active Restaurants</p>
                            <h3 className="text-3xl font-bold">{tenants.filter(t => t.status === 'active').length}</h3>
                            <div className="mt-2 text-xs text-white/40">Out of {tenants.length} total signups</div>
                        </div>
                        <div className="bg-gradient-to-br from-primary to-primary-dark p-6 rounded-2xl relative overflow-hidden text-white flex flex-col justify-center items-start cursor-pointer hover:shadow-lg hover:shadow-primary/20 transition-all" onClick={() => setShowCreateModal(true)}>
                            <div className="size-12 rounded-full bg-white/20 flex items-center justify-center mb-3">
                                <span className="material-symbols-outlined text-2xl">add</span>
                            </div>
                            <h3 className="text-xl font-bold">Onboard New Client</h3>
                            <p className="text-white/80 text-sm mt-1">Create sub-account & send Stripe link</p>
                        </div>
                    </div>

                    {/* Clients Table */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold">Sub-Accounts (Tenants)</h2>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-white/40 text-[18px]">search</span>
                                <input type="text" placeholder="Search clients..." className="bg-card-dark border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none" />
                            </div>
                        </div>

                        <div className="bg-card-dark border border-white/5 rounded-2xl overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/5 bg-white/5 text-xs text-white/60 uppercase tracking-wider">
                                        <th className="p-4 font-semibold">Restaurant</th>
                                        <th className="p-4 font-semibold">Owner</th>
                                        <th className="p-4 font-semibold">Status</th>
                                        <th className="p-4 font-semibold text-right">Revenue</th>
                                        <th className="p-4 font-semibold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {tenants.map(tenant => (
                                        <tr key={tenant.id} className="hover:bg-white/5 transition-colors group">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <img src={tenant.logoUrl} alt={tenant.name} className="size-10 rounded-lg object-cover bg-white/10" />
                                                    <div>
                                                        <p className="font-bold text-white">{tenant.name}</p>
                                                        <p className="text-xs text-white/40">{tenant.id}.tableready.app</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <p className="text-sm text-white">{tenant.owner}</p>
                                                <p className="text-xs text-white/40">{tenant.email}</p>
                                            </td>
                                            <td className="p-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                                    tenant.status === 'active' 
                                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                                                    : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                                }`}>
                                                    {tenant.status === 'active' ? 'Active' : 'Pending Payment'}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right text-sm font-mono text-white/80">
                                                ${tenant.mrr.toFixed(2)}/mo
                                            </td>
                                            <td className="p-4 text-right">
                                                {tenant.status === 'active' ? (
                                                    <button 
                                                        onClick={() => navigate(`/pos/${tenant.id}`)}
                                                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium transition-colors"
                                                    >
                                                        Access POS
                                                    </button>
                                                ) : (
                                                    <button className="px-3 py-1.5 rounded-lg bg-primary/20 text-primary border border-primary/30 text-xs font-medium hover:bg-primary/30 transition-colors">
                                                        Resend Invoice
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </main>

            {/* Create Client Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-card-dark border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl relative animate-slide-up">
                        <h2 className="text-xl font-bold mb-1">New Client Onboarding</h2>
                        <p className="text-sm text-white/60 mb-6">Create a sub-account. They will receive an email to complete Stripe payment.</p>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase text-white/40 mb-1">Restaurant Name</label>
                                <input 
                                    type="text" 
                                    value={newClientName}
                                    onChange={(e) => setNewClientName(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-primary outline-none" 
                                    placeholder="e.g. Burger King"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-white/40 mb-1">Owner Name</label>
                                <input 
                                    type="text" 
                                    value={newClientOwner}
                                    onChange={(e) => setNewClientOwner(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-primary outline-none" 
                                    placeholder="e.g. John Doe"
                                />
                            </div>
                            
                            <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-center gap-3">
                                <div className="size-10 rounded-full bg-white flex items-center justify-center shrink-0">
                                    {/* Mock Stripe Logo */}
                                    <span className="font-bold text-[#635BFF] text-xs">S</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white">Stripe Integration</p>
                                    <p className="text-xs text-white/50">Payment link will be generated automatically.</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-8">
                            <button onClick={() => setShowCreateModal(false)} className="flex-1 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-white/80 font-medium transition-colors">Cancel</button>
                            <button onClick={handleCreateClient} className="flex-1 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold transition-colors">Create Account</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};