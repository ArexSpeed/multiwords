import { useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MetaHead from 'components/MetaHead';
import MobileNav from 'components/Nav/MobileNav';
import Search from 'components/Search';
import logo from 'assets/mwl.png';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda';
import BorderAllIcon from '@material-ui/icons/BorderAll';
import Flag from 'components/Flag';

export default function Home() {
  const [currentHelloIndex, setCurrentHelloIndex] = useState<number>(0);

  const flags = ['eng', 'pol', 'ger', 'ned', 'spa', 'ita', 'fra'];
  const hellos = [
    'Hello! What language do you want to learn today?',
    'Witaj! Jakiego języka chcesz się dzis nauczyć?',
    'Hallo! Welche Sprache möchtest du heute lernen?',
    'Hallo! Welke taal wil je vandaag leren?',
    '¡Hola! ¿Qué idioma quieres aprender hoy?',
    'Ciao! Che lingua vuoi imparare oggi?',
    "Bonjour! Quelle langue voulez-vous apprendre aujourd'hui ?"
  ];

  const helloSwitch = useCallback(() => {
    if (currentHelloIndex < hellos.length - 1) {
      setCurrentHelloIndex(currentHelloIndex + 1);
    } else {
      setCurrentHelloIndex(0);
    }
  }, [currentHelloIndex]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      helloSwitch();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [helloSwitch]);

  return (
    <div className="w-screen h-screen max-h-screen flex flex-col relative font-baloo dark:bg-gray-700 dark:text-gray-100">
      <MetaHead />
      <main className="w-full max-h-screen">
        <Search />
        <section className="flex flex-col justify-center items-center">
          <Image src={logo} alt="Multiwords" />
          <h2 className="text-lg">
            <span className="font-bold text-primary">MULTI</span>
            <span className="font-bold text-secondary">WORDS</span>
          </h2>
        </section>
        <section className="flex flex-col justify-center items-center">
          <h3 className="text-md md:text-lg">{hellos[currentHelloIndex]}</h3>
          <article className="flex flex-row justify-center items-center">
            {flags.map((flag, i) => (
              <Flag flag={flag} key={i} />
            ))}
          </article>
        </section>
        <section className="flex flex-col justify-center items-center">
          <h3 className="text-gray-600 dark:text-gray-300">Learn your favorite language by</h3>
          <article className="flex flex-row justify-around items-center">
            <Link href="/learn" passHref>
              <div className="w-[100px] h-[100px] m-4 bg-gray-100 dark:bg-gray-800 flex flex-col justify-between items-center rounded-sm shadow-sm">
                <MenuBookIcon style={{ fontSize: '60px' }} />
                <h5>Read</h5>
              </div>
            </Link>
            <Link href="/learn" passHref>
              <div className="w-[100px] h-[100px] m-4 bg-gray-100 dark:bg-gray-800 flex flex-col justify-between items-center rounded-sm shadow-sm">
                <SpellcheckIcon style={{ fontSize: '60px' }} />
                <h5>Write</h5>
              </div>
            </Link>
          </article>
          <article className="flex flex-row justify-around items-center">
            <Link href="/game" passHref>
              <div className="w-[100px] h-[100px] m-4 bg-gray-100 dark:bg-gray-800 flex flex-col justify-between items-center rounded-sm shadow-sm">
                <ViewAgendaIcon style={{ fontSize: '60px' }} />
                <h5>Memo</h5>
              </div>
            </Link>
            <Link href="/game" passHref>
              <div className="w-[100px] h-[100px] m-4 bg-gray-100 dark:bg-gray-800 flex flex-col justify-between items-center rounded-sm shadow-sm">
                <BorderAllIcon style={{ fontSize: '60px' }} />
                <h5>Find word</h5>
              </div>
            </Link>
          </article>
        </section>
        <MobileNav />
      </main>
    </div>
  );
}
