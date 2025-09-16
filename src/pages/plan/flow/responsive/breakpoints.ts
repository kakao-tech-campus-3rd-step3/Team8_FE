export const EDIT_MIN_WIDTH = 1024; // 편집 가능 최소 너비(px)

export const isEditingAllowed = (width: number, minWidth: number = EDIT_MIN_WIDTH) =>
  width >= minWidth;
