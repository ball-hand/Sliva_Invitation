import React, { useState, useRef, useEffect } from 'react';

export default function MusicPlayer({ data, isCoverOpen }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    // Auto-play when cover is opened
    useEffect(() => {
        if (isCoverOpen && audioRef.current) {
            // Set titik awal (start)
            if (data.music_config?.start > 0 && audioRef.current.currentTime === 0) {
                audioRef.current.currentTime = data.music_config.start;
            }
            
            audioRef.current.play().then(() => {
                setIsPlaying(true);
            }).catch(e => console.log("Auto-play prevented", e));
        }
    }, [isCoverOpen]);

    // Custom Trimmer Loop Logic
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const start = data.music_config?.start || 0;
        const end = data.music_config?.end || 0;

        const handleTimeUpdate = () => {
            if (end > 0 && audio.currentTime >= end) {
                audio.currentTime = start;
            }
        };

        const handleEnded = () => {
            audio.currentTime = start;
            audio.play();
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('ended', handleEnded);
        
        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [data.music_config]);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    if (!data.music) return null;

    return (
        <div className={`fixed bottom-24 right-4 z-50 transition-opacity duration-1000 ${isCoverOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <audio ref={audioRef} src={data.music} />
            <button 
                onClick={togglePlay}
                className={`w-12 h-12 rounded-full bg-navy border-2 border-gold shadow-xl flex items-center justify-center text-white transition-transform ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}
                style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'rgba(255,255,255,0.3)\' stroke-width=\'1\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Ccircle cx=\'12\' cy=\'12\' r=\'10\'/%3E%3Ccircle cx=\'12\' cy=\'12\' r=\'3\'/%3E%3C/svg%3E")',
                    backgroundSize: 'cover'
                }}
            >
                {/* Center hole of the vinyl */}
                <div className="w-3 h-3 bg-white rounded-full"></div>
            </button>
            <div className="absolute -top-6 right-0 bg-white/80 backdrop-blur-sm text-navy text-[10px] px-2 py-1 rounded-md shadow-sm font-semibold opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none">
                {isPlaying ? 'Pause Music' : 'Play Music'}
            </div>
        </div>
    );
}
