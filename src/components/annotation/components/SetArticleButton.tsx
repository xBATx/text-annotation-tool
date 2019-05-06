import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { SetArticleModalOpened } from 'src/actions';

interface Props {
  openModal: () => void;
}

export const SetArticleButton = ({ openModal }: Props) => (
  <span
    style={{
      color: 'white',
      cursor: 'pointer',
      padding: 5,
      textDecoration: 'underline',
    }}
    onClick={openModal}
  >
    New article
  </span>
);

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openModal: () => dispatch(SetArticleModalOpened(true)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(SetArticleButton);
