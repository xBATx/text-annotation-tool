import { Action } from 'redux';
import {
  SUBMIT_ARTICLE_MODAL,
  ADD_ANNOTATION,
  SELECT_TEXT,
  REMOVE_SELECTED_ELEMENT,
  RESET_SELECTION,
  SELECT_ANNOTATION,
  SET_ARTICLE_MODAL_OPENED,
  SET_ARTICLE_MODAL_TEXT,
  ADD_RELATION,
  SELECT_RELATION,
  SET_SHOW_RELATIONS,
  PREPARE_RELATION,
} from 'src/constants';
import { Annotation, Relation, SelectedText } from 'src/types';

// Action types

interface SelectTextType extends Action {
  type: typeof SELECT_TEXT;
  selectedText: SelectedText | null;
}

interface RemoveSelectedElementType extends Action {
  type: typeof REMOVE_SELECTED_ELEMENT;
}
interface ResetSelectionType extends Action {
  type: typeof RESET_SELECTION;
}

interface AddAnnotationType extends Action {
  type: typeof ADD_ANNOTATION;
  annotation: Annotation;
}
interface SelectAnnotationType extends Action {
  type: typeof SELECT_ANNOTATION;
  id: string | null;
}

interface PrepareRelationType extends Action {
  type: typeof PREPARE_RELATION;
  toA8nId: string | null;
}
interface AddRelationType extends Action {
  type: typeof ADD_RELATION;
  relation: Relation;
}
interface SelectRelationType extends Action {
  type: typeof SELECT_RELATION;
  id: string | null;
}
interface SetShowRelationsType extends Action {
  type: typeof SET_SHOW_RELATIONS;
  show: boolean;
}

// Article modal action types
interface SetArticleModalOpenedType extends Action {
  type: typeof SET_ARTICLE_MODAL_OPENED;
  opened: boolean;
}
interface SetArticleModalTextType extends Action {
  type: typeof SET_ARTICLE_MODAL_TEXT;
  text: string;
}
interface SubmitArticleModalType extends Action {
  type: typeof SUBMIT_ARTICLE_MODAL;
  text: string;
  annotations: Annotation[];
  relations: Relation[];
}

// Action factories

export const SelectText = (
  selectedText: SelectedText | null,
): SelectTextType => ({
  type: SELECT_TEXT,
  selectedText,
});
export const RemoveSelectedElement: RemoveSelectedElementType = {
  type: REMOVE_SELECTED_ELEMENT,
};
export const ResetSelection: ResetSelectionType = {
  type: RESET_SELECTION,
};

export const AddAnnotation = (annotation: Annotation): AddAnnotationType => ({
  type: ADD_ANNOTATION,
  annotation,
});
export const SelectAnnotation = (id: string | null): SelectAnnotationType => ({
  type: SELECT_ANNOTATION,
  id,
});

export const PrepareRelation = (
  toA8nId: string | null,
): PrepareRelationType => ({
  type: PREPARE_RELATION,
  toA8nId,
});
export const AddRelation = (relation: Relation): AddRelationType => ({
  type: ADD_RELATION,
  relation,
});
export const SelectRelation = (id: string | null): SelectRelationType => ({
  type: SELECT_RELATION,
  id,
});
export const SetShowRelations = (show: boolean): SetShowRelationsType => ({
  type: SET_SHOW_RELATIONS,
  show,
});

// Add article modal actions
export const SetArticleModalOpened = (
  opened: boolean,
): SetArticleModalOpenedType => ({
  type: SET_ARTICLE_MODAL_OPENED,
  opened,
});
export const SetArticleInput = (text: string): SetArticleModalTextType => ({
  type: SET_ARTICLE_MODAL_TEXT,
  text,
});
export const SubmitArticleModal = (
  text: string,
  annotations: Annotation[],
  relations: Relation[],
): SubmitArticleModalType => ({
  type: SUBMIT_ARTICLE_MODAL,
  text,
  annotations,
  relations,
});

export type AppActions =
  | SelectTextType
  | RemoveSelectedElementType
  | ResetSelectionType
  | AddAnnotationType
  | SelectAnnotationType
  | PrepareRelationType
  | AddRelationType
  | SelectRelationType
  | SetShowRelationsType
  | SetArticleModalOpenedType
  | SetArticleModalTextType
  | SubmitArticleModalType;
