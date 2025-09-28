'use client';

import styles from './Footer.module.scss';
import { IconBrandYoutube, IconBrandInstagram, IconBrandTiktok, IconBrandX } from '@tabler/icons-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const socialLinks = [
    { href: 'https://www.youtube.com/@ParensedeManos', icon: IconBrandYoutube, label: 'YouTube' },
    { href: 'https://www.instagram.com/parense.de.manos/', icon: IconBrandInstagram, label: 'Instagram' },
    { href: 'https://www.tiktok.com/@parense.de.manos', icon: IconBrandTiktok, label: 'TikTok' },
    { href: 'https://x.com/parensedemanos', icon: IconBrandX, label: 'X (Twitter)' },
  ];

  return (
    <footer className={styles.footer}>
      <motion.div 
        className={styles.footer__content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className={styles.footer__social}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h3 className={styles.footer__social__title}>Síguenos</h3>
          <div className={styles.footer__social__links}>
            {socialLinks.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.footer__social__link}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 + (index * 0.05) }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.label}
                >
                  <IconComponent size={24} />
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        <motion.div 
          className={styles.footer__info}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <p className={styles.footer__info__event}>
            Parense de Manos 3 - 20 de Diciembre 2025
          </p>
          <p className={styles.footer__info__location}>
            Estadio Tomás Adolfo Ducó, Argentina
          </p>
        </motion.div>

        <motion.div 
          className={styles.footer__bottom}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <p className={styles.footer__bottom__text}>
            © 2025 Parense de Manos. Todos los derechos reservados.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}