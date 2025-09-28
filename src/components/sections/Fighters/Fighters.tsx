'use client';

import styles from './Fighters.module.scss';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { useRouter } from 'next/navigation';
import BigFighterImage from '@/components/ui/BigFighterImage/BigFighterImage';

export type Boxeador = {
  id: string;
  nombre_artistico: string;
  nombre_real: string;
  peso: number;
  edad: number;
  altura: number;
  vs: string | null;
  nacionalidad: string;
  imagen?: string;
};

export default function Fighters() {
  const [boxeadores, setBoxeadores] = useState<Boxeador[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredFighter, setHoveredFighter] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBoxeadores = async () => {
      const { data, error } = await supabase.from('boxeadores').select('*');
      if (error) {
        console.error('Error al traer boxeadores:', error.message);
      } else if (!data || data.length === 0) {
        console.warn('No se encontraron boxeadores en la tabla.');
      } else {
        console.log('Boxeadores traídos:', data);
        setBoxeadores(data);
      }
    };
    fetchBoxeadores();
  }, []);

  const yaEnfrentados = new Set();
  const fila1: Boxeador[] = [];
  const fila2: Boxeador[] = [];
  boxeadores.forEach((b) => {
    if (b.vs && !yaEnfrentados.has(b.id) && !yaEnfrentados.has(b.vs)) {
      const rival = boxeadores.find(r => r.id === b.vs);
      if (rival) {
        fila1.push(b);
        fila2.push(rival);
        yaEnfrentados.add(b.id);
        yaEnfrentados.add(rival.id);
      }
    }
  });
  boxeadores.forEach((b) => {
    if (!yaEnfrentados.has(b.id)) {
      fila1.push(b);
      fila2.push({ ...b, nombre_artistico: '', id: b.id + '_vacio' });
      yaEnfrentados.add(b.id);
    }
  });

  const isEnfrentado = (row: number, idx: number) => {
    if (hoveredIndex === null) return false;
    if (row === 0 && hoveredIndex === idx && hoveredFighter && fila2[idx]?.nombre_artistico === hoveredFighter) return true;
    if (row === 1 && hoveredIndex === idx && hoveredFighter && fila1[idx]?.nombre_artistico === hoveredFighter) return true;
    return false;
  };

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
            {fila1.map((boxeador, index) => {
              const isHovered = hoveredFighter === boxeador.nombre_artistico;
              const isPairHovered = hoveredIndex === index && hoveredFighter && fila2[index]?.nombre_artistico === hoveredFighter;
              return (
                <motion.div
                  key={boxeador.id}
                  className={
                    styles.container__grid__item +
                    (isHovered || isPairHovered ? ' ' + styles['container__grid__item--hovered'] : '')
                  }
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.3 }
                  }}
                  onHoverStart={() => {
                    setHoveredIndex(index);
                    setHoveredFighter(boxeador.nombre_artistico);
                  }}
                  onHoverEnd={() => {
                    setHoveredIndex(null);
                    setHoveredFighter(null);
                  }}
                  onClick={() => router.push(`/boxeador/${boxeador.nombre_artistico.replace(/\s+/g, '-').toLowerCase()}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className={styles.container__grid__item__imageWrapper}>
                    <Image
                      src={`/images/Peleadores/${boxeador.nombre_artistico}.webp`}
                      alt={boxeador.nombre_artistico}
                      fill
                      className={styles.container__grid__item__image}
                      sizes="(max-width: 768px) 100px, (max-width: 1200px) 150px, 180px"
                    />
                  </div>
                </motion.div>
              );
            })}
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
                <BigFighterImage nombre={hoveredFighter} />
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
            {fila2.map((boxeador, index) => {
              const isHovered = hoveredFighter === boxeador.nombre_artistico;
              const isPairHovered = hoveredIndex === index && hoveredFighter && fila1[index]?.nombre_artistico === hoveredFighter;
              return (
                <motion.div
                  key={boxeador.id}
                  className={
                    styles.container__grid__item +
                    (isHovered || isPairHovered ? ' ' + styles['container__grid__item--hovered'] : '')
                  }
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.3 }
                  }}
                  onHoverStart={() => {
                    setHoveredIndex(index);
                    setHoveredFighter(boxeador.nombre_artistico);
                  }}
                  onHoverEnd={() => {
                    setHoveredIndex(null);
                    setHoveredFighter(null);
                  }}
                  onClick={() => router.push(`/boxeador/${boxeador.nombre_artistico.replace(/\s+/g, '-').toLowerCase()}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className={styles.container__grid__item__imageWrapper}>
                    <Image
                      src={boxeador.imagen || `/images/Peleadores/${boxeador.nombre_artistico}.webp`}
                      alt={boxeador.nombre_artistico}
                      fill
                      className={styles.container__grid__item__image}
                      sizes="(max-width: 768px) 100px, (max-width: 1200px) 150px, 180px"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}