import { Config } from "../hooks/useConfig";

/**
 * Changes the name of a key on an object
 * @param old key to rename
 * @param newKey updated value
 * @param object to update
 * @returns
 */
export const renameKey = <
  Old extends keyof T,
  New extends string,
  T extends Record<string, unknown>
>(
  old: Old,
  newKey: New,
  object: T
): Record<New, T[Old]> & Omit<T, Old> => {
  const { [old]: value, ...common } = object;

  return {
    ...common,
    ...({ [newKey]: value } as Record<New, T[Old]>),
  };
};
