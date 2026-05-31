import React from 'react';

export default function Closing({ data }) {
    return (
        <section className="bg-bg-light text-center relative overflow-hidden">
            {/* Top Navy Section */}
            <div className="bg-navy text-white pt-12 pb-16 px-8" data-aos="fade-down">
                <h2 className="font-serif text-4xl text-white mb-8 tracking-widest uppercase">Quotes</h2>
                <p className="text-sm italic font-serif leading-relaxed px-4 text-gray-200">
                    {data.quotes}
                </p>
            </div>
            
            {/* Middle Photo Section */}
            <div className="relative w-full h-[500px] overflow-hidden -mt-4 z-10 shadow-inner">
                 <img src={data.assets.cover} alt="penutup" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: 'center 20%' }} />
                 <div className="absolute inset-0 bg-gradient-to-t from-bg-light via-transparent to-transparent h-48 bottom-0 top-auto"></div>
            </div>

            {/* Bottom Section */}
            <div className="px-8 pt-8 pb-32 relative z-20">
                <p className="text-xs font-serif leading-relaxed mb-8 text-navy font-semibold max-w-[90%] mx-auto">
                    Merupakan suatu kehormatan dan kebahagiaan bagi kami, apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. Atas kehadiran dan doa restunya, kami mengucapkan terima kasih.
                </p>
                <h2 className="font-script text-5xl text-gold mb-16">Wassalamu'alaikum Wr. Wb.</h2>
                <p className="text-xs font-serif italic mb-4 text-navy font-bold">Kami yang berbahagia</p>
                <h1 className="font-script text-8xl text-navy drop-shadow-sm">{data.mempelai.panggilan}</h1>
            </div>
            
            {/* City Background */}
            <img src={data.assets.bgCity} alt="bg-city" className="absolute bottom-0 left-0 w-full opacity-50 z-0 object-cover pointer-events-none" style={{ filter: 'grayscale(100%) opacity(0.5)' }} />
        </section>
    );
}
