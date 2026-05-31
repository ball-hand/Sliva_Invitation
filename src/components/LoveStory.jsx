import React from 'react';

export default function LoveStory({ data }) {
    if (!data.love_story || data.love_story.length === 0) return null;

    return (
        <section id="cerita" className="py-20 px-6 bg-wave-pattern relative overflow-hidden">
            <div className="bg-white/95 backdrop-blur-sm rounded-[2.5rem] p-8 shadow-xl border border-white/80 relative z-10">
                <div data-aos="fade-up" className="text-center mb-12 relative">
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
                                
                                {/* Image */}
                                <div className="w-24 h-24 rounded-full flex-shrink-0 border-4 border-white shadow-md overflow-hidden">
                                    <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
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
