import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginScreen: React.FC = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState<'restaurant' | 'admin'>('restaurant');
    const [restaurantId, setRestaurantId] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (mode === 'admin') {
            // Mock auth for admin
            navigate('/admin');
        } else {
            // Mock auth for restaurant
            const targetId = restaurantId.trim().toLowerCase() || 'pepe-betos';
            navigate(`/pos/${targetId}`);
        }
    };

    return (
        <div className="h-screen w-full bg-background-dark flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-[-20%] left-[-10%] size-[500px] rounded-full bg-primary/20 blur-[128px] pointer-events-none"></div>
            <div className="absolute bottom-[-20%] right-[-10%] size-[500px] rounded-full bg-emerald-500/10 blur-[128px] pointer-events-none"></div>

            <div className="w-full max-w-md bg-card-dark border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10">
                <div className="text-center mb-8 flex flex-col items-center">
                    {/* TableTech Logo */}
                    {/* INSTRUCCIÓN: Guarda tu imagen como 'logo.png' en la carpeta public/raíz */}
                    <img 
                        src="/logo.png" 
                        alt="TableTech" 
                        className="h-32 w-auto object-contain mb-4 mx-auto"
                        onError={(e) => {
                            // Fallback visual si no se encuentra la imagen
                            e.currentTarget.style.display = 'none';
                            const fallback = document.getElementById('logo-fallback');
                            if(fallback) fallback.classList.remove('hidden');
                        }}
                    />
                    
                    {/* Fallback por si la imagen no carga */}
                    <h1 id="logo-fallback" className="text-3xl font-bold text-white tracking-tight hidden mb-2">TableTech</h1>
                    
                    <p className="text-white/50 text-sm">Next-gen POS Platform</p>
                </div>

                <div className="bg-black/20 p-1 rounded-xl flex mb-6">
                    <button 
                        onClick={() => setMode('restaurant')}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${mode === 'restaurant' ? 'bg-primary text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
                    >
                        Restaurant Login
                    </button>
                    <button 
                        onClick={() => setMode('admin')}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${mode === 'admin' ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
                    >
                        Super Admin
                    </button>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    {mode === 'restaurant' ? (
                        <div>
                            <label className="block text-xs font-bold uppercase text-white/40 mb-1 ml-1">Restaurant ID / Code</label>
                            <input 
                                type="text" 
                                placeholder="e.g. pepe-betos"
                                value={restaurantId}
                                onChange={(e) => setRestaurantId(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-white/20"
                            />
                        </div>
                    ) : (
                        <div>
                            <label className="block text-xs font-bold uppercase text-white/40 mb-1 ml-1">Admin Password</label>
                            <input 
                                type="password" 
                                placeholder="••••••••"
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-white outline-none transition-all placeholder:text-white/20"
                            />
                        </div>
                    )}

                    <button className={`w-full py-4 rounded-xl font-bold text-lg transition-transform active:scale-[0.98] ${mode === 'admin' ? 'bg-white text-black hover:bg-gray-200' : 'bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20'}`}>
                        {mode === 'admin' ? 'Enter Dashboard' : 'Launch POS'}
                    </button>
                </form>

                <div className="mt-6 pt-6 border-t border-white/5 text-center">
                    <p className="text-xs text-white/30">Protected by TableTech SaaS &copy; 2025</p>
                </div>
            </div>
        </div>
    );
};