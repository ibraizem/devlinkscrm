'use client'

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import AnimatedBackground from '@/components/landing/AnimatedBackground';

// Composants dynamiques pour le chargement optimisé
const Navbar = dynamic(() => import('@/components/landing/Navbar'), {
  ssr: false,
  loading: () => <div className="h-20 w-full fixed top-0 left-0 right-0 z-50 shadow-sm backdrop-blur-md bg-white/70" />
});

const Hero = dynamic(() => import('@/components/landing/Hero'), {
  ssr: true,
  loading: () => <div className="h-screen" />
});

const FeaturesDetailed = dynamic(() => import('@/components/landing/FeaturesDetailed'), {
  ssr: true
});

const Pricing = dynamic(() => import('@/components/landing/Pricing'), {
  ssr: true
});

const Contact = dynamic(() => import('@/components/landing/Contact'), {
  ssr: true
});

const Footer = dynamic(() => import('@/components/landing/Footer'), {
  ssr: false
});

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-100 relative overflow-hidden">
      <AnimatedBackground />

      <Suspense fallback={<div className="h-20 w-full fixed top-0 left-0 right-0 z-50 shadow-sm backdrop-blur-md bg-white/70" />}>
        <Navbar />
      </Suspense>

      <main className="relative z-10">
        <Suspense fallback={<div className="h-screen" />}>
          <Hero />
        </Suspense>

        <Suspense fallback={<div className="py-20"><div className="container mx-auto px-4">Chargement des fonctionnalités...</div></div>}>
          <FeaturesDetailed />
        </Suspense>

        <Suspense fallback={<div className="py-20"><div className="container mx-auto px-4">Chargement des offres...</div></div>}>
          <Pricing />
        </Suspense>

        <Suspense fallback={<div className="py-20"><div className="container mx-auto px-4">Chargement du formulaire de contact...</div></div>}>
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}