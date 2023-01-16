export type REPOSITORY_RESULT<T> = {
  rows: T[];
  rowCount: number;
  success: Boolean;
};
