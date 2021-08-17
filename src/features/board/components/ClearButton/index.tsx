import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {theme} from 'core/theme';

interface ClearButtonProps {
  onClear: () => void;
}

function ClearButton({onClear}: ClearButtonProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Clear word</Text>
      <TouchableHighlight onPress={onClear} style={styles.icon}>
        <Text style={styles.iconText}>X</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  text: {
    fontSize: 20,
    marginRight: 12,
    color: theme.colors.cancel,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.cancel,
  },
  iconText: {
    fontSize: 28,
    color: '#FFF',
  },
});

export default ClearButton;
