import React from 'react';
import { Video } from 'lucide-react';

export default function LiveStreaming({ data }) {
    if (!data.live_streaming) return null;

    return (
        <section className="bg-navy text-white text-center py-24 px-8 relative overflow-hidden">
            <img src={data.assets.bgMountain} alt="bg-mountain" className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none" />
            
            <div className="relative z-10" data-aos="fade-up">
                <p className="text-sm font-serif italic leading-relaxed mb-10 opacity-90 max-w-[90%] mx-auto font-semibold">
                    {data.live_streaming.title}
                </p>
                
                <a href={data.live_streaming.link_live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white text-navy px-6 py-3 rounded-full font-bold shadow-lg hover:bg-gray-100 transition mb-10 text-sm">
                    <Video size={18} /> Live Streaming
                </a>
                
                <div className="text-left inline-block font-serif text-sm italic opacity-90 space-y-2">
                    {data.live_streaming.instagram && <p>Instagram : {data.live_streaming.instagram}</p>}
                    {data.live_streaming.tiktok && <p>TikTok : {data.live_streaming.tiktok}</p>}
                    {data.live_streaming.youtube && <p>Youtube : {data.live_streaming.youtube}</p>}
                </div>
            </div>
        </section>
    );
}
