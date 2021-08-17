import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';

// Components
import LinearGradient from 'react-native-linear-gradient';
import WordResult from 'features/board/components/WordResult';
import ClearButton from 'features/board/components/ClearButton';

// data
import letters from 'features/board/data/letters.json';
import dictionaryData from 'features/board/data/dictionary.json';

// Utils/types
import {generateMatrix, createDictionary, validateNeighbor} from 'core/utils';
import {BoardPosition, Dictionary} from 'core/utils/types';
import {SelectedTiles, TilePosition} from 'features/board/types';

// Theme styles
import {theme} from 'core/theme';

const SCREEN_WIDTH = Dimensions.get('window').width;
const HORIZONTAL_PADDING = 16;
const NUMBER_OF_ROWS = 4;
const TILE_SIZE = (SCREEN_WIDTH - HORIZONTAL_PADDING * 2) / NUMBER_OF_ROWS;

interface BoardState {
  formedWord: string;
  selectedTiles: SelectedTiles;
  lastTile: TilePosition;
  isValid: boolean;
}

const initialState = {
  formedWord: '',
  selectedTiles: {},
  lastTile: {},
  isValid: true,
};

function BoardScreen() {
  const matrix = generateMatrix(letters.board);
  const dictionary: Dictionary = createDictionary(dictionaryData.words);
  const [{formedWord, isValid, lastTile, selectedTiles}, setState] =
    useState<BoardState>(initialState);

  function handleClear() {
    setState(initialState);
  }

  function onTapTile(row: number, column: number, letter: string) {
    const newWord = formedWord + letter;
    let isValidWord = true;

    if (selectedTiles[row] && selectedTiles[row][column]) {
      return;
    }

    if (lastTile.row !== undefined && lastTile.column !== undefined) {
      if (newWord.length >= 3) {
        isValidWord = dictionary[newWord];
      }

      let isValidNeighbor = validateNeighbor(
        lastTile as BoardPosition,
        {row, column},
        {numberOfRows: 4, numberOfColumns: 4},
      );

      if (!isValidNeighbor) {
        return;
      }
    }

    setState(({selectedTiles: tiles}) => ({
      formedWord: newWord,
      lastTile: {row, column},
      isValid: isValidWord,
      selectedTiles: {
        ...tiles,
        [row]: {
          ...tiles[row],
          [column]: tiles[row] ? ++tiles[row][column] || 1 : 1,
        },
      },
    }));
  }

  function renderBoard() {
    return matrix.map((row, rowIndex) =>
      row.map((letter, columnIndex) => {
        const isSelected =
          selectedTiles[rowIndex] && selectedTiles[rowIndex][columnIndex];

        const selectedStyles = {borderWidth: isSelected ? 0 : 2.5};

        return (
          <TouchableWithoutFeedback
            key={`${rowIndex}${columnIndex}${letter}`}
            onPress={() => onTapTile(rowIndex, columnIndex, letter)}>
            <View style={styles.tile}>
              <LinearGradient
                colors={
                  isSelected
                    ? isValid
                      ? theme.gradients.selected
                      : theme.gradients.invalid
                    : theme.gradients.notSelected
                }
                style={[styles.tileItem, selectedStyles]}>
                <Text style={styles.letter}>{letter}</Text>
              </LinearGradient>
            </View>
          </TouchableWithoutFeedback>
        );
      }),
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        {formedWord.length > 0 && <ClearButton onClear={handleClear} />}
      </View>
      <View style={styles.main}>
        <View style={styles.board}>{renderBoard()}</View>
      </View>
      <View style={styles.footer}>
        <WordResult isValidWord={isValid} formedWord={formedWord} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: HORIZONTAL_PADDING,
  },
  header: {
    height: 100,
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  board: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  tile: {
    width: TILE_SIZE,
    height: TILE_SIZE,
  },
  tileItem: {
    flex: 1,
    margin: 4,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.colors.tileBorder,
    backgroundColor: '#f8a13e',
  },
  selectedTile: {
    borderWidth: 0,
    backgroundColor: theme.colors.success,
  },
  letter: {
    fontSize: 40,
    color: '#FFF',
    fontWeight: 'bold',
    textShadowRadius: 6,
    textShadowOffset: {
      width: -0.5,
      height: -0.5,
    },
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
  },
  footer: {
    marginVertical: 25,
    paddingHorizontal: 6,
  },
});

export default BoardScreen;
