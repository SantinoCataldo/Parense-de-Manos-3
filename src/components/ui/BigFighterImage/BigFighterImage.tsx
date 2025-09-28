import Image from 'next/image';
import styles from './BigFighterImage.module.scss';

export default function BigFighterImage({ nombre }: { nombre: string }) {
  return (
    <div className={styles.imageWrapper}>
      <Image
        src={`/images/Peleadores/${nombre}.webp`}
        alt={nombre}
        fill
        className={styles.imageWrapper__img}
        sizes="400px"
      />
    </div>
  );
}
