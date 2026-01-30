import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_TENANTS } from '../constants';

interface Tenant {
    id: string;
    name: string;
    slug: string;
    owner: string;
    ownerEmail: string;
    phone: string;
    address: string;
    status: 'active' | 'pending_payment' | 'suspended';
    mrr: number;
    joinedDate: string;
    subscriptionPlan: 'basic' | 'premium' | 'enterprise';
}

export const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'overview' | 'tenants' | 'billing' | 'system'>('overview');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [tenants, setTenants] = useState<Tenant[]>(MOCK_TENANTS as any);
    const [showStripeLink, setShowStripeLink] = useState(false);
    const [currentClient, setCurrentClient] = useState({ name: '', owner: '', email: '' });

    const [newClient, setNewClient] = useState({
        name: '',
        owner: '',
        email: '',
        phone: '',
        address: '',
        plan: 'premium' as 'basic' | 'premium' | 'enterprise'
    });

    const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/28E8wQ74T7w09WjgeDbEA01';

    const handleCreateClient = () => {
        const slug = newClient.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const newTenant: Tenant = {
            id: `${slug}-${Date.now()}`,
            name: newClient.name,
            slug: slug,
            owner: newClient.owner,
            ownerEmail: newClient.email,
            phone: newClient.phone,
            address: newClient.address,
            status: 'pending_payment',
            mrr: 97,
            joinedDate: new Date().toISOString().split('T')[0],
            subscriptionPlan: 'premium'
        };
        
        setTenants([...tenants, newTenant]);
        setCurrentClient({ name: newClient.name, owner: newClient.owner, email: newClient.email });
        setShowCreateModal(false);
        setShowStripeLink(true);
        
        setNewClient({
            name: '',
            owner: '',
            email: '',
            phone: '',
            address: '',
            plan: 'premium'
        });
    };

    const copyStripeMessage = () => {
        const stripeUrl = `${STRIPE_PAYMENT_LINK}?prefilled_email=${encodeURIComponent(currentClient.email)}&client_reference_id=${currentClient.name.toLowerCase().replace(/\s+/g, '-')}`;
        
        const message = `Hi ${currentClient.owner}!

Welcome to TableTech! 🎉

Your restaurant "${currentClient.name}" has been set up on our platform.

💰 Monthly Subscription: $97/month
📱 Full POS system for your restaurant

To activate your account:
1. Click here to subscribe: ${stripeUrl}
2. Complete payment securely via Stripe
3. You'll receive your Restaurant Admin login within 24 hours
4. Then you can invite your waitstaff!

Your Benefits:
✅ Unlimited waitstaff accounts
✅ Complete menu management
✅ Order tracking & kitchen display
✅ Sales reports & analytics
✅ Mobile-first design (BYOD - no hardware needed!)

Questions? Reply to this email anytime.

Best regards,
George Smith
TableTech - Founder
tabletech.app`;

        navigator.clipboard.writeText(message);
        alert('✅ Payment link & onboarding message copied!\n\nSend it to: ' + currentClient.email);
        setShowStripeLink(false);
    };

    const totalMRR = tenants.reduce((acc, t) => acc + (t.status === 'active' ? t.mrr : 0), 0);
    const activeTenants = tenants.filter(t => t.status === 'active').length;
    const pendingPayments = tenants.filter(t => t.status === 'pending_payment').length;

    return (
        <div className="h-screen bg-background-dark text-white flex flex-col overflow-hidden">
            <div className="bg-surface-dark border-b border-white/10 px-6 py-4 flex-shrink-0">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                            <span className="material-symbols-outlined text-white">admin_panel_settings</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold">TableTech System Owner</h1>
                            <p className="text-xs text-white/60">George Smith - Super Admin</p>
                        </div>
                    </div>
                    <button onClick={() => navigate('/')} className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-all">
                        <span className="material-symbols-outlined">logout</span>
                        Log Out
                    </button>
                </div>
            </div>

            <div className="bg-surface-dark/50 border-b border-white/10 px-6 flex-shrink-0">
                <div className="max-w-7xl mx-auto flex gap-2">
                    {[
                        { id: 'overview', icon: 'dashboard', label: 'Overview' },
                        { id: 'tenants', icon: 'store', label: 'Restaurants' },
                        { id: 'billing', icon: 'payments', label: 'Billing' },
                        { id: 'system', icon: 'settings', label: 'System' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all ${
                                activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-white/60 hover:text-white'
                            }`}
                        >
                            <span className="material-symbols-outlined">{tab.icon}</span>
                            <span className="font-semibold">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                <div className="max-w-7xl mx-auto p-6">
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold">Business Overview</h2>
                                <button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark rounded-xl transition-all">
                                    <span className="material-symbols-outlined">add</span>
                                    Onboard New Restaurant
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="bg-surface-dark rounded-2xl p-6 border border-white/10">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                                            <span className="material-symbols-outlined text-2xl text-green-400">payments</span>
                                        </div>
                                        <div>
                                            <p className="text-white/60 text-sm">Total MRR</p>
                                            <p className="text-3xl font-bold text-green-400">${totalMRR.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-white/40">Monthly Recurring Revenue</p>
                                </div>

                                <div className="bg-surface-dark rounded-2xl p-6 border border-white/10">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                                            <span className="material-symbols-outlined text-2xl text-blue-400">store</span>
                                        </div>
                                        <div>
                                            <p className="text-white/60 text-sm">Active Restaurants</p>
                                            <p className="text-3xl font-bold text-blue-400">{activeTenants}</p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-white/40">Out of {tenants.length} total</p>
                                </div>

                                <div className="bg-surface-dark rounded-2xl p-6 border border-white/10">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                                            <span className="material-symbols-outlined text-2xl text-orange-400">pending</span>
                                        </div>
                                        <div>
                                            <p className="text-white/60 text-sm">Pending Payments</p>
                                            <p className="text-3xl font-bold text-orange-400">{pendingPayments}</p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-white/40">Awaiting subscription</p>
                                </div>

                                <div className="bg-surface-dark rounded-2xl p-6 border border-white/10">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                                            <span className="material-symbols-outlined text-2xl text-purple-400">group</span>
                                        </div>
                                        <div>
                                            <p className="text-white/60 text-sm">Total Waitstaff</p>
                                            <p className="text-3xl font-bold text-purple-400">{activeTenants * 8}</p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-white/40">Across all restaurants</p>
                                </div>
                            </div>

                            <div className="bg-surface-dark rounded-2xl p-6 border border-white/10">
                                <h3 className="text-xl font-bold mb-4">Recent Restaurants</h3>
                                <div className="space-y-3">
                                    {tenants.slice(0, 5).map(tenant => (
                                        <div key={tenant.id} className="flex items-center justify-between bg-white/5 rounded-xl p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                                                    <span className="material-symbols-outlined text-primary">restaurant</span>
                                                </div>
                                                <div>
                                                    <p className="font-semibold">{tenant.name}</p>
                                                    <p className="text-sm text-white/60">{tenant.ownerEmail}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                    tenant.status === 'active' ? 'bg-green-500/20 text-green-400' :
                                                    tenant.status === 'pending_payment' ? 'bg-orange-500/20 text-orange-400' :
                                                    'bg-red-500/20 text-red-400'
                                                }`}>
                                                    {tenant.status.replace('_', ' ')}
                                                </span>
                                                <p className="font-bold text-primary">${tenant.mrr}/mo</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'tenants' && (
                        <div className="text-center py-12">
                            <span className="material-symbols-outlined text-6xl text-white/20 mb-4">store</span>
                            <p className="text-white/60">Full tenant management coming soon</p>
                        </div>
                    )}

                    {activeTab === 'billing' && (
                        <div className="text-center py-12">
                            <span className="material-symbols-outlined text-6xl text-white/20 mb-4">payments</span>
                            <p className="text-white/60">Billing analytics coming soon</p>
                        </div>
                    )}

                    {activeTab === 'system' && (
                        <div className="text-center py-12">
                            <span className="material-symbols-outlined text-6xl text-white/20 mb-4">settings</span>
                            <p className="text-white/60">System settings coming soon</p>
                        </div>
                    )}
                </div>
            </div>

            {showCreateModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-surface-dark rounded-3xl max-w-2xl w-full p-6 border border-white/10 max-h-[90vh] overflow-y-auto">
                        <h3 className="text-2xl font-bold mb-6">Onboard New Restaurant</h3>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Restaurant Name</label>
                                    <input type="text" value={newClient.name} onChange={(e) => setNewClient({...newClient, name: e.target.value})} placeholder="Joe's Pizza" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Owner Name</label>
                                    <input type="text" value={newClient.owner} onChange={(e) => setNewClient({...newClient, owner: e.target.value})} placeholder="Joe Smith" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Email</label>
                                    <input type="email" value={newClient.email} onChange={(e) => setNewClient({...newClient, email: e.target.value})} placeholder="joe@joespizza.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Phone</label>
                                    <input type="tel" value={newClient.phone} onChange={(e) => setNewClient({...newClient, phone: e.target.value})} placeholder="(318) 414-3053" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Address</label>
                                <input type="text" value={newClient.address} onChange={(e) => setNewClient({...newClient, address: e.target.value})} placeholder="123 Main St, City, State 12345" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40" />
                            </div>
                            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                                <p className="text-sm font-semibold text-blue-400 mb-1">Standard Plan: $97/month</p>
                                <p className="text-xs text-white/60">Unlimited waitstaff • Full POS • Reports • Mobile BYOD</p>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button onClick={() => setShowCreateModal(false)} className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all">Cancel</button>
                                <button onClick={handleCreateClient} disabled={!newClient.name || !newClient.owner || !newClient.email} className="flex-1 px-4 py-3 bg-primary hover:bg-primary-dark disabled:bg-white/10 disabled:text-white/40 rounded-xl transition-all">
                                    Create & Generate Payment Link
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showStripeLink && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-surface-dark rounded-3xl max-w-2xl w-full p-6 border border-white/10">
                        <h3 className="text-2xl font-bold mb-4">✅ Restaurant Created!</h3>
                        <p className="text-white/60 mb-4">Copy this onboarding message with Stripe payment link:</p>
                        <div className="bg-white/5 rounded-xl p-4 mb-4 text-sm max-h-96 overflow-y-auto">
                            <p className="font-mono text-white/80 whitespace-pre-wrap text-xs">
Hi {currentClient.owner}!{'\n\n'}
Welcome to TableTech! 🎉{'\n\n'}
Your restaurant "{currentClient.name}" is ready.{'\n\n'}
💰 Monthly: $97{'\n'}
📱 Full POS system{'\n\n'}
Activate now:{'\n'}
{STRIPE_PAYMENT_LINK}?prefilled_email={encodeURIComponent(currentClient.email)}&client_reference_id={currentClient.name.toLowerCase().replace(/\s+/g, '-')}{'\n\n'}
Benefits:{'\n'}
✅ Unlimited staff{'\n'}
✅ Menu management{'\n'}
✅ Order tracking{'\n'}
✅ Reports{'\n'}
✅ BYOD - No hardware!{'\n\n'}
- George Smith{'\n'}
TableTech
                            </p>
                        </div>
                        <button onClick={copyStripeMessage} className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined">content_copy</span>
                            Copy Payment Link & Message
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
