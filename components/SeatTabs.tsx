import React from 'react';
import { Seat } from '../types';
import { SEATS } from '../constants';

interface SeatTabsProps {
    activeSeatId: string;
    onSeatSelect: (id: string) => void;
    onDropOnSeat: (itemId: string, targetSeatId: string) => void;
}

export const SeatTabs: React.FC<SeatTabsProps> = ({ activeSeatId, onSeatSelect, onDropOnSeat }) => {
    
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    const handleDrop = (e: React.DragEvent, seatId: string) => {
        e.preventDefault();
        const itemId = e.dataTransfer.getData("text/plain");
        if (itemId) {
            onDropOnSeat(itemId, seatId);
        }
    };

    return (
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 px-1">
            {SEATS.map((seat) => {
                const isActive = activeSeatId === seat.id;
                return (
                    <div
                        key={seat.id}
                        onClick={() => onSeatSelect(seat.id)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, seat.id)}
                        className={`
                            relative flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full pl-4 pr-5 transition-all duration-200 cursor-pointer select-none
                            ${isActive 
                                ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                                : 'bg-bg-card text-text-sub hover:bg-white/10'
                            }
                        `}
                    >
                        <span className={`material-symbols-outlined text-[18px] ${isActive ? 'text-white' : 'text-text-sub'}`}>{seat.icon}</span>
                        <span className={`text-sm ${isActive ? 'font-bold' : 'font-medium'}`}>{seat.label}</span>
                    </div>
                );
            })}
            <button className="h-10 w-10 shrink-0 rounded-full bg-bg-card flex items-center justify-center text-text-sub hover:text-white hover:bg-white/10 transition-colors">
                 <span className="material-symbols-outlined text-[20px]">add</span>
            </button>
        </div>
    );
};