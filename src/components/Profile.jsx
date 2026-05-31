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

            {/* Profiles Section with Light Wave Background */}
            <div className="w-full bg-wave-pattern text-center py-24 px-6 relative z-10 border-t-8 border-white">
                <h2 className="font-script text-5xl text-navy mb-4 drop-shadow-sm" data-aos="fade-up">Assalamu'alaikum Wr. Wb.</h2>
                <p className="text-xs leading-relaxed mb-16 text-navy max-w-[90%] mx-auto font-serif italic font-semibold" data-aos="fade-up">
                    Tanpa mengurangi rasa hormat dengan ini kami mengundang Bapak/Ibu/Saudara/i untuk hadir pada acara pernikahan kami
                </p>

                {/* Wanita */}
                <div className="mb-16 relative" data-aos="fade-up">
                    <div className="w-64 h-64 mx-auto rounded-full p-2 bg-white relative mb-6 shadow-xl z-10">
                        {/* Leafy Border Simulation via border-dashed and color */}
                        <div className="w-full h-full rounded-full border-4 border-dashed border-green-300 p-1">
                            <img src={data.mempelai.wanita.foto} alt="bride" className="w-full h-full object-cover rounded-full shadow-inner" />
                        </div>
                    </div>
                    <h3 className="font-script text-7xl text-gold mt-[-35px] relative z-20 drop-shadow-md">{data.mempelai.wanita.nama_lengkap}</h3>
                    <p className="text-xs mt-4 text-navy font-serif leading-relaxed" dangerouslySetInnerHTML={{__html: data.mempelai.wanita.orangtua}}></p>
                    <a href="#" className="inline-flex items-center gap-2 mt-5 bg-navy text-white text-[10px] px-6 py-3 rounded-full shadow-md hover:bg-opacity-80 transition relative z-20">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> 
                        {data.mempelai.wanita.instagram}
                    </a>
                </div>

                <h1 className="font-script text-8xl text-navy mb-16 drop-shadow-sm relative z-20" data-aos="zoom-in">&</h1>

                {/* Pria */}
                <div className="mb-10 relative" data-aos="fade-up">
                    <div className="w-64 h-64 mx-auto rounded-full p-2 bg-white relative mb-6 shadow-xl z-10">
                        <div className="w-full h-full rounded-full border-4 border-dashed border-green-300 p-1">
                            <img src={data.mempelai.pria.foto} alt="groom" className="w-full h-full object-cover rounded-full shadow-inner" />
                        </div>
                    </div>
                    <h3 className="font-script text-7xl text-gold mt-[-35px] relative z-20 drop-shadow-md">{data.mempelai.pria.nama_lengkap}</h3>
                    <p className="text-xs mt-4 text-navy font-serif leading-relaxed" dangerouslySetInnerHTML={{__html: data.mempelai.pria.orangtua}}></p>
                     <a href="#" className="inline-flex items-center gap-2 mt-5 bg-navy text-white text-[10px] px-6 py-3 rounded-full shadow-md hover:bg-opacity-80 transition relative z-20">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> 
                        {data.mempelai.pria.instagram}
                    </a>
                </div>
                
                <img src={data.assets.bgMountain} alt="bg-mountain" className="absolute bottom-0 left-0 w-full opacity-30 z-0 object-cover pointer-events-none" style={{ filter: 'grayscale(100%) opacity(0.5)' }} />
            </div>
        </section>
    );
}
