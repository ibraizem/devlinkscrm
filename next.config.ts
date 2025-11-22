import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Désactive la vérification des types pendant le build
    ignoreBuildErrors: true,
  },
  // Active le mode strict pour les pages
  reactStrictMode: true,
  // Améliore la gestion des erreurs de build
  experimental: {
    // Ignorer les erreurs de type manquantes pour les modules
    externalDir: true,
  },
};

export default nextConfig;
