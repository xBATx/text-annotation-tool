import React from 'react';
import renderer from 'react-test-renderer';
import { HighlightedTextSelector } from './HighlightedTextSelector';
import { Annotation as AnnotationType, SelectedText } from 'src/types';

it('renders without crashing', () => {
  const addAnnotation = jest.fn<AnnotationType>();
  const selectText = jest.fn<SelectedText>();
  const scrollingStarted = jest.fn();
  const scrollingStopped = jest.fn();
  const selectedText = null;
  const wrapper = renderer
    .create(
      <HighlightedTextSelector
        {...{
          selectText,
          addAnnotation,
          selectedText,
          scrollingStarted,
          scrollingStopped,
          isScrolling: false,
        }}
      />,
    )
    .toJSON();

  expect(wrapper).toMatchSnapshot();
});
