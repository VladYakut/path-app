import { Position } from "./types";

export const isPositionEqual = (a: Position, b: Position): boolean =>
  a[0] === b[0] && a[1] === b[1];
