'use client';

import Image from 'next/image';
import styles from './BoxeadorInfo.module.scss';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button/Button';
import Link from 'next/link';

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

export default function BoxeadorInfo({ boxeador, rival }: { boxeador: Boxeador, rival?: Boxeador | null }) {
    const router = useRouter();
    return (
        <div className={styles.boxeadorInfo}>
            <Link href={`/boxeador/${boxeador.nombre_artistico.replace(/\s+/g, '-').toLowerCase()}`} className={styles.boxeadorInfo__imgContainer}>
                <Image
                    src={`/images/Peleadores/${boxeador.nombre_artistico}.webp`}
                    alt={boxeador.nombre_artistico}
                    fill
                    sizes="400px"
                    className={styles.boxeadorInfo__imgContainer__img}
                />
                <p>{boxeador.nombre_real}</p>
            </Link>
            <section className={styles.boxeadorInfo__section}>
                <h1>{boxeador.nombre_artistico}</h1>
                <span>stats</span>
                <div className={styles.boxeadorInfo__section__content}>
                    <span>Edad</span>
                    <p>{boxeador.edad}</p>
                    <span>Altura</span>
                    <p>{boxeador.altura} cm</p>
                    <span>Peso</span>
                    <p>{boxeador.peso} kg</p>
                    <span>Nacionalidad</span>
                    <p>{boxeador.nacionalidad}</p>
                </div>
            </section>
            {rival && (
                <div className={styles.boxeadorInfo__vs}>
                    <div className={styles.boxeadorInfo__vs__label}>VS</div>
                    <div
                        className={styles.boxeadorInfo__vs__content}
                        style={{ cursor: 'pointer' }}
                        onClick={() => router.push(`/boxeador/${rival.nombre_artistico.replace(/\s+/g, '-').toLowerCase()}`)}
                    >
                        <Image
                            src={`/images/Peleadores/${rival.nombre_artistico}.webp`}
                            alt={rival.nombre_artistico}
                            fill
                            sizes="200px"
                            className={styles.boxeadorInfo__vs__content__img}
                        />
                        <span className={styles.boxeadorInfo__vs__content__name}>{rival.nombre_artistico}</span>
                    </div>
                </div>
            )}
        </div>
    );
}