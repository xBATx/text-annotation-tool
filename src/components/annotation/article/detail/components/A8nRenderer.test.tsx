import React from 'react';
import renderer from 'react-test-renderer';
import { A8nRenderer } from './A8nRenderer';
import { SampleAnnotation, SampleRelation } from 'src/constants';

const props = {
  text: 'Lorem ipsum dolor',
  annotations: [SampleAnnotation],
  relations: [SampleRelation],
  selectA8n: jest.fn(),
  removeSelectedElement: jest.fn(),
  resetSelection: jest.fn(),
  addRelation: jest.fn(),
  prepareRelation: jest.fn(),
  selectRelation: jest.fn(),
  selectedA8n: null,
  selectedRelation: null,
  prepareRelationToA8n: null,
};

it('renders without crashing', () => {
  const wrapper = renderer.create(<A8nRenderer {...props} />).toJSON();
  expect(wrapper).toMatchSnapshot();
});

it('renders without crashing with new lines', () => {
  const text = 'Lorem ipsum dolor\n\n\n sunset beach';
  const annotations = [
    SampleAnnotation,
    {
      ...SampleAnnotation,
      from: 21,
      to: 27,
      text: 'sunset',
      id: '1:4:FULL_NAME',
      renderingId: '1:4:FULL_NAME',
    },
  ];
  const wrapper = renderer
    .create(<A8nRenderer {...{ ...props, text, annotations }} />)
    .toJSON();
  expect(wrapper).toMatchSnapshot();
});
