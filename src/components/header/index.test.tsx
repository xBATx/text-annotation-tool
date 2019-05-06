import React from 'react';
import renderer from 'react-test-renderer';
import Header from './index';

it('renders without crashing', () => {
  const wrapper = renderer
    .create(<Header title="Hello title">Hello I'm child</Header>)
    .toJSON();
  expect(wrapper).toMatchSnapshot();
});
