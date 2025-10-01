import { supabase } from '@/utils/supabaseClient';
import BoxeadorInfo, { Boxeador } from '@/components/sections/BoxeadorInfo/BoxeadorInfo';
import styles from './page.module.scss';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const nombreArtistico = id.replace(/-/g, ' ');

  const { data } = await supabase
    .from('boxeadores')
    .select('nombre_artistico, descripcion')
    .ilike('nombre_artistico', nombreArtistico)
    .single();

  if (!data) {
    return {
      title: 'Boxeador no encontrado',
      description: 'No se pudo encontrar información del boxeador solicitado.',
    };
  }

  return {
    title: `${data.nombre_artistico} - Párese de Manos 3`,
    description: data.descripcion || `Información sobre ${data.nombre_artistico}`,
  };
}

export default async function BoxeadorPage({ params }: Props) {
  const { id } = await params;
  const nombreArtistico = id.replace(/-/g, ' ');

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