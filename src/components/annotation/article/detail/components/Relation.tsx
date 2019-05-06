import React from 'react';
// @ts-ignore
import { SteppedLineTo } from 'react-lineto';
import { Relation as RelationType } from 'src/types';
import { SelectedRelationColor, RelationColorMap } from 'src/constants';

interface Props {
  relation: RelationType;
  selected: boolean;
  onClick: (e: Event) => void;
}

class Relation extends React.Component<Props> {
  componentDidMount() {
    document.addEventListener('click', this.onClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClick);
  }

  onClick = (e: Event): void => {
    const {
      relation: { id },
      onClick,
    } = this.props;
    const target = e.target as HTMLElement;
    const className = target.getAttribute('class') || '';
    if (className.indexOf(id) === 0) {
      return onClick(e);
    }
  };

  render() {
    const {
      relation: { id, from, to, category },
      selected,
    } = this.props;
    return (
      <SteppedLineTo
        className={`${id} cursor-pointer`}
        from={from}
        to={to}
        borderStyle={selected ? 'dashed' : 'solid'}
        borderWidth={6}
        borderColor={
          selected ? SelectedRelationColor : RelationColorMap[category]
        }
        padding={10}
        zIndex={selected ? 3 : 0}
        delay={100}
      />
    );
  }
}

export default Relation;
