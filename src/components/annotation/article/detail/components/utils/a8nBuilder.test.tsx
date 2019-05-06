import React from 'react';
import { Annotation as AnnotationType } from 'src/types';
import { SampleAnnotation } from 'src/constants';
import {
  renderAnnotations,
  resolveAllOverlaps,
  resolveOverlap,
} from './a8nBuilder';

const a8n = (from: number, to: number): AnnotationType => ({
  ...SampleAnnotation,
  from,
  to,
  id: `${from}:${to}:${SampleAnnotation.category}`,
  renderingId: `${from}:${to}:${SampleAnnotation.category}`,
});

const overrideIds = (
  a: AnnotationType,
  id: string,
  renderingId?: string,
): AnnotationType => ({ ...a, id, renderingId: renderingId || id });

const BisInA = [a8n(0, 10), a8n(2, 8)];
const AisInB = [a8n(2, 8), a8n(0, 10)];
const AisBeforeB = [a8n(0, 10), a8n(8, 12)];
const BisBeforeA = [a8n(8, 12), a8n(0, 10)];

it('resolve overlap of two a8ns should behave correctly', () => {
  const resolve = ([A, B]: AnnotationType[]) => resolveOverlap(A, B);

  expect(resolve(BisInA)).toEqual([]);
  expect(resolve(AisBeforeB)).toEqual([
    overrideIds(a8n(10, 12), '8:12:FULL_NAME'),
  ]);
  expect(resolve(BisBeforeA)).toEqual([
    overrideIds(a8n(0, 8), '0:10:FULL_NAME'),
  ]);
  expect(resolve(AisInB)).toEqual([
    overrideIds(a8n(0, 2), '0:10:FULL_NAME'),
    overrideIds(a8n(8, 10), '0:10:FULL_NAME', '0:10:FULL_NAME[1]'),
  ]);
});

it('resolve all overlaps should behave correctly', () => {
  expect(resolveAllOverlaps([])).toEqual([]);
  expect(resolveAllOverlaps([], a8n(0, 10))).toEqual([a8n(0, 10)]);
  expect(resolveAllOverlaps(BisInA)).toEqual([a8n(0, 10)]);
  expect(resolveAllOverlaps(AisInB)).toEqual([
    a8n(2, 8),
    overrideIds(a8n(0, 2), '0:10:FULL_NAME'),
    overrideIds(a8n(8, 10), '0:10:FULL_NAME', '0:10:FULL_NAME[1]'),
  ]);
  expect(resolveAllOverlaps(AisBeforeB)).toEqual([
    a8n(0, 10),
    overrideIds(a8n(10, 12), '8:12:FULL_NAME'),
  ]);
  expect(resolveAllOverlaps(BisBeforeA)).toEqual([
    a8n(8, 12),
    overrideIds(a8n(0, 8), '0:10:FULL_NAME'),
  ]);
});

it('render annotations should behave correctly', () => {
  const sampleText = '0123456789abcd';
  const annotationFactory = ({ id, renderingId, from, to }: AnnotationType) => (
    <span key={renderingId}>{`${id} -- ${from}:${to}`}</span>
  );
  expect(renderAnnotations(sampleText, [], annotationFactory, null)).toEqual([
    sampleText,
  ]);

  expect(
    renderAnnotations(sampleText, [a8n(0, 4)], annotationFactory, null),
  ).toEqual([
    <span key="0:4:FULL_NAME">0:4:FULL_NAME -- 0:4</span>,
    '456789abcd',
  ]);

  expect(
    renderAnnotations(sampleText, BisInA.reverse(), annotationFactory, null),
  ).toEqual([<span key="0:10:FULL_NAME">0:10:FULL_NAME -- 0:10</span>, 'abcd']);

  expect(
    renderAnnotations(sampleText, AisInB.reverse(), annotationFactory, null),
  ).toEqual([
    <span key="0:10:FULL_NAME">0:10:FULL_NAME -- 0:2</span>,
    <span key="2:8:FULL_NAME">2:8:FULL_NAME -- 2:8</span>,
    <span key="0:10:FULL_NAME[1]">0:10:FULL_NAME -- 8:10</span>,
    'abcd',
  ]);

  expect(
    renderAnnotations(
      sampleText,
      AisBeforeB.reverse(),
      annotationFactory,
      null,
    ),
  ).toEqual([
    <span key="0:10:FULL_NAME">0:10:FULL_NAME -- 0:10</span>,
    <span key="8:12:FULL_NAME">8:12:FULL_NAME -- 10:12</span>,
    'cd',
  ]);

  expect(
    renderAnnotations(
      sampleText,
      BisBeforeA.reverse(),
      annotationFactory,
      null,
    ),
  ).toEqual([
    <span key="0:10:FULL_NAME">0:10:FULL_NAME -- 0:8</span>,
    <span key="8:12:FULL_NAME">8:12:FULL_NAME -- 8:12</span>,
    'cd',
  ]);
});
