import { AppActions } from 'src/actions';
import {
  SUBMIT_ARTICLE_MODAL,
  ADD_ANNOTATION,
  SELECT_TEXT,
  RESET_SELECTION,
  REMOVE_SELECTED_ELEMENT,
  SET_ARTICLE_MODAL_OPENED,
  SELECT_ANNOTATION,
  SampleText,
  SET_ARTICLE_MODAL_TEXT,
  SELECT_RELATION,
  PREPARE_RELATION,
  ADD_RELATION,
  SET_SHOW_RELATIONS,
} from 'src/constants';
import { Annotation, AnnotationState } from 'src/types';

const initialModalState = {
  isOpened: false,
  inputText: '{"text": "", "annotations": [], "relations": []}',
};

export const initialState: AnnotationState = {
  text: SampleText,
  annotations: [],
  relations: [],
  showRelations: true,
  selectedText: null,
  selectedAnnotation: null,
  prepareRelationToA8nId: null,
  selectedRelation: null,
  articleModalState: initialModalState,
};

const validateAnnotation = ({ from, to }: Annotation): boolean => {
  if (from > to) {
    console.error(// tslint:disable-line
      `Something went wrong, from index [${from}] is greater then to index [${to}].`,
    );
    return false;
  }
  return true;
};

const deviceDetailState = (
  state: AnnotationState,
  action: AppActions,
): AnnotationState => {
  switch (action.type) {
    case SELECT_TEXT:
      return {
        ...state,
        selectedText: !state.articleModalState.isOpened
          ? action.selectedText
          : null,
        selectedAnnotation: null,
      };
    case ADD_ANNOTATION:
      return validateAnnotation(action.annotation)
        ? {
            ...state,
            annotations: [
              ...state.annotations.filter(
                // Avoid duplicated annotations
                ({ id }) => id !== action.annotation.id,
              ),
              action.annotation,
            ],
            selectedText: null,
            selectedAnnotation: null,
          }
        : state;
    case RESET_SELECTION:
      return {
        ...state,
        prepareRelationToA8nId: null,
        selectedAnnotation: null,
        selectedRelation: null,
      };
    case REMOVE_SELECTED_ELEMENT:
      const {
        selectedAnnotation,
        annotations,
        relations,
        selectedRelation,
      } = state;

      return {
        ...state,
        selectedAnnotation: null,
        selectedRelation: null,
        annotations: annotations.filter(({ id }) => id !== selectedAnnotation),
        relations: relations
          .filter(({ id }) => !selectedRelation || id !== selectedRelation.id)
          // remove also relations connected to removed a8n
          .filter(
            ({ from, to }) =>
              from !== selectedAnnotation && to !== selectedAnnotation,
          ),
      };
    case SELECT_ANNOTATION:
      return {
        ...state,
        selectedRelation: null,
        selectedAnnotation: !state.selectedText ? action.id : null,
      };
    case PREPARE_RELATION:
      return {
        ...state,
        prepareRelationToA8nId: action.toA8nId,
      };
    case ADD_RELATION:
      return {
        ...state,
        relations:
          state.relations.filter(
            ({ from, to }) =>
              // Only one relation allowed between 2 annotations
              (from === action.relation.from && to === action.relation.to) ||
              (from === action.relation.to && to === action.relation.from),
          ).length !== 0
            ? state.relations
            : [...state.relations, action.relation],
        selectedAnnotation: null,
        selectedRelation: null,
        prepareRelationToA8nId: null,
      };
    case SELECT_RELATION:
      return {
        ...state,
        selectedAnnotation: null,
        selectedRelation:
          state.relations.filter(({ id }) => id === action.id)[0] || null,
      };
    case SET_SHOW_RELATIONS:
      return {
        ...state,
        selectedRelation: null,
        prepareRelationToA8nId: null,
        showRelations: action.show,
      };
    case SET_ARTICLE_MODAL_OPENED:
      return {
        ...state,
        prepareRelationToA8nId: null,
        articleModalState: { ...initialModalState, isOpened: action.opened },
      };
    case SET_ARTICLE_MODAL_TEXT:
      return {
        ...state,
        articleModalState: {
          ...state.articleModalState,
          inputText: action.text,
        },
      };
    case SUBMIT_ARTICLE_MODAL:
      return {
        ...state,
        selectedText: null,
        selectedAnnotation: null,
        selectedRelation: null,
        articleModalState: { ...initialModalState, isOpened: false },
        showRelations: true,
        text: action.text,
        annotations: action.annotations,
        relations: action.relations,
      };
    default:
      return state;
  }
};

export default deviceDetailState;
