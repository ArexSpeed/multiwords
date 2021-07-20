import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { decrement, increment } from '../redux/slices/counterSlice';
import MobileNav from '../components/Nav/MobileNav';
import Search from '../components/Search';
import logo from '../assets/mwl.png';
import eng from '../assets/eng.png';
import fra from '../assets/fra.png';
import ger from '../assets/ger.png';
import ita from '../assets/ita.png';
import ned from '../assets/ned.png';
import pol from '../assets/pol.png';
import spa from '../assets/spa.png';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda';
import BorderAllIcon from '@material-ui/icons/BorderAll';

export default function Home() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const flags = [eng, fra, ger, ita, ned, pol, spa];

  return (
    <div className="w-screen h-screen max-h-screen flex flex-col relative font-baloo">
      <Head>
        <title>Multiwords</title>
        <meta name="description" content="Languages learning app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
          <h3>Hello! What language want you learn today?</h3>
          <article className="flex flex-row justify-center items-center">
            {flags.map((flag, i) => (
              <div className="w-lg h-lg m-2 rounded-full overflow-hidden" key={i}>
                <Image src={flag} alt="eng" />
              </div>
            ))}
          </article>
        </section>
        <section className="flex flex-col justify-center items-center">
          <h3 className="text-gray-600">Learn your favorite language by</h3>
          <article className="flex flex-row justify-around items-center">
            <Link href="/learn" passHref>
              <div className="w-[100px] h-[100px] m-4 bg-gray-100 flex flex-col justify-between items-center rounded-sm shadow-sm">
                <MenuBookIcon style={{ fontSize: '60px' }} />
                <h5>Read</h5>
              </div>
            </Link>
            <Link href="/learn" passHref>
              <div className="w-[100px] h-[100px] m-4 bg-gray-100 flex flex-col justify-between items-center rounded-sm shadow-sm">
                <SpellcheckIcon style={{ fontSize: '60px' }} />
                <h5>Write</h5>
              </div>
            </Link>
          </article>
          <article className="flex flex-row justify-around items-center">
            <Link href="/game" passHref>
              <div className="w-[100px] h-[100px] m-4 bg-gray-100 flex flex-col justify-between items-center rounded-sm shadow-sm">
                <ViewAgendaIcon style={{ fontSize: '60px' }} />
                <h5>Memo</h5>
              </div>
            </Link>
            <Link href="/game" passHref>
              <div className="w-[100px] h-[100px] m-4 bg-gray-100 flex flex-col justify-between items-center rounded-sm shadow-sm">
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
