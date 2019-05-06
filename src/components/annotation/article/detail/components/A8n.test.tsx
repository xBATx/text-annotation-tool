import React from 'react';
import renderer from 'react-test-renderer';
import A8n from './A8n';
import { SampleAnnotation } from 'src/constants';

it('A8n renders without crashing not selected', () => {
  const onClick = jest.fn();
  const remove = jest.fn();
  const wrapper = renderer
    .create(
      <A8n
        popoverBody={null}
        annotation={SampleAnnotation}
        onClick={onClick}
        selected={false}
      >
        Text
      </A8n>,
    )
    .toJSON();

  expect(wrapper).toMatchSnapshot();
});
