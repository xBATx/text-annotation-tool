import React from 'react';

interface Props {
  title: string;
  actionsPanel?: React.ReactNode;
  children: React.ReactNode;
}

export default ({ title, children, actionsPanel }: Props) => (
  <>
    <div
      style={{
        width: '100%',
        height: 60,
        backgroundColor: 'blue',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
        zIndex: 4,
      }}
    >
      <div style={{ color: 'white', left: '50%', position: 'absolute' }}>
        {title}
      </div>
      {actionsPanel && (
        <div style={{ right: '5px', position: 'absolute' }}>{actionsPanel}</div>
      )}
    </div>
    {children}
  </>
);
