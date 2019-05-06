import React from 'react';
import renderer from 'react-test-renderer';
import { SetArticleButton } from './SetArticleButton';

it('renders without crashing', () => {
  const wrapper = renderer
    .create(<SetArticleButton openModal={jest.fn} />)
    .toJSON();

  expect(wrapper).toMatchSnapshot();
});
