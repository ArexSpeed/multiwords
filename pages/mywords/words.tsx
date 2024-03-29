import React from 'react';
import Link from 'next/link';
import MetaHead from 'components/MetaHead';
import MobileNav from 'components/Nav/MobileNav';
import Search from 'components/Search';
import Flag from 'components/Flag';
import { Swiper, SwiperSlide } from 'swiper/react';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import SchoolIcon from '@material-ui/icons/School';
import AddIcon from '@material-ui/icons/Add';
//import slice
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectCategoryId, selectWords } from 'redux/slices/mywordsSlice';
import { LearningLanguages, UserLanguage } from 'redux/slices/settingsSlice';
import { setCategoryId } from 'redux/slices/mywordsSlice';

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
  const dispatch = useAppDispatch();
  const categoryId = useAppSelector(selectCategoryId);
  const words = useAppSelector(selectWords);
  const userLanguage = useAppSelector(UserLanguage);
  const learnLanguages = useAppSelector(LearningLanguages);

  const keyMainLang = userLanguage.short as keyof Word;

  const handleDispatch = () => {
    dispatch(setCategoryId(categoryId));
  };

  return (
    <div className="w-screen h-screen max-h-screen flex flex-col relative font-baloo dark:bg-gray-700 dark:text-gray-100">
      <MetaHead />
      <main className="w-full max-h-screen">
        <Search />
        <section className="flex flex-row w-full p-3 justify-between items-center">
          <div>
            <CategorySwitch type="mywords" />
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
                .filter((word) => word.categoryId === categoryId)
                .map((word) => (
                  <SwiperSlide key={word.id} className="flex flex-col justify-center items-center">
                    <div className="flex flex-row justify-center items-center">
                      <Flag flag={userLanguage.short} />
                      <span className={`text-lg text-${keyMainLang}`}>{word[keyMainLang]}</span>
                    </div>
                    {learnLanguages.eng && userLanguage.short !== 'eng' && (
                      <div className="flex flex-row justify-center items-center">
                        <Flag flag="eng" /> <span className="text-lg text-eng">{word.eng}</span>
                      </div>
                    )}
                    {learnLanguages.pol && userLanguage.short !== 'pol' && (
                      <div className="flex flex-row justify-center items-center">
                        <Flag flag="pol" /> <span className="text-lg text-pol">{word.pol}</span>
                      </div>
                    )}
                    {learnLanguages.ger && userLanguage.short !== 'ger' && (
                      <div className="flex flex-row justify-center items-center">
                        <Flag flag="ger" /> <span className="text-lg text-ger">{word.ger}</span>
                      </div>
                    )}
                    {learnLanguages.ned && userLanguage.short !== 'ned' && (
                      <div className="flex flex-row justify-center items-center">
                        <Flag flag="ned" /> <span className="text-lg text-ned">{word.ned}</span>
                      </div>
                    )}
                    {learnLanguages.spa && userLanguage.short !== 'spa' && (
                      <div className="flex flex-row justify-center items-center">
                        <Flag flag="spa" /> <span className="text-lg text-spa">{word.spa}</span>
                      </div>
                    )}
                    {learnLanguages.fra && userLanguage.short !== 'fra' && (
                      <div className="flex flex-row justify-center items-center">
                        <Flag flag="fra" /> <span className="text-lg text-fra">{word.fra}</span>
                      </div>
                    )}
                    {learnLanguages.ita && userLanguage.short !== 'ita' && (
                      <div className="flex flex-row justify-center items-center">
                        <Flag flag="ita" /> <span className="text-lg text-ita">{word.ita}</span>
                      </div>
                    )}
                  </SwiperSlide>
                ))}
              <SwiperSlide className="flex flex-col justify-center items-center">
                <h3 className="text-lg">What do you want to do next</h3>
                <div className="flex flex-col justify-center items-center">
                  <Link href="/mywords/write" passHref>
                    <button
                      className="p-2 bg-primaryLight rounded-full dark:bg-primaryDark"
                      onClick={handleDispatch}>
                      <EditIcon />
                    </button>
                  </Link>
                  <p>Write test</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <Link href="/mywords/show" passHref>
                    <button
                      className="p-2 bg-primaryLight rounded-full dark:bg-primaryDark"
                      onClick={handleDispatch}>
                      <VisibilityOffIcon />
                    </button>
                  </Link>
                  <p>Hidden words test</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <Link href="/mywords" passHref>
                    <button
                      className="p-2 bg-primaryLight rounded-full dark:bg-primaryDark"
                      onClick={handleDispatch}>
                      <SchoolIcon />
                    </button>
                  </Link>
                  <p>Back to mywords</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <Link href="/mywords/addwords" passHref>
                    <button
                      className="p-2 bg-primaryLight rounded-full dark:bg-primaryDark"
                      onClick={handleDispatch}>
                      <AddIcon />
                    </button>
                  </Link>
                  <p>Add new words to category</p>
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
