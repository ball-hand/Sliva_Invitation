import React, { useState } from 'react';
import { X, Image as ImageIcon, Save, Music } from 'lucide-react';

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
        const newData = { ...formData };
        let current = newData;
        for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) current[keys[i]] = {};
            current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        setFormData(newData);
    };

    // Helper to deeply read state
    const getNestedValue = (obj, path) => {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj) || '';
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
    const ImageBox = ({ label, pathKey, aspect = "aspect-[3/4]" }) => {
        const url = getNestedValue(formData, pathKey);
        return (
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                <p className="text-xs font-bold text-navy mb-3 uppercase tracking-wider">{label}</p>
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
                    <a href="#" className="bg-white text-navy px-5 py-2 rounded-full text-xs font-bold shadow-md hover:bg-gray-100 transition">
                        Tutup Editor
                    </a>
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
                                        <input type="text" placeholder="Nama Lengkap" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.mempelai.wanita.nama_lengkap} onChange={(e) => handleTextChange('mempelai.wanita.nama_lengkap', e.target.value)} />
                                        <textarea placeholder="Nama Orang Tua (Gunakan <br/> untuk baris baru)" rows="2" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.mempelai.wanita.orangtua} onChange={(e) => handleTextChange('mempelai.wanita.orangtua', e.target.value)} />
                                        <input type="text" placeholder="Instagram" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.mempelai.wanita.instagram} onChange={(e) => handleTextChange('mempelai.wanita.instagram', e.target.value)} />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-sm font-bold text-navy mb-4 border-b border-gray-300 pb-2 uppercase tracking-widest">Mempelai Pria</h2>
                                    <div className="space-y-3">
                                        <input type="text" placeholder="Nama Lengkap" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.mempelai.pria.nama_lengkap} onChange={(e) => handleTextChange('mempelai.pria.nama_lengkap', e.target.value)} />
                                        <textarea placeholder="Nama Orang Tua (Gunakan <br/> untuk baris baru)" rows="2" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.mempelai.pria.orangtua} onChange={(e) => handleTextChange('mempelai.pria.orangtua', e.target.value)} />
                                        <input type="text" placeholder="Instagram" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.mempelai.pria.instagram} onChange={(e) => handleTextChange('mempelai.pria.instagram', e.target.value)} />
                                    </div>
                                </div>
                            </div>

                            {/* Acara */}
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h2 className="text-sm font-bold text-navy mb-4 border-b border-gray-300 pb-2 uppercase tracking-widest">Acara Akad</h2>
                                    <div className="space-y-3">
                                        <input type="text" placeholder="HARI (Capslock)" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.acara.akad.hari} onChange={(e) => handleTextChange('acara.akad.hari', e.target.value)} />
                                        <input type="text" placeholder="Tanggal Angka (Misal: 07)" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.acara.akad.tanggal_angka} onChange={(e) => handleTextChange('acara.akad.tanggal_angka', e.target.value)} />
                                        <input type="text" placeholder="BULAN TAHUN (Capslock)" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.acara.akad.bulan_tahun} onChange={(e) => handleTextChange('acara.akad.bulan_tahun', e.target.value)} />
                                        <input type="text" placeholder="Waktu (Misal: Pukul 08.00 WIB)" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.acara.akad.waktu} onChange={(e) => handleTextChange('acara.akad.waktu', e.target.value)} />
                                        <textarea placeholder="Lokasi Lengkap" rows="3" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.acara.akad.lokasi} onChange={(e) => handleTextChange('acara.akad.lokasi', e.target.value)} />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-sm font-bold text-navy mb-4 border-b border-gray-300 pb-2 uppercase tracking-widest">Acara Resepsi</h2>
                                    <div className="space-y-3">
                                        <input type="text" placeholder="HARI (Capslock)" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.acara.resepsi.hari} onChange={(e) => handleTextChange('acara.resepsi.hari', e.target.value)} />
                                        <input type="text" placeholder="Tanggal Angka (Misal: 07)" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.acara.resepsi.tanggal_angka} onChange={(e) => handleTextChange('acara.resepsi.tanggal_angka', e.target.value)} />
                                        <input type="text" placeholder="BULAN TAHUN (Capslock)" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.acara.resepsi.bulan_tahun} onChange={(e) => handleTextChange('acara.resepsi.bulan_tahun', e.target.value)} />
                                        <input type="text" placeholder="Waktu (Misal: Pukul 11.00 WIB)" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.acara.resepsi.waktu} onChange={(e) => handleTextChange('acara.resepsi.waktu', e.target.value)} />
                                        <textarea placeholder="Lokasi Lengkap" rows="3" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.acara.resepsi.lokasi} onChange={(e) => handleTextChange('acara.resepsi.lokasi', e.target.value)} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}

                    {/* TAB GAMBAR / ASSETS */}
                    {activeTab === 'image' && (
                        <div className="space-y-8">
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
                                <h2 className="text-sm font-bold text-gold mb-4 border-b border-gray-200 pb-2 uppercase">Galeri Foto</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <ImageBox label="Galeri 1" pathKey="galeri.0.src" />
                                    <ImageBox label="Galeri 2" pathKey="galeri.1.src" />
                                    <ImageBox label="Galeri 3" pathKey="galeri.2.src" />
                                    <ImageBox label="Galeri 4" pathKey="galeri.3.src" />
                                </div>
                            </div>

                            <div>
                                <h2 className="text-sm font-bold text-gold mb-4 border-b border-gray-200 pb-2 uppercase">Love Story</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <ImageBox label="Cerita 1" pathKey="love_story.0.image" aspect="aspect-[4/3]" />
                                    <ImageBox label="Cerita 2" pathKey="love_story.1.image" aspect="aspect-[4/3]" />
                                    <ImageBox label="Cerita 3" pathKey="love_story.2.image" aspect="aspect-[4/3]" />
                                    <ImageBox label="Cerita 4" pathKey="love_story.3.image" aspect="aspect-[4/3]" />
                                </div>
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
