import React from 'react';
import Head from 'next/head';
import MobileNav from '../components/Nav/MobileNav';
import Search from '../components/Search';
import Accordion from '../components/Accordion';
import SettingsIcon from '@material-ui/icons/Settings';

const LearnPage = () => {
  return (
    <div className="w-screen h-screen max-h-screen flex flex-col relative font-baloo">
      <Head>
        <title>Multiwords</title>
        <meta name="description" content="Languages learning app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full max-h-screen">
        <Search />
        <section className="flex flex-row w-full p-3 justify-between items-center">
          <h4 className="text-md">Categories:</h4>
          <div>
            <SettingsIcon />
          </div>
        </section>
        <section className="flex flex-col w-full p-3 justify-between items-center">
          <Accordion title="Level 1">
            <p>Hello from Accordion</p>
            <p>Hello from Accordion</p>
            <p>Hello from Accordion</p>
            <p>Hello from Accordion</p>
            <p>Hello from Accordion</p>
          </Accordion>
          <Accordion title="Level 2">
            <p>Second accordion</p>
          </Accordion>
        </section>
        <MobileNav />
      </main>
    </div>
  );
};

export default LearnPage;
