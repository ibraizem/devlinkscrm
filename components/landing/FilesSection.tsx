'use client';

import FeatureSection from './FeatureSection';
import SidePanel from './SidePanel';
import { FileUp, Database, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FilesSection() {
  const formats = ['CSV', 'Excel', 'JSON', 'XML'];

  return (
    <FeatureSection
      id="files"
      title="Gérez vos données en masse"
      subtitle="Import/Export sans limite"
      description="Importez et exportez des millions de lignes en quelques secondes. Nettoyage automatique des doublons, enrichissement AI et validation des données avant import."
      features={[
        'Import de millions de lignes en temps réel',
        'Détection et suppression automatique des doublons',
        'Validation et enrichissement avant import',
        'Export personnalisé vers CSV, Excel, JSON, XML',
      ]}
      icon={FileUp}
      gradient="from-amber-500 to-orange-500"
      iconColor="text-amber-500"
      bgColor="bg-amber-50"
      badge={{
        text: 'Performance',
        stat: 'Multi-millions',
      }}
      reverse={true}
    >
      <SidePanel gradient="from-amber-500 to-orange-500">
        <div className="w-full h-full bg-linear-to-br from-amber-50 to-orange-50 p-6 flex flex-col justify-center">
          {/* Import Progress View */}
          <div className="bg-white rounded-lg shadow-sm border border-amber-200 overflow-hidden">
            {/* Header */}
            <div className="bg-linear-to-r from-amber-500 to-orange-500 text-white p-4">
              <div className="text-sm opacity-90">Import en cours</div>
              <div className="text-xl font-bold">mega_database.csv</div>
            </div>

            {/* Progress */}
            <div className="p-4 space-y-3">
              <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Progression
                  </span>
                  <span className="text-sm font-bold text-amber-600">2.5M lignes</span>
                </div>
                <div className="w-full bg-amber-200 rounded-full h-2 mb-1">
                  <motion.div
                    className="bg-linear-to-r from-amber-500 to-orange-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '75%' }}
                    transition={{ duration: 2, delay: 0.5 }}
                  />
                </div>
                <div className="text-xs text-gray-600">75% - 1m 23s restant</div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                  <div className="text-xs text-gray-600 mb-1">Lignes traitées</div>
                  <div className="text-lg font-bold text-gray-800">1,875,000</div>
                </div>
                <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                  <div className="text-xs text-gray-600 mb-1">Doublons supprimés</div>
                  <div className="text-lg font-bold text-gray-800">45,230</div>
                </div>
              </div>

              {/* Formats */}
              <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                <div className="text-xs font-medium text-gray-700 mb-2">
                  Formats supportés
                </div>
                <div className="flex gap-2 flex-wrap">
                  {formats.map((format) => (
                    <span
                      key={format}
                      className="px-2 py-1 bg-white text-amber-700 text-xs font-medium rounded border border-amber-300"
                    >
                      {format}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-amber-100 p-4 bg-amber-50">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-500" />
                  <span className="text-gray-600">Optimisé pour gros volumes</span>
                </div>
                <span className="font-semibold text-amber-600">⚡ Ultra-rapide</span>
              </div>
            </div>
          </div>
        </div>
      </SidePanel>
    </FeatureSection>
  );
}