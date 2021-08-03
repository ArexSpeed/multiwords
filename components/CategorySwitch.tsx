/* eslint-disable jsx-a11y/no-onchange */
import React from 'react';
import { categories } from 'data';
//import slice
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { setCategory, selectLevel } from 'redux/slices/learnSlice';
import { selectCategories, setCategoryId } from 'redux/slices/mywordsSlice';

interface Props {
  type?: string;
}

const CategorySwitch: React.FC<Props> = ({ type }) => {
  const mwCategories = useAppSelector(selectCategories); //for mywords
  const level = useAppSelector(selectLevel);
  const dispatch = useAppDispatch();
  return type === 'mywords' ? (
    <select
      className="text-md outline-none bg-secondaryLight rounded-sm px-2 dark:bg-secondaryDark"
      onChange={(e) => dispatch(setCategoryId(e.target.value))}>
      {mwCategories.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  ) : (
    <select
      className="text-md outline-none bg-secondaryLight rounded-sm px-2 dark:bg-secondaryDark"
      onChange={(e) => dispatch(setCategory(e.target.value))}>
      {categories
        .filter((category) => +category.lvl === level)
        .map((item) => (
          <option key={item.id} value={item.name}>
            {item.name}
          </option>
        ))}
    </select>
  );
};

export default CategorySwitch;
