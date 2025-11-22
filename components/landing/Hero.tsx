'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Sparkles, TrendingUp, Zap, ArrowRight, Phone, Mail, MessageSquare, Database, Globe, CheckCircle2, Users, BarChart3 } from 'lucide-react'

function Hero() {
  const stats = [
    { value: '10K+', label: 'Leads gérés', icon: Database },
    { value: '4', label: 'Canaux intégrés', icon: MessageSquare },
    { value: '92%', label: 'Taux de satisfaction', icon: TrendingUp },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-12">
      {/* Arrière-plan animé - géré globalement par AnimatedBackground */}

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Bloc texte */}
          <motion.div
            className="space-y-8 text-center lg:text-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >


            {/* Titre */}
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 bg-clip-text text-transparent bg-linear-to-r from-blue-500 via-blue-950 to-blue-500"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <span className="block">Prospection multicanal</span>
              <span className="block">Intelligente</span>
              <span className="block">&amp; Automatisée</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Gérez vos campagnes d'appels, emails et SMS depuis une interface unique.
              Enrichissez vos leads avec l'IA et convertissez plus rapidement.
            </motion.p>

            {/* Boutons CTA */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Button
                size="lg"
                className="group relative overflow-hidden bg-linear-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                asChild
              >
                <Link href="/auth/register" className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  <span>Essai gratuit 14 jours</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="group border-2 border-gray-200 text-gray-700 hover:border-blue-200 hover:bg-blue-50/50 px-8 py-6 text-lg rounded-xl transition-all duration-300"
                asChild
              >
                <Link href="https://calendly.com/votre-compte" target="_blank" rel="noopener noreferrer">
                  Demander une démo
                </Link>
              </Button>
            </motion.div>

            {/* Trust Badges / Stats */}
            <motion.div
              className="pt-8 border-t border-gray-100 flex flex-wrap gap-8 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center lg:items-start">
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-500 font-medium flex items-center gap-1.5">
                    <stat.icon className="w-3.5 h-3.5" />
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Bloc visuel Modernisé */}
          <motion.div
            className="relative lg:h-[500px] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function HeroVisual() {
  return (
    <div className="relative w-full max-w-lg mx-auto perspective-1000">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/20 filter blur-[100px] rounded-full pointer-events-none"></div>

      {/* Main Central Card */}
      <motion.div
        className="relative z-10 bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/60 p-6 overflow-hidden"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        {/* Shimmer */}
        <div className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/40 to-white/0 animate-shimmer-slow pointer-events-none"></div>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">Campagne Q4</div>
              <div className="text-xs text-gray-500">En cours d'exécution</div>
            </div>
          </div>
          <div className="flex items-center gap-2 px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            Active
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 hover:bg-blue-50 transition-colors group">
            <div className="flex justify-between items-start mb-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded">+12%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">2,543</div>
            <div className="text-xs text-gray-600 font-medium">Leads Qualifiés</div>
          </div>
          <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 hover:bg-indigo-50 transition-colors group">
            <div className="flex justify-between items-start mb-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-100 px-1.5 py-0.5 rounded">+5.2%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">45.2%</div>
            <div className="text-xs text-gray-600 font-medium">Taux de Réponse</div>
          </div>
        </div>

        {/* Active Channels List */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Canaux Actifs</div>
          {[
            { icon: Phone, label: 'Appels VoIP', status: 'En cours', count: 12, color: 'text-blue-600', bg: 'bg-blue-100' },
            { icon: Mail, label: 'Emailing', status: 'Envoyé', count: 845, color: 'text-purple-600', bg: 'bg-purple-100' },
            { icon: MessageSquare, label: 'SMS Marketing', status: 'Programmé', count: 230, color: 'text-green-600', bg: 'bg-green-100' },
          ].map((channel, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${channel.bg} ${channel.color}`}>
                  <channel.icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">{channel.label}</div>
                  <div className="text-[10px] text-gray-500">{channel.status}</div>
                </div>
              </div>
              <div className="text-xs font-bold text-gray-900 bg-white px-2 py-1 rounded-md border border-gray-200">
                {channel.count}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Floating Elements */}
      <FloatingCard
        icon={Sparkles}
        text="Enrichissement IA terminé"
        subtext="50 nouveaux leads"
        color="bg-amber-500"
        position="-top-6 -right-6"
        delay={1}
      />

      <FloatingCard
        icon={CheckCircle2}
        text="Rendez-vous confirmé"
        subtext="Demain, 14:00"
        color="bg-green-500"
        position="-bottom-6 -left-6"
        delay={1.5}
      />

      {/* Connecting Lines (Decorative) */}
      <svg className="absolute inset-0 pointer-events-none -z-10 overflow-visible">
        <motion.path
          d="M 100 100 Q 150 50 200 100"
          fill="none"
          stroke="url(#gradient-line)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.2 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        <defs>
          <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="50%" stopColor="#6366f1" stopOpacity="1" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

function FloatingCard({ icon: Icon, text, subtext, color, position, delay }: any) {
  return (
    <motion.div
      className={`absolute ${position} z-20 bg-white rounded-2xl shadow-xl border border-white/50 p-3 flex items-center gap-3 pr-6`}
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.05, y: -5 }}
    >
      <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white shadow-lg`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="text-xs font-bold text-gray-900">{text}</div>
        <div className="text-[10px] text-gray-500 font-medium">{subtext}</div>
      </div>
    </motion.div>
  )
}

export default Hero;