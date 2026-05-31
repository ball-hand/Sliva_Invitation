import React, { useState, useEffect, Suspense } from 'react';
import invitationDataJSON from './data/invitationData.json';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Cover from './components/Cover';
import Hero from './components/Hero';
import Profile from './components/Profile';
import LoveStory from './components/LoveStory';
import Event from './components/Event';
import LiveStreaming from './components/LiveStreaming';
import Maps from './components/Maps';
import Gallery from './components/Gallery';
import GiftAndWishes from './components/GiftAndWishes';
import Closing from './components/Closing';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
    const [isCoverOpen, setIsCoverOpen] = useState(false);
    const [invitationData, setInvitationData] = useState(invitationDataJSON);
    const [isAdmin, setIsAdmin] = useState(false);

    // Initialize AOS
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
            easing: 'ease-in-out',
        });
    }, []);

    // Check hash for admin routes (Hanya di mode Development)
    useEffect(() => {
        const checkHash = () => {
            if (import.meta.env.DEV) {
                setIsAdmin(window.location.hash === '#admin');
            } else {
                setIsAdmin(false); // Pastikan admin tertutup di production
            }
        };
        checkHash();
        window.addEventListener('hashchange', checkHash);
        return () => window.removeEventListener('hashchange', checkHash);
    }, []);

    // Dinamis nama tamu dari parameter URL (?to=Nama+Tamu)
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const tamuQuery = urlParams.get('to');
        if (tamuQuery) {
            setInvitationData(prev => ({
                ...prev,
                tamu: tamuQuery
            }));
        }
    }, []);

    // Load custom fonts
    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        return () => document.head.removeChild(link);
    }, []);

    // Scroll to top when cover opens
    useEffect(() => {
        if (isCoverOpen) {
            window.scrollTo(0, 0);
            // Refresh AOS because the layout expands from h-screen to full height
            setTimeout(() => {
                AOS.refresh();
            }, 500);
        }
    }, [isCoverOpen]);

    // Lazy load AdminCMS HANYA saat development & isAdmin true.
    // Vite Tree-Shaking akan otomatis menghapus komponen ini saat npm run build.
    if (import.meta.env.DEV && isAdmin) {
        const AdminCMS = React.lazy(() => import('./components/AdminCMS'));
        return (
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-sans">Memuat Super Admin...</div>}>
                <AdminCMS data={invitationData} onSave={setInvitationData} />
            </Suspense>
        );
    }

    return (
        <div className="min-h-screen bg-gray-200 flex justify-center w-full relative">
            <div className={`w-full max-w-md md:max-w-3xl lg:max-w-5xl bg-bg-light relative shadow-2xl font-sans text-navy antialiased ${!isCoverOpen ? 'overflow-hidden h-screen' : 'overflow-x-hidden min-h-screen'}`}>
                
                

                <Cover data={invitationData} isCoverOpen={isCoverOpen} setIsCoverOpen={setIsCoverOpen} />
                
                <div className={`w-full bg-white relative z-10 transition-opacity duration-1000 ${isCoverOpen ? 'opacity-100' : 'opacity-0'}`}>
                    
                    {/* Hero Section (Cover) - Tampil murni di atas overlay */}
                    <div className="relative z-50 bg-white">
                        <Hero data={invitationData} />
                    </div>

                    {/* Main Content */}
                    <div className="relative w-full">
                        {/* Content Elements */}
                        <div className="relative z-10 w-full">
                            {invitationData.visibility?.profile !== false && <Profile data={invitationData} />}
                            {invitationData.visibility?.love_story !== false && <LoveStory data={invitationData} />}
                            {invitationData.visibility?.event !== false && <Event data={invitationData} />}
                            {invitationData.visibility?.maps !== false && <Maps data={invitationData} />}
                            {invitationData.visibility?.live_streaming !== false && <LiveStreaming data={invitationData} />}
                            {invitationData.visibility?.gallery !== false && <Gallery data={invitationData} />}
                            {invitationData.visibility?.wishes !== false && <GiftAndWishes data={invitationData} />}
                            <Closing data={invitationData} />
                            <Footer />
                        </div>
                    </div>

                    <BottomNav />
                    <MusicPlayer data={invitationData} isCoverOpen={isCoverOpen} />
                </div>
            </div>
        </div>
    );
}