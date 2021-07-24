/* eslint-disable jsx-a11y/no-onchange */
import React from 'react';
import { categories } from 'data';
//import slice
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { setCategory, selectLevel } from 'redux/slices/learnSlice';

const CategorySwitch = () => {
  const level = useAppSelector(selectLevel);
  const dispatch = useAppDispatch();
  return (
    <select
      className="text-md outline-none bg-secondary25 rounded-sm px-2"
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
