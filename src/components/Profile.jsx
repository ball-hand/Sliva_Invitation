import React from 'react';

export default function Profile({ data }) {
    return (
        <section id="pasangan" className="relative flex flex-col items-center overflow-hidden">
            
            {/* Quotes Section with Dark Background */}
            <div className="w-full bg-navy text-white text-center py-20 px-8 relative z-10 border-t-4 border-gold">
                <div className="absolute inset-0 bg-black/20 z-0"></div>
                <img src={data.assets.bgCity} alt="bg-city" className="absolute bottom-0 left-0 w-full opacity-20 z-0 object-cover pointer-events-none rotate-180" />
                
                <div className="relative z-10 flex flex-col items-center" data-aos="fade-up">
                    {/* Monogram */}
                    <div className="mb-10 flex flex-col items-center">
                        {/* Floral ornament simulation */}
                        <svg className="w-32 h-20 mb-[-30px] text-white opacity-80" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12,22C12,22 5,16 5,9C5,5 8,2 12,2C16,2 19,5 19,9C19,16 12,22 12,22Z" opacity="0.3" />
                            <path d="M12,18C12,18 7,13 7,8C7,5.5 9,3.5 12,3.5C15,3.5 17,5.5 17,8C17,13 12,18 12,18Z" opacity="0.6"/>
                            <circle cx="12" cy="8" r="2" fill="white" />
                        </svg>
                        <h1 className="font-script text-8xl drop-shadow-lg text-white">{data.mempelai.inisial}</h1>
                    </div>
                    <p className="text-xs italic font-serif leading-relaxed opacity-90 whitespace-pre-wrap px-2">
                        {data.quotes}
                    </p>
                </div>
            </div>

            {/* Profiles Section with City Background */}
            <div className="w-full text-center py-24 px-6 relative z-10 border-t-8 border-white overflow-hidden">
                {/* Background City Image - Zoomed in */}
                <div className="absolute inset-0 bg-[#e8ecef] z-0"></div>
                
                {/* Background Wanita */}
                <img src={data.assets.bgProfile} alt="bg-city" className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[180%] md:w-[120%] opacity-50 z-0 object-cover pointer-events-none mix-blend-multiply" />
                
                {/* Background Pria (Flipped) */}
                <img src={data.assets.bgProfile} alt="bg-city-flip" className="absolute bottom-0 left-1/2 transform -translate-x-1/2 scale-x-[-1] w-[180%] md:w-[120%] opacity-50 z-0 object-cover pointer-events-none mix-blend-multiply" />
                <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#e8ecef] to-transparent z-0 pointer-events-none"></div>
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#e8ecef] to-transparent z-0 pointer-events-none"></div>
                
                <div className="relative z-10">
                    <h2 className="font-script text-5xl text-navy mb-4 drop-shadow-sm" data-aos="fade-up">Assalamu'alaikum Wr. Wb.</h2>
                    <p className="text-xs leading-relaxed mb-16 text-navy max-w-[90%] mx-auto font-serif italic font-semibold" data-aos="fade-up">
                        Tanpa mengurangi rasa hormat dengan ini kami mengundang Bapak/Ibu/Saudara/i untuk hadir pada acara pernikahan kami
                    </p>

                    {/* Card Wanita */}
                    <div className="bg-white/95 backdrop-blur-sm rounded-[2.5rem] p-8 shadow-xl border border-white/80 mb-16 relative overflow-hidden" data-aos="fade-up">
                        {/* Mountain Background */}
                        <img src={data.assets.bgMountain} alt="bg-mountain" className="absolute bottom-0 left-0 w-full opacity-20 z-0 object-cover pointer-events-none mix-blend-multiply" />
                        
                        <div className="w-48 h-48 mx-auto rounded-full bg-white relative mb-6 shadow-lg z-10 overflow-hidden border-4 border-white">
                            <img src={data.mempelai.wanita.foto} alt="bride" className="w-full h-full object-cover" />
                        </div>
                        <h3 className="font-script text-6xl text-gold relative z-20 drop-shadow-sm">{data.mempelai.wanita.nama_lengkap}</h3>
                        <p className="text-xs mt-4 text-navy font-serif leading-relaxed font-semibold" dangerouslySetInnerHTML={{__html: data.mempelai.wanita.orangtua}}></p>
                        <a href="#" className="inline-flex items-center gap-2 mt-5 bg-navy text-white text-[10px] px-6 py-3 rounded-full shadow-md hover:bg-gold transition relative z-20">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> 
                            {data.mempelai.wanita.instagram}
                        </a>
                    </div>

                    <h1 className="font-script text-7xl text-navy mb-16 drop-shadow-sm relative z-20" data-aos="zoom-in">&</h1>

                    {/* Card Pria */}
                    <div className="bg-white/95 backdrop-blur-sm rounded-[2.5rem] p-8 shadow-xl border border-white/80 mb-10 relative overflow-hidden" data-aos="fade-up">
                        {/* Mountain Background */}
                        <img src={data.assets.bgMountain} alt="bg-mountain" className="absolute bottom-0 left-0 w-full opacity-20 z-0 object-cover pointer-events-none mix-blend-multiply" />
                        
                        <div className="w-48 h-48 mx-auto rounded-full bg-white relative mb-6 shadow-lg z-10 overflow-hidden border-4 border-white">
                            <img src={data.mempelai.pria.foto} alt="groom" className="w-full h-full object-cover" />
                        </div>
                        <h3 className="font-script text-6xl text-gold relative z-20 drop-shadow-sm">{data.mempelai.pria.nama_lengkap}</h3>
                        <p className="text-xs mt-4 text-navy font-serif leading-relaxed font-semibold" dangerouslySetInnerHTML={{__html: data.mempelai.pria.orangtua}}></p>
                         <a href="#" className="inline-flex items-center gap-2 mt-5 bg-navy text-white text-[10px] px-6 py-3 rounded-full shadow-md hover:bg-gold transition relative z-20">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> 
                            {data.mempelai.pria.instagram}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
