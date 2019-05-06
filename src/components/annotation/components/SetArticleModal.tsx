import React from 'react';
import Modal from 'react-modal';
import {
  Decoder,
  object,
  string,
  array,
  number,
  constant,
  oneOf,
} from '@mojotech/json-type-validation';
import { Annotation, Relation, AppState, ArticleModalState } from 'src/types';
import { AllA8nCategories, AllRelationCategories } from 'src/constants';
import { Dispatch } from 'redux';
import {
  SubmitArticleModal,
  SetArticleModalOpened,
  SetArticleInput,
} from 'src/actions';
import { connect } from 'react-redux';

interface Props {
  modalState: ArticleModalState;
  closeModal: () => void;
  submitModal: (
    text: string,
    annotations: Annotation[],
    relations: Relation[],
  ) => void;
  setInputText: (text: string) => void;
}

// @ts-ignore because of union type
const AnnotationDecoder: Decoder<Annotation[]> = object({
  id: string(),
  from: number(),
  to: number(),
  category: oneOf(...AllA8nCategories.map((c) => constant(c))),
  text: string(),
});

// @ts-ignore because of union type
const RelationsDecoder: Decoder<Relation[]> = object({
  id: string(),
  from: string(),
  to: string(),
  category: oneOf(...AllRelationCategories.map((c) => constant(c))),
});

interface EntryType {
  text: string;
  annotations: Annotation[];
  relations: Relation[];
}

// @ts-ignore
const EntryDecoder: Decoder<EntryType> = object({
  text: string(),
  annotations: array(AnnotationDecoder),
  relations: array(RelationsDecoder),
});

const isHTML = (str: string) => {
  const doc = new DOMParser().parseFromString(str, 'text/html');
  return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1);
};

const validateInputJson = (str: string) => {
  try {
    const json: EntryType = JSON.parse(str);
    EntryDecoder.runWithException(json);
    return !isHTML(json.text);
  } catch (e) {
    return false;
  }
};

const ErrorMessage = () => (
  <div style={{ color: 'red' }}>
    <p>Input JSON invalid:</p>
    <p>- Entered text cannot contain HTML tags</p>
    <p>- Annotations must be of type: </p>
    <p>
      {`{"id": str, "from": num, "to": num, "text": str, "category": ${JSON.stringify(
        AllA8nCategories,
      )}}`}
    </p>
    <p>- Relations must be of type: </p>
    <p>
      {`{"id": str, "from": str, "to": str, "category": ${JSON.stringify(
        AllRelationCategories,
      )}`}
    </p>
  </div>
);

const isJSON = (text: string) => text.charAt(0) === '{';

export const SetArticleModal = ({
  modalState: { isOpened, inputText },
  setInputText,
  closeModal,
  submitModal,
}: Props) => {
  const isJson = isJSON(inputText);
  const isInputValid = isJson
    ? validateInputJson(inputText)
    : !isHTML(inputText);

  return (
    <Modal
      isOpen={isOpened}
      onRequestClose={closeModal}
      contentLabel="New article"
      ariaHideApp={false}
      style={{
        overlay: { zIndex: 5 },
        content: {
          border: '2px solid black',
          borderRadius: '10px',
          bottom: 'auto',
          height: 600,
          position: 'relative',
          left: '30%',
          padding: '2rem',
          right: 'auto',
          width: '40%',
          maxWidth: '40rem',
        },
      }}
    >
      <div style={{ width: '100%', textAlign: 'center', paddingBottom: 30 }}>
        Entering new article will discard current article and its annotations
      </div>
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={(e) => {
          e.preventDefault();
          if (isInputValid) {
            const entryObj: EntryType = isJson
              ? JSON.parse(inputText)
              : { text: inputText, annotations: [], relations: [] };
            submitModal(
              entryObj.text,
              entryObj.annotations.map((a) => ({ ...a, renderingId: a.id })),
              entryObj.relations,
            );
          }
        }}
      >
        <label>
          Enter exported data or raw text here:
          <textarea
            style={{ width: '100%', height: 250 }}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          {!isInputValid && <ErrorMessage />}
        </label>
        <div
          style={{
            paddingTop: '20px',
            width: '100%',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <button disabled={!isInputValid} type="submit">
            Submit
          </button>
          <button onClick={closeModal}>Close</button>
        </div>
      </form>
    </Modal>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    modalState: state.annotation.articleModalState,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setInputText: (text: string) => dispatch(SetArticleInput(text)),
    submitModal: (text: string, a8ns: Annotation[], relations: Relation[]) =>
      dispatch(SubmitArticleModal(text, a8ns, relations)),
    closeModal: () => dispatch(SetArticleModalOpened(false)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SetArticleModal);
