import React from 'react';
import { Annotation, AppState, Relation as RelationType } from 'src/types';
import { connect } from 'react-redux';
import {
  AddRelation,
  PrepareRelation,
  RemoveSelectedElement,
  ResetSelection,
  SelectAnnotation,
  SelectRelation,
} from 'src/actions';
import { Dispatch } from 'redux';
import A8n from './A8n';
import Relation from './Relation';
import { getPopoverContent } from './PopoverContent';
import { renderAnnotations } from './utils/a8nBuilder';

interface Props {
  text: string;
  annotations: Annotation[];
  relations: RelationType[];
  removeSelectedElement: () => void;
  resetSelection: () => void;
  selectedA8n: string | null;
  prepareRelationToA8n: string | null;
  selectedRelation: RelationType | null;
  selectA8n: (id: string | null) => void;
  prepareRelation: (id: string | null) => void;
  addRelation: (relation: RelationType) => void;
  selectRelation: (id: string | null) => void;
}

export class A8nRenderer extends React.Component<Props> {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = ({ key }: KeyboardEvent) => {
    const { removeSelectedElement, resetSelection } = this.props;
    if (key === 'Escape') {
      resetSelection();
    }
    if (key === 'Backspace') {
      removeSelectedElement();
    }
  };

  render() {
    const {
      text,
      annotations,
      relations,
      selectedA8n,
      selectedRelation,
      prepareRelationToA8n,
      resetSelection,
      removeSelectedElement,
      selectA8n,
      prepareRelation,
      addRelation,
      selectRelation,
    } = this.props;
    return (
      <div
        onClick={resetSelection}
        style={{ whiteSpace: 'pre-wrap', height: '100%', width: 900 }}
      >
        {renderAnnotations(
          text,
          annotations,
          (a8n: Annotation) => (
            <A8n
              key={a8n.renderingId}
              annotation={a8n}
              selected={
                a8n.id === selectedA8n ||
                a8n.id === prepareRelationToA8n ||
                (selectedRelation != null &&
                  (a8n.id === selectedRelation.from ||
                    a8n.id === selectedRelation.to))
              }
              popoverBody={getPopoverContent(
                a8n,
                selectedA8n || null,
                removeSelectedElement,
                addRelation,
                prepareRelationToA8n || null,
                selectedRelation || null,
              )}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                if (
                  selectedA8n &&
                  selectedA8n !== a8n.id &&
                  (e.altKey || e.ctrlKey || e.metaKey)
                ) {
                  const to = a8n.id;
                  return prepareRelation(to);
                }
                return selectA8n(a8n.id);
              }}
            >
              {text.substring(a8n.from, a8n.to)}
            </A8n>
          ),
          selectedA8n,
        )}
        {relations.map((r: RelationType) => (
          <Relation
            key={r.id}
            relation={r}
            selected={selectedRelation !== null && r.id === selectedRelation.id}
            onClick={(e: Event) => {
              e.stopPropagation();
              return selectRelation(r.id);
            }}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  const {
    text,
    annotations,
    showRelations,
    relations,
    selectedAnnotation,
    prepareRelationToA8nId,
    selectedRelation,
  } = state.annotation;
  return {
    text,
    annotations,
    relations: showRelations ? relations : [],
    selectedA8n: selectedAnnotation,
    prepareRelationToA8n: prepareRelationToA8nId,
    selectedRelation,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    selectA8n: (id: string | null) => dispatch(SelectAnnotation(id)),
    removeSelectedElement: () => dispatch(RemoveSelectedElement),
    resetSelection: () => dispatch(ResetSelection),
    prepareRelation: (id: string | null) => dispatch(PrepareRelation(id)),
    addRelation: (relation: RelationType) => dispatch(AddRelation(relation)),
    selectRelation: (id: string | null) => dispatch(SelectRelation(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(A8nRenderer);
