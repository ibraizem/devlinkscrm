'use client';

import { Megaphone, Phone, Mail, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CampaignsCard() {
    const channels = [
        { icon: Phone, label: 'Appels', color: 'text-rose-500', bg: 'bg-rose-50' },
        { icon: Mail, label: 'Email', color: 'text-pink-500', bg: 'bg-pink-50' },
        { icon: MessageSquare, label: 'SMS', color: 'text-fuchsia-500', bg: 'bg-fuchsia-50' },
        { icon: MessageSquare, label: 'WhatsApp', color: 'text-purple-500', bg: 'bg-purple-50' },
    ];

    return (
        <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
            <div className="relative z-10 w-full max-w-xl space-y-6">
                {/* Title */}
                <motion.div
                    className="text-center space-y-2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-rose-500 to-pink-600 shadow-lg shadow-rose-500/30">
                            <Megaphone className="w-7 h-7 text-white" />
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-linear-to-r from-rose-600 via-pink-600 to-fuchsia-600 bg-clip-text text-transparent drop-shadow-sm">
                            Prospection Multicanal
                        </h2>
                    </div>
                    <p className="text-base sm:text-lg text-pink-600/90 font-medium">
                        Appels + Email + SMS + WhatsApp en un seul endroit
                    </p>
                </motion.div>

                {/* Mock Campaign Interface */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="space-y-3"
                >
                    <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 border border-white/50 shadow-xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent animate-shimmer-slow"></div>

                        <div className="relative z-10">
                            <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center justify-between">
                                <span>Campagne Active : Prospection Q1</span>
                                <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-600 text-[10px] font-bold uppercase">En cours</span>
                            </h3>
                            <div className="grid grid-cols-2 gap-2">
                                {channels.map((channel, index) => (
                                    <motion.div
                                        key={channel.label}
                                        className="bg-white/60 backdrop-blur-sm rounded-xl p-2.5 border border-white/50 shadow-sm hover:scale-105 transition-transform duration-200"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 + index * 0.1 }}
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className={`p-1.5 rounded-lg ${channel.bg}`}>
                                                <channel.icon className={`w-3.5 h-3.5 ${channel.color}`} />
                                            </div>
                                            <span className="text-xs font-semibold text-gray-700">
                                                {channel.label}
                                            </span>
                                        </div>
                                        <div className="flex items-end gap-1">
                                            <div className="text-lg font-extrabold text-gray-800 leading-none">
                                                {index === 0 ? '1,234' : index === 1 ? '3,456' : index === 2 ? '2,890' : '1,567'}
                                            </div>
                                            <div className="text-[10px] text-gray-500 font-medium mb-0.5">envoyés</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-3 border border-white/50 shadow-lg">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-medium text-gray-600">
                                    Taux de conversion
                                </span>
                                <span className="text-sm font-bold text-rose-600">18.5%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                <motion.div
                                    className="bg-linear-to-r from-rose-500 to-pink-600 h-2 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: '18.5%' }}
                                    transition={{ duration: 1.5, delay: 0.8 }}
                                />
                            </div>
                        </div>

                        <div className="bg-linear-to-r from-rose-500 to-pink-600 text-white rounded-2xl p-3 text-center shadow-lg flex flex-col justify-center">
                            <div className="text-[10px] font-medium opacity-90">
                                Leads contactés ajd
                            </div>
                            <div className="text-2xl font-bold leading-tight">2,847</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}