import React, { useState, useEffect } from 'react';
import { Copy } from 'lucide-react';

// KONFIGURASI JSONBIN
// Dapatkan ID dan API Key gratis dari https://jsonbin.io
const BIN_ID = "6a1bcbe121f9ee59d2a016be"; // Contoh: "645b...a21"
const API_KEY = "$2a$10$GwPEE9vGC3zShnGcv3kAJ.EKUbBm8NszgBHeACC.dHWAIuq5iaSK6"; // Contoh: "$2b$10$..."

export default function GiftAndWishes({ data }) {
    const [wishes, setWishes] = useState([]);
    const [formData, setFormData] = useState({ name: '', attendance: 'Hadir', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');
    const [copied, setCopied] = useState(false);

    // Load initial wishes
    useEffect(() => {
        const fetchWishes = async () => {
            if (!BIN_ID) {
                // Fallback to localStorage if no BIN_ID is provided
                const localWishes = JSON.parse(localStorage.getItem('wedding_wishes') || '[]');
                if (localWishes.length === 0) {
                    setWishes([
                        { name: "Budi & Keluarga", attendance: "Hadir", message: "Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.", date: new Date().toISOString() }
                    ]);
                } else {
                    setWishes(localWishes);
                }
                return;
            }

            try {
                const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
                    headers: { 'X-Master-Key': API_KEY }
                });
                const result = await response.json();
                if (result.record && Array.isArray(result.record)) {
                    setWishes(result.record);
                }
            } catch (error) {
                console.error("Error fetching wishes:", error);
            }
        };
        
        fetchWishes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.message) return;

        setIsLoading(true);
        const newWish = {
            ...formData,
            date: new Date().toISOString()
        };
        
        const updatedWishes = [newWish, ...wishes];

        if (!BIN_ID) {
            // Fallback to localStorage
            localStorage.setItem('wedding_wishes', JSON.stringify(updatedWishes));
            setWishes(updatedWishes);
            setFormData({ name: '', attendance: 'Hadir', message: '' });
            setSubmitStatus('Terkirim!');
            setTimeout(() => setSubmitStatus(''), 3000);
            setIsLoading(false);
            return;
        }

        // Save to JSONBin
        try {
            await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': API_KEY
                },
                body: JSON.stringify(updatedWishes)
            });
            setWishes(updatedWishes);
            setFormData({ name: '', attendance: 'Hadir', message: '' });
            setSubmitStatus('Terkirim!');
            setTimeout(() => setSubmitStatus(''), 3000);
        } catch (error) {
            console.error("Error saving wish:", error);
            setSubmitStatus('Gagal mengirim');
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit' });
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="ucapan" className="py-24 px-6 bg-wave-pattern text-center relative overflow-hidden">
            <img src={data.assets.bgMountain} alt="bg-mountain" className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none" />
            
            {/* Wedding Gift */}
            <div data-aos="fade-up" className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 mb-12 relative z-10 shadow-2xl border border-white/50">
                <h2 className="font-script text-6xl text-gold mb-4">Wedding Gift</h2>
                <p className="font-serif text-xs leading-relaxed text-navy italic mb-8 px-2">
                    Doa Restu Anda merupakan karunia yang sangat berarti bagi kami. Dan jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless.
                </p>

                {/* Account 1 */}
                <div className="bg-gray-100 rounded-2xl p-6 mb-4 flex flex-col items-center border border-gray-200">
                    <h3 className="font-bold text-navy text-sm mb-2 uppercase tracking-wider">Dana</h3>
                    <p className="text-xl font-mono text-gray-700 tracking-widest mb-1">081234567890</p>
                    <p className="text-xs text-gray-500 mb-4 font-serif">a.n Silva Putri</p>
                    <button 
                        onClick={() => handleCopy('081234567890')}
                        className="bg-navy text-white text-[10px] px-4 py-2 rounded-full hover:bg-opacity-90 transition flex items-center gap-2"
                    >
                        <Copy size={12} /> {copied ? 'Tersalin!' : 'Salin No. Rekening'}
                    </button>
                </div>
            </div>

            {/* Ucapan & Doa */}
            <div data-aos="fade-up" className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 relative z-10 shadow-2xl border border-white/50 text-left">
                 <h2 className="font-serif text-3xl text-gold mb-2 uppercase text-center">UCAPAN<br/><span className="font-script text-navy text-5xl lowercase">& Doa</span></h2>
                 <p className="font-serif text-xs leading-relaxed text-navy italic mb-8 px-2 font-bold text-center">
                    Berikan ucapan dan do'a kepada mempelai
                 </p>

                 {/* Form */}
                 <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                     <div>
                         <label className="block text-[10px] font-bold text-navy mb-1 uppercase tracking-wider">Nama Anda</label>
                         <input 
                            type="text" 
                            required
                            placeholder="Tulis nama Anda"
                            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-navy bg-white/50"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                         />
                     </div>
                     <div>
                         <label className="block text-[10px] font-bold text-navy mb-1 uppercase tracking-wider">Kehadiran</label>
                         <select 
                            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-navy bg-white/50 appearance-none"
                            value={formData.attendance}
                            onChange={(e) => setFormData({...formData, attendance: e.target.value})}
                         >
                             <option value="Hadir">Ya, Saya Akan Hadir</option>
                             <option value="Tidak Hadir">Maaf, Tidak Bisa Hadir</option>
                             <option value="Masih Ragu">Masih Ragu-ragu</option>
                         </select>
                     </div>
                     <div>
                         <label className="block text-[10px] font-bold text-navy mb-1 uppercase tracking-wider">Ucapan & Doa</label>
                         <textarea 
                            required
                            rows="4"
                            placeholder="Tulis ucapan dan doa Anda disini..."
                            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-navy resize-none bg-white/50"
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                         ></textarea>
                     </div>
                     <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full bg-navy text-white text-xs font-bold py-3 rounded-lg shadow-md hover:bg-opacity-90 transition disabled:opacity-50"
                     >
                         {isLoading ? 'MENGIRIM...' : 'KIRIM UCAPAN'}
                     </button>
                     {submitStatus && <p className={`text-center text-xs mt-3 font-bold ${submitStatus === 'Gagal mengirim' ? 'text-red-500' : 'text-green-600'}`}>{submitStatus}</p>}
                 </form>

                 {/* Comments List */}
                 <div className="border-t border-gray-200 pt-6">
                     <h3 className="font-bold text-navy text-sm mb-4">{wishes.length} Ucapan</h3>
                     <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                         {wishes.map((wish, idx) => (
                             <div key={idx} className="bg-gray-50/80 border border-gray-100 rounded-2xl p-4 shadow-sm">
                                 <div className="flex justify-between items-start mb-2">
                                     <div className="flex items-center gap-2 flex-wrap">
                                         <h4 className="font-bold text-navy text-sm">{wish.name}</h4>
                                         <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold tracking-wider uppercase ${wish.attendance === 'Hadir' || wish.attendance === 'Ya, Saya Akan Hadir' ? 'bg-green-100 text-green-700' : wish.attendance === 'Tidak Hadir' || wish.attendance === 'Maaf, Tidak Bisa Hadir' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {wish.attendance}
                                         </span>
                                     </div>
                                 </div>
                                 <p className="text-xs text-gray-700 mb-3 leading-relaxed">{wish.message}</p>
                                 <p className="text-[10px] text-gray-400 font-serif italic">{formatDate(wish.date)}</p>
                             </div>
                         ))}
                     </div>
                 </div>
            </div>
        </section>
    );
}
