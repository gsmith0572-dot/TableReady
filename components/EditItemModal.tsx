import React from 'react';

interface EditItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    itemName: string;
    itemPrice: number;
    category: string;
}

export const EditItemModal: React.FC<EditItemModalProps> = ({ isOpen, onClose, itemName, itemPrice, category }) => {
    if (!isOpen) return null;

    return (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
            {/* Invisible dismiss area */}
            <div className="flex-1 w-full bg-transparent" onClick={onClose}></div>
            
            {/* Bottom Sheet Modal */}
            <div className="bg-surface-dark w-full rounded-t-[2rem] shadow-2xl border-t border-white/10 ring-1 ring-white/5 animate-slide-up transform transition-transform pb-8">
                {/* Drag Handle */}
                <div className="flex items-center justify-center pt-4 pb-2">
                    <div className="h-1.5 w-12 rounded-full bg-slate-600"></div>
                </div>
                
                {/* Header Content */}
                <div className="px-6 pt-2 pb-6">
                    <div className="flex justify-between items-start mb-1">
                        <p className="text-primary text-sm font-bold tracking-wider uppercase">Edit Item</p>
                        <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors p-1 -mr-2">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                    <h2 className="text-white text-[28px] font-bold leading-tight">{itemName}</h2>
                    <p className="text-slate-400 text-sm mt-1">Main Dining Menu • {category}</p>
                </div>
                
                <div className="h-px w-full bg-white/5 mb-6"></div>
                
                {/* Controls Container */}
                <div className="px-6 flex flex-col gap-8">
                    {/* Availability Toggle */}
                    <div className="flex flex-col gap-3">
                        <label className="text-slate-300 text-sm font-bold uppercase tracking-wide">Availability</label>
                        <div className="flex h-14 w-full items-center justify-center rounded-full bg-[#111a22] p-1.5 ring-1 ring-white/5">
                            <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-full px-4 transition-all duration-200 bg-[#233648] text-white text-sm font-bold leading-normal">
                                <span className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                                    In Stock
                                </span>
                                <input defaultChecked className="hidden" name="stock_status" type="radio" value="In Stock"/>
                            </label>
                            <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-full px-4 transition-all duration-200 text-[#586e85] hover:text-white text-sm font-bold leading-normal">
                                <span className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">block</span>
                                    Sold Out (86)
                                </span>
                                <input className="hidden" name="stock_status" type="radio" value="Sold Out"/>
                            </label>
                        </div>
                    </div>
                    
                    {/* Price Override */}
                    <div className="flex flex-col gap-3">
                        <label className="text-slate-300 text-sm font-bold uppercase tracking-wide">Price Override</label>
                        <div className="flex items-center justify-between gap-4">
                            <button className="size-14 rounded-full bg-[#111a22] hover:bg-[#233648] text-white flex items-center justify-center ring-1 ring-white/10 active:scale-95 transition-all">
                                <span className="material-symbols-outlined text-2xl">remove</span>
                            </button>
                            <div className="flex-1 h-14 bg-[#111a22] rounded-full flex items-center justify-center ring-1 ring-white/10 px-4 relative">
                                <span className="text-slate-400 text-xl font-bold mr-1">$</span>
                                <span className="text-white text-2xl font-bold">{itemPrice.toFixed(2)}</span>
                            </div>
                            <button className="size-14 rounded-full bg-[#111a22] hover:bg-[#233648] text-white flex items-center justify-center ring-1 ring-white/10 active:scale-95 transition-all">
                                <span className="material-symbols-outlined text-2xl">add</span>
                            </button>
                        </div>
                    </div>
                    
                    {/* Save Action */}
                    <button onClick={onClose} className="w-full h-14 bg-primary hover:bg-blue-600 text-white rounded-full font-bold text-lg shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2">
                        <span className="material-symbols-outlined">save</span>
                        Update Menu
                    </button>
                </div>
                
                {/* Bottom spacer */}
                <div className="h-6"></div>
            </div>
        </div>
    );
};