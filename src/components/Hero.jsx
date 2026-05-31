import React from 'react';

export default function Hero({ data }) {
    return (
        <section id="beranda" className="relative min-h-screen pt-12 pb-48 px-6 overflow-hidden bg-wave-pattern flex justify-center items-center">
            {/* Arched Container */}
            <div data-aos="zoom-in-up" className="bg-white w-full max-w-xs md:max-w-3xl lg:max-w-4xl rounded-t-full rounded-b-[4rem] shadow-xl relative z-20 pb-12 md:pb-0 flex flex-col md:flex-row items-stretch overflow-hidden border-[4px] border-white md:rounded-[2rem]">
                {/* Image */}
                <div className="w-full md:w-1/2 aspect-[4/5] md:aspect-auto relative bg-gray-100 min-h-[350px]">
                    <img src={data.assets.hero} alt="hero" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: 'center 30%' }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent h-16 bottom-0 top-auto md:hidden"></div>
                    <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white via-transparent to-transparent hidden md:block z-10"></div>
                </div>
                
                {/* Text */}
                <div className="text-center px-4 md:px-12 py-6 md:py-16 mt-6 md:mt-0 md:w-1/2 flex flex-col justify-center">
                    <h3 className="font-serif text-navy tracking-widest text-[10px] md:text-xs font-bold mb-3 md:mb-5 uppercase">The Wedding Of</h3>
                    <h1 className="font-script text-6xl md:text-7xl lg:text-8xl text-gold mb-3 md:mb-6 drop-shadow-sm leading-tight">{data.mempelai.panggilan}</h1>
                    <p className="font-serif text-navy italic font-medium mb-8 md:mb-10 text-sm md:text-base">{data.acara.tanggal_singkat}</p>
                    <button className="bg-navy text-white text-xs md:text-sm px-6 py-3 rounded-full shadow-md flex items-center justify-center gap-2 mx-auto hover:bg-opacity-90 transition">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> 
                        Save The Date
                    </button>
                </div>
            </div>
            
            {/* City Background */}
            <img src={data.assets.bgCover} alt="bg-city" className="absolute bottom-0 left-0 w-full opacity-50 z-10 object-cover pointer-events-none" style={{ mixBlendMode: 'multiply' }} />
            <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>
        </section>
    );
}
