// app/font.tsx or src/app/font.tsx
import { Orbitron } from 'next/font/google';
import { Rajdhani } from 'next/font/google';
import { Audiowide } from 'next/font/google';
import { Bebas_Neue } from 'next/font/google';
import { Exo_2 } from 'next/font/google';

const orbitron = Orbitron({ subsets: ['latin'], weight: ['700'] });
const rajdhani = Rajdhani({ subsets: ['latin'], weight: ['600'] });
const audiowide = Audiowide({ subsets: ['latin'], weight: ['400'] });
const bebasNeue = Bebas_Neue({ subsets: ['latin'], weight: ['400'] });
const exo2 = Exo_2({ subsets: ['latin'], weight: ['600'] });

const FontPreview = () => {
  return (
    <div className="p-10 space-y-10 bg-black flex  items-center flex-row justify-between  min-h-screen text-center">

      <div className={orbitron.className}>
        <h2 className="text-xl text-white mb-1">Orbitron</h2>
        <p className="text-5xl">ZUNO</p>
        <p className="text-3xl text-white">zuno</p>
      </div>

      <div className={rajdhani.className}>
        <h2 className="text-xl text-white mb-1">Rajdhani</h2>
        <p className="text-5xl">ZUNO</p>
        <p className="text-3xl text-white">zuno</p>
      </div>

      <div className={audiowide.className}>
        <h2 className="text-xl text-white mb-1">Audiowide</h2>
        <p className="text-5xl">ZUNO</p>
        <p className="text-3xl text-white">zuno</p>
      </div>

      <div className={bebasNeue.className}>
        <h2 className="text-xl text-white mb-1">Bebas Neue</h2>
        <p className="text-5xl">ZUNO</p>
        <p className="text-3xl text-white">zuno</p>
      </div>

      <div className={exo2.className}>
        <h2 className="text-xl text-white mb-1">Exo 2</h2>
        <p className="text-5xl">ZUNO</p>
        <p className="text-3xl text-white">zuno</p>
      </div>
    </div>
  );
};

export default FontPreview;
