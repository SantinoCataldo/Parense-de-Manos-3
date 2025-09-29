import styles from './Combates.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { Boxeador } from '@/components/sections/Combates/CombatesPage';

export type Pelea = {
  id: string;
  boxeador1_id: string;
  boxeador2_id: string;
  votos1: number;
  votos2: number;
};

export type CombateConVotos = {
  a: Boxeador;
  b: Boxeador;
  pelea: Pelea | null;
};

interface CombateItemProps {
  combate: CombateConVotos;
  idx: number;
  calcularPorcentajes: (v1: number, v2: number) => { porcentaje1: number; porcentaje2: number };
}

export default function CombateItem({ combate, idx, calcularPorcentajes }: CombateItemProps) {
  const { a, b, pelea } = combate;
  const votos1 = pelea?.votos1 || 0;
  const votos2 = pelea?.votos2 || 0;
  const totalVotos = votos1 + votos2;
  const { porcentaje1, porcentaje2 } = calcularPorcentajes(votos1, votos2);

  const esBoxeador1A = pelea?.boxeador1_id === a.id;
  const porcentajeA = esBoxeador1A ? porcentaje1 : porcentaje2;
  const porcentajeB = esBoxeador1A ? porcentaje2 : porcentaje1;

  const slugA = a.nombre_artistico.replace(/\s+/g, '-').toLowerCase();
  const slugB = b.nombre_artistico.replace(/\s+/g, '-').toLowerCase();

  return (
    <div key={a.id + '-' + b.id}>
      <div className={styles.combates__list__item}>
        <div className={styles.combates__list__item__num}>#{idx + 1}</div>
        <Link href={`/boxeador/${slugA}`} className={styles.combates__list__item__fighter} style={{ cursor: 'pointer' }}>
          <Image
            src={`/images/Peleadores/${a.nombre_artistico}.webp`}
            alt={a.nombre_artistico}
            width={200}
            height={300} />
          <span>{a.nombre_artistico}</span>
        </Link>
        <div className={styles.combates__list__item__vs}>
          <span>VS</span>
        </div>
        <Link href={`/boxeador/${slugB}`} className={styles.combates__list__item__fighter} style={{ cursor: 'pointer' }}>
          <Image
            src={`/images/Peleadores/${b.nombre_artistico}.webp`}
            alt={b.nombre_artistico}
            width={200}
            height={300} />
          <span>{b.nombre_artistico}</span>
        </Link>
      </div>
      <div className={styles.combates__list__item__info}>
        {pelea && (
          <>
            <div className={styles.combates__list__item__barraVotos}>
              <div
                className={styles.combates__list__item__barraVotos__a}
                style={{ width: `${porcentajeA}%` }}
              >
                <span>{porcentajeA}%</span>
              </div>
              <div
                className={styles.combates__list__item__barraVotos__b}
                style={{ width: `${porcentajeB}%` }}
              >
                <span>{porcentajeB}%</span>
              </div>
            </div>
            <div className={styles.combates__list__item__totalVotos}>
              {totalVotos} votos totales
            </div>
          </>
        )}
        {!pelea && (
          <div className={styles.combates__list__item__sinVotos}>
            Sin sistema de votos
          </div>
        )}
      </div>
    </div>
  );
}
