'use client';

import FeatureSection from './FeatureSection';
import SidePanel from './SidePanel';
import { PlugZap, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

type Integration = {
  name: string;
  logo: string;
  color: string;
  category: string;
  isPopular?: boolean;
  isNew?: boolean;
};

const integrations: Integration[] = [
  { name: 'OnOff Business', logo: '/integrations/onoff.jpg', color: 'from-green-500 to-green-600', category: 'appels', isPopular: true },
  { name: 'Aircall', logo: '/integrations/aircall.svg', color: 'from-green-500 to-green-600', category: 'appels', isPopular: true },
  { name: 'Ringover', logo: '/integrations/ringover.png', color: 'from-cyan-500 to-cyan-600', category: 'appels' },
  { name: 'WhatsApp', logo: '/integrations/whatsapp.svg', color: 'from-green-400 to-green-500', category: 'messagerie', isPopular: true },
  { name: 'LinkedIn', logo: '/integrations/linkedin.svg', color: 'from-blue-600 to-blue-700', category: 'réseaux-sociaux', isPopular: true },
  { name: 'Zoom', logo: '/integrations/zoom.svg', color: 'from-blue-500 to-indigo-600', category: 'appels' },
  { name: 'Gmail', logo: '/integrations/gmail.svg', color: 'from-red-500 to-red-600', category: 'email', isPopular: true },
  { name: 'Zapier', logo: '/integrations/zapier.png', color: 'from-orange-500 to-orange-600', category: 'automatisation', isPopular: true },
  { name: 'Outlook', logo: '/integrations/outlook.svg', color: 'from-blue-500 to-blue-600', category: 'email' },
  { name: 'Calendly', logo: '/integrations/Calendly.png', color: 'from-blue-400 to-blue-500', category: 'agenda', isPopular: true },
  { name: 'Cal.com', logo: '/integrations/Cal.png', color: 'bg-gray-800', category: 'agenda' },
  { name: 'Google Calendar', logo: '/integrations/google-calendar.png', color: 'from-red-500 to-orange-500', category: 'agenda' },
  { name: 'Google Meet', logo: '/integrations/google-meet.png', color: 'from-blue-400 to-blue-500', category: 'appels' },
  { name: 'DocuSign', logo: '/integrations/docusign.png', color: 'from-blue-600 to-blue-700', category: 'signature' },
  { name: 'Google Drive', logo: '/integrations/google_drive.png', color: 'from-blue-500 to-blue-600', category: 'stockage' },
  { name: 'OpenAI', logo: '/integrations/openaI.png', color: 'from-green-600 to-green-700', category: 'ai', isPopular: true },
  { name: 'Meta Lead Ads', logo: '/integrations/metaleadads.png', color: 'from-blue-600 to-blue-700', category: 'automatisation' },
  { name: 'Slack', logo: '/integrations/slack.png', color: 'from-purple-500 to-purple-600', category: 'collaboration' },
  { name: 'Make', logo: '/integrations/make.svg', color: 'from-purple-500 to-purple-600', category: 'automatisation' },
  { name: 'n8n', logo: '/integrations/n8n.svg', color: 'from-pink-500 to-pink-600', category: 'automatisation' },
  { name: 'Notion', logo: '/integrations/notion.png', color: 'from-blue-600 to-blue-700', category: 'automatisation' },
  { name: 'Message Bird', logo: '/integrations/messagebird.jpg', color: 'from-blue-600 to-blue-700', category: 'stockage' },
  { name: 'Brevo', logo: '/integrations/brevo.png', color: 'from-blue-600 to-blue-700', category: 'stockage' },
  { name: 'Microsoft Teams', logo: '/integrations/teams.jpg', color: 'from-blue-600 to-blue-700', category: 'stockage' },
];

export default function IntegrationsSection() {
  return (
    <FeatureSection
      id="integrations"
      title="Connectez tous vos outils"
      subtitle="+20 intégrations natives"
      description="Synchronisez automatiquement vos appels, emails, calendriers et fichiers. Toutes vos données centralisées sans effort de configuration."
      features={[
        'Téléphonie: OnOff, Aircall, Ringover',
        'Calendriers: Calendly, Google Calendar, Cal.com',
        'Emails: Gmail, Outlook avec tracking',
        'Stockage: Google Drive, Dropbox',
      ]}
      icon={PlugZap}
      gradient="from-blue-500 to-indigo-600"
      iconColor="text-blue-500"
      bgColor="bg-blue-50"
      badge={{
        text: 'Automatisé',
        stat: '25 outils',
      }}
      reverse={false}
    >
      <SidePanel gradient="from-blue-500 to-indigo-600">
        <div className="w-full h-full bg-linear-to-br from-blue-50 to-indigo-50 p-6 flex flex-col justify-center">
          {/* Integrations Grid View */}
          <div className="bg-white rounded-lg shadow-sm border border-blue-200 overflow-hidden">
            {/* Header */}
            <div className="bg-linear-to-r from-blue-500 to-indigo-600 text-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm opacity-90">Écosystème connecté</div>
                  <div className="text-xl font-bold">25 intégrations</div>
                </div>
                <PlugZap className="w-6 h-6" />
              </div>
            </div>

            {/* Grid */}
            <div className="p-2 w-full flex justify-center">
              <div className="grid grid-cols-6 gap-3 h-[330px] overflow-y-auto">
                {integrations.slice(0, 24).map((integration, index) => (
                  <motion.div
                    key={integration.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.5 + index * 0.03
                    }}
                    whileHover={{ scale: 1.05 }}
                    className="group cursor-pointer"
                    title={integration.name}
                  >
                    <div className="relative w-full h-full flex items-center justify-center p-1">
                      <div className="w-16 h-16 aspect-square rounded-xl flex items-center justify-center bg-linear-to-br from-white to-gray-50 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-blue-300 p-2">
                        <div className="w-16 h-16 flex items-center justify-center">
                          <img
                            src={integration.logo}
                            alt={`Logo ${integration.name}`}
                            className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-110"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer Stats */}
            <div className="border-t border-blue-100 p-4 bg-blue-50">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-lg font-bold text-gray-800">25</div>
                  <div className="text-xs text-gray-600">Intégrations</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-800">Temps réel</div>
                  <div className="text-xs text-gray-600">Synchro</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-800">Simple</div>
                  <div className="text-xs text-gray-600">Config</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidePanel>
    </FeatureSection>
  );
}