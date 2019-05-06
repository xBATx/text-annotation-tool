import React from 'react';
import renderer from 'react-test-renderer';
import CategoryButton from './CategoryButton';
import { FIRST_NAME } from 'src/constants';

it('renders without crashing', () => {
  const addFunction = jest.fn();
  const wrapper = renderer
    .create(
      <CategoryButton
        category={FIRST_NAME}
        addFunction={addFunction}
        index={0}
      />,
    )
    .toJSON();

  expect(wrapper).toMatchSnapshot();
});
