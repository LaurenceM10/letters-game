import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {theme} from 'core/theme';

interface WordResultProps {
  isValidWord: boolean;
  formedWord: string;
}

function WordResult({isValidWord, formedWord}: WordResultProps) {
  const wordStyle = {
    color: isValidWord ? theme.colors.success : theme.colors.failure,
  };
  const messageColor = {color: wordStyle.color, opacity: 0.6};

  return (
    <View style={styles.container}>
      <Text style={[styles.formedWord, wordStyle]}>{formedWord}</Text>
      {formedWord.length > 0 && (
        <Text style={[styles.messageStatus, messageColor]}>
          {isValidWord ? 'valid' : 'invalid'}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 75,
    borderWidth: 3,
    marginVertical: 25,
    borderColor: theme.colors.boxBorder,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
  },
  formedWord: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  messageStatus: {
    fontSize: 17,
    fontWeight: 'normal',
  },
});

export default WordResult;
