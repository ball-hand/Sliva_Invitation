import React from 'react';

export default function Hero({ data }) {
    return (
        <section id="beranda" className="relative min-h-screen pt-12 pb-48 px-6 overflow-hidden bg-wave-pattern flex justify-center">
            {/* Arched Container */}
            <div data-aos="zoom-in-up" className="bg-white w-full max-w-xs rounded-t-full rounded-b-[4rem] shadow-xl relative z-20 pb-12 flex flex-col items-center overflow-hidden border-[4px] border-white">
                {/* Image */}
                <div className="w-full aspect-[4/5] relative bg-gray-100">
                    <img src={data.assets.hero} alt="hero" className="w-full h-full object-cover" style={{ objectPosition: 'center 30%' }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent h-16 bottom-0 top-auto"></div>
                </div>
                
                {/* Text */}
                <div className="text-center px-4 mt-6">
                    <h3 className="font-serif text-navy tracking-widest text-[10px] font-bold mb-3 uppercase">The Wedding Of</h3>
                    <h1 className="font-script text-6xl text-gold mb-3 drop-shadow-sm">{data.mempelai.panggilan}</h1>
                    <p className="font-serif text-navy italic font-medium mb-8 text-sm">{data.acara.tanggal_singkat}</p>
                    <button className="bg-navy text-white text-xs px-6 py-3 rounded-full shadow-md flex items-center justify-center gap-2 mx-auto hover:bg-opacity-90 transition">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> 
                        Save The Date
                    </button>
                </div>
            </div>
            
            {/* City Background */}
            <img src={data.assets.bgCity} alt="bg-city" className="absolute bottom-0 left-0 w-full opacity-70 z-10 object-cover pointer-events-none" style={{ mixBlendMode: 'multiply' }} />
        </section>
    );
}
