import React from 'react';
import Header from 'src/components/header';
import ArticleDetail from './article/detail';
import DownloadButton from './components/DownloadButton';
import SetArticleButton from './components/SetArticleButton';
import SetArticleModal from './components/SetArticleModal';
import { AppState } from 'src/types';
import { Dispatch } from 'redux';
import { SetShowRelations } from 'src/actions';
import { connect } from 'react-redux';

const ActionPanel = () => (
  <div>
    <DownloadButton />
    <SetArticleButton />
  </div>
);

interface Props {
  showRelations: boolean;
  setShowRelations: (show: boolean) => void;
}

export const Annotation = ({ showRelations, setShowRelations }: Props) => (
  <Header title="Annotation tool" actionsPanel={<ActionPanel />}>
    <div
      style={{
        height: 60,
        width: '100%',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <label
        style={{
          paddingTop: 20,
          right: '20px',
          position: 'absolute',
        }}
      >
        <input
          type="checkbox"
          checked={showRelations}
          onChange={() => setShowRelations(!showRelations)}
        />
        Show relations
      </label>
    </div>
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <SetArticleModal />
      <ArticleDetail />
    </div>
  </Header>
);

const mapStateToProps = (state: AppState) => {
  return {
    showRelations: state.annotation.showRelations,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setShowRelations: (show: boolean) => dispatch(SetShowRelations(show)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Annotation);
