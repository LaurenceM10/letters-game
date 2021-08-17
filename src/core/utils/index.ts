import {BoardPosition, Dictionary, MatrixProps} from 'core/utils/types';

/**
 * Create 4x4 matrix based on array of letters
 * @param boardLetters
 */
export function generateMatrix(boardLetters: string[]): string[][] {
  const matrix: string[][] = [];

  for (let i = 0; i < 4; i++) {
    let row: string[] = [];

    for (let j = i * 4; j < i * 4 + 4; j++) {
      row.push(boardLetters[j]);
    }

    matrix.push(row);
  }

  return matrix;
}

export function findWordInDictionary(
  dictionary: string[],
  word: string,
): number {
  let left = 0;
  let right = dictionary.length - 1;

  if (dictionary[left] === word) {
    return left;
  }
  if (dictionary[right] === word) {
    return right;
  }

  while (left <= right) {
    let middle = left + Math.floor((right - left) / 2);

    let result = word.localeCompare(dictionary[middle]);

    if (result === 0) {
      return middle;
    }

    if (result > 0) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  return -1;
}

/**
 * Generate and return dictionary object based on a list of words
 * @param arr
 */
export function createDictionary(arr: string[]) {
  const target: Dictionary = {};

  arr.forEach(key => {
    target[key.toUpperCase()] = true;
  });

  return target;
}

/**
 * Returns true if the current selected tile is a neighbor of the last selected tile
 * @param lastSelectedPosition
 * @param currentSelectedPosition
 * @param matrixProperties
 */
export function validateNeighbor(
  lastSelectedPosition: BoardPosition,
  currentSelectedPosition: BoardPosition,
  matrixProperties: MatrixProps,
): boolean {
  const {row, column} = lastSelectedPosition;
  const {numberOfColumns, numberOfRows} = matrixProperties;

  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = column - 1; j <= column + 1; j++) {
      if (i >= 0 && i < numberOfRows && j >= 0 && j < numberOfColumns) {
        if (!(row === i && column === j)) {
          if (
            i === currentSelectedPosition.row &&
            j === currentSelectedPosition.column
          ) {
            return true;
          }
        }
      }
    }
  }

  return false;
}
