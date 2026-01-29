import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginScreen: React.FC = () => {
    const navigate = useNavigate();
    const [loginType, setLoginType] = useState<'super_admin' | 'restaurant_admin' | 'waiter' | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [restaurantCode, setRestaurantCode] = useState('');
    const [waiterName, setWaiterName] = useState('');

    const handleSuperAdminLogin = () => {
        // In production, validate credentials against Firebase
        if (email === 'gsmith0572@gmail.com' && password === 'admin123') {
            navigate('/admin');
        } else {
            alert('Invalid credentials');
        }
    };

    const handleRestaurantAdminLogin = () => {
        // In production, validate restaurant admin credentials
        if (restaurantCode === 'PEPEBETOS' && password) {
            navigate('/restaurant-admin/pepebetos');
        } else {
            alert('Invalid credentials');
        }
    };

    const handleWaiterClockIn = () => {
        // In production, record clock-in time and validate
        if (waiterName && restaurantCode === 'PEPEBETOS') {
            // Store waiter session
            localStorage.setItem('currentWaiter', JSON.stringify({
                name: waiterName,
                clockIn: new Date().toISOString(),
                tenantId: 'pepebetos'
            }));
            navigate('/waiter/pepebetos');
        } else {
            alert('Please enter your name and valid restaurant code');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Logo/Branding */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-primary rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-2xl">
                        <span className="material-symbols-outlined text-4xl text-white">restaurant</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2">TableTech</h1>
                    <p className="text-white/60 text-sm">Professional Restaurant POS System</p>
                </div>

                {/* Login Card */}
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
                    
                    {!loginType ? (
                        <>
                            <h2 className="text-2xl font-bold text-white mb-2">Welcome</h2>
                            <p className="text-white/60 text-sm mb-6">Select how you want to access TableTech</p>
                            
                            <div className="space-y-3">
                                {/* Super Admin */}
                                <button
                                    onClick={() => setLoginType('super_admin')}
                                    className="w-full bg-white/20 hover:bg-white/30 text-white py-4 rounded-2xl font-semibold transition-all flex items-center justify-between px-6 group border border-white/10"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
                                        <div className="text-left">
                                            <div className="font-bold">System Owner</div>
                                            <div className="text-xs text-white/60">Manage all restaurants</div>
                                        </div>
                                    </div>
                                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </button>

                                {/* Restaurant Admin */}
                                <button
                                    onClick={() => setLoginType('restaurant_admin')}
                                    className="w-full bg-white/20 hover:bg-white/30 text-white py-4 rounded-2xl font-semibold transition-all flex items-center justify-between px-6 group border border-white/10"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-2xl">store</span>
                                        <div className="text-left">
                                            <div className="font-bold">Restaurant Manager</div>
                                            <div className="text-xs text-white/60">Manage your restaurant</div>
                                        </div>
                                    </div>
                                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </button>

                                {/* Waiter Clock In */}
                                <button
                                    onClick={() => setLoginType('waiter')}
                                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 rounded-2xl font-semibold transition-all flex items-center justify-between px-6 group shadow-lg"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-2xl">badge</span>
                                        <div className="text-left">
                                            <div className="font-bold">Waiter / Server</div>
                                            <div className="text-xs text-white/80">Clock in and start taking orders</div>
                                        </div>
                                    </div>
                                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </button>
                            </div>
                        </>
                    ) : loginType === 'super_admin' ? (
                        <>
                            <button
                                onClick={() => setLoginType(null)}
                                className="text-white/60 hover:text-white text-sm flex items-center gap-2 mb-6"
                            >
                                <span className="material-symbols-outlined text-lg">arrow_back</span>
                                Back
                            </button>
                            
                            <h2 className="text-xl font-bold text-white mb-6">System Owner Login</h2>
                            
                            <div className="space-y-4">
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <button
                                    onClick={handleSuperAdminLogin}
                                    className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-semibold transition-all shadow-lg"
                                >
                                    Login as System Owner
                                </button>
                                <p className="text-xs text-white/40 text-center">Demo: gsmith0572@gmail.com / admin123</p>
                            </div>
                        </>
                    ) : loginType === 'restaurant_admin' ? (
                        <>
                            <button
                                onClick={() => setLoginType(null)}
                                className="text-white/60 hover:text-white text-sm flex items-center gap-2 mb-6"
                            >
                                <span className="material-symbols-outlined text-lg">arrow_back</span>
                                Back
                            </button>
                            
                            <h2 className="text-xl font-bold text-white mb-6">Restaurant Manager Login</h2>
                            
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Restaurant Code"
                                    value={restaurantCode}
                                    onChange={(e) => setRestaurantCode(e.target.value.toUpperCase())}
                                    className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary uppercase"
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <button
                                    onClick={handleRestaurantAdminLogin}
                                    className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-semibold transition-all shadow-lg"
                                >
                                    Login to Dashboard
                                </button>
                                <p className="text-xs text-white/40 text-center">Demo: PEPEBETOS / any password</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => setLoginType(null)}
                                className="text-white/60 hover:text-white text-sm flex items-center gap-2 mb-6"
                            >
                                <span className="material-symbols-outlined text-lg">arrow_back</span>
                                Back
                            </button>
                            
                            <h2 className="text-xl font-bold text-white mb-2">Clock In</h2>
                            <p className="text-white/60 text-sm mb-6">Enter your name to start your shift</p>
                            
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Your Full Name"
                                    value={waiterName}
                                    onChange={(e) => setWaiterName(e.target.value)}
                                    className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                                <input
                                    type="text"
                                    placeholder="Restaurant Code"
                                    value={restaurantCode}
                                    onChange={(e) => setRestaurantCode(e.target.value.toUpperCase())}
                                    className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 uppercase"
                                />
                                <button
                                    onClick={handleWaiterClockIn}
                                    disabled={!waiterName || !restaurantCode}
                                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-white/10 disabled:text-white/40 text-white py-3 rounded-xl font-semibold transition-all shadow-lg disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    <span className="material-symbols-outlined">schedule</span>
                                    Clock In & Start Shift
                                </button>
                                <p className="text-xs text-white/40 text-center">Demo: Enter any name + PEPEBETOS</p>
                            </div>
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-xs text-white/30">TableTech SaaS &copy; 2026 | Powered by George Smith</p>
                </div>
            </div>
        </div>
    );
};
