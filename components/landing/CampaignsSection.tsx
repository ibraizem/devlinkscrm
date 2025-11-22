'use client';

import FeatureSection from './FeatureSection';
import SidePanel from './SidePanel';
import { Megaphone, Phone, Mail, MessageSquare, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CampaignsSection() {
  const channels = [
    { icon: Phone, label: 'Appels', count: '1,234', color: 'text-blue-500', bg: 'bg-blue-50' },
    { icon: Mail, label: 'Email', count: '3,456', color: 'text-purple-500', bg: 'bg-purple-50' },
    { icon: MessageSquare, label: 'SMS', count: '2,890', color: 'text-green-500', bg: 'bg-green-50' },
    { icon: MessageSquare, label: 'WhatsApp', count: '1,567', color: 'text-emerald-500', bg: 'bg-emerald-50' },
  ];

  return (
    <FeatureSection
      id="campaigns"
      title="Prospection multicanal intelligente"
      subtitle="Un CRM, tous vos canaux"
      description="Orchestrez vos campagnes de prospection multi-touch depuis une seule interface. Appelez, envoyez des emails, SMS et messages WhatsApp sans changer d'outil."
      features={[
        'Téléphonie intégrée (OnOff, Aircall, Ringover)',
        'Séquences email automatisées avec tracking',
        'Envoi de SMS et WhatsApp en masse',
        'Analyse des performances par canal en temps réel',
      ]}
      icon={Megaphone}
      gradient="from-rose-500 to-pink-600"
      iconColor="text-rose-500"
      bgColor="bg-rose-50"
      badge={{
        text: 'Multi-touch',
        stat: '4 canaux',
      }}
      reverse={true}
    >
      <SidePanel gradient="from-rose-500 to-pink-600">
        <div className="w-full h-full bg-linear-to-br from-rose-50 to-pink-50 p-6 flex flex-col justify-center">
          {/* Campaign Dashboard */}
          <div className="bg-white rounded-lg shadow-sm border border-rose-200 overflow-hidden">
            {/* Header */}
            <div className="bg-linear-to-r from-rose-500 to-pink-600 text-white p-4">
              <div className="text-sm opacity-90">Campagne Active</div>
              <div className="text-xl font-bold">Prospection Q1 2024</div>
            </div>

            {/* Stats Grid */}
            <div className="p-4 grid grid-cols-2 gap-3">
              {channels.map((channel, index) => (
                <motion.div
                  key={channel.label}
                  className={`${channel.bg} rounded-lg p-3 border border-${channel.color.replace('text-', '')}-200`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <channel.icon className={`w-4 h-4 ${channel.color}`} />
                    <span className="text-xs font-medium text-gray-700">
                      {channel.label}
                    </span>
                  </div>
                  <div className="text-lg font-bold text-gray-800">
                    {channel.count}
                  </div>
                  <div className="text-xs text-gray-500">envoyés</div>
                </motion.div>
              ))}
            </div>

            {/* Conversion Rate */}
            <div className="px-4 pb-3">
              <div className="bg-rose-50 rounded-lg p-3 border border-rose-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Taux de conversion
                  </span>
                  <span className="text-sm font-bold text-rose-600">18.5%</span>
                </div>
                <div className="w-full bg-rose-200 rounded-full h-2">
                  <div
                    className="bg-linear-to-r from-rose-500 to-pink-600 h-2 rounded-full"
                    style={{ width: '18.5%' }}
                  />
                </div>
              </div>
            </div>

            {/* Footer Stats */}
            <div className="border-t border-rose-100 p-4 bg-rose-50">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-rose-500" />
                  <span className="text-gray-600">Leads contactés</span>
                </div>
                <span className="font-semibold text-rose-600">2,847 aujourd'hui</span>
              </div>
            </div>
          </div>
        </div>
      </SidePanel>
    </FeatureSection>
  );
}