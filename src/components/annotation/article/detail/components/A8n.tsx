import { Annotation } from 'src/types';
import { CategoryColorMap, SelectedAnnotationColor } from 'src/constants';
import React from 'react';
import Popover from 'react-popover';

interface Props {
  annotation: Annotation;
  children: string;
  selected: boolean;
  popoverBody: JSX.Element | null;
  onClick: (e: React.MouseEvent) => void;
}

const A8n = ({
  annotation,
  children,
  onClick,
  selected,
  popoverBody,
}: Props) => (
  <Popover
    style={{ zIndex: 3 }}
    isOpen={popoverBody !== null}
    body={popoverBody || <div />}
  >
    <span
      id={annotation.renderingId}
      className={annotation.renderingId}
      onClick={onClick}
      style={{
        borderRadius: '2px',
        padding: '2px',
        backgroundColor: selected
          ? SelectedAnnotationColor
          : CategoryColorMap[annotation.category],
        cursor: 'pointer',
      }}
    >
      {children}
    </span>
  </Popover>
);

export default A8n;
