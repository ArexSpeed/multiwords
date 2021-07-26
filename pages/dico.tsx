/* eslint-disable jsx-a11y/no-onchange */
import React, { useState } from 'react';
import MetaHead from 'components/MetaHead';
import Search from 'components/Search';
import { categories, words } from 'data';
import MobileNav from 'components/Nav/MobileNav';
import Flag from 'components/Flag';

const DicoPage = () => {
  const [categoryName, setCategoryName] = useState<string>('All');

  const filterCategory = () => {
    if (categoryName === 'All') {
      return words;
    }
    return words.filter((word) => word.cat === categoryName);
  };

  return (
    <div className="w-screen h-screen max-h-screen flex flex-col relative font-baloo dark:bg-gray-700 dark:text-gray-100">
      <MetaHead />
      <main className="w-full max-h-screen">
        <Search />
        <section className="flex flex-row w-full p-3 justify-between items-center">
          <div>
            <select
              className="text-md outline-none bg-secondaryLight rounded-sm px-2 dark:bg-secondaryDark"
              onChange={(e) => setCategoryName(e.target.value)}>
              <option value="All">All</option>
              {categories.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </section>
        <section className="flex flex-col flex-grow w-full h-[80vh] px-3 justify-between items-center pb-24 overflow-hidden">
          <div className="flex flex-col w-full h-full justify-start items-start py-2 px-2 border-[1px] border-primary25 rounded-lg overflow-auto">
            <table className="border-separate">
              <thead>
                <tr>
                  <th>
                    <Flag flag="eng" />
                  </th>
                  <th>
                    <Flag flag="pol" />
                  </th>
                  <th>
                    <Flag flag="ger" />
                  </th>
                  <th>
                    <Flag flag="ned" />
                  </th>
                  <th>
                    <Flag flag="spa" />
                  </th>
                  <th>
                    <Flag flag="fra" />
                  </th>
                  <th>
                    <Flag flag="ita" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {filterCategory().map((item, i) => (
                  <tr key={item.id} className={`${i % 2 === 0 ? 'bg-gray-200 bg-opacity-25' : ''}`}>
                    <td className="border-l border-eng">{item.eng}</td>
                    <td className="border-l border-pol">{item.pol}</td>
                    <td className="border-l border-ger">{item.ger}</td>
                    <td className="border-l border-ned">{item.ned}</td>
                    <td className="border-l border-spa">{item.spa}</td>
                    <td className="border-l border-fra">{item.fra}</td>
                    <td className="border-l border-ita">{item.ita}</td>
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
