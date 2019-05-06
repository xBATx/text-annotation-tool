import React from 'react';
import { CategoryColorMap } from 'src/constants';
import { AnnotationCategoryType } from 'src/types';

interface Props {
  category: AnnotationCategoryType;
  addFunction: () => void;
  index: number;
}

const CategoryButton = ({ category, addFunction, index }: Props) => (
  <div
    style={{
      background: CategoryColorMap[category],
      cursor: 'pointer',
      padding: 5,
      flexGrow: 1,
    }}
    onMouseUp={addFunction}
  >
    {index + 1}. {category}
  </div>
);

export default CategoryButton;
