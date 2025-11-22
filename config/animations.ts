/**
 * Fichier de configuration pour les animations
 * Centralise les configurations d'animations pour une utilisation cohérente dans toute l'application
 */

import { Variants } from 'framer-motion'

/**
 * Configuration des animations de base
 */
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' }
  }
}

export const slideUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      duration: 0.4, 
      ease: [0.2, 0.65, 0.3, 0.9] 
    }
  },
  exit: { 
    y: -20, 
    opacity: 0,
    transition: { 
      duration: 0.2, 
      ease: 'easeIn' 
    }
  }
}

/**
 * Animation pour les éléments de liste
 */
export const listItem = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
      ease: 'easeOut'
    }
  })
}

/**
 * Animation pour les notifications/toasts
 */
export const notification = {
  initial: { y: 20, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: 'spring',
      damping: 25,
      stiffness: 300
    }
  },
  exit: { 
    y: -20, 
    opacity: 0,
    transition: { 
      duration: 0.2,
      ease: 'easeIn'
    }
  }
}

/**
 * Animation pour les transitions de page
 */
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.2, 0.65, 0.3, 0.9],
      when: 'beforeChildren',
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
      ease: 'easeIn'
    }
  }
}

/**
 * Animation pour les éléments de formulaire
 */
export const formField = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.1 + (i * 0.05),
      duration: 0.3,
      ease: 'easeOut'
    }
  })
}

/**
 * Configuration des animations pour les composants UI
 */
export const ui = {
  // Animation pour les boutons
  button: {
    tap: { scale: 0.98 },
    hover: { 
      scale: 1.02,
      transition: { duration: 0.1 }
    },
    pressed: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  },
  
  // Animation pour les cartes
  card: {
    hover: {
      y: -4,
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      transition: {
        duration: 0.2,
        ease: 'easeOut'
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    }
  },
  
  // Animation pour les onglets
  tab: {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.2,
        ease: 'easeOut'
      }
    },
    exit: { 
      opacity: 0, 
      y: -10,
      transition: {
        duration: 0.1,
        ease: 'easeIn'
      }
    }
  }
}

/**
 * Configuration des animations pour le chargement
 */
export const loader = {
  container: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  },
  dot: {
    initial: { y: '0%' },
    animate: {
      y: ['0%', '-100%', '0%'],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  }
}

/**
 * Configuration des animations pour les transitions de page avec effet de fondu
 */
export const fadeTransition = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.3 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 }
  }
}

/**
 * Configuration des animations pour les modales
 */
export const modal = {
  overlay: {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.2 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.15 }
    }
  },
  content: {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        type: 'spring',
        damping: 30,
        stiffness: 300
      }
    },
    exit: { 
      opacity: 0, 
      y: 20,
      transition: { 
        duration: 0.15,
        ease: 'easeIn'
      }
    }
  }
}

/**
 * Configuration des animations pour les notifications
 */
export const notificationAnimations = {
  success: {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring',
        damping: 25,
        stiffness: 300
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: { 
        duration: 0.15,
        ease: 'easeIn'
      }
    }
  },
  error: {
    initial: { opacity: 0, x: 20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: 'spring',
        damping: 25,
        stiffness: 300
      }
    },
    exit: { 
      opacity: 0, 
      x: 20,
      transition: { 
        duration: 0.15,
        ease: 'easeIn'
      }
    }
  }
}

/**
 * Configuration des animations pour les transitions de section
 */
export const sectionTransition = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export default {
  fadeIn,
  slideUp,
  listItem,
  notification,
  pageTransition,
  formField,
  ui,
  loader,
  fadeTransition,
  modal,
  notificationAnimations,
  sectionTransition
}
