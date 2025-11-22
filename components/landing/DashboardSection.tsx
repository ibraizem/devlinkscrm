'use client';

import FeatureSection from './FeatureSection';
import SidePanel from './SidePanel';
import { Home, TrendingUp, Users, Phone, Mail, MessageSquare, Activity, Globe, BarChart3, ArrowUpRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardSection() {
  return (
    <FeatureSection
      id="dashboard"
      title="Pilotez des milliers de leads en temps réel"
      subtitle="Tableaux de bord conçus pour gérer des gros volumes"
      description="Gérez et suivez des milliers de leads simultanément avec des performances optimales. Visualisez vos KPIs en temps réel et prenez des décisions éclairées basées sur des données actualisées."
      features={[
        'Suivi de milliers de leads simultanément avec performance optimale',
        'KPIs en temps réel : taux de contact, conversion, volume d\'appels',
        'Visualisation des performances par agent, équipe et campagne',
        'Alertes intelligentes sur les objectifs et anomalies de volume',
      ]}
      icon={Home}
      gradient="from-blue-500 to-blue-950"
      iconColor="text-blue-500"
      bgColor="bg-blue-50"
      badge={{
        text: 'Temps réel',
        stat: '10 000+ leads gérés',
      }}
      reverse={true}
    >
      <SidePanel gradient="from-blue-500 to-blue-600">
        <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden py-8">
          {/* Floating Dashboard Interface */}
          <DashboardPreview />
        </div>
      </SidePanel>
    </FeatureSection>
  );
}

function DashboardPreview() {
  return (
    <motion.div
      className="relative w-full max-w-md"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Main Glass Card */}
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 p-5 relative overflow-hidden">
        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent animate-shimmer-slow"></div>

        {/* Content */}
        <div className="relative z-10 space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
              </div>
              <span className="text-sm font-bold text-gray-900">Activité en direct</span>
            </div>
            <span className="text-xs px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold border border-blue-200">
              Global
            </span>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            <MetricCard
              label="Total Leads"
              value="10,234"
              trend="+23%"
              icon={Users}
              color="blue"
            />
            <MetricCard
              label="Conversions"
              value="1,847"
              trend="+18%"
              icon={TrendingUp}
              color="indigo"
            />
          </div>

          {/* Real-time Channels Row */}
          <div>
            <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Canaux Actifs</div>
            <div className="grid grid-cols-4 gap-2">
              <ChannelStatus icon={Phone} label="Appels" count="42" color="green" active />
              <ChannelStatus icon={Mail} label="Emails" count="18" color="purple" active />
              <ChannelStatus icon={MessageSquare} label="Chat" count="24" color="blue" active />
              <ChannelStatus icon={Globe} label="Web" count="156" color="orange" active />
            </div>
          </div>

          {/* Progress / Goal */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600 font-medium">Objectif Journalier</span>
              <span className="text-blue-600 font-bold">84%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden border border-gray-200">
              <motion.div
                className="bg-linear-to-r from-blue-500 to-indigo-600 h-full rounded-full relative"
                initial={{ width: 0 }}
                animate={{ width: '84%' }}
                transition={{ duration: 1.5, delay: 0.5 }}
              >
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </motion.div>
            </div>
          </div>

          {/* Footer Stats */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1.5 text-xs text-gray-600">
              <Activity className="w-3.5 h-3.5 text-blue-500" />
              <span>Performance: <strong className="text-gray-900">Optimale</strong></span>
            </div>
            <div className="flex items-center gap-1 text-xs text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-md border border-green-100">
              <ArrowUpRight className="w-3 h-3" />
              +12.5%
            </div>
          </div>
        </div>
      </div>

      {/* Floating Notifications */}
      <FloatingNotification
        delay={1.2}
        text="Nouveau record de leads !"
        icon="🏆"
        position="top-right"
      />
      <FloatingNotification
        delay={2.5}
        text="Objectif atteint : Équipe A"
        icon="🎯"
        position="bottom-left"
      />
    </motion.div>
  );
}

function MetricCard({ label, value, trend, icon: Icon, color }: any) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
  };
  const activeColor = colors[color as keyof typeof colors] || colors.blue;

  return (
    <motion.div
      className={`p-3 rounded-xl border ${activeColor} relative overflow-hidden group`}
      whileHover={{ y: -2 }}
    >
      <div className="flex justify-between items-start mb-1">
        <div className="p-1.5 bg-white rounded-lg shadow-sm">
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-[10px] font-bold bg-white/50 px-1.5 py-0.5 rounded text-green-600">
          {trend}
        </span>
      </div>
      <div className="mt-2">
        <div className="text-2xl font-extrabold text-gray-900 tracking-tight">{value}</div>
        <div className="text-[11px] font-medium opacity-80 uppercase tracking-wide">{label}</div>
      </div>
    </motion.div>
  )
}

function ChannelStatus({ icon: Icon, label, count, color, active }: any) {
  const colors = {
    green: 'from-green-400 to-emerald-500 shadow-green-200',
    purple: 'from-purple-400 to-fuchsia-500 shadow-purple-200',
    blue: 'from-blue-400 to-cyan-500 shadow-blue-200',
    orange: 'from-orange-400 to-amber-500 shadow-orange-200',
  };
  const gradient = colors[color as keyof typeof colors];

  return (
    <div className="flex flex-col items-center gap-1.5 group cursor-pointer">
      <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${gradient} flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110 group-hover:-translate-y-1`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-center">
        <div className="text-[10px] font-bold text-gray-700">{label}</div>
        <div className="text-[9px] font-medium text-gray-400 bg-white px-1.5 rounded-full border border-gray-100 shadow-sm mt-0.5">{count}</div>
      </div>
    </div>
  )
}

function FloatingNotification({ delay, text, icon, position }: any) {
  const positionClasses = {
    'top-right': '-top-4 -right-4',
    'bottom-left': '-bottom-4 -left-4',
  };

  return (
    <motion.div
      className={`absolute z-20 ${positionClasses[position as keyof typeof positionClasses]} bg-white rounded-lg shadow-xl border border-gray-100 px-3 py-2 flex items-center gap-2.5`}
      initial={{ opacity: 0, scale: 0, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.05 }}
    >
      <span className="text-lg bg-gray-50 p-1 rounded-md">{icon}</span>
      <div>
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Notification</div>
        <div className="text-xs font-bold text-gray-800">{text}</div>
      </div>
    </motion.div>
  );
}