import { supabase } from '@/utils/supabaseClient';
import Fighters from '@/components/sections/Fighters/Fighters';
import BoxeadorInfo, { Boxeador } from '@/components/sections/BoxeadorInfo/BoxeadorInfo';
import { IconCaretDownFilled } from '@tabler/icons-react';
import styles from './page.module.scss';

export default async function BoxeadorPage() {
  const { data, error } = await supabase.from('boxeadores').select('*');
  if (error || !data) {
    return <div>Error al cargar boxeadores</div>;
  }

  return (
    <div>
      <Fighters />
      <div className={styles.boxeadoresContainer}>
        {data.map((boxeador: Boxeador) => (
          <BoxeadorInfo key={boxeador.id} boxeador={boxeador} />
        ))}
      </div>
      
    </div>
  );
}