import React from 'react';
import renderer from 'react-test-renderer';
import { DownloadButton } from './DownloadButton';
import { FULL_NAME, SampleAnnotation, SampleRelation } from 'src/constants';
import { Annotation, Relation } from 'src/types';

it('renders without crashing', () => {
  const annotations: Annotation[] = [SampleAnnotation];
  const relations: Relation[] = [SampleRelation];
  const wrapper = renderer
    .create(
      <DownloadButton {...{ annotations, relations, text: 'Hello Text' }} />,
    )
    .toJSON();

  expect(wrapper).toMatchSnapshot();
});
