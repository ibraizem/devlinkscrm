'use client';

import { motion } from 'framer-motion';
import { Chrome, Linkedin, Building2, Sparkles, TrendingUp, Phone, Mail, MessageSquare, Users, Target, ArrowUpRight } from 'lucide-react';

export default function AIEnrichmentCard() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
            <div className="relative z-10 w-full max-w-2xl space-y-6">
                {/* Header Title */}
                <motion.div
                    className="text-center space-y-2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl lg:text-3xl font-bold tracking-tight mb-3 bg-clip-text text-transparent bg-linear-to-r from-blue-500 via-blue-950 to-blue-500">
                        Prospectez. Enrichissez. Convertissez.
                    </h2>
                </motion.div>

                {/* Floating Action Bar - Mock CRM Interface */}
                <FloatingActionBar />

                {/* Stats Cards */}
                <motion.div
                    className="grid grid-cols-3 gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <StatCard icon={Users} label="Contacts B2B" value="15M+" color="blue" />
                    <StatCard icon={Building2} label="Entreprises" value="3.2M" color="violet" />
                    <StatCard icon={Target} label="Précision IA" value="97%" color="purple" />
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    className="grid grid-cols-2 gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <FeatureCard
                        icon={Chrome}
                        title="Extension Chrome"
                        description="Enrichissement en 1 clic"
                        gradient="from-yellow-400 to-orange-500"
                    />
                    <FeatureCard
                        icon={Sparkles}
                        title="IA B2B Expert"
                        description="Scoring intelligent"
                        gradient="from-violet-500 to-purple-600"
                    />
                </motion.div>
            </div>
        </div>
    );
}

// Floating Action Bar Component
function FloatingActionBar() {
    return (
        <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            {/* Main Action Bar */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 p-4 relative overflow-hidden">
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent animate-shimmer-slow"></div>

                {/* Content */}
                <div className="relative z-10 space-y-3">
                    {/* Active Campaign Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-bold text-gray-900">Campagne Active</span>
                        </div>
                        <span className="text-xs px-2 py-1 bg-violet-100 text-violet-700 rounded-full font-semibold">
                            IA Activée
                        </span>
                    </div>

                    {/* Action Buttons Row */}
                    <div className="grid grid-cols-4 gap-2">
                        <ActionButton icon={Phone} label="Appels" count="142" color="blue" delay={0} />
                        <ActionButton icon={Mail} label="Emails" count="89" color="purple" delay={0.1} />
                        <ActionButton icon={MessageSquare} label="SMS" count="56" color="green" delay={0.2} />
                        <ActionButton icon={Linkedin} label="LinkedIn" count="234" color="indigo" delay={0.3} />
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600 font-medium">Enrichissement en cours</span>
                            <span className="text-violet-600 font-bold">78%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                            <motion.div
                                className="bg-linear-to-r from-violet-500 to-purple-600 h-2 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: '78%' }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                            >
                                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                        <div className="flex items-center gap-1.5 text-xs text-gray-600">
                            <Sparkles className="w-3 h-3 text-violet-500" />
                            <span>Score moyen: <strong className="text-gray-900">8.5/10</strong></span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-green-600 font-semibold">
                            <TrendingUp className="w-3 h-3" />
                            +23% vs hier
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Notification Cards */}
            <FloatingNotification
                delay={1}
                text="Nouveau lead qualifié"
                icon="✨"
                position="top-right"
            />
            <FloatingNotification
                delay={2}
                text="Email ouvert"
                icon="📧"
                position="bottom-left"
            />
        </motion.div>
    );
}

// Action Button Component
function ActionButton({ icon: Icon, label, count, color, delay }: any) {
    const colorClasses = {
        blue: 'from-blue-500 to-cyan-500',
        purple: 'from-purple-500 to-pink-500',
        green: 'from-green-500 to-emerald-500',
        indigo: 'from-indigo-500 to-blue-600',
    };

    return (
        <motion.button
            className="relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
        >
            <div className={`bg-linear-to-br ${colorClasses[color as keyof typeof colorClasses]} p-3 rounded-xl shadow-md hover:shadow-lg transition-all`}>
                <Icon className="w-5 h-5 text-white mx-auto mb-1" />
                <div className="text-[10px] text-white font-semibold">{label}</div>
                <div className="text-xs text-white/90 font-bold">{count}</div>
            </div>
        </motion.button>
    );
}

// Floating Notification Component
function FloatingNotification({ delay, text, icon, position }: any) {
    const positionClasses = {
        'top-right': 'top-0 right-0 translate-x-6 -translate-y-6',
        'bottom-left': 'bottom-0 left-0 -translate-x-6 translate-y-6',
    };

    return (
        <motion.div
            className={`absolute z-50 ${positionClasses[position as keyof typeof positionClasses]} bg-white rounded-lg shadow-lg px-3 py-2 flex items-center gap-2`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, type: "spring" }}
        >
            <span className="text-lg">{icon}</span>
            <span className="text-xs font-medium text-gray-700">{text}</span>
        </motion.div>
    );
}

// Stat Card Component
function StatCard({ icon: Icon, label, value, color }: any) {
    const colorClasses = {
        blue: 'from-blue-500/10 to-cyan-500/10 border-blue-200',
        violet: 'from-violet-500/10 to-purple-500/10 border-violet-200',
        purple: 'from-purple-500/10 to-pink-500/10 border-purple-200',
    };

    return (
        <motion.div
            className={`bg-linear-to-br ${colorClasses[color as keyof typeof colorClasses]} backdrop-blur-sm rounded-xl p-3 border text-center`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <Icon className="w-5 h-5 mx-auto mb-1.5 text-gray-700" />
            <div className="text-xl font-extrabold text-gray-900">{value}</div>
            <div className="text-[10px] text-gray-600 font-medium">{label}</div>
        </motion.div>
    );
}

// Feature Card Component
function FeatureCard({ icon: Icon, title, description, gradient }: any) {
    return (
        <motion.div
            className="bg-white/70 backdrop-blur-sm rounded-xl p-3 border border-white/50 shadow-md"
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <div className={`w-10 h-10 rounded-lg bg-linear-to-br ${gradient} flex items-center justify-center mb-2`}>
                <Icon className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-sm font-bold text-gray-900 mb-1">{title}</h3>
            <p className="text-xs text-gray-600">{description}</p>
            <div className="flex items-center text-xs text-blue-600 font-semibold mt-2">
                En savoir plus
                <ArrowUpRight className="w-3 h-3 ml-1" />
            </div>
        </motion.div>
    );
}
