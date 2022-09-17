import { useState, useEffect } from 'react';
import './styles/main.css';

import logoImg from './assets/logo-nlw-esports.svg';
import GameBanner from './components/GameBanner';
import CreateAdBanner from './components/CreateAdBanner';

import * as Dialog from '@radix-ui/react-dialog';
import CreatedAdModal from './components/CreateAdModal';
import axios from 'axios';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios('http://localhost:3333/games')
      .then(({ data }) => setGames(data.data));
  }, []);

  return (
    <>
      <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
        <img src={logoImg} alt="logo" />

        <h1 className="text-6xl text-white font-black mt-20">
          Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
        </h1>

        <div className="grid grid-cols-6 gap-6 mt-16">
          {games.map(({ id, bannerUrl, title, _count }) => (
            <GameBanner key={id} bannerUrl={bannerUrl} title={title} adsCount={_count.ads} />
          ))}
        </div>

        <Dialog.Root>
          <CreateAdBanner />

          <CreatedAdModal />
        </Dialog.Root>
      </div>
    </>
  );
}

export default App;
