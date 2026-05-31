import React from 'react';

export default function Footer() {
    return (
        <footer className="w-full bg-navy text-white text-center pt-8 pb-28 px-6 relative z-20 overflow-hidden">
            <div className="relative z-10 flex flex-col items-center justify-center gap-1">
                <p className="text-[10px] font-sans opacity-60 mb-2">Terima kasih telah mempercayakan momen bahagia Anda kepada kami.</p>
                <p className="text-[10px] font-sans opacity-70 mb-2">Created by</p>
                
                <a 
                    href="https://www.instagram.com/ikbal_handini/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-serif font-bold text-xl text-gold drop-shadow-md tracking-wider hover:text-white transition-colors mb-4"
                >
                    @Loganese
                </a>
                
                <p className="text-[9px] font-sans opacity-40">&copy; {new Date().getFullYear()} All Rights Reserved.</p>
            </div>
            
            {/* Soft decorative blur */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-0 pointer-events-none"></div>
        </footer>
    );
}
