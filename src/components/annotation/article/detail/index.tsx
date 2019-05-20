import React from 'react';
import HighlightedTextSelector from './components/HighlightedTextSelector';
import AnnotationRenderer from './components/A8nRenderer';
import './components/opacity-with-cursor-pointer.css';

export const ArticleDetail = () => (
  <HighlightedTextSelector>
    <AnnotationRenderer />
  </HighlightedTextSelector>
);

export default ArticleDetail;
