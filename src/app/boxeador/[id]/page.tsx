import { supabase } from '@/utils/supabaseClient';
import BoxeadorInfo, { Boxeador } from '@/components/sections/BoxeadorInfo/BoxeadorInfo';
import styles from './page.module.scss';


export default async function BoxeadorPage({ params }: { params: { id: string } }) {
  const nombreArtistico = params.id.replace(/-/g, ' ');

  const { data, error } = await supabase
    .from('boxeadores')
    .select('*')
    .ilike('nombre_artistico', nombreArtistico);

  if (error || !data || data.length === 0) {
    return <div>No se encontró el boxeador.</div>;
  }

  const boxeador: Boxeador = data[0];

  let rival: Boxeador | null = null;
  if (boxeador.vs) {
    const { data: rivalData } = await supabase
      .from('boxeadores')
      .select('*')
      .eq('id', boxeador.vs);
    if (rivalData && rivalData.length > 0) {
      rival = rivalData[0];
    }
  }

  return (
    <div className={styles.boxeadoresContainer}>
      <BoxeadorInfo boxeador={boxeador} rival={rival} />
    </div>
  );
}