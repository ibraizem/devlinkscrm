'use client';

import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X, User, Rocket, Play, ChevronDown, BarChart2, Zap, Users, Calendar, Mail, Upload, Brain, Share2, GitBranch, BarChart3, Link2, Sparkles, Target, Zap as ZapIcon, BarChart4, Network, Cpu, Layers, GitBranch as IntegrationIcon, CreditCard } from 'lucide-react';

// Animation variants
import type { Variants, Transition } from 'framer-motion';

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    } as Transition,
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    } as Transition,
  },
};

const item: Variants = {
  hidden: { y: -20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 24,
    },
  },
  exit: { y: -20, opacity: 0 },
};

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [featuresOpen, setFeaturesOpen] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);

  // Close features dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (featuresRef.current && !featuresRef.current.contains(event.target as Node) && featuresOpen) {
        setFeaturesOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [featuresOpen]);

  const features = [
    { 
      href: '#dashboard', 
      label: 'Pilotez des milliers de leads en temps réel', 
      icon: <BarChart2 className="w-5 h-5" />,
      color: 'from-blue-500 to-blue-400'
    },
    { 
      href: '#leads', 
      label: 'Import et enrichissement AI', 
      icon: <Brain className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-500'
    },
    { 
      href: '#appointments', 
      label: 'Planifiez vos closing sans friction', 
      icon: <Calendar className="w-5 h-5" />,
      color: 'from-green-500 to-emerald-400'
    },
    { 
      href: '#campaigns', 
      label: 'Prospection multicanal intelligente', 
      icon: <Mail className="w-5 h-5" />,
      color: 'from-amber-500 to-yellow-400'
    },
    { 
      href: '#files', 
      label: 'Import/Export sans limite', 
      icon: <Upload className="w-5 h-5" />,
      color: 'from-rose-500 to-pink-400'
    },
    { 
      href: '#teams', 
      label: 'Collaborez à grande échelle', 
      icon: <Users className="w-5 h-5" />,
      color: 'from-indigo-500 to-blue-400'
    },
    { 
      href: '#reports', 
      label: 'Analytics AI et reporting avancé', 
      icon: <BarChart3 className="w-5 h-5" />,
      color: 'from-cyan-500 to-blue-500'
    },
    { 
      href: '#integrations', 
      label: 'Connectez tous vos outils préférés', 
      icon: <Link2 className="w-5 h-5" />,
      color: 'from-violet-500 to-purple-400'
    },
  ];

  const links = [
    {
      href: '#contact',
      label: 'Contact',
      icon: <Mail className="w-4 h-4 text-white" />,
      color: 'from-blue-500 to-blue-700',
      hoverColor: 'from-blue-600 to-blue-800'
    },
    {
      href: '#pricing',
      label: 'Tarifs',
      icon: <CreditCard className="w-4 h-4 text-white" />,
      color: 'from-blue-700 to-blue-900',
      hoverColor: 'from-blue-800 to-blue-950'
    }
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-500',
        scrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-border/40 shadow-lg shadow-black/5'
          : 'bg-transparent'
      )}
    >
      <div className="w-full max-w-7xl mx-auto h-20 flex items-center justify-between px-4 md:px-6 lg:px-8">
        {/* Logo à gauche */}
        <div className="space-y-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative"
            >
              <Link href="/" className="flex items-center space-x-2 group">
                <motion.span
                  className="text-xl font-extrabold bg-linear-to-r from-blue-500 via-blue-950 to-blue-500 bg-clip-text text-transparent"
                  whileHover={{
                    backgroundImage: 'linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)',
                    transition: { duration: 0.5 }
                  }}
                >
                  DevLink
                </motion.span>
                <motion.span
                  className="absolute left-20 -top-1 text-xs font-bold bg-linear-to-r from-blue-500 via-blue-950 to-blue-500 text-white px-2 py-0.5 rounded-full"
                  animate={{
                    scale: [1, 1.10, 1],
                    rotate: [1, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut'
                  }}
                >
                  CRM
                </motion.span>
              </Link>
            </motion.div>
            </div>

        {/* Navigation centrée */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <nav className="flex items-center space-x-1 lg:space-x-6">
            <div className="relative" ref={featuresRef}>
              <button
                onClick={() => setFeaturesOpen(!featuresOpen)}
                className="group relative flex items-center px-3 py-2 text-sm font-medium text-foreground/90 hover:text-foreground transition-colors duration-300 cursor-pointer"
              >
                <span className={`mr-2 p-1.5 rounded-md flex items-center justify-center w-7 h-7 bg-linear-to-br from-blue-600 to-blue-800 group-hover:from-blue-700 group-hover:to-blue-900 transition-all`}>
                  <Zap className="w-4 h-4 text-white" />
                </span>
                <span className="relative">
                  Fonctionnalités
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                </span>
                <ChevronDown 
                  className={`ml-2 h-4 w-4 transition-transform duration-200 ${featuresOpen ? 'rotate-180 text-blue-500' : 'text-foreground/60'}`} 
                />
              </button>

              <AnimatePresence>
                {featuresOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ 
                      type: 'spring',
                      damping: 25,
                      stiffness: 300
                    }}
                    className="absolute left-0 mt-2 w-[700px] rounded-xl bg-linear-to-br from-white to-gray-50 shadow-2xl shadow-blue-500/10 border border-blue-100/50 overflow-hidden z-50 backdrop-blur-sm"
                  >
                    <div className="p-1.5">
                      <div className="px-4 py-2.5 bg-linear-to-r from-blue-600/5 to-purple-600/5 border-b border-blue-50 mb-1">
                        <h3 className="text-sm font-semibold text-foreground/90">Explorez nos fonctionnalités</h3>
                        <p className="text-xs text-foreground/60">Tout ce dont vous avez besoin pour réussir</p>
                      </div>
                      <div className="p-4">
                        <div className="grid grid-cols-2 gap-4">
                          {features.map((feature) => (
                            <Link
                              key={feature.href}
                              href={feature.href}
                              className="group relative flex items-center p-4 text-sm text-foreground/90 hover:bg-linear-to-r hover:from-blue-50/30 hover:to-purple-50/30 rounded-xl transition-all duration-300 hover:shadow-md hover:border-blue-100/50 border border-transparent hover:scale-[1.02]"
                              onClick={() => setFeaturesOpen(false)}
                            >
                              <div className="relative z-10 mr-4">
                                <span className={`flex items-center justify-center w-10 h-10 rounded-xl bg-white/90 ${feature.color.replace('from-', 'text-').split(' ')[0]} shadow-md group-hover:shadow-lg transition-all duration-300`}>
                                  {React.cloneElement(feature.icon, { className: 'w-5 h-5' })}
                                </span>
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold text-foreground group-hover:bg-linear-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                                  {feature.label}
                                </div>
                              </div>
                              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-linear-to-br from-blue-100 to-blue-50 text-blue-600 group-hover:from-blue-200 group-hover:to-blue-100 transition-all">
                                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative flex items-center px-3 py-2 text-sm font-medium text-foreground/90 hover:text-foreground transition-colors duration-300"
              >
                <span className={`mr-2 p-1.5 rounded-md flex items-center justify-center w-7 h-7 bg-linear-to-br ${link.color} group-hover:${link.hoverColor} transition-all`}>
                  {link.icon}
                </span>
                <span className="relative">
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Boutons à droite */}
        <div className="hidden md:flex space-x-4">
          <motion.div
            whileHover={{
              scale: 1.03,
              boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4), 0 10px 10px -5px rgba(59, 130, 246, 0.2)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="outline"
              asChild
              className="group relative overflow-hidden border-2 border-blue-500 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-600 px-6 py-2.5 text-sm font-medium transition-all duration-300 rounded-lg bg-white/80 backdrop-blur-sm"
            >
              <Link href="https://calendly.com/devlinkcrm" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                <span>Demander une démo</span>
                <span className="absolute inset-0 bg-linear-to-r from-blue-500/10 via-blue-600/20 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="ghost"
              asChild
              className="group relative overflow-hidden px-5 py-2.5 text-base font-medium text-blue-700 hover:text-blue-800 hover:bg-blue-50 transition-all duration-300 rounded-lg"
            >
              <Link href="/login" className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>Connexion</span>
                <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-full group-hover:translate-x-full"></span>
              </Link>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{
              scale: 1.03,
              boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4), 0 10px 10px -5px rgba(59, 130, 246, 0.2)'
            }}
            whileTap={{ scale: 0.98 }}
            className="relative"
          >
            <Button
              asChild
              className="group relative overflow-hidden bg-linear-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-lg shadow-blue-500/30 px-6 py-2.5 text-sm font-medium transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 rounded-lg"
            >
              <Link href="/register" className="flex items-center gap-2">
                <Rocket className="h-4 w-4" />
                <span>Essai gratuit</span>
                <span className="absolute inset-0 bg-linear-to-r from-white/20 via-white/40 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-full group-hover:translate-x-[200%] w-[50%] skew-x-[-20deg]"></span>
              </Link>
            </Button>
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }}
            />
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="md:hidden p-2.5 rounded-lg bg-background/50 backdrop-blur-sm border border-border/30 shadow-sm"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border/30 overflow-hidden"
          >
            <motion.nav
              variants={container}
              initial="hidden"
              animate="show"
              exit="exit"
              className="flex flex-col space-y-1 p-4"
            >
              <div className="mb-3">
                <div className="px-4 py-2.5 bg-linear-to-r from-blue-600/5 to-purple-600/5 rounded-lg mx-2 mb-2">
                  <h3 className="text-sm font-semibold text-foreground/90">Fonctionnalités</h3>
                  <p className="text-xs text-foreground/60">Découvrez nos solutions</p>
                </div>
                <div className="space-y-1 px-2">
                  {features.map((feature) => (
                    <Link
                      key={feature.href}
                      href={feature.href}
                      className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/90 hover:bg-linear-to-r hover:from-blue-50 hover:to-purple-50 transition-colors group"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className={`flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-br ${feature.color} text-white shadow-md group-hover:shadow-lg transition-all duration-300 mr-3`}>
                        {feature.icon}
                      </span>
                      <span className="flex-1">{feature.label}</span>
                      <svg className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border-t border-border/40 pt-2">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-lg px-4 py-2.5 text-base font-medium text-foreground/90 hover:bg-accent/50 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <span className="mr-3 text-xl">{link.icon}</span>
                      {link.label}
                    </div>
                  </Link>
                ))}
              </div>

              <motion.div
                variants={item}
                custom={links.length + 1}
                className="flex flex-col space-y-3 pt-2"
              >
                <Button
                  variant="outline"
                  asChild
                  className="w-full justify-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  <Link href="/login">
                    <User className="h-4 w-4" />
                    <span>Connexion</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-center gap-2 border-2 border-blue-500 text-blue-700 hover:bg-blue-50 hover:text-blue-800 bg-white/80 backdrop-blur-sm"
                >
                  <Link href="https://calendly.com/votre-compte" target="_blank" rel="noopener noreferrer">
                    <Play className="h-4 w-4" />
                    <span>Demander une démo</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  className="w-full justify-center gap-2 bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-md"
                >
                  <Link href="/register">
                    <Rocket className="h-4 w-4" />
                    <span>Essai gratuit</span>
                  </Link>
                </Button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;
