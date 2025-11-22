'use client';

import { Calendar, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AppointementsCard() {
    const appointments = [
        { time: '09:00', client: 'Entreprise A', type: 'Démo produit' },
        { time: '11:30', client: 'Entreprise B', type: 'Closing' },
        { time: '14:00', client: 'Entreprise C', type: 'Suivi' }
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
                        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-purple-500 to-indigo-600 shadow-lg shadow-purple-500/30">
                            <Calendar className="w-7 h-7 text-white" />
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-linear-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
                            Planifiez vos rendez-vous
                        </h2>
                    </div>
                    <p className="text-base sm:text-lg text-indigo-600/90 font-medium">
                        Intégration Calendly native pour automatiser vos meetings
                    </p>
                </motion.div>

                {/* Calendar Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="space-y-3"
                >
                    <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/50 overflow-hidden shadow-xl relative">
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent animate-shimmer-slow"></div>

                        {/* Calendar Header */}
                        <div className="bg-linear-to-r from-purple-500 to-indigo-600 text-white p-4 relative z-10">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-xs font-medium opacity-90 uppercase tracking-wider">Aujourd'hui</div>
                                    <div className="text-lg font-bold">Mardi 15 Janvier</div>
                                </div>
                                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                    <Calendar className="w-5 h-5" />
                                </div>
                            </div>
                        </div>

                        {/* Appointments List */}
                        <div className="p-4 space-y-2 relative z-10">
                            {appointments.map((apt, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                    className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/50 hover:bg-white/80 transition-all duration-200 shadow-sm group cursor-pointer"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="shrink-0">
                                            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                                <Clock className="w-5 h-5 text-purple-600" />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-0.5">
                                                <span className="text-sm font-bold text-gray-800">
                                                    {apt.time}
                                                </span>
                                                <span className="text-[10px] px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full font-bold uppercase tracking-wide">
                                                    {apt.type}
                                                </span>
                                            </div>
                                            <p className="text-xs font-medium text-gray-500">
                                                {apt.client}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                            className="bg-white/70 backdrop-blur-sm rounded-xl p-3 border border-white/50 text-center shadow-sm hover:scale-105 transition-transform duration-300"
                        >
                            <div className="text-xl font-extrabold text-gray-800">12</div>
                            <div className="text-[10px] text-gray-500 font-medium">RDV semaine</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.0 }}
                            className="bg-white/70 backdrop-blur-sm rounded-xl p-3 border border-white/50 text-center shadow-sm hover:scale-105 transition-transform duration-300"
                        >
                            <div className="text-xl font-extrabold text-gray-800">95%</div>
                            <div className="text-[10px] text-gray-500 font-medium">Présence</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.1 }}
                            className="bg-white/70 backdrop-blur-sm rounded-xl p-3 border border-white/50 text-center shadow-sm hover:scale-105 transition-transform duration-300"
                        >
                            <div className="text-xl font-extrabold text-gray-800">3h</div>
                            <div className="text-[10px] text-gray-500 font-medium">Gagnées/jour</div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}