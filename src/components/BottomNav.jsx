import React, { useState, useEffect } from 'react';
import { Home, Users, Calendar, Image as ImageIcon, MessageCircle } from 'lucide-react';

export default function BottomNav() {
    const [active, setActive] = useState('beranda');

    // Simple scroll spy (basic implementation for the demo)
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['beranda', 'pasangan', 'acara', 'galeri', 'ucapan'];
            let current = 'beranda';
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element && window.scrollY >= (element.offsetTop - 200)) {
                    current = section;
                }
            }
            setActive(current);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { id: 'beranda', icon: <Home size={20} /> },
        { id: 'pasangan', icon: <Users size={20} /> },
        { id: 'acara', icon: <Calendar size={20} /> },
        { id: 'galeri', icon: <ImageIcon size={20} /> },
        { id: 'ucapan', icon: <MessageCircle size={20} /> },
    ];

    return (
        <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl z-[60] flex gap-4 w-[90%] max-w-[400px] justify-between border border-white/50">
            {navItems.map(item => (
                <a 
                    key={item.id}
                    href={`#${item.id}`} 
                    className={`p-2.5 rounded-xl transition-all duration-300 ${active === item.id ? 'bg-navy text-white shadow-md' : 'text-navy hover:bg-navy/10'}`}
                    onClick={() => setActive(item.id)}
                >
                    {item.icon}
                </a>
            ))}
        </nav>
    );
}
