/* eslint-disable jsx-a11y/no-onchange */
import React, { useState } from 'react';
import MetaHead from 'components/MetaHead';
import Search from 'components/Search';
import { categories, words } from 'data';
import MobileNav from 'components/Nav/MobileNav';
import Flag from 'components/Flag';
//slice
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { UserLanguage, DicoLanguages, changeDicoLanguages } from 'redux/slices/settingsSlice';
import SettingsIcon from '@material-ui/icons/Settings';

const DicoPage = () => {
  const [categoryName, setCategoryName] = useState<string>('All');
  const userLanguage = useAppSelector(UserLanguage);
  const dicoLanguages = useAppSelector(DicoLanguages);
  const dispatch = useAppDispatch();
  const [settingBox, setSettingBox] = useState(false);

  const filterCategory = () => {
    if (categoryName === 'All') {
      return words;
    }
    return words.filter((word) => word.cat === categoryName);
  };

  const langs = ['eng', 'pol', 'ger', 'ned', 'spa', 'fra', 'ita'];
  const checkDicoLanguage = (lang: string) => {
    dispatch(changeDicoLanguages(lang));
  };

  return (
    <div className="w-screen h-screen max-h-screen flex flex-col relative font-baloo dark:bg-gray-700 dark:text-gray-100">
      <MetaHead />
      <main className="w-full max-h-screen">
        <Search />
        <section className="flex flex-row relative w-full p-3 justify-between items-center">
          <div>
            <select
              className="text-md outline-none bg-secondaryLight rounded-sm px-3 dark:bg-secondaryDark"
              onChange={(e) => setCategoryName(e.target.value)}>
              <option value="All">All</option>
              {categories.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <button className="outline-none" onClick={() => setSettingBox(!settingBox)}>
            <SettingsIcon style={{ fontSize: '20px' }} />
          </button>
          {settingBox && (
            <div className="flex flex-col justify-start items-center absolute z-10 top-10 left-0 w-full h-auto p-2 bg-secondaryLight rounded-sm dark:bg-secondaryDark">
              <div className="flex flex-row">
                <h4>Show languages:</h4>
              </div>
              <div className="flex flex-row justify-start items-center overflow-x-auto">
                {langs.map((lang, i) => (
                  <label
                    key={i}
                    className="flex flex-col justify-center items-center cursor-pointer">
                    <Flag flag={lang} />
                    <input
                      type="checkbox"
                      defaultChecked={dicoLanguages[lang]}
                      onChange={() => checkDicoLanguage(lang)}
                    />
                  </label>
                ))}
              </div>
            </div>
          )}
        </section>
        <section className="flex flex-col flex-grow w-full h-[80vh] px-3 justify-between items-center pb-24 overflow-hidden">
          <div className="flex flex-col w-full h-full justify-start items-start py-2 px-2 border-[1px] border-primary25 rounded-lg overflow-auto">
            <table className="border-separate">
              <thead>
                <tr>
                  <th>
                    <Flag flag={userLanguage.short} />
                  </th>
                  {dicoLanguages.eng && userLanguage.short !== 'eng' && (
                    <th>
                      <Flag flag="eng" />
                    </th>
                  )}
                  {dicoLanguages.pol && userLanguage.short !== 'pol' && (
                    <th>
                      <Flag flag="pol" />
                    </th>
                  )}
                  {dicoLanguages.ger && userLanguage.short !== 'ger' && (
                    <th>
                      <Flag flag="ger" />
                    </th>
                  )}
                  {dicoLanguages.ned && userLanguage.short !== 'ned' && (
                    <th>
                      <Flag flag="ned" />
                    </th>
                  )}
                  {dicoLanguages.spa && userLanguage.short !== 'spa' && (
                    <th>
                      <Flag flag="spa" />
                    </th>
                  )}
                  {dicoLanguages.fra && userLanguage.short !== 'fra' && (
                    <th>
                      <Flag flag="fra" />
                    </th>
                  )}
                  {dicoLanguages.ita && userLanguage.short !== 'ita' && (
                    <th>
                      <Flag flag="ita" />
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filterCategory().map((item, i) => (
                  <tr key={item.id} className={`${i % 2 === 0 ? 'bg-gray-200 bg-opacity-25' : ''}`}>
                    {userLanguage.short === 'eng' && (
                      <td className="border-l border-eng">{item.eng}</td>
                    )}
                    {userLanguage.short === 'pol' && (
                      <td className="border-l border-pol">{item.pol}</td>
                    )}
                    {userLanguage.short === 'ger' && (
                      <td className="border-l border-ger">{item.ger}</td>
                    )}
                    {userLanguage.short === 'ned' && (
                      <td className="border-l border-ned">{item.ned}</td>
                    )}
                    {userLanguage.short === 'spa' && (
                      <td className="border-l border-spa">{item.spa}</td>
                    )}
                    {userLanguage.short === 'fra' && (
                      <td className="border-l border-fra">{item.fra}</td>
                    )}
                    {userLanguage.short === 'ita' && (
                      <td className="border-l border-ita">{item.ita}</td>
                    )}
                    {dicoLanguages.eng && userLanguage.short !== 'eng' && (
                      <td className="border-l border-eng">{item.eng}</td>
                    )}
                    {dicoLanguages.pol && userLanguage.short !== 'pol' && (
                      <td className="border-l border-pol">{item.pol}</td>
                    )}
                    {dicoLanguages.ger && userLanguage.short !== 'ger' && (
                      <td className="border-l border-ger">{item.ger}</td>
                    )}
                    {dicoLanguages.ned && userLanguage.short !== 'ned' && (
                      <td className="border-l border-ned">{item.ned}</td>
                    )}
                    {dicoLanguages.spa && userLanguage.short !== 'spa' && (
                      <td className="border-l border-spa">{item.spa}</td>
                    )}
                    {dicoLanguages.fra && userLanguage.short !== 'fra' && (
                      <td className="border-l border-fra">{item.fra}</td>
                    )}
                    {dicoLanguages.ita && userLanguage.short !== 'ita' && (
                      <td className="border-l border-ita">{item.ita}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <MobileNav />
      </main>
    </div>
  );
};

export default DicoPage;
