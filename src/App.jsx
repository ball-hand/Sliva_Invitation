import React, { useState, useEffect } from 'react';
import invitationDataJSON from './data/invitationData.json';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Cover from './components/Cover';
import Hero from './components/Hero';
import Profile from './components/Profile';
import LoveStory from './components/LoveStory';
import Event from './components/Event';
import LiveStreaming from './components/LiveStreaming';
import Gallery from './components/Gallery';
import GiftAndWishes from './components/GiftAndWishes';
import Closing from './components/Closing';
import BottomNav from './components/BottomNav';
import AdminCMS from './components/AdminCMS';
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

    // Check hash for admin route
    useEffect(() => {
        const checkHash = () => {
            setIsAdmin(window.location.hash === '#admin');
        };
        checkHash();
        window.addEventListener('hashchange', checkHash);
        return () => window.removeEventListener('hashchange', checkHash);
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
            }, 500); // give it a little time for the CSS transition to reveal the layout
        }
    }, [isCoverOpen]);

    if (isAdmin) {
        return <AdminCMS data={invitationData} onSave={setInvitationData} />;
    }

    return (
        <div className="min-h-screen bg-gray-200 flex justify-center w-full relative">
            <div className={`w-full max-w-[480px] bg-bg-light relative shadow-2xl font-sans text-navy antialiased ${!isCoverOpen ? 'overflow-hidden h-screen' : 'overflow-x-hidden min-h-screen'}`}>
                <Cover data={invitationData} isCoverOpen={isCoverOpen} setIsCoverOpen={setIsCoverOpen} />
                
                <div className={`w-full bg-white transition-opacity duration-1000 ${isCoverOpen ? 'opacity-100' : 'opacity-0'}`}>
                    <Hero data={invitationData} />
                    <Profile data={invitationData} />
                    <LoveStory data={invitationData} />
                    <Event data={invitationData} />
                    <LiveStreaming data={invitationData} />
                    <Gallery data={invitationData} />
                    <GiftAndWishes data={invitationData} />
                    <Closing data={invitationData} />
                    <BottomNav />
                    <MusicPlayer data={invitationData} isCoverOpen={isCoverOpen} />
                </div>
            </div>
        </div>
    );
}