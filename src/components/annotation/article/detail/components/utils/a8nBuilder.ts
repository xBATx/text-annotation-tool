import { Annotation } from 'src/types';

const reverse: <T>(a: T[]) => T[] = (a) => a.slice().reverse();

const byPosition = (A: Annotation, B: Annotation) => A.from - B.from;

export const resolveOverlap = (A: Annotation, B: Annotation): Annotation[] => {
  // [()]
  if (A.from <= B.from && A.to >= B.to) {
    return [];
  }
  // [(])
  if (A.from <= B.from && A.to >= B.from && A.to < B.to) {
    return [{ ...B, from: A.to }];
  }
  // ([)]
  if (B.from <= A.from && B.to >= A.from && B.to < A.to) {
    return [{ ...B, to: A.from }];
  }
  // ([])
  if (B.from <= A.from && B.to >= A.to) {
    return [
      { ...B, to: A.from },
      {
        ...B,
        from: A.to,
        renderingId: `${B.id}[1]`,
      },
    ].filter(({ from, to }) => from - to !== 0);
  } // handles edge cases when inner a8n is on the far right or far left side
  return [B];
};

export const resolveAllOverlaps = (
  otherA8ns: Annotation[],
  upperA8n?: Annotation,
): Annotation[] => {
  if (otherA8ns.length === 0) {
    if (upperA8n) {
      return [upperA8n];
    }
    if (!upperA8n) {
      return [];
    }
  }

  if (!upperA8n) {
    return resolveAllOverlaps(otherA8ns.slice(1), otherA8ns[0]);
  }

  const otherA8nsNoOverlaps = otherA8ns.reduce(
    (annotations: Annotation[], currentAnnotation: Annotation) => [
      ...annotations,
      ...resolveOverlap(upperA8n, currentAnnotation),
    ],
    [],
  );

  return [
    upperA8n,
    ...resolveAllOverlaps(otherA8nsNoOverlaps.slice(1), otherA8nsNoOverlaps[0]),
  ];
};

export const renderAnnotations = (
  text: string,
  a8ns: Annotation[],
  a8nFactory: (a: Annotation) => JSX.Element,
  selectedA8nId: string | null,
): Array<JSX.Element | string> => {
  interface State {
    prev: number;
    toRender: Array<JSX.Element | string>;
  }

  if (!a8ns.length) {
    return [text];
  }

  const isA8nSelected = ({ id }: Annotation) => id === selectedA8nId;
  const a8nsNoOverlap = resolveAllOverlaps([
    // Moving selected annotation to the top
    a8ns.filter(isA8nSelected)[0],
    ...reverse(a8ns.filter((a) => !isA8nSelected(a))),
  ]).sort(byPosition);

  const { prev, toRender } = a8nsNoOverlap.reduce(
    ({ prev: p, toRender: toR }: State, a8n: Annotation) => ({
      prev: a8n.to,
      toRender: [...toR, text.substring(p, a8n.from), a8nFactory(a8n)],
    }),
    { prev: 0, toRender: [] },
  );

  return [...toRender, text.substring(prev)].filter(
    (s) => s.toString().length !== 0,
  );
};
