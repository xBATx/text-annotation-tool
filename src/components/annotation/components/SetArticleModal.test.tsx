import React from 'react';
import renderer from 'react-test-renderer';
import { SetArticleModal } from './SetArticleModal';
import { ArticleModalState } from 'src/types';

it('renders without crashing', () => {
  const modalState: ArticleModalState = {
    isOpened: false,
    inputText: '',
  };
  const wrapper = renderer
    .create(
      <SetArticleModal
        modalState={modalState}
        closeModal={jest.fn()}
        submitModal={jest.fn()}
        setInputText={jest.fn()}
      />,
    )
    .toJSON();

  expect(wrapper).toMatchSnapshot();
});
