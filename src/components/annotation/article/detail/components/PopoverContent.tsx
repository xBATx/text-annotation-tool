import React from 'react';
import { Annotation, Relation, RelationCategoryType } from 'src/types';
import {
  AllRelationCategories,
  CategoryColorMap,
  RelationColorMap,
} from 'src/constants';

interface Props {
  category: string;
  remove: () => void;
  color?: string;
  textColor?: string;
}

export const PopoverContent = ({
  category,
  remove,
  color = 'black',
  textColor = 'white',
}: Props) => (
  <div
    style={{
      backgroundColor: color,
      border: '2px solid black',
      display: 'flex',
    }}
  >
    <span style={{ padding: 5, color: textColor }}>{category}</span>
    <button onClick={remove}>X</button>
  </div>
);

export class CreateRelationPopoverContent extends React.Component<{
  create: (category: RelationCategoryType) => void;
}> {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = ({ key }: KeyboardEvent) => {
    const { create } = this.props;
    const num = parseInt(key, 10);
    if (
      Number.isInteger(num) &&
      num > 0 &&
      num <= AllRelationCategories.length
    ) {
      create(AllRelationCategories[num - 1]);
    }
  };

  render() {
    const { create } = this.props;
    return (
      <div
        style={{
          backgroundColor: 'black',
          border: '2px solid black',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {AllRelationCategories.map((c, i) => (
          <div
            key={c}
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <span style={{ padding: 5, color: 'white' }}>
              {i + 1}. {c}
            </span>
            <button onClick={() => create(c)}>+</button>
          </div>
        ))}
      </div>
    );
  }
}

// There are 3 types of popover:
// - Annotation detail popover
// - Relation detail popover
// - Relation construction popover
export const getPopoverContent = (
  a8n: Annotation,
  selectedA8n: string | null,
  remove: () => void,
  addRelation: (r: Relation) => void,
  prepareRelationToA8n: string | null,
  selectedRelation: Relation | null,
): JSX.Element | null => {
  if (a8n.id === selectedA8n) {
    return (
      <PopoverContent
        category={a8n.category}
        remove={remove}
        color={CategoryColorMap[a8n.category]}
        textColor="black"
      />
    );
  }
  if (selectedA8n && a8n.id === prepareRelationToA8n) {
    return (
      <CreateRelationPopoverContent
        create={(c: RelationCategoryType) =>
          addRelation({
            id: `${selectedA8n}->${prepareRelationToA8n}`,
            from: selectedA8n,
            to: prepareRelationToA8n,
            category: c,
          })
        }
      />
    );
  }
  if (selectedRelation && a8n.id === selectedRelation.to) {
    return (
      <PopoverContent
        category={selectedRelation.category}
        remove={remove}
        color={RelationColorMap[selectedRelation.category]}
      />
    );
  }
  return null;
};
