'use client';

import { Target, Sparkles, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LeadsCard() {
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
                        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/30">
                            <Target className="w-7 h-7 text-white" />
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent drop-shadow-sm">
                            Import & Enrichissement
                        </h2>
                    </div>
                    <p className="text-base sm:text-lg text-teal-600/90 font-medium">
                        De l'import à la qualification automatique
                    </p>
                </motion.div>

                {/* Mock Import Interface */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="space-y-3"
                >
                    {/* Import Status */}
                    <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 border border-white/50 shadow-xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent animate-shimmer-slow"></div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-bold text-gray-800 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                    leads_database.csv
                                </span>
                                <span className="text-xs text-emerald-600 font-bold bg-emerald-100 px-2 py-1 rounded-full">
                                    12,450 lignes
                                </span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2 mb-2 overflow-hidden">
                                <motion.div
                                    className="bg-linear-to-r from-emerald-500 to-teal-600 h-2 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 2, delay: 0.5 }}
                                />
                            </div>
                            <div className="flex justify-between text-[10px] font-medium text-gray-500">
                                <span className="text-emerald-600 flex items-center gap-1">✓ Importé</span>
                                <span className="text-emerald-600 flex items-center gap-1">✓ Enrichi</span>
                                <span className="text-emerald-600 flex items-center gap-1">✓ Qualifié</span>
                            </div>
                        </div>
                    </div>

                    {/* AI Processing Stats */}
                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3 border border-white/50 text-center shadow-sm hover:scale-105 transition-transform duration-300">
                            <Sparkles className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
                            <div className="text-lg font-extrabold text-gray-800">94%</div>
                            <div className="text-[10px] text-gray-500 font-medium">Enrichi AI</div>
                        </div>
                        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3 border border-white/50 text-center shadow-sm hover:scale-105 transition-transform duration-300">
                            <TrendingUp className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
                            <div className="text-lg font-extrabold text-gray-800">8.7/10</div>
                            <div className="text-[10px] text-gray-500 font-medium">Qualité</div>
                        </div>
                        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3 border border-white/50 text-center shadow-sm hover:scale-105 transition-transform duration-300">
                            <Target className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
                            <div className="text-lg font-extrabold text-gray-800">2,340</div>
                            <div className="text-[10px] text-gray-500 font-medium">Qualifiés</div>
                        </div>
                    </div>

                    {/* AI Features */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/40 shadow-lg">
                        <div className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
                            Enrichissement automatique
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 bg-white/50 p-2 rounded-lg">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                <span className="text-xs text-gray-600 font-medium">Données entreprise (SIREN, effectifs, CA)</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/50 p-2 rounded-lg">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                <span className="text-xs text-gray-600 font-medium">Profils LinkedIn et réseaux sociaux</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/50 p-2 rounded-lg">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                <span className="text-xs text-gray-600 font-medium">Score de qualification et priorité</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-linear-to-r from-emerald-500 to-teal-600 text-white rounded-xl p-2.5 text-center text-xs font-bold shadow-lg transform hover:scale-[1.02] transition-transform">
                        🚀 IA entraînée sur +50M de profils B2B
                    </div>
                </motion.div>
            </div>
        </div>
    );
}