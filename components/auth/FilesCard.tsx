'use client';

import { FileUp, Database } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FilesCard() {
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
                        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/30">
                            <FileUp className="w-7 h-7 text-white" />
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-linear-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent drop-shadow-sm">
                            Gestion de Données
                        </h2>
                    </div>
                    <p className="text-base sm:text-lg text-orange-600/90 font-medium">
                        Import/Export de gros volumes sans limite
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="space-y-3"
                >
                    {/* File Upload Stats */}
                    <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 border border-white/50 shadow-xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent animate-shimmer-slow"></div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="p-1.5 rounded-lg bg-amber-100">
                                    <Database className="w-4 h-4 text-amber-600" />
                                </div>
                                <span className="text-sm font-bold text-gray-800">
                                    Import en cours
                                </span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-medium">
                                    <span className="text-gray-600">mega_database.csv</span>
                                    <span className="font-bold text-amber-600">
                                        2.5M lignes
                                    </span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                    <motion.div
                                        className="bg-linear-to-r from-amber-500 to-orange-600 h-2 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: '75%' }}
                                        transition={{ duration: 2, delay: 0.5 }}
                                    />
                                </div>
                                <div className="flex justify-between text-[10px] text-gray-500 font-medium">
                                    <span>75% complété</span>
                                    <span>1m 23s restant</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Processing Stats */}
                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3 border border-white/50 text-center shadow-sm hover:scale-105 transition-transform duration-300">
                            <div className="text-[10px] text-gray-500 font-medium mb-1">Lignes traitées</div>
                            <div className="text-lg font-extrabold text-gray-800">1.87M</div>
                        </div>
                        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3 border border-white/50 text-center shadow-sm hover:scale-105 transition-transform duration-300">
                            <div className="text-[10px] text-gray-500 font-medium mb-1">Doublons</div>
                            <div className="text-lg font-extrabold text-gray-800">45k</div>
                        </div>
                        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3 border border-white/50 text-center shadow-sm hover:scale-105 transition-transform duration-300">
                            <div className="text-[10px] text-gray-500 font-medium mb-1">Réussite</div>
                            <div className="text-lg font-extrabold text-gray-800">98%</div>
                        </div>
                    </div>

                    {/* Format Support */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/40 shadow-lg">
                        <div className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
                            Formats supportés
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {['CSV', 'Excel', 'JSON', 'XML'].map((format) => (
                                <span
                                    key={format}
                                    className="px-2.5 py-1 bg-white/80 text-amber-700 text-[10px] font-bold rounded-lg border border-amber-200 shadow-sm"
                                >
                                    {format}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-linear-to-r from-amber-500 to-orange-600 text-white rounded-xl p-2.5 text-center text-xs font-bold shadow-lg transform hover:scale-[1.02] transition-transform">
                        ⚡ Performance optimisée pour gros volumes
                    </div>
                </motion.div>
            </div>
        </div>
    );
}