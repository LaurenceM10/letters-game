export interface TilePosition {
  row?: number;
  column?: number;
}

export interface SelectedTiles {
  [key: string]: {
    [key: string]: number;
  };
}
