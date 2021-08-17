import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import BoardScreen from 'features/board/screen/BoardScreen';

function App() {
  return (
    <SafeAreaView style={styles.screen}>
      <BoardScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default App;
