type TableConfig = {
  Columns: Array<ColumnConfig>;
};
type ColumnConfig = {
  prop: string;
  label: string;
  width?: string | number;
};
