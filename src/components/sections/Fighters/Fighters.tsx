'use client';

import styles from './Fighters.module.scss';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const fighters = [
  { name: 'Banks', image: '/images/Peleadores/Banks.webp' },
  { name: 'Carito', image: '/images/Peleadores/Carito.webp' },
  { name: 'Coker', image: '/images/Peleadores/Coker.webp' },
  { name: 'Cosmic Kid', image: '/images/Peleadores/Cosmic.webp' },
  { name: 'Coty', image: '/images/Peleadores/Coty.webp' },
  { name: 'Dairi', image: '/images/Peleadores/Dairi.webp' },
  { name: 'Espe', image: '/images/Peleadores/Espe.webp' },
  { name: 'Flor Vigna', image: '/images/Peleadores/Flor.webp' },
  { name: 'Gabino Silva', image: '/images/Peleadores/Gabino.webp' },
  { name: 'Gero Arias', image: '/images/Peleadores/Gero.webp' },
  { name: 'Goncho', image: '/images/Peleadores/Goncho.webp' },
  { name: 'Grego Rosello', image: '/images/Peleadores/Grego.webp' },
  { name: 'Jove', image: '/images/Peleadores/jove.webp' },
  { name: 'Maravilla', image: '/images/Peleadores/Maravilla.webp' },
  { name: 'Mazza', image: '/images/Peleadores/Mazza.webp' },
  { name: 'Mernuel', image: '/images/Peleadores/Mernuel.webp' },
  { name: 'Mica Viciconte', image: '/images/Peleadores/Mica.webp' },
  { name: 'Pepi', image: '/images/Peleadores/Pepi.webp' },
  { name: 'Mariano Perez', image: '/images/Peleadores/Perez.webp' },
  { name: 'Perxitaa', image: '/images/Peleadores/Perxitaa.webp' },
];

export default function Fighters() {
  const [hoveredFighter, setHoveredFighter] = useState<string | null>(null);

  return (
    <section className={styles.container}>
      <motion.div
        className={styles.container__content}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <motion.h2 
          className={styles.container__title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Los Peleadores
        </motion.h2>

        <motion.div 
          className={styles.container__grid}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className={styles.container__grid__row}>
            {fighters.slice(0, 10).map((fighter, index) => (
              <motion.div
                key={fighter.name}
                className={styles.container__grid__item}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.1,
                  transition: { duration: 0.3 }
                }}
                onHoverStart={() => setHoveredFighter(fighter.name)}
                onHoverEnd={() => setHoveredFighter(null)}
              >
                <div className={styles.container__grid__item__imageWrapper}>
                  <Image
                    src={fighter.image}
                    alt={fighter.name}
                    fill
                    className={styles.container__grid__item__image}
                    sizes="(max-width: 768px) 100px, (max-width: 1200px) 150px, 180px"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className={styles.container__grid__center}
            initial={{ opacity: 0 }}
            animate={{ opacity: hoveredFighter ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            {hoveredFighter && (
              <motion.div
                className={styles.container__grid__center__content}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.container__grid__center__imageWrapper}>
                  <Image
                    src={fighters.find(f => f.name === hoveredFighter)?.image || ''}
                    alt={hoveredFighter}
                    fill
                    className={styles.container__grid__center__image}
                    sizes="400px"
                  />
                </div>
                <motion.h3
                  className={styles.container__grid__center__name}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {hoveredFighter}
                </motion.h3>
              </motion.div>
            )}
          </motion.div>

          <div className={styles.container__grid__row}>
            {fighters.slice(10, 20).map((fighter, index) => (
              <motion.div
                key={fighter.name}
                className={styles.container__grid__item}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.1,
                  transition: { duration: 0.3 }
                }}
                onHoverStart={() => setHoveredFighter(fighter.name)}
                onHoverEnd={() => setHoveredFighter(null)}
              >
                <div className={styles.container__grid__item__imageWrapper}>
                  <Image
                    src={fighter.image}
                    alt={fighter.name}
                    fill
                    className={styles.container__grid__item__image}
                    sizes="(max-width: 768px) 100px, (max-width: 1200px) 150px, 180px"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}