import React, { RefObject } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
// @ts-ignore
import Popover from 'react-text-selection-popover';
import { AllA8nCategories } from 'src/constants';
import { AddAnnotation, SelectText } from 'src/actions';
import CategoryButton from './CategoryButton';
import {
  Annotation as AnnotationType,
  Annotation,
  AppState,
  AnnotationCategoryType,
  SelectedText,
} from 'src/types';
import {
  getSelectedTextValues,
  clearSelection,
  clickedOutsideOfPopover,
} from './utils/textSelectionBrowserOps';

interface Props {
  addAnnotation: (a: Annotation) => void;
  selectText: (s: SelectedText | null) => void;
  selectedText: SelectedText | null;
  textLength: number;
}

export class HighlightedTextSelector extends React.Component<Props> {
  private readonly ref: RefObject<HTMLDivElement>;
  constructor(props: Props) {
    super(props);
    this.ref = React.createRef<HTMLDivElement>();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleMouseDown);
    document.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleMouseDown);
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = ({ key }: KeyboardEvent) => {
    if (key === 'Escape' || key === 'Backspace') {
      return this.deselectText();
    }
    const num = parseInt(key, 10);
    if (Number.isInteger(num) && num > 0 && num <= AllA8nCategories.length) {
      this.addAnnotation(AllA8nCategories[num - 1]);
    }
  };

  deselectText = () => {
    const { selectedText, selectText } = this.props;
    if (selectedText) {
      clearSelection();
      selectText(null);
    }
  };

  handleMouseDown = (e: Event): void => {
    const { selectedText } = this.props;
    if (
      selectedText &&
      clickedOutsideOfPopover(document, e.target, 'annotation-popover')
    ) {
      this.deselectText();
    }
  };

  handleMouseUp = (e: Event): void => {
    if (clickedOutsideOfPopover(document, e.target, 'annotation-popover')) {
      const { textLength } = this.props;
      const v = getSelectedTextValues(document, 'article-text-content');
      if (
        v.from >= 0 &&
        v.to >= 0 &&
        v.to <= textLength &&
        v.from <= textLength &&
        v.text.length > 0
      ) {
        this.props.selectText(v);
      }
    }
  };

  addAnnotation = (c: AnnotationCategoryType): any => {
    const { selectedText } = this.props;
    return (
      selectedText &&
      selectedText.text.length > 0 &&
      this.props.addAnnotation({
        ...selectedText,
        category: c,
        id: `${selectedText.from}:${selectedText.to}:${c}`,
        renderingId: `${selectedText.from}:${selectedText.to}:${c}`,
      })
    );
  };

  render() {
    const { children, selectedText } = this.props;
    return (
      <>
        <div
          ref={this.ref}
          id="article-text-content"
          style={{ paddingBottom: '70px' }}
        >
          {children}
        </div>
        <Popover
          selectionRef={this.ref}
          isOpen={selectedText !== null && selectedText.text.length > 0}
          zIndex={3}
        >
          <div
            id="annotation-popover"
            style={{
              width: '100%',
              display: 'flex',
              border: '2px solid black',
            }}
          >
            {AllA8nCategories.map((c, i) => (
              <CategoryButton
                key={c}
                category={c}
                index={i}
                addFunction={() => this.addAnnotation(c)}
              />
            ))}
          </div>
        </Popover>
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    selectedText: state.annotation.selectedText,
    textLength: state.annotation.text.length,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addAnnotation: (annotation: AnnotationType) =>
      dispatch(AddAnnotation(annotation)),
    selectText: (text: SelectedText | null) => dispatch(SelectText(text)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HighlightedTextSelector);
