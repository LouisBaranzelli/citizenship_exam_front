export enum Level {
  L1="level.l1",
  L2="level.l2",
  L3="level.l3"
}

export const LEVELS = Object.values(Level)

export function findLevel(levelStr: string): Level {
  const level = Object.values(Level).find(val => val === levelStr) as Level;
  return level
}

