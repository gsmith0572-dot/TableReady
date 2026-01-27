import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginScreen: React.FC = () => {
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState<'admin' | 'tenant' | null>(null);

    const handleAdminLogin = () => {
        // In production, this would validate credentials
        navigate('/admin');
    };

    const handlePepeBetosLogin = () => {
        // Direct login to PepeBetos tenant
        navigate('/pos/pepebetos');
    };

    const handleTenantLogin = () => {
        // For demo purposes, login to a demo tenant
        navigate('/pos/demo-restaurant');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Logo/Branding */}
                <div className="text-center mb-8">
                    {/* TableTech Logo */}
                    <div className="w-20 h-20 bg-primary rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-2xl">
                        <span className="material-symbols-outlined text-4xl text-white">restaurant</span>
                    </div>
                    <h1 id="logo-fallback" className="text-3xl font-bold text-white tracking-tight mb-2">TableTech</h1>
                    <p className="text-white/60 text-sm">Multi-Tenant Restaurant POS System</p>
                </div>

                {/* Login Card */}
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
                    <h2 className="text-2xl font-bold text-white mb-6">Welcome Back</h2>
                    
                    {!selectedRole ? (
                        <div className="space-y-4">
                            <p className="text-white/70 text-sm mb-6">Select your login type:</p>
                            
                            {/* Admin Login Button */}
                            <button
                                onClick={() => setSelectedRole('admin')}
                                className="w-full bg-white/20 hover:bg-white/30 text-white py-4 rounded-2xl font-semibold transition-all flex items-center justify-between px-6 group border border-white/10"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
                                    <div className="text-left">
                                        <div className="font-bold">Super Admin</div>
                                        <div className="text-xs text-white/60">Manage all tenants</div>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </button>

                            {/* PepeBetos Direct Login */}
                            <button
                                onClick={handlePepeBetosLogin}
                                className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-4 rounded-2xl font-semibold transition-all flex items-center justify-between px-6 group shadow-lg"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-2xl">local_dining</span>
                                    <div className="text-left">
                                        <div className="font-bold">Pepe Betos</div>
                                        <div className="text-xs text-white/80">Mexican Kitchen & Cantina</div>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </button>

                            {/* Tenant Login Button */}
                            <button
                                onClick={() => setSelectedRole('tenant')}
                                className="w-full bg-white/20 hover:bg-white/30 text-white py-4 rounded-2xl font-semibold transition-all flex items-center justify-between px-6 group border border-white/10"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-2xl">store</span>
                                    <div className="text-left">
                                        <div className="font-bold">Restaurant Login</div>
                                        <div className="text-xs text-white/60">Access your POS</div>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </button>
                        </div>
                    ) : selectedRole === 'admin' ? (
                        <div className="space-y-4">
                            <button
                                onClick={() => setSelectedRole(null)}
                                className="text-white/60 hover:text-white text-sm flex items-center gap-2 mb-4"
                            >
                                <span className="material-symbols-outlined text-lg">arrow_back</span>
                                Back
                            </button>
                            
                            <input
                                type="text"
                                placeholder="Admin Username"
                                className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <button
                                onClick={handleAdminLogin}
                                className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-semibold transition-all shadow-lg"
                            >
                                Login as Admin
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <button
                                onClick={() => setSelectedRole(null)}
                                className="text-white/60 hover:text-white text-sm flex items-center gap-2 mb-4"
                            >
                                <span className="material-symbols-outlined text-lg">arrow_back</span>
                                Back
                            </button>
                            
                            <input
                                type="text"
                                placeholder="Restaurant ID"
                                className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <button
                                onClick={handleTenantLogin}
                                className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-semibold transition-all shadow-lg"
                            >
                                Login to POS
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-xs text-white/30">Protected by TableTech SaaS &copy; 2026</p>
                </div>
            </div>
        </div>
    );
};
