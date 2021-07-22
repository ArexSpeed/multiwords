import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import MobileNav from 'components/Nav/MobileNav';
import Search from 'components/Search';
import { levels, categories } from 'data';
import Flag from 'components/Flag';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';

// import Swiper core and required modules
import SwiperCore, { Keyboard, Pagination, Navigation } from 'swiper/core';

// install Swiper modules
SwiperCore.use([Keyboard, Pagination, Navigation]);

const WordsPage = () => {
  const level = '1';
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
          <div>
            <select className="text-md outline-none bg-secondary25 rounded-sm px-2">
              {categories
                .filter((category) => category.lvl === level)
                .map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </section>
        <section className="flex flex-col flex-grow w-full h-[80vh] px-3 justify-between items-center pb-24">
          <div className="flex flex-col w-full h-full justify-center items-center px-2 border-[1px] border-primary25 rounded-lg">
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              keyboard={{
                enabled: true
              }}
              pagination={{
                type: 'fraction'
              }}
              navigation={true}
              className="w-full h-full">
              <SwiperSlide className="flex flex-col justify-center items-center">
                <div className="flex flex-row justify-center items-center">
                  <Flag flag="eng" /> <span className="text-lg">Hello</span>
                </div>
                <div className="flex flex-row justify-center items-center">
                  <Flag flag="pol" /> <span className="text-lg">Cześć</span>
                </div>
                <div className="flex flex-row justify-center items-center">
                  <Flag flag="ger" /> <span className="text-lg">Hallo</span>
                </div>
                <div className="flex flex-row justify-center items-center">
                  <Flag flag="spa" /> <span className="text-lg">Hoi</span>
                </div>
              </SwiperSlide>
              <SwiperSlide className="flex flex-col justify-center items-center">
                <div className="flex flex-row justify-center items-center">
                  <Flag flag="eng" /> <span className="text-lg">One</span>
                </div>
                <div className="flex flex-row justify-center items-center">
                  <Flag flag="pol" /> <span className="text-lg">Jeden</span>
                </div>
                <div className="flex flex-row justify-center items-center">
                  <Flag flag="ger" /> <span className="text-lg">Ein</span>
                </div>
                <div className="flex flex-row justify-center items-center">
                  <Flag flag="spa" /> <span className="text-lg">Uno</span>
                </div>
              </SwiperSlide>
              <SwiperSlide className="flex flex-col justify-center items-center">
                <div className="flex flex-row justify-center items-center">
                  <Flag flag="eng" /> <span className="text-lg">Two</span>
                </div>
                <div className="flex flex-row justify-center items-center">
                  <Flag flag="pol" /> <span className="text-lg">Dwa</span>
                </div>
                <div className="flex flex-row justify-center items-center">
                  <Flag flag="ger" /> <span className="text-lg">Zwei</span>
                </div>
                <div className="flex flex-row justify-center items-center">
                  <Flag flag="fra" /> <span className="text-lg">Duo</span>
                </div>
              </SwiperSlide>
              <SwiperSlide>Slide 4</SwiperSlide>
            </Swiper>
          </div>
        </section>
        <MobileNav />
      </main>
    </div>
  );
};

export default WordsPage;
