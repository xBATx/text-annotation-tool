import renderer from 'react-test-renderer';
import { PopoverContent, CreateRelationPopoverContent } from './PopoverContent';
import React from 'react';

it('PopoverContent renders without crashing', () => {
  const remove = jest.fn();
  const wrapper = renderer
    .create(
      <PopoverContent category={'Category'} color={'blue'} remove={remove} />,
    )
    .toJSON();

  expect(wrapper).toMatchSnapshot();
});

it('CreateRelationPopoverContent renders without crashing', () => {
  const create = jest.fn();
  const wrapper = renderer
    .create(<CreateRelationPopoverContent create={create} />)
    .toJSON();

  expect(wrapper).toMatchSnapshot();
});
