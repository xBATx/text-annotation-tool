import React from 'react';
import renderer from 'react-test-renderer';
import { Annotation } from './index';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { AnnotationState } from 'src/types';

const annotationState: AnnotationState = {
  text: 'Lorem ipsum dolor sit amet, nominavi rationibus vix in.',
  annotations: [],
  relations: [],
  showRelations: true,
  articleModalState: { isOpened: false, inputText: '' },
  selectedText: null,
  selectedRelation: null,
  selectedAnnotation: null,
  prepareRelationToA8nId: null,
};

it('renders without crashing', () => {
  const mockStore = configureStore();
  const showRelations = true;
  const setShowRelations = jest.fn();
  const wrapper = renderer
    .create(
      <Provider store={mockStore({ annotation: annotationState })}>
        <Annotation
          showRelations={showRelations}
          setShowRelations={setShowRelations}
        />
      </Provider>,
    )
    .toJSON();
  expect(wrapper).toMatchSnapshot();
});
