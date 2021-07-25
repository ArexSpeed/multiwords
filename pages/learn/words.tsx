import React from 'react';
import Link from 'next/link';
import MetaHead from 'components/MetaHead';
import MobileNav from 'components/Nav/MobileNav';
import Search from 'components/Search';
import { words } from 'data';
import Flag from 'components/Flag';
import { Swiper, SwiperSlide } from 'swiper/react';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import SchoolIcon from '@material-ui/icons/School';
//import slice
import { useAppSelector } from 'redux/hooks';
import { selectCategory } from 'redux/slices/learnSlice';
import { LearningLanguages, UserLanguage } from 'redux/slices/settingsSlice';

// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';

// import Swiper core and required modules
import SwiperCore, { Keyboard, Pagination, Navigation } from 'swiper/core';
import CategorySwitch from 'components/CategorySwitch';

// install Swiper modules
SwiperCore.use([Keyboard, Pagination, Navigation]);

type Word = {
  eng: string;
  pol: string;
  ger: string;
  ned: string;
  spa: string;
  fra: string;
  ita: string;
};

const WordsPage = () => {
  const category = useAppSelector(selectCategory);
  const userLanguage = useAppSelector(UserLanguage);
  const learnLanguages = useAppSelector(LearningLanguages);

  const keyMainLang = userLanguage.short as keyof Word;

  return (
    <div className="w-screen h-screen max-h-screen flex flex-col relative font-baloo dark:bg-gray-700 dark:text-gray-100">
      <MetaHead />
      <main className="w-full max-h-screen">
        <Search />
        <section className="flex flex-row w-full p-3 justify-between items-center">
          <div>
            <CategorySwitch />
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
              {words
                .filter((word) => word.cat === category)
                .map((word) => (
                  <SwiperSlide key={word.id} className="flex flex-col justify-center items-center">
                    <div className="flex flex-row justify-center items-center">
                      <Flag flag={userLanguage.short} />
                      <span className="text-lg">{word[keyMainLang]}</span>
                    </div>
                    {learnLanguages.eng && userLanguage.short !== 'eng' && (
                      <div className="flex flex-row justify-center items-center">
                        <Flag flag="eng" /> <span className="text-lg">{word.eng}</span>
                      </div>
                    )}
                    {learnLanguages.pol && userLanguage.short !== 'pol' && (
                      <div className="flex flex-row justify-center items-center">
                        <Flag flag="pol" /> <span className="text-lg">{word.pol}</span>
                      </div>
                    )}
                    {learnLanguages.ger && userLanguage.short !== 'ger' && (
                      <div className="flex flex-row justify-center items-center">
                        <Flag flag="ger" /> <span className="text-lg">{word.ger}</span>
                      </div>
                    )}
                    {learnLanguages.ned && userLanguage.short !== 'ned' && (
                      <div className="flex flex-row justify-center items-center">
                        <Flag flag="ned" /> <span className="text-lg">{word.ned}</span>
                      </div>
                    )}
                    {learnLanguages.spa && userLanguage.short !== 'spa' && (
                      <div className="flex flex-row justify-center items-center">
                        <Flag flag="spa" /> <span className="text-lg">{word.spa}</span>
                      </div>
                    )}
                    {learnLanguages.fra && userLanguage.short !== 'fra' && (
                      <div className="flex flex-row justify-center items-center">
                        <Flag flag="fra" /> <span className="text-lg">{word.fra}</span>
                      </div>
                    )}
                    {learnLanguages.ita && userLanguage.short !== 'ita' && (
                      <div className="flex flex-row justify-center items-center">
                        <Flag flag="ita" /> <span className="text-lg">{word.ita}</span>
                      </div>
                    )}
                  </SwiperSlide>
                ))}
              <SwiperSlide className="flex flex-col justify-center items-center">
                <h3 className="text-lg">What do you want to do next</h3>
                <div className="flex flex-col justify-center items-center">
                  <Link href="/learn/write" passHref>
                    <button
                      className="p-2 bg-primary25 rounded-full hover:bg-primary50"
                      onClick={() => console.log('')}>
                      <EditIcon />
                    </button>
                  </Link>
                  <p>Write test</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <Link href="/learn/show" passHref>
                    <button
                      className="p-2 bg-primary25 rounded-full hover:bg-primary50"
                      onClick={() => console.log('')}>
                      <VisibilityOffIcon />
                    </button>
                  </Link>
                  <p>Hidden words test</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <Link href="/learn" passHref>
                    <button
                      className="p-2 bg-primary25 rounded-full hover:bg-primary50"
                      onClick={() => console.log('')}>
                      <SchoolIcon />
                    </button>
                  </Link>
                  <p>Back to categories</p>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </section>
        <MobileNav />
      </main>
    </div>
  );
};

export default WordsPage;
