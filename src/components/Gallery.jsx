import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function Gallery({ data }) {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <section id="galeri" className="py-20 px-6 bg-bg-light text-center relative overflow-hidden bg-wave-pattern">
            {/* Background Kubah Kanan */}
            <img src={data.assets.bgCover} alt="bg-cover" className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[180%] md:w-[120%] opacity-50 z-0 object-cover pointer-events-none mix-blend-multiply scale-x-[-1]" />
            <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-bg-light to-transparent z-0 pointer-events-none"></div>
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg-light to-transparent z-0 pointer-events-none"></div>
            
            <div className="relative z-10">
                <h2 className="font-serif text-4xl text-gold mb-12" data-aos="fade-down">GALERI<br/><span className="font-script text-navy text-6xl -mt-4 block">Foto</span></h2>
                <div className="grid grid-cols-2 gap-4">
                    {data.galeri.map((item, idx) => (
                        <div 
                            key={idx} 
                            data-aos="zoom-in" 
                            data-aos-delay={idx * 100} 
                            className="overflow-hidden rounded-2xl shadow-lg border-[3px] border-white aspect-[3/4] cursor-pointer group"
                            onClick={() => setSelectedImage(item.src)}
                        >
                            <img src={item.src} alt={item.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center pointer-events-none">
                                <span className="text-white bg-black/50 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">Perbesar</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4 backdrop-blur-md"
                    onClick={() => setSelectedImage(null)}
                >
                    <button 
                        className="absolute top-6 right-6 text-white bg-white/10 p-3 rounded-full hover:bg-white/30 transition z-[101]"
                        onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                    >
                        <X size={24} />
                    </button>
                    <img 
                        src={selectedImage} 
                        alt="Zoomed Gallery" 
                        className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl transition-all duration-300 scale-100 animate-fade-in"
                        onClick={(e) => e.stopPropagation()} 
                    />
                    <p className="text-white text-xs mt-6 opacity-70 font-sans tracking-widest uppercase">Ketuk di luar gambar untuk menutup</p>
                </div>
            )}
        </section>
    );
}
