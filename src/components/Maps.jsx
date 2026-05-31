import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

export default function Maps({ data }) {
    if (!data.maps || !data.maps.iframe_url) return null;

    return (
        <section className="py-24 px-6 bg-white text-center relative overflow-hidden">
            {/* Background Tower and Bridge */}
            <img src={data.assets.bgProfile} alt="bg-city" className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[180%] md:w-[120%] opacity-50 z-0 object-cover pointer-events-none mix-blend-multiply scale-x-[-1]" />
            <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white to-transparent z-0 pointer-events-none"></div>
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white to-transparent z-0 pointer-events-none"></div>
            
            <div className="relative z-10" data-aos="fade-up">
                <div className="flex justify-center mb-4 text-gold">
                    <MapPin size={40} />
                </div>
                <h2 className="font-serif text-3xl text-navy mb-8 uppercase tracking-widest">
                    Peta Lokasi
                </h2>
                
                {/* iFrame Container */}
                <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg border-[3px] border-gray-100 mb-8 relative bg-gray-200 flex items-center justify-center">
                    {!data.maps.iframe_url ? (
                        <p className="text-sm font-serif italic text-gray-400">Peta belum diatur</p>
                    ) : (
                        <iframe 
                            src={data.maps.iframe_url.startsWith('<iframe') ? (data.maps.iframe_url.match(/src="([^"]+)"/) || [])[1] || data.maps.iframe_url : data.maps.iframe_url}
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0"
                        ></iframe>
                    )}
                </div>

                {/* Direction Button */}
                {data.maps.link_url && (
                    <a 
                        href={data.maps.link_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-navy text-white px-8 py-3.5 rounded-full font-bold shadow-xl hover:bg-gold hover:text-white transition-all transform hover:-translate-y-1 text-xs tracking-wider"
                    >
                        <Navigation size={16} /> Buka di Google Maps
                    </a>
                )}
            </div>
        </section>
    );
}
