import React from 'react';

export default function Gallery({ data }) {
    return (
        <section id="galeri" className="py-20 px-6 bg-bg-light text-center relative overflow-hidden bg-wave-pattern">
            <div className="relative z-10">
                <h2 className="font-serif text-4xl text-gold mb-12" data-aos="fade-down">GALERI<br/><span className="font-script text-navy text-6xl -mt-4 block">Foto</span></h2>
                <div className="grid grid-cols-2 gap-4">
                    {data.galeri.map((item, idx) => (
                        <div key={idx} data-aos="zoom-in" data-aos-delay={idx * 100} className="overflow-hidden rounded-2xl shadow-lg border-[3px] border-white aspect-[3/4]">
                            <img src={item.src} alt={item.alt} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
