import React, { useState } from 'react';
import { Save, ChevronDown, ChevronUp } from 'lucide-react';

function EditorSection({ title, children }) {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="mb-4 border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition font-semibold text-gray-700"
            >
                {title}
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            {isOpen && <div className="p-4 border-t border-gray-100 space-y-4">{children}</div>}
        </div>
    );
}

function InputField({ label, value, onChange }) {
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">{label}</label>
            <input 
                type="text" 
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
                value={value} 
                onChange={onChange} 
            />
        </div>
    );
}

export default function AdminCMS({ data, onSave }) {
    const [formData, setFormData] = useState(data);
    const [saving, setSaving] = useState(false);

    const handleChange = (path, value) => {
        setFormData(prev => {
            const newData = { ...prev };
            const keys = path.split('.');
            let current = newData;
            for (let i = 0; i < keys.length - 1; i++) {
                current[keys[i]] = { ...current[keys[i]] };
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = value;
            return newData;
        });
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                onSave(formData);
                alert('Data berhasil disimpan ke file JSON lokal!');
            } else {
                alert('Gagal menyimpan data.');
            }
        } catch (error) {
            console.error(error);
            alert('Error saat menyimpan.');
        }
        setSaving(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8 w-full font-sans text-gray-800">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-600 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Undangan Local CMS</h1>
                        <p className="text-sm text-gray-500 mt-1">Perubahan akan langsung disimpan ke <code className="bg-gray-100 px-1 rounded text-red-500">src/data/invitationData.json</code>.</p>
                    </div>
                    <button 
                        onClick={handleSave} 
                        disabled={saving}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 font-semibold transition disabled:opacity-50 min-w-[200px]"
                    >
                        <Save size={18} /> {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <EditorSection title="Data Umum">
                            <InputField label="Nama Tamu Default" value={formData.tamu} onChange={(e) => handleChange('tamu', e.target.value)} />
                            <InputField label="Panggilan Mempelai (Cover & Hero)" value={formData.mempelai.panggilan} onChange={(e) => handleChange('mempelai.panggilan', e.target.value)} />
                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-1">Quotes Penutup</label>
                                <textarea 
                                    className="w-full border border-gray-300 rounded-md p-2 text-sm h-32 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                    value={formData.quotes}
                                    onChange={(e) => handleChange('quotes', e.target.value)}
                                />
                            </div>
                        </EditorSection>

                        <EditorSection title="Mempelai Wanita">
                            <InputField label="Nama Lengkap" value={formData.mempelai.wanita.nama_lengkap} onChange={(e) => handleChange('mempelai.wanita.nama_lengkap', e.target.value)} />
                            <InputField label="Deskripsi Orang Tua (Boleh pakai <br/>)" value={formData.mempelai.wanita.orangtua} onChange={(e) => handleChange('mempelai.wanita.orangtua', e.target.value)} />
                            <InputField label="Instagram" value={formData.mempelai.wanita.instagram} onChange={(e) => handleChange('mempelai.wanita.instagram', e.target.value)} />
                        </EditorSection>

                        <EditorSection title="Mempelai Pria">
                            <InputField label="Nama Lengkap" value={formData.mempelai.pria.nama_lengkap} onChange={(e) => handleChange('mempelai.pria.nama_lengkap', e.target.value)} />
                            <InputField label="Deskripsi Orang Tua (Boleh pakai <br/>)" value={formData.mempelai.pria.orangtua} onChange={(e) => handleChange('mempelai.pria.orangtua', e.target.value)} />
                            <InputField label="Instagram" value={formData.mempelai.pria.instagram} onChange={(e) => handleChange('mempelai.pria.instagram', e.target.value)} />
                        </EditorSection>
                    </div>

                    <div className="space-y-4">
                        <EditorSection title="Acara Utama">
                            <InputField label="Tanggal Singkat (Hero)" value={formData.acara.tanggal_singkat} onChange={(e) => handleChange('acara.tanggal_singkat', e.target.value)} />
                            <InputField label="Target Countdown (YYYY-MM-DDTHH:mm:ss)" value={formData.acara.countdown_target} onChange={(e) => handleChange('acara.countdown_target', e.target.value)} />
                        </EditorSection>

                        <EditorSection title="Detail Akad">
                            <InputField label="Hari" value={formData.acara.akad.hari} onChange={(e) => handleChange('acara.akad.hari', e.target.value)} />
                            <InputField label="Tanggal Angka" value={formData.acara.akad.tanggal_angka} onChange={(e) => handleChange('acara.akad.tanggal_angka', e.target.value)} />
                            <InputField label="Bulan & Tahun" value={formData.acara.akad.bulan_tahun} onChange={(e) => handleChange('acara.akad.bulan_tahun', e.target.value)} />
                            <InputField label="Waktu" value={formData.acara.akad.waktu} onChange={(e) => handleChange('acara.akad.waktu', e.target.value)} />
                            <InputField label="Lokasi" value={formData.acara.akad.lokasi} onChange={(e) => handleChange('acara.akad.lokasi', e.target.value)} />
                        </EditorSection>

                        <EditorSection title="Detail Resepsi">
                            <InputField label="Hari" value={formData.acara.resepsi.hari} onChange={(e) => handleChange('acara.resepsi.hari', e.target.value)} />
                            <InputField label="Tanggal Angka" value={formData.acara.resepsi.tanggal_angka} onChange={(e) => handleChange('acara.resepsi.tanggal_angka', e.target.value)} />
                            <InputField label="Bulan & Tahun" value={formData.acara.resepsi.bulan_tahun} onChange={(e) => handleChange('acara.resepsi.bulan_tahun', e.target.value)} />
                            <InputField label="Waktu" value={formData.acara.resepsi.waktu} onChange={(e) => handleChange('acara.resepsi.waktu', e.target.value)} />
                            <InputField label="Lokasi" value={formData.acara.resepsi.lokasi} onChange={(e) => handleChange('acara.resepsi.lokasi', e.target.value)} />
                        </EditorSection>
                    </div>
                </div>
            </div>
        </div>
    );
}
