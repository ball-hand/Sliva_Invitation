import React, { useState, useEffect, useRef } from 'react';
import { X, Image as ImageIcon, Save, Plus, Trash2, Music } from 'lucide-react';

// === Audio Trimmer Component ===
const AudioTrimmer = ({ musicUrl, value, onChange }) => {
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (musicUrl) {
            const audio = new Audio(musicUrl);
            const setMeta = () => {
                setDuration(audio.duration);
                if (!value || value.end === 0 || value.end > audio.duration) {
                    onChange({ start: value?.start || 0, end: audio.duration });
                }
            };
            audio.addEventListener('loadedmetadata', setMeta);
            audioRef.current = audio;

            return () => {
                audio.removeEventListener('loadedmetadata', setMeta);
                audio.pause();
                audioRef.current = null;
            };
        }
    }, [musicUrl]);

    const formatTime = (seconds) => {
        if (isNaN(seconds)) return "0:00";
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    useEffect(() => {
        let interval;
        if (isPlaying && audioRef.current && value) {
            audioRef.current.currentTime = value.start;
            audioRef.current.play();
            interval = setInterval(() => {
                if (audioRef.current.currentTime >= value.end) {
                    audioRef.current.currentTime = value.start;
                }
            }, 100);
        } else if (audioRef.current) {
            audioRef.current.pause();
        }
        return () => clearInterval(interval);
    }, [isPlaying, value]);

    const handleStartChange = (e) => {
        const newStart = Number(e.target.value);
        if (newStart < value.end - 1) {
            onChange({ ...value, start: newStart });
        }
    };

    const handleEndChange = (e) => {
        const newEnd = Number(e.target.value);
        if (newEnd > value.start + 1) {
            onChange({ ...value, end: newEnd });
        }
    };

    if (!duration || !value) return <p className="text-xs text-gray-500 mt-2 italic">Memuat data musik...</p>;

    return (
        <div className="mt-4 border border-gray-200 rounded-xl p-4 bg-white relative">
            <h3 className="text-xs font-bold text-navy mb-4 uppercase tracking-wider flex justify-between">
                <span>Visual Audio Trimmer</span>
                <span>{formatTime(value.start)} - {formatTime(value.end)}</span>
            </h3>
            
            <div className="relative h-8 mb-6">
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 bg-gray-200 rounded-full"></div>
                <div 
                    className="absolute top-1/2 -translate-y-1/2 h-1 bg-gold rounded-full"
                    style={{ 
                        left: `${(value.start / duration) * 100}%`, 
                        right: `${100 - (value.end / duration) * 100}%` 
                    }}
                ></div>
                
                {/* Dual Slider Overlay */}
                <input 
                    type="range" 
                    min="0" 
                    max={duration} 
                    step="1"
                    value={value.start} 
                    onChange={handleStartChange}
                    className="absolute top-1/2 -translate-y-1/2 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-navy [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white z-10"
                />
                <input 
                    type="range" 
                    min="0" 
                    max={duration} 
                    step="1"
                    value={value.end} 
                    onChange={handleEndChange}
                    className="absolute top-1/2 -translate-y-1/2 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-navy [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white z-20"
                />
            </div>
            
            <button 
                onClick={(e) => { e.preventDefault(); setIsPlaying(!isPlaying); }}
                className={`w-full py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition ${isPlaying ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-navy text-white hover:bg-opacity-90'}`}
            >
                {isPlaying ? (
                    <><span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span> Stop Preview</>
                ) : (
                    <><Music size={14} /> Preview Potongan Musik</>
                )}
            </button>
        </div>
    );
};
// ==============================

const assetFiles = import.meta.glob('../../public/assets/**/*.{png,jpg,jpeg,webp,gif}', { eager: true });
const availableAssets = Object.keys(assetFiles).map(path => path.replace('../../public', ''));

export default function AdminCMS({ data, onSave }) {
    // Deep copy state to allow unconstrained editing before saving
    const [formData, setFormData] = useState(JSON.parse(JSON.stringify(data)));
    const [status, setStatus] = useState('');
    const [activeTab, setActiveTab] = useState('text'); // 'text' | 'image'
    
    // Image Picker State
    const [pickerOpen, setPickerOpen] = useState(false);
    const [currentPickerKey, setCurrentPickerKey] = useState(null); // e.g. 'assets.cover'

    // Helper to deeply update state
    const handleTextChange = (path, value) => {
        const keys = path.split('.');
        const newData = JSON.parse(JSON.stringify(formData)); // Deep clone
        let current = newData;
        for (let i = 0; i < keys.length - 1; i++) {
            if (current[keys[i]] === undefined) {
                 current[keys[i]] = isNaN(keys[i+1]) ? {} : [];
            }
            current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        setFormData(newData);
    };

    // Helper for arrays
    const addArrayItem = (arrayKey, template) => {
        const newData = JSON.parse(JSON.stringify(formData));
        if (!newData[arrayKey]) newData[arrayKey] = [];
        newData[arrayKey].push(template);
        setFormData(newData);
    };

    const removeArrayItem = (arrayKey, index) => {
        const newData = JSON.parse(JSON.stringify(formData));
        if (newData[arrayKey] && newData[arrayKey].length > index) {
            newData[arrayKey].splice(index, 1);
            setFormData(newData);
        }
    };

    // Helper to deeply read state
    const getNestedValue = (obj, path) => {
        return path.split('.').reduce((acc, part) => acc && acc[part] !== undefined ? acc[part] : null, obj) || '';
    };

    const openPicker = (keyPath) => {
        setCurrentPickerKey(keyPath);
        setPickerOpen(true);
    };

    const selectImage = (url) => {
        handleTextChange(currentPickerKey, url);
        setPickerOpen(false);
    };

    const handleSave = async () => {
        setStatus('Menyimpan...');
        try {
            const res = await fetch('/api/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setStatus('Berhasil disimpan!');
                onSave(formData);
                setTimeout(() => setStatus(''), 3000);
            } else {
                setStatus('Gagal menyimpan.');
            }
        } catch (error) {
            setStatus('Error: ' + error.message);
        }
    };

    // Reusable Component for Image Boxes
    const ImageBox = ({ label, pathKey, aspect = "aspect-[3/4]", onRemove }) => {
        const url = getNestedValue(formData, pathKey);
        return (
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between relative">
                {onRemove && (
                    <button 
                        onClick={onRemove}
                        className="absolute -top-3 -right-3 bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition z-10"
                        title="Hapus Foto"
                    >
                        <Trash2 size={14} />
                    </button>
                )}
                <p className="text-xs font-bold text-navy mb-3 uppercase tracking-wider pr-4 truncate">{label}</p>
                <div 
                    onClick={() => openPicker(pathKey)}
                    className={`w-full ${aspect} bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 hover:border-gold cursor-pointer relative group flex items-center justify-center transition`}
                >
                    {url ? (
                        <img src={url} alt={label} className="w-full h-full object-cover group-hover:opacity-60 transition" />
                    ) : (
                        <ImageIcon className="text-gray-400 w-8 h-8" />
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs font-bold tracking-widest pointer-events-none">
                        UBAH FOTO
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans w-full max-w-5xl mx-auto pb-24">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden relative border border-gray-200">
                
                {/* Header */}
                <div className="bg-navy p-6 md:p-8 text-white flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-serif mb-1">Super Admin Panel</h1>
                        <p className="text-xs opacity-80 font-sans tracking-wide">Kelola Teks & Gambar Undangan Secara Langsung</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 bg-gray-50">
                    <button 
                        onClick={() => setActiveTab('text')}
                        className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition ${activeTab === 'text' ? 'text-gold border-b-2 border-gold bg-white' : 'text-gray-400 hover:text-navy'}`}
                    >
                        📝 Pengaturan Teks
                    </button>
                    <button 
                        onClick={() => setActiveTab('image')}
                        className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition ${activeTab === 'image' ? 'text-gold border-b-2 border-gold bg-white' : 'text-gray-400 hover:text-navy'}`}
                    >
                        🖼️ Asset Manager (Foto)
                    </button>
                </div>

                {/* Content Area */}
                <div className="p-6 md:p-8">
                    {/* TAB TEKS */}
                    {activeTab === 'text' && (
                        <div className="space-y-8">
                            
                            {/* Visibility Settings */}
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                                <h2 className="text-sm font-bold text-navy mb-4 border-b border-gray-300 pb-2 uppercase tracking-widest">Pengaturan Tampilan Segmen</h2>
                                <p className="text-xs text-gray-500 mb-4 italic">Centang untuk menampilkan segmen di halaman undangan, hilangkan centang untuk menyembunyikan.</p>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {['profile', 'love_story', 'event', 'maps', 'live_streaming', 'gallery', 'wishes'].map((seg) => (
                                        <label key={seg} className="flex items-center gap-2 cursor-pointer group">
                                            <input 
                                                type="checkbox" 
                                                className="w-4 h-4 text-gold rounded border-gray-300 focus:ring-gold"
                                                checked={formData.visibility?.[seg] !== false}
                                                onChange={(e) => handleTextChange(`visibility.${seg}`, e.target.checked)}
                                            />
                                            <span className="text-xs font-bold text-gray-700 uppercase group-hover:text-gold transition">
                                                {seg.replace('_', ' ')}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* General & Music */}
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                                <h2 className="text-sm font-bold text-navy mb-4 border-b border-gray-300 pb-2 uppercase tracking-widest">Pengaturan Umum</h2>
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1">Nama Tamu Undangan (Default)</label>
                                        <input type="text" className="w-full border border-gray-300 rounded p-2 text-sm focus:border-navy outline-none" value={formData.tamu} onChange={(e) => handleTextChange('tamu', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1">Musik Latar (MP3 URL)</label>
                                        <input type="text" className="w-full border border-gray-300 rounded p-2 text-sm focus:border-navy outline-none" value={formData.music} onChange={(e) => handleTextChange('music', e.target.value)} />
                                        <AudioTrimmer 
                                            musicUrl={formData.music} 
                                            value={formData.music_config} 
                                            onChange={(newConfig) => handleTextChange('music_config', newConfig)} 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1">Quotes Al-Quran (Di atas Profil)</label>
                                        <textarea rows="4" className="w-full border border-gray-300 rounded p-2 text-sm focus:border-navy outline-none" value={formData.quotes} onChange={(e) => handleTextChange('quotes', e.target.value)} />
                                    </div>
                                </div>
                            </div>

                            {/* Mempelai */}
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h2 className="text-sm font-bold text-navy mb-4 border-b border-gray-300 pb-2 uppercase tracking-widest">Mempelai Wanita</h2>
                                    <div className="space-y-3">
                                        <input type="text" placeholder="Nama Lengkap" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.mempelai?.wanita?.nama_lengkap || ''} onChange={(e) => handleTextChange('mempelai.wanita.nama_lengkap', e.target.value)} />
                                        <textarea placeholder="Nama Orang Tua (Gunakan <br/> untuk baris baru)" rows="2" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.mempelai?.wanita?.orangtua || ''} onChange={(e) => handleTextChange('mempelai.wanita.orangtua', e.target.value)} />
                                        <input type="text" placeholder="Instagram" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.mempelai?.wanita?.instagram || ''} onChange={(e) => handleTextChange('mempelai.wanita.instagram', e.target.value)} />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-sm font-bold text-navy mb-4 border-b border-gray-300 pb-2 uppercase tracking-widest">Mempelai Pria</h2>
                                    <div className="space-y-3">
                                        <input type="text" placeholder="Nama Lengkap" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.mempelai?.pria?.nama_lengkap || ''} onChange={(e) => handleTextChange('mempelai.pria.nama_lengkap', e.target.value)} />
                                        <textarea placeholder="Nama Orang Tua (Gunakan <br/> untuk baris baru)" rows="2" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.mempelai?.pria?.orangtua || ''} onChange={(e) => handleTextChange('mempelai.pria.orangtua', e.target.value)} />
                                        <input type="text" placeholder="Instagram" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.mempelai?.pria?.instagram || ''} onChange={(e) => handleTextChange('mempelai.pria.instagram', e.target.value)} />
                                    </div>
                                </div>
                            </div>

                            {/* Acara */}
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h2 className="text-sm font-bold text-navy mb-4 border-b border-gray-300 pb-2 uppercase tracking-widest">Acara Akad</h2>
                                    <div className="space-y-3">
                                        <input type="text" placeholder="HARI (Capslock)" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.acara?.akad?.hari || ''} onChange={(e) => handleTextChange('acara.akad.hari', e.target.value)} />
                                        <input type="text" placeholder="Tanggal Angka (Misal: 07)" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.acara?.akad?.tanggal_angka || ''} onChange={(e) => handleTextChange('acara.akad.tanggal_angka', e.target.value)} />
                                        <input type="text" placeholder="BULAN TAHUN (Capslock)" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.acara?.akad?.bulan_tahun || ''} onChange={(e) => handleTextChange('acara.akad.bulan_tahun', e.target.value)} />
                                        <input type="text" placeholder="Waktu (Misal: Pukul 08.00 WIB)" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.acara?.akad?.waktu || ''} onChange={(e) => handleTextChange('acara.akad.waktu', e.target.value)} />
                                        <textarea placeholder="Lokasi Lengkap" rows="3" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.acara?.akad?.lokasi || ''} onChange={(e) => handleTextChange('acara.akad.lokasi', e.target.value)} />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-sm font-bold text-navy mb-4 border-b border-gray-300 pb-2 uppercase tracking-widest">Acara Resepsi</h2>
                                    <div className="space-y-3">
                                        <input type="text" placeholder="HARI (Capslock)" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.acara?.resepsi?.hari || ''} onChange={(e) => handleTextChange('acara.resepsi.hari', e.target.value)} />
                                        <input type="text" placeholder="Tanggal Angka (Misal: 07)" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.acara?.resepsi?.tanggal_angka || ''} onChange={(e) => handleTextChange('acara.resepsi.tanggal_angka', e.target.value)} />
                                        <input type="text" placeholder="BULAN TAHUN (Capslock)" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.acara?.resepsi?.bulan_tahun || ''} onChange={(e) => handleTextChange('acara.resepsi.bulan_tahun', e.target.value)} />
                                        <input type="text" placeholder="Waktu (Misal: Pukul 11.00 WIB)" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.acara?.resepsi?.waktu || ''} onChange={(e) => handleTextChange('acara.resepsi.waktu', e.target.value)} />
                                        <textarea placeholder="Lokasi Lengkap" rows="3" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.acara?.resepsi?.lokasi || ''} onChange={(e) => handleTextChange('acara.resepsi.lokasi', e.target.value)} />
                                    </div>
                                </div>
                            </div>

                            {/* Peta Lokasi (Maps) */}
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                                <h2 className="text-sm font-bold text-navy mb-4 border-b border-gray-300 pb-2 uppercase tracking-widest">Peta Lokasi (Maps)</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1">Google Maps Embed (iFrame URL)</label>
                                        <input type="text" placeholder="https://www.google.com/maps/embed?..." className="w-full border border-gray-300 rounded p-2 text-sm focus:border-navy outline-none" value={formData.maps?.iframe_url || ''} onChange={(e) => handleTextChange('maps.iframe_url', e.target.value)} />
                                        <p className="text-[10px] text-gray-400 mt-1 italic">Ambil URL dari fitur "Sematkan Peta" (Embed Map) di Google Maps.</p>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1">Link Tombol Navigasi (Buka di Google Maps)</label>
                                        <input type="text" placeholder="https://maps.app.goo.gl/..." className="w-full border border-gray-300 rounded p-2 text-sm focus:border-navy outline-none" value={formData.maps?.link_url || ''} onChange={(e) => handleTextChange('maps.link_url', e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Live Streaming */}
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                                <h2 className="text-sm font-bold text-navy mb-4 border-b border-gray-300 pb-2 uppercase tracking-widest">Live Streaming</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold text-gray-500 mb-1">Pesan / Deskripsi</label>
                                        <textarea rows="3" className="w-full border border-gray-300 rounded p-2 text-sm focus:border-navy outline-none" value={formData.live_streaming?.title || ''} onChange={(e) => handleTextChange('live_streaming.title', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1">Username Instagram</label>
                                        <input type="text" className="w-full border border-gray-300 rounded p-2 text-sm focus:border-navy outline-none" value={formData.live_streaming?.instagram || ''} onChange={(e) => handleTextChange('live_streaming.instagram', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1">Username TikTok</label>
                                        <input type="text" className="w-full border border-gray-300 rounded p-2 text-sm focus:border-navy outline-none" value={formData.live_streaming?.tiktok || ''} onChange={(e) => handleTextChange('live_streaming.tiktok', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1">Channel YouTube</label>
                                        <input type="text" className="w-full border border-gray-300 rounded p-2 text-sm focus:border-navy outline-none" value={formData.live_streaming?.youtube || ''} onChange={(e) => handleTextChange('live_streaming.youtube', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1">Link Utama (Button)</label>
                                        <input type="text" className="w-full border border-gray-300 rounded p-2 text-sm focus:border-navy outline-none" value={formData.live_streaming?.link_live || ''} onChange={(e) => handleTextChange('live_streaming.link_live', e.target.value)} />
                                    </div>
                                </div>
                            </div>

                            {/* Love Story Dynamic */}
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                                <div className="flex justify-between items-center mb-4 border-b border-gray-300 pb-2">
                                    <h2 className="text-sm font-bold text-navy uppercase tracking-widest">Cerita Cinta (Love Story)</h2>
                                    <button 
                                        onClick={() => addArrayItem('love_story', { id: Date.now(), title: "Babak Baru", content: "Isi cerita...", image: "" })}
                                        className="text-xs bg-navy text-white px-3 py-1 rounded-full flex items-center gap-1 hover:bg-opacity-90"
                                    >
                                        <Plus size={14} /> Tambah Cerita
                                    </button>
                                </div>
                                
                                <div className="space-y-6">
                                    {(formData.love_story || []).map((story, idx) => (
                                        <div key={idx} className="bg-white p-4 border border-gray-200 rounded-xl relative shadow-sm">
                                            <button 
                                                onClick={() => removeArrayItem('love_story', idx)}
                                                className="absolute top-4 right-4 text-red-500 hover:text-red-700 bg-red-50 p-1.5 rounded-full"
                                                title="Hapus Cerita"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                            <h3 className="text-xs font-bold text-gold uppercase tracking-widest mb-3">Cerita Bagian {idx + 1}</h3>
                                            <div className="space-y-3 pr-10">
                                                <div>
                                                    <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-wider">Judul Cerita</label>
                                                    <input type="text" className="w-full border border-gray-300 rounded p-2 text-sm focus:border-navy outline-none" value={story.title} onChange={(e) => handleTextChange(`love_story.${idx}.title`, e.target.value)} />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-wider">Isi Cerita</label>
                                                    <textarea rows="3" className="w-full border border-gray-300 rounded p-2 text-sm focus:border-navy outline-none" value={story.content} onChange={(e) => handleTextChange(`love_story.${idx}.content`, e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {(!formData.love_story || formData.love_story.length === 0) && (
                                        <p className="text-center text-sm text-gray-400 italic">Belum ada cerita yang ditambahkan.</p>
                                    )}
                                </div>
                            </div>

                            {/* Wedding Gift Dynamic */}
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                                <div className="flex justify-between items-center mb-4 border-b border-gray-300 pb-2">
                                    <h2 className="text-sm font-bold text-navy uppercase tracking-widest">Wedding Gift (Rekening)</h2>
                                    <button 
                                        onClick={() => addArrayItem('wedding_gift', { bank: "Nama Bank", account_number: "No Rekening", account_name: "Nama Pemilik" })}
                                        className="text-xs bg-navy text-white px-3 py-1 rounded-full flex items-center gap-1 hover:bg-opacity-90"
                                    >
                                        <Plus size={14} /> Tambah Rekening
                                    </button>
                                </div>
                                
                                <div className="space-y-4">
                                    {(formData.wedding_gift || []).map((gift, idx) => (
                                        <div key={idx} className="bg-white p-4 border border-gray-200 rounded-xl relative shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <button 
                                                onClick={() => removeArrayItem('wedding_gift', idx)}
                                                className="absolute -top-3 -right-3 text-white bg-red-500 hover:bg-red-600 p-2 rounded-full shadow-md z-10"
                                                title="Hapus Rekening"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                            <div>
                                                <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-wider">Bank / E-Wallet</label>
                                                <input type="text" placeholder="BCA / Dana" className="w-full border border-gray-300 rounded p-2 text-sm focus:border-navy outline-none" value={gift.bank} onChange={(e) => handleTextChange(`wedding_gift.${idx}.bank`, e.target.value)} />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-wider">No. Rekening</label>
                                                <input type="text" className="w-full border border-gray-300 rounded p-2 text-sm focus:border-navy outline-none font-mono" value={gift.account_number} onChange={(e) => handleTextChange(`wedding_gift.${idx}.account_number`, e.target.value)} />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-wider">Nama Pemilik</label>
                                                <input type="text" className="w-full border border-gray-300 rounded p-2 text-sm focus:border-navy outline-none" value={gift.account_name} onChange={(e) => handleTextChange(`wedding_gift.${idx}.account_name`, e.target.value)} />
                                            </div>
                                        </div>
                                    ))}
                                    {(!formData.wedding_gift || formData.wedding_gift.length === 0) && (
                                        <p className="text-center text-sm text-gray-400 italic">Belum ada rekening yang ditambahkan.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB GAMBAR / ASSETS */}
                    {activeTab === 'image' && (
                        <div className="space-y-12">
                            <div>
                                <h2 className="text-sm font-bold text-gold mb-4 border-b border-gray-200 pb-2 uppercase">Halaman Utama & Profil</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <ImageBox label="Cover" pathKey="assets.cover" />
                                    <ImageBox label="Beranda (Hero)" pathKey="assets.hero" />
                                    <ImageBox label="Pengantin Wanita" pathKey="mempelai.wanita.foto" aspect="aspect-square" />
                                    <ImageBox label="Pengantin Pria" pathKey="mempelai.pria.foto" aspect="aspect-square" />
                                </div>
                            </div>
                            
                            <div>
                                <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
                                    <h2 className="text-sm font-bold text-gold uppercase">Galeri Foto</h2>
                                    <button 
                                        onClick={() => addArrayItem('galeri', { src: "", alt: "foto galeri baru" })}
                                        className="text-[10px] uppercase font-bold bg-gold text-white px-3 py-1 rounded-full flex items-center gap-1 shadow-sm hover:bg-opacity-90"
                                    >
                                        <Plus size={12} /> Tambah Foto
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {(formData.galeri || []).map((item, idx) => (
                                        <ImageBox 
                                            key={idx} 
                                            label={`Galeri ${idx + 1}`} 
                                            pathKey={`galeri.${idx}.src`} 
                                            onRemove={() => removeArrayItem('galeri', idx)}
                                        />
                                    ))}
                                </div>
                                {(!formData.galeri || formData.galeri.length === 0) && (
                                    <p className="text-center text-sm text-gray-400 italic mt-4">Belum ada foto galeri.</p>
                                )}
                            </div>

                            <div>
                                <h2 className="text-sm font-bold text-gold mb-4 border-b border-gray-200 pb-2 uppercase">Foto Love Story</h2>
                                <p className="text-xs text-gray-500 mb-4 italic">*Untuk menambah/menghapus bagian cerita, gunakan tab "Pengaturan Teks".</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {(formData.love_story || []).map((story, idx) => (
                                        <ImageBox 
                                            key={idx} 
                                            label={`Bagian ${idx + 1}`} 
                                            pathKey={`love_story.${idx}.image`} 
                                            aspect="aspect-[4/3]" 
                                        />
                                    ))}
                                </div>
                                {(!formData.love_story || formData.love_story.length === 0) && (
                                    <p className="text-center text-sm text-gray-400 italic mt-4">Belum ada cerita yang ditambahkan.</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Toolbar */}
                <div className="bg-white p-4 md:p-6 border-t border-gray-200 flex justify-between items-center fixed bottom-0 left-0 w-full md:relative md:w-auto z-40 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] md:shadow-none">
                    <p className={`text-xs font-bold ${status.includes('Berhasil') ? 'text-green-600' : 'text-navy'}`}>{status}</p>
                    <button 
                        onClick={handleSave}
                        className="bg-gold text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-opacity-90 transition transform hover:-translate-y-0.5 flex items-center gap-2"
                    >
                        <Save size={18} /> Simpan Semua Perubahan
                    </button>
                </div>
            </div>

            {/* VISUAL IMAGE PICKER MODAL */}
            {pickerOpen && (
                <div className="fixed inset-0 bg-black/80 z-[100] flex justify-center items-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl overflow-hidden relative animation-fade-in">
                        {/* Header Modal */}
                        <div className="bg-navy text-white p-6 flex justify-between items-center shrink-0">
                            <div>
                                <h3 className="font-serif text-2xl mb-1">Visual Image Picker</h3>
                                <p className="text-xs opacity-80 font-sans">Pilih gambar untuk: <span className="font-bold text-gold">{currentPickerKey}</span></p>
                            </div>
                            <button onClick={() => setPickerOpen(false)} className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition">
                                <X size={24} />
                            </button>
                        </div>
                        
                        {/* Grid Foto */}
                        <div className="p-6 overflow-y-auto flex-1 bg-gray-50 custom-scrollbar">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {availableAssets.map((path, idx) => (
                                    <div 
                                        key={idx}
                                        onClick={() => selectImage(path)}
                                        className="group relative aspect-[3/4] bg-gray-200 rounded-xl overflow-hidden shadow-sm cursor-pointer border-2 border-transparent hover:border-gold transition-all"
                                    >
                                        <img src={path} alt={path} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" loading="lazy" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-3">
                                            <p className="text-white text-[10px] truncate w-full text-center font-mono">{path.split('/').pop()}</p>
                                            <p className="text-gold text-xs font-bold text-center mt-1">GUNAKAN</p>
                                        </div>
                                        {/* Tanda jika gambar ini yang sedang aktif */}
                                        {getNestedValue(formData, currentPickerKey) === path && (
                                            <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full shadow-md">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
