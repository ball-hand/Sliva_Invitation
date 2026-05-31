import React from 'react';
import { Mail } from 'lucide-react';

export default function Cover({ data, isCoverOpen, setIsCoverOpen }) {
    return (
        <div 
            className={`absolute inset-0 z-50 flex flex-col items-center justify-end pb-24 text-white transition-transform duration-1000 ease-in-out bg-slate-900 ${isCoverOpen ? '-translate-y-full' : 'translate-y-0'}`} 
        >
            <img src={data.assets.cover} alt="cover" className="absolute inset-0 w-full h-full object-cover z-0 opacity-60" />
            <div className="relative z-10 text-center px-6 w-full mt-auto">
                <h3 className="font-serif tracking-widest text-xs mb-3 font-semibold drop-shadow-md">THE WEDDING OF</h3>
                <h1 className="font-script text-7xl mb-12 drop-shadow-lg">{data.mempelai.panggilan}</h1>
                <p className="text-sm mb-1 opacity-90 drop-shadow-md">Kepada Yth.</p>
                <p className="font-bold text-xl mb-8 drop-shadow-md">{data.tamu}</p>
                
                <button 
                    onClick={() => setIsCoverOpen(true)} 
                    className="bg-navy hover:bg-opacity-80 text-white px-6 py-3 rounded-md flex items-center justify-center gap-2 border border-gray-400 mx-auto transition-all shadow-lg text-sm cursor-pointer"
                >
                    <Mail size={16} /> Buka Undangan
                </button>
            </div>
        </div>
    );
}
