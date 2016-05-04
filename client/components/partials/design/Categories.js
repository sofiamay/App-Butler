import React from 'react';
import CategoryItem from './CategoryItem.js';
import CategoryData from './../../../data/categories.js';

export default (props) => (
  <div className="categories">
    {CategoryData.map(item =>
      <CategoryItem key={item.key} data={item} event={props.changeCategory} currentCategory={props.currentCategory} />
    )}
  </div>
);
