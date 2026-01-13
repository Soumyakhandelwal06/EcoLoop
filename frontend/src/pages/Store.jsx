import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import { useGame } from '../context/GameContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Star, TreePine, Shirt, Droplet, Zap, Award, Loader, CheckCircle2, AlertCircle } from 'lucide-react';

const Store = () => {
    const { getStoreItems, buyItem, user } = useGame();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [purchasing, setPurchasing] = useState(null);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            const data = await getStoreItems();
            setItems(data);
            setLoading(false);
        };
        fetchItems();
    }, []);

    const handlePurchase = async (item) => {
        if (user.coins < item.price) {
            showNotification("Insufficient EcoCoins!", "error");
            return;
        }

        setPurchasing(item.id);
        const res = await buyItem(item.id);
        setPurchasing(null);

        if (res.success) {
            showNotification(res.message, "success");
        } else {
            showNotification(res.message, "error");
        }
    };

    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const getIcon = (type) => {
        switch (type) {
            case 'tree': return <TreePine className="w-12 h-12 text-green-500" />;
            case 'hoodie': return <Shirt className="w-12 h-12 text-orange-500" />;
            case 'bottle': return <Droplet className="w-12 h-12 text-blue-500" />;
            case 'badge': return <Award className="w-12 h-12 text-yellow-500" />;
            case 'water': return <Droplet className="w-12 h-12 text-cyan-500" />;
            case 'zap': return <Zap className="w-12 h-12 text-yellow-400 fill-yellow-400" />;
            default: return <Star className="w-12 h-12 text-gray-400" />;
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <Loader className="w-10 h-10 text-green-600 animate-spin" />
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Header />

            {/* Notification Toast */}
            <AnimatePresence>
                {notification && (
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className={`fixed bottom-10 right-10 z-50 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-bold border-2 ${
                            notification.type === 'success' ? 'bg-green-600 text-white border-green-400' : 'bg-red-600 text-white border-red-400'
                        }`}
                    >
                        {notification.type === 'success' ? <CheckCircle2 /> : <AlertCircle />}
                        {notification.message}
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="max-w-6xl mx-auto px-4 mt-8">
                {/* Store Hero */}
                <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-[2.5rem] p-12 mb-12 relative overflow-hidden text-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -mr-32 -mt-32 backdrop-blur-3xl"></div>
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="bg-yellow-400/20 p-4 rounded-3xl mb-4 backdrop-blur-md border border-yellow-400/30">
                            <ShoppingBag className="w-12 h-12 text-yellow-400" />
                        </div>
                        <h1 className="text-5xl font-black text-white mb-2 tracking-tight">EcoLoop <span className="text-yellow-400">Store</span></h1>
                        <p className="text-gray-400 text-xl font-medium max-w-lg mx-auto">
                            Redeem your EcoCoins for real-world impact and exclusive goodies!
                        </p>
                    </div>
                </div>

                {/* Sub-Header / Filters (LeetCode Style) */}
                <div className="flex flex-wrap gap-3 mb-12 justify-center">
                    {['All Items', 'Symbolic', 'Premium', 'Virtual'].map((tab, i) => (
                        <button 
                            key={i}
                            className={`px-6 py-2.5 rounded-full font-bold transition-all border-2 ${
                                i === 0 ? 'bg-white text-gray-800 border-gray-200 shadow-sm' : 'text-gray-500 border-transparent hover:text-gray-800'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((item) => (
                        <motion.div 
                            key={item.id}
                            whileHover={{ y: -8 }}
                            className="bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all p-8 flex flex-col group overflow-hidden relative"
                        >
                            <div className="bg-gray-50 rounded-3xl p-10 mb-6 flex items-center justify-center transition group-hover:bg-green-50">
                                {getIcon(item.icon_type)}
                            </div>
                            
                            <h3 className="text-2xl font-black text-gray-800 mb-2 truncate">{item.name}</h3>
                            <p className="text-gray-500 font-medium mb-8 leading-relaxed h-12 line-clamp-2">
                                {item.description}
                            </p>

                            <div className="mt-auto flex items-center justify-between gap-4 pt-6 border-t border-gray-50">
                                <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-2xl border border-yellow-100">
                                    <Star className="w-5 h-5 text-yellow-600 fill-yellow-400" />
                                    <span className="text-xl font-black text-yellow-800">{item.price}</span>
                                </div>
                                <button 
                                    onClick={() => handlePurchase(item)}
                                    disabled={purchasing === item.id}
                                    className={`flex-1 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg active:scale-95 ${
                                        purchasing === item.id 
                                        ? 'bg-gray-200 text-gray-400 cursor-wait' 
                                        : 'bg-gray-900 text-white hover:bg-black hover:shadow-gray-400'
                                    }`}
                                >
                                    {purchasing === item.id ? 'Processing...' : 'Redeem'}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Section */}
                <div className="mt-20 text-center pb-10">
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-4">Redeem With Code</p>
                    <div className="flex max-w-md mx-auto items-center bg-white rounded-2xl p-2 shadow-inner border border-gray-200">
                        <input 
                            type="text" 
                            placeholder="Enter Gift Code" 
                            className="flex-1 bg-transparent px-4 py-3 outline-none font-bold text-gray-700"
                        />
                        <button className="bg-yellow-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-yellow-600 transition">
                            Redeem
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Store;
