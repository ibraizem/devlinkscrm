'use client';

import { motion } from 'framer-motion';
import { PlugZap } from 'lucide-react';

type Integration = {
    name: string;
    logo: string;
    color: string;
    category: string;
    isPopular?: boolean;
    isNew?: boolean;
}

export default function IntegrationsCard() {
    const integrations: Integration[] = [
        { name: 'AirCall', logo: '/integrations/aircall.svg', color: 'from-orange-500 to-red-500', category: 'crm', isPopular: true },
        { name: 'Calendly', logo: '/integrations/calendly.png', color: 'from-blue-500 to-cyan-500', category: 'crm', isPopular: true },
        { name: 'DocuSign', logo: '/integrations/docusign.png', color: 'from-green-500 to-emerald-500', category: 'crm' },
        { name: 'WhatsApp', logo: '/integrations/whatsapp.svg', color: 'from-green-500 to-teal-500', category: 'messaging', isPopular: true },
        { name: 'LinkedIn', logo: '/integrations/linkedin.svg', color: 'from-blue-600 to-blue-700', category: 'social' },
        { name: 'Gmail', logo: '/integrations/gmail.svg', color: 'from-red-500 to-pink-500', category: 'email', isNew: true },
        { name: 'Slack', logo: '/integrations/slack.png', color: 'from-purple-500 to-pink-500', category: 'communication' },
        { name: 'Zapier', logo: '/integrations/zapier.png', color: 'from-orange-500 to-amber-500', category: 'automation', isPopular: true },
        { name: 'Google Drive', logo: '/integrations/google_drive.png', color: 'from-yellow-500 to-orange-500', category: 'marketing' },
        { name: 'Google Meet', logo: '/integrations/google-meet.png', color: 'from-indigo-500 to-purple-500', category: 'payment' },
        { name: 'Cal.com', logo: '/integrations/cal.png', color: 'from-indigo-500 to-purple-500', category: 'payment' },
        { name: 'Make', logo: '/integrations/make.svg', color: 'from-indigo-500 to-purple-500', category: 'payment' },
        { name: 'Onoff Business', logo: '/integrations/onoff.jpg', color: 'from-indigo-500 to-purple-500', category: 'payment' },
        { name: 'Outlook', logo: '/integrations/outlook.svg', color: 'from-indigo-500 to-purple-500', category: 'payment' },
        { name: 'SendGrid', logo: '/integrations/sendgrid.png', color: 'from-indigo-500 to-purple-500', category: 'payment' },
    ];

    return (
        <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden p-8">
            <div className="relative z-10 w-full max-w-2xl space-y-8">
                {/* Title */}
                <motion.div
                    className="text-center space-y-3"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-blue-500 to-cyan-600 shadow-lg shadow-blue-500/30">
                            <PlugZap className="w-7 h-7 text-white" />
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-linear-to-r from-blue-600 via-cyan-600 to-sky-500 bg-clip-text text-transparent drop-shadow-sm">
                            Connectez vos outils
                        </h2>
                    </div>
                    <p className="text-base sm:text-lg text-slate-600 font-medium">
                        +20 intégrations puissantes et automatisées
                    </p>
                </motion.div>

                {/* Integrations Grid - 5 columns × 3 rows */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="grid grid-cols-5 gap-4 justify-items-center"
                >
                    {integrations.map((integration, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                delay: 0.5 + index * 0.05,
                                duration: 0.3
                            }}
                            whileHover={{ scale: 1.1, rotate: 2 }}
                            className="group cursor-pointer relative z-10"
                            title={integration.name}
                        >
                            <div className="relative">
                                <div className="w-20 h-20 aspect-square rounded-xl flex items-center justify-center bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-xl border border-white/60 transition-all duration-300 relative overflow-hidden p-4 group-hover:border-blue-300">
                                    <div className="absolute inset-0 bg-linear-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <img
                                        src={integration.logo}
                                        alt={`Logo ${integration.name}`}
                                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
                                    />
                                </div>
                                {integration.isPopular && (
                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-linear-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white z-20 transform rotate-12">
                                        <span className="text-[10px] text-white drop-shadow-sm">★</span>
                                    </div>
                                )}
                                {integration.isNew && (
                                    <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-linear-to-r from-emerald-500 to-teal-600 rounded-full shadow-lg border-2 border-white z-20">
                                        <span className="text-[8px] text-white font-extrabold tracking-wide">NEW</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4 px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                        className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 text-center shadow-sm hover:scale-105 transition-transform duration-300 hover:border-blue-200 hover:shadow-md"
                    >
                        <div className="text-xl font-extrabold text-slate-800">20+</div>
                        <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wide">Intégrations</div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.3 }}
                        className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 text-center shadow-sm hover:scale-105 transition-transform duration-300 hover:border-blue-200 hover:shadow-md"
                    >
                        <div className="text-xl font-extrabold text-slate-800">Temps réel</div>
                        <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wide">Sync</div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4 }}
                        className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 text-center shadow-sm hover:scale-105 transition-transform duration-300 hover:border-blue-200 hover:shadow-md"
                    >
                        <div className="text-xl font-extrabold text-slate-800">Simple</div>
                        <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wide">Config</div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}