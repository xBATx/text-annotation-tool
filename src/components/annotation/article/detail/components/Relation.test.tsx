import React from 'react';
import renderer from 'react-test-renderer';
import Relation from './Relation';
import { SampleRelation } from 'src/constants';

it('Relation renders without crashing', () => {
  // TODO this is null because it needs HTML element rendered
  // considering removing this
  const onClick = jest.fn();
  const wrapper = renderer
    .create(
      <Relation relation={SampleRelation} onClick={onClick} selected={false} />,
    )
    .toJSON();

  expect(wrapper).toMatchSnapshot();
});
