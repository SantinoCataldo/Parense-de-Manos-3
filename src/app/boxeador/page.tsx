import { supabase } from '@/utils/supabaseClient';
import Fighters from '@/components/sections/Fighters/Fighters';
import BoxeadorInfo, { Boxeador } from '@/components/sections/BoxeadorInfo/BoxeadorInfo';
import { IconCaretDownFilled } from '@tabler/icons-react';

export default async function BoxeadorPage() {
  const { data, error } = await supabase.from('boxeadores').select('*');
  if (error || !data) {
    return <div>Error al cargar boxeadores</div>;
  }

  return (
    <div>
        <div
          style={{
            position: "absolute",
            bottom: 15,
            left: "50%",
            transform: "translateX(-50%)",
            cursor: "pointer",
            zIndex: 12,
            color: "white",
          }}
        >
          <IconCaretDownFilled size={34} />
        </div>
      <Fighters />
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 30, justifyContent: 'center' }}>
        {data.map((boxeador: Boxeador) => (
          <BoxeadorInfo key={boxeador.id} boxeador={boxeador} />
        ))}
      </div>
      
    </div>
  );
}