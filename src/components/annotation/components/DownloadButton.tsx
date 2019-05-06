import React from 'react';
import { Annotation, AppState, Relation } from 'src/types';
import { connect } from 'react-redux';

interface Props {
  annotations: Annotation[];
  relations: Relation[];
  text: string;
}

const toDownloadJSONLink = (
  a8ns: Annotation[],
  rels: Relation[],
  text: string,
) =>
  `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify({
      annotations: a8ns.map(({ renderingId, ...rest }) => rest),
      relations: rels,
      text,
    }),
  )}`;

export const DownloadButton = ({ annotations, relations, text }: Props) => (
  <a
    style={{
      color: 'white',
      padding: 5,
    }}
    href={toDownloadJSONLink(annotations, relations, text)}
    download="annotations.json"
  >
    Download annotations
  </a>
);

const mapStateToProps = (state: AppState) => {
  return {
    annotations: state.annotation.annotations,
    relations: state.annotation.relations,
    text: state.annotation.text,
  };
};

export default connect(mapStateToProps)(DownloadButton);
