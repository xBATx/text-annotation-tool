import { AllRelationCategories, AllA8nCategories } from 'src/constants';

export type AnnotationCategoryType = typeof AllA8nCategories[number];

export type RelationCategoryType = typeof AllRelationCategories[number];

export interface SelectedText {
  from: number;
  to: number;
  text: string;
}

export interface Annotation {
  id: string;
  renderingId: string;
  from: number;
  to: number;
  category: AnnotationCategoryType;
  text: string;
}

export interface Relation {
  id: string;
  from: string;
  to: string;
  category: RelationCategoryType;
}

export interface ArticleModalState {
  isOpened: boolean;
  inputText: string;
}

export interface AnnotationState {
  text: string;
  annotations: Annotation[];
  relations: Relation[];
  showRelations: boolean;
  selectedText: SelectedText | null;
  selectedAnnotation: string | null;
  prepareRelationToA8nId: string | null;
  selectedRelation: Relation | null;
  articleModalState: ArticleModalState;
}

export interface AppState {
  annotation: AnnotationState;
}
