'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CombateItem, { CombateConVotos } from './CombateItem';
import styles from './Predicciones.module.scss';
import { supabase } from '@/utils/supabaseClient';
import Button from '@/components/ui/Button/Button';

export default function PrediccionesBatallas() {
  const [combates, setCombates] = useState<CombateConVotos[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [votos, setVotos] = useState<{ [key: string]: string }>({});
  const [current, setCurrent] = useState(0);
  const [enviando, setEnviando] = useState(false);
  const [finalizado, setFinalizado] = useState(false);
  const [yaVotaste, setYaVotaste] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const yaVotado = localStorage.getItem('predicciones_votadas');
    if (yaVotado === '1') {
      setYaVotaste(true);
      setLoading(false);
      return;
    }
    async function loadCombates() {
      try {
        const { data: boxeadores, error: boxeadoresError } = await supabase
          .from('boxeadores')
          .select('*');
        if (boxeadoresError || !boxeadores) throw new Error('Error al cargar boxeadores');
        const { data: peleas, error: peleasError } = await supabase
          .from('peleas')
          .select('*');
        if (peleasError) throw new Error('Error al cargar peleas');
        const yaEnfrentados = new Set();
        const combatesConVotos: CombateConVotos[] = [];
        boxeadores.forEach((b) => {
          if (b.vs && !yaEnfrentados.has(b.id) && !yaEnfrentados.has(b.vs)) {
            const rival = boxeadores.find((r) => r.id === b.vs);
            if (rival) {
              const pelea = peleas?.find((p) =>
                (p.boxeador1_id === b.id && p.boxeador2_id === rival.id) ||
                (p.boxeador1_id === rival.id && p.boxeador2_id === b.id)
              ) || null;
              combatesConVotos.push({ a: b, b: rival, pelea });
              yaEnfrentados.add(b.id);
              yaEnfrentados.add(rival.id);
            }
          }
        });
        setCombates(combatesConVotos);
      } catch (err) {
        setError('Error al cargar combates');
      } finally {
        setLoading(false);
      }
    }
    loadCombates();
  }, []);

  const calcularPorcentajes = (v1: number, v2: number) => {
    const total = v1 + v2;
    if (total === 0) return { porcentaje1: 50, porcentaje2: 50 };
    return {
      porcentaje1: Math.round((v1 / total) * 100),
      porcentaje2: Math.round((v2 / total) * 100)
    };
  };

  const handleVoto = (peleaId: string | undefined, quien: 'a' | 'b') => {
    if (!peleaId) return;
    setVotos((prev) => ({ ...prev, [peleaId]: quien }));
  };

  const handleSiguiente = async () => {
    if (current < combates.length - 1) {
      setCurrent((c) => c + 1);
    } else {
      setEnviando(true);
      try {
        for (const combate of combates) {
          const pelea = combate.pelea;
          if (!pelea) continue;
          const peleaId = pelea.id;
          const voto = votos[peleaId];
          if (!voto) continue;
          const campo = voto === 'a'
            ? (pelea.boxeador1_id === combate.a.id ? 'votos1' : 'votos2')
            : (pelea.boxeador1_id === combate.b.id ? 'votos1' : 'votos2');
          await supabase.rpc('incrementar_voto', {
            pelea_id: peleaId,
            campo_voto: campo
          });
        }
        localStorage.setItem('predicciones_votadas', '1');
        setFinalizado(true);
        setTimeout(() => {
          router.push('/combates');
        }, 1800);
      } catch (e) {
        setError('Error al enviar predicciones');
      } finally {
        setEnviando(false);
      }
    }
  };

  if (loading) return (
    <div className={styles.prediccionesBatallas} >
      <div className={styles.finalizado}>Cargando combates...</div>
    </div>
  );
  if (error) return (
    <div className={styles.prediccionesBatallas}>
      <div className={styles.error}>{error}</div>
    </div>
  );
  if (yaVotaste) return (
    <div className={styles.prediccionesBatallas} >
      <div className={styles.finalizado}>Ya votaste tus predicciones.</div>
    </div>
  );
  if (finalizado) return (
    <div className={styles.prediccionesBatallas} >
      <div className={styles.finalizado}>¡Tus predicciones fueron registradas!</div>
    </div>
  );
  if (!combates.length) return (
    <div className={styles.prediccionesBatallas}>
      <div className={styles.error}>No hay combates.</div>
    </div>
  );

  const combate = combates[current];
  const peleaId = combate.pelea?.id;
  const voto = peleaId ? votos[peleaId] : undefined;

  return (
    <div className={styles.prediccionesBatallas}>
      <CombateItem combate={combate} idx={current} calcularPorcentajes={calcularPorcentajes} />
      <div className={styles.prediccionesBatallas__votacion}>
        <Button
          onClick={() => peleaId && handleVoto(peleaId, 'a')}
          className={voto === 'a' ? styles.prediccionesBatallas__seleccionado : ''}
          disabled={enviando}
        >
          Voto {combate.a.nombre_artistico}
        </Button>
        <Button
          onClick={() => peleaId && handleVoto(peleaId, 'b')}
          className={voto === 'b' ? styles.prediccionesBatallas__seleccionado : ''}
          disabled={enviando}
        >
          Voto {combate.b.nombre_artistico}
        </Button>
      </div>
      <div className={styles.prediccionesBatallas__botones}>
        <Button
          variant="secondary"
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0 || enviando}
        >
          Anterior pelea
        </Button>
        <Button
          variant="secondary"
          onClick={handleSiguiente}
          disabled={!voto || enviando}
          className={styles.siguiente}
        >
          {current < combates.length - 1 ? 'Siguiente pelea' : 'Enviar predicciones'}
        </Button>
      </div>
    </div>
  );
}
