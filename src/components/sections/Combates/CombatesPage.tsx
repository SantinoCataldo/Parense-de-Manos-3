'use client';

import { supabase } from '@/utils/supabaseClient';
import styles from './Combates.module.scss';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import CombateItem from './CombateItem';

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

type Pelea = {
  id: string;
  boxeador1_id: string;
  boxeador2_id: string;
  votos1: number;
  votos2: number;
};

type CombateConVotos = {
  a: Boxeador;
  b: Boxeador;
  pelea: Pelea | null;
};

export default function CombatesPage() {
  const [combates, setCombates] = useState<CombateConVotos[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCombatesConVotos() {
      try {
        const { data: boxeadores, error: boxeadoresError } = await supabase
          .from('boxeadores')
          .select('*');

        if (boxeadoresError || !boxeadores) {
          throw new Error('Error al cargar boxeadores');
        }

        const { data: peleas, error: peleasError } = await supabase
          .from('peleas')
          .select('*');

        if (peleasError) {
          throw new Error('Error al cargar peleas');
        }

        const yaEnfrentados = new Set();
        const combatesConVotos: CombateConVotos[] = [];

        boxeadores.forEach((b: Boxeador) => {
          if (b.vs && !yaEnfrentados.has(b.id) && !yaEnfrentados.has(b.vs)) {
            const rival = boxeadores.find((r: Boxeador) => r.id === b.vs);
            if (rival) {
              const pelea = peleas?.find((p: Pelea) =>
                (p.boxeador1_id === b.id && p.boxeador2_id === rival.id) ||
                (p.boxeador1_id === rival.id && p.boxeador2_id === b.id)
              ) || null;

              combatesConVotos.push({
                a: b,
                b: rival,
                pelea
              });

              yaEnfrentados.add(b.id);
              yaEnfrentados.add(rival.id);
            }
          }
        });

        setCombates(combatesConVotos);
      } catch (err) {
        setError('Error al cargar combates');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadCombatesConVotos();

    const subscription = supabase
      .channel('peleas-realtime')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'peleas'
      }, () => {
        loadCombatesConVotos();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleVote = async (peleaId: string, boxeadorId: string, isBoxeador1: boolean) => {
    try {
      const campo = isBoxeador1 ? 'votos1' : 'votos2';
      const { error } = await supabase.rpc('incrementar_voto', {
        pelea_id: peleaId,
        campo_voto: campo
      });

      if (error) throw error;

      setCombates(prev => prev.map(combate => {
        if (combate.pelea?.id === peleaId) {
          const peleaActualizada = { ...combate.pelea };
          if (isBoxeador1) {
            peleaActualizada.votos1++;
          } else {
            peleaActualizada.votos2++;
          }
          return { ...combate, pelea: peleaActualizada };
        }
        return combate;
      }));
    } catch (err) {
      console.error('Error al votar:', err);
    }
  };

  const calcularPorcentajes = (votos1: number, votos2: number) => {
    const total = votos1 + votos2;
    if (total === 0) return { porcentaje1: 50, porcentaje2: 50 };

    return {
      porcentaje1: Math.round((votos1 / total) * 100),
      porcentaje2: Math.round((votos2 / total) * 100)
    };
  };

  if (loading) return <div className={styles.loading}>Cargando combates...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <main className={styles.combates}>
      <h1 className={styles.combates__title}>Combates</h1>
      <div className={styles.combates__list}>
        {combates.map((combate, idx) => (
          <CombateItem key={combate.a.id + '-' + combate.b.id} combate={combate} idx={idx} calcularPorcentajes={calcularPorcentajes} />
        ))}
      </div>
    </main>
  );
}