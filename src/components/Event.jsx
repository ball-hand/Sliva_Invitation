import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

export default function Event({ data }) {
    const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });

    useEffect(() => {
        const targetDate = new Date(data.acara.countdown_target).getTime();
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(interval);
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft({
                days,
                hours: hours < 10 ? `0${hours}` : hours,
                minutes: minutes < 10 ? `0${minutes}` : minutes,
                seconds: seconds < 10 ? `0${seconds}` : seconds
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [data.acara.countdown_target]);

    return (
        <section id="acara" className="relative w-full overflow-hidden">
            {/* Top Navy Section */}
            <div className="bg-navy text-white text-center pt-20 pb-36 px-6 relative z-0">
                <h2 className="font-script text-7xl mb-8 drop-shadow-md">Save The Date</h2>
                <div className="flex justify-center gap-6 text-xs font-serif opacity-90">
                    <div className="flex flex-col"><span className="block text-4xl font-semibold mb-1">{timeLeft.days}</span> Hari</div>
                    <div className="flex flex-col"><span className="block text-4xl font-semibold mb-1">{timeLeft.hours}</span> Jam</div>
                    <div className="flex flex-col"><span className="block text-4xl font-semibold mb-1">{timeLeft.minutes}</span> Menit</div>
                    <div className="flex flex-col"><span className="block text-4xl font-semibold mb-1">{timeLeft.seconds}</span> Detik</div>
                </div>
            </div>

            {/* Bottom Light Section */}
            <div className="bg-wave-pattern relative z-10 px-6 pb-20 pt-10 -mt-24 text-center">
                {/* Background Kubah Kanan */}
                <img src={data.assets.bgCover} alt="bg-city" className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[180%] md:w-[120%] opacity-50 z-0 object-cover pointer-events-none mix-blend-multiply" />
                <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#f8f9fa] to-transparent z-0 pointer-events-none"></div>
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#f8f9fa] to-transparent z-0 pointer-events-none"></div>
                
                <img src={data.assets.bgMountain} alt="bg-mountain" className="absolute top-20 left-0 w-full opacity-40 pointer-events-none" />

                {/* Card Akad */}
                <div data-aos="fade-up" className="bg-white/95 backdrop-blur-sm text-navy rounded-[2.5rem] p-10 mb-12 relative z-20 shadow-xl border border-white/80 overflow-hidden">
                    {/* Ornaments */}
                    {data.assets.ornamentCloud && (
                        <>
                            <img src={data.assets.ornamentCloud} alt="cloud" className="absolute -top-8 -left-8 w-32 h-32 object-contain opacity-70 mix-blend-multiply pointer-events-none scale-y-[-1]" />
                            <img src={data.assets.ornamentCloud} alt="cloud" className="absolute -top-8 -right-8 w-32 h-32 object-contain opacity-70 mix-blend-multiply scale-x-[-1] scale-y-[-1] pointer-events-none" />
                        </>
                    )}
                    {data.assets.ornamentPine && (
                        <>
                            <img src={data.assets.ornamentPine} alt="pine" className="absolute -bottom-4 -left-6 w-24 h-32 object-contain opacity-80 mix-blend-multiply pointer-events-none" />
                            <img src={data.assets.ornamentPine} alt="pine" className="absolute -bottom-4 -right-6 w-24 h-32 object-contain opacity-80 mix-blend-multiply scale-x-[-1] pointer-events-none" />
                        </>
                    )}
                    
                    <h3 className="font-serif text-4xl text-gold uppercase tracking-widest relative z-10">
                        AKAD
                        <span className="font-script text-navy text-6xl lowercase absolute -bottom-10 left-1/2 transform -translate-x-1/2">Nikah</span>
                    </h3>
                    <div className="mt-14 mb-6">
                        <p className="font-bold tracking-widest text-sm mb-1">{data.acara.akad.hari}</p>
                        <p className="font-serif text-[5rem] text-gold mb-1 leading-none drop-shadow-sm">{data.acara.akad.tanggal_angka}</p>
                        <p className="font-bold tracking-widest text-sm mb-2">{data.acara.akad.bulan_tahun}</p>
                        <p className="italic font-serif text-sm text-navy font-semibold mb-6">{data.acara.akad.waktu}</p>
                    </div>
                    
                    <div className="flex items-center justify-center text-xs mb-6">
                        <span className="w-16 h-[1px] bg-navy"></span>
                        <MapPin className="mx-3 text-navy w-5 h-5" />
                        <span className="w-16 h-[1px] bg-navy"></span>
                    </div>
                    <p className="text-sm font-semibold mb-8 italic">{data.acara.akad.lokasi}</p>
                    
                    <button className="bg-navy text-white text-xs px-6 py-3 rounded-full shadow-md hover:bg-opacity-90 flex items-center justify-center gap-2 mx-auto transition">
                        <MapPin size={14} /> Lokasi Acara
                    </button>
                </div>

                {/* Card Resepsi */}
                <div data-aos="fade-up" className="bg-white/95 backdrop-blur-sm text-navy rounded-[2.5rem] p-10 mb-12 relative z-20 shadow-xl border border-white/80 overflow-hidden">
                    {/* Ornaments */}
                    {data.assets.ornamentCloud && (
                        <>
                            <img src={data.assets.ornamentCloud} alt="cloud" className="absolute -top-8 -left-8 w-32 h-32 object-contain opacity-70 mix-blend-multiply pointer-events-none scale-y-[-1]" />
                            <img src={data.assets.ornamentCloud} alt="cloud" className="absolute -top-8 -right-8 w-32 h-32 object-contain opacity-70 mix-blend-multiply scale-x-[-1] scale-y-[-1] pointer-events-none" />
                        </>
                    )}
                    {data.assets.ornamentPine && (
                        <>
                            <img src={data.assets.ornamentPine} alt="pine" className="absolute -bottom-4 -left-6 w-24 h-32 object-contain opacity-80 mix-blend-multiply pointer-events-none" />
                            <img src={data.assets.ornamentPine} alt="pine" className="absolute -bottom-4 -right-6 w-24 h-32 object-contain opacity-80 mix-blend-multiply scale-x-[-1] pointer-events-none" />
                        </>
                    )}

                    <h3 className="font-serif text-4xl text-gold uppercase tracking-widest relative z-10">
                        RESEPSI
                        <span className="font-script text-navy text-6xl lowercase absolute -bottom-10 left-1/2 transform -translate-x-1/2">Nikah</span>
                    </h3>
                    <div className="mt-14 mb-6">
                        <p className="font-bold tracking-widest text-sm mb-1">{data.acara.resepsi.hari}</p>
                        <p className="font-serif text-[5rem] text-gold mb-1 leading-none drop-shadow-sm">{data.acara.resepsi.tanggal_angka}</p>
                        <p className="font-bold tracking-widest text-sm mb-2">{data.acara.resepsi.bulan_tahun}</p>
                        <p className="italic font-serif text-sm text-navy font-semibold mb-6">{data.acara.resepsi.waktu}</p>
                    </div>
                    
                    <div className="flex items-center justify-center text-xs mb-6">
                        <span className="w-16 h-[1px] bg-navy"></span>
                        <MapPin className="mx-3 text-navy w-5 h-5" />
                        <span className="w-16 h-[1px] bg-navy"></span>
                    </div>
                    <p className="text-sm font-semibold mb-8 italic">{data.acara.resepsi.lokasi}</p>
                    
                    <button className="bg-navy text-white text-xs px-6 py-3 rounded-full shadow-md hover:bg-opacity-90 flex items-center justify-center gap-2 mx-auto transition">
                        <MapPin size={14} /> Lokasi Acara
                    </button>
                </div>
            </div>
        </section>
    );
}
