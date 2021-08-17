export interface Dictionary {
  [key: string]: boolean;
}

export interface BoardPosition {
  row: number;
  column: number;
}

export interface MatrixProps {
  numberOfColumns: number;
  numberOfRows: number;
}
