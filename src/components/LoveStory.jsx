import React from 'react';

export default function LoveStory({ data }) {
    if (!data.love_story || data.love_story.length === 0) return null;

    return (
        <section id="cerita" className="py-20 px-6 bg-wave-pattern relative overflow-hidden">
            {/* Background City */}
            <img src={data.assets.bgCover} alt="bg-city" className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[180%] md:w-[120%] opacity-50 z-0 object-cover pointer-events-none mix-blend-multiply" />
            <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#f8f9fa] to-transparent z-0 pointer-events-none"></div>
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#f8f9fa] to-transparent z-0 pointer-events-none"></div>
            
            <div className="bg-white/95 backdrop-blur-sm rounded-[2.5rem] p-8 shadow-xl border border-white/80 relative z-10 overflow-hidden">
                {/* Ornaments */}
                {data.assets?.ornamentCloud && (
                    <>
                        <img src={data.assets.ornamentCloud} alt="cloud" className="absolute -top-8 -left-8 w-32 h-32 object-contain opacity-70 mix-blend-multiply pointer-events-none scale-y-[-1]" />
                        <img src={data.assets.ornamentCloud} alt="cloud" className="absolute -top-8 -right-8 w-32 h-32 object-contain opacity-70 mix-blend-multiply scale-x-[-1] scale-y-[-1] pointer-events-none" />
                    </>
                )}
                {data.assets?.ornamentPine && (
                    <>
                        <img src={data.assets.ornamentPine} alt="pine" className="absolute -bottom-4 -left-6 w-24 h-32 object-contain opacity-80 mix-blend-multiply pointer-events-none" />
                        <img src={data.assets.ornamentPine} alt="pine" className="absolute -bottom-4 -right-6 w-24 h-32 object-contain opacity-80 mix-blend-multiply scale-x-[-1] pointer-events-none" />
                    </>
                )}
                
                <div data-aos="fade-up" className="text-center mb-12 relative z-10">
                    <h2 className="font-serif text-5xl text-gold tracking-widest uppercase">Love</h2>
                    <span className="font-script text-navy text-6xl absolute top-6 left-1/2 transform -translate-x-1/2">Story</span>
                </div>

                <div className="space-y-8 mt-16">
                    {data.love_story.map((story, idx) => {
                        const isEven = idx % 2 === 1;
                        return (
                            <div data-aos={isEven ? "fade-left" : "fade-right"} key={story.id} className={`flex items-center gap-4 ${isEven ? 'flex-row-reverse' : ''}`}>
                                {/* Text Box */}
                                <div className={`flex-1 border border-gray-200 rounded-2xl p-4 bg-white shadow-sm ${isEven ? 'text-left' : 'text-right'}`}>
                                    <h3 className="font-serif text-gold font-bold tracking-widest text-sm mb-2 uppercase">{story.title}</h3>
                                    <p className="text-xs font-serif italic text-navy leading-relaxed">{story.content}</p>
                                </div>
                                
                                {/* Image & Number */}
                                <div className="flex flex-col items-center flex-shrink-0 gap-2">
                                    <div className="w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden">
                                        <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
                                    </div>
                                    <span className="text-[10px] font-bold text-gold bg-white/80 px-2 py-0.5 rounded-full shadow-sm border border-gray-200 uppercase tracking-widest">
                                        Bagian {idx + 1}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <img src={data.assets.bgMountain} alt="bg-mountain" className="absolute bottom-0 right-0 w-full opacity-30 z-0 object-cover pointer-events-none transform translate-y-1/4" />
        </section>
    );
}
