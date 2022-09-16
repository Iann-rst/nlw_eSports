import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios'

/* Componentes de Games e Publicar Banner */
import logoImage from './assets/logo-nlw-esports.svg';
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';

import './styles/main.css';
import { CreateAdModal } from './components/CreateAdModal';

interface GamesProps {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<GamesProps[]>([]);

  useEffect(() => {
    //Faz uma requisição no nosso servidor para buscar a lista de jogos
    axios('http://localhost:3333/games').then(response => {
      setGames(response.data)
    })
  }, [])

  return (

    <div className="max-w-[1344px] flex flex-col items-center mx-auto my-20">
      <img src={logoImage} alt="" />
      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'> duo</span> está aqui.
      </h1>

      {/*Div que contém a listagem dos jogos*/}
      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map(game => {
          return (
            <GameBanner key={game.id} title={game.title} bannerUrl={game.bannerUrl} adsCount={game._count.ads} />
          )
        }
        )
        }
      </div>

      {/* Publicar um anúncio */}
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>

  )
}

export default App
