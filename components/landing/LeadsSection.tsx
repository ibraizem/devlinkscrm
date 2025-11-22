'use client';

import FeatureSection from './FeatureSection';
import SidePanel from './SidePanel';
import { Target, Sparkles, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LeadsSection() {
  const enrichmentStats = [
    { label: 'Emails enrichis', value: '8,234', percent: '66%' },
    { label: 'Téléphones ajoutés', value: '5,678', percent: '45%' },
    { label: 'Entreprises enrichies', value: '7,890', percent: '63%' },
  ];

  return (
    <FeatureSection
      id="leads"
      title="Import et enrichissement AI"
      subtitle="De l'import brut au lead qualifié"
      description="Importez vos fichiers CSV et laissez l'IA enrichir automatiquement vos données. Emails, téléphones, informations entreprises... tout est automatisé."
      features={[
        'Import CSV/Excel avec mapping automatique',
        'Enrichissement AI des emails et téléphones',
        'Validation et scoring automatique des leads',
        'Extension Chrome pour enrichir depuis LinkedIn',
      ]}
      icon={Target}
      gradient="from-emerald-500 to-teal-600"
      iconColor="text-emerald-500"
      bgColor="bg-emerald-50"
      badge={{
        text: 'AI Powered',
        stat: 'Auto-enrichissement',
      }}
      reverse={false}
    >
      <SidePanel gradient="from-emerald-500 to-teal-600">
        <div className="w-full h-full bg-linear-to-br from-emerald-50 to-teal-50 p-6 flex flex-col justify-center">
          {/* Enrichment Dashboard */}
          <div className="bg-white rounded-lg shadow-sm border border-emerald-200 overflow-hidden">
            {/* Header */}
            <div className="bg-linear-to-r from-emerald-500 to-teal-600 text-white p-4">
              <div className="text-sm opacity-90 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Import terminé
              </div>
              <div className="text-xl font-bold">leads_database.csv</div>
              <div className="text-sm opacity-90">12,450 lignes</div>
            </div>

            {/* AI Enrichment Progress */}
            <div className="p-4 space-y-3">
              <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-semibold text-gray-800">
                    Enrichissement AI en cours...
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-2">
                {enrichmentStats.map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="bg-emerald-50 rounded-lg p-3 border border-emerald-100"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-700 font-medium">{item.label}</span>
                      <span className="text-emerald-600 font-bold">{item.value}</span>
                    </div>
                    <div className="w-full bg-emerald-200 rounded-full h-1.5">
                      <div
                        className="bg-linear-to-r from-emerald-500 to-teal-600 h-1.5 rounded-full"
                        style={{ width: item.percent }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer - Quality Score */}
            <div className="border-t border-emerald-100 p-4 bg-linear-to-r from-emerald-500 to-teal-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs opacity-90">Score qualité moyen</div>
                  <div className="text-2xl font-bold">8.7/10</div>
                </div>
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/30">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidePanel>
    </FeatureSection>
  );
}