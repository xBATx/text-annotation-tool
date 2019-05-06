import { SelectedText } from 'src/types';

export const getCaretCharacterOffsetWithin = (element: HTMLElement) => {
  const doc = element.ownerDocument;
  if (doc) {
    const win = doc.defaultView;
    if (win && typeof win.getSelection !== 'undefined') {
      const sel = win.getSelection();
      if (sel.rangeCount > 0) {
        const range = win.getSelection().getRangeAt(0);
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        return preCaretRange.toString().length;
      }
    }
  }
  return -1;
};

export const getSelectedTextValues = (
  document: Document,
  articleTextId: string,
): SelectedText => {
  const textContent = document.getElementById(articleTextId);
  const caretOffset =
    (textContent && getCaretCharacterOffsetWithin(textContent)) || 0;
  const text = (document.getSelection() || '').toString();

  return {
    from: caretOffset - text.length,
    to: caretOffset,
    text,
  };
};

export const clearSelection = () => {
  if (window.getSelection()) {
    window.getSelection().removeAllRanges();
  } else {
    const selection = document.getSelection();
    if (selection !== null) {
      selection.empty();
    }
  }
};

export const clickedOutsideOfPopover = (
  document: Document,
  target: EventTarget | null,
  popoverId: string,
): boolean => {
  const popover = document.getElementById(popoverId);
  return (
    !popover ||
    (target !== popover && target instanceof Node && !popover.contains(target))
  );
};
