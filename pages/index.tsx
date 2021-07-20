import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { decrement, increment } from '../redux/slices/counterSlice';
import MobileNav from '../components/Nav/MobileNav';
import Search from '../components/Search';

export default function Home() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  return (
    <div className="w-screen min-h-screen max-h-screen flex flex-col relative">
      <Head>
        <title>Multiwords</title>
        <meta name="description" content="Languages learning app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full max-h-screen">
        <Search />
        <MobileNav />
      </main>
    </div>
  );
}
