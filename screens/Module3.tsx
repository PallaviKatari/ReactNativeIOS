import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native';

const Module3: React.FC = () => {

  const [count, setCount] = useState<number>(0);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Welcome to Module 3 (TypeScript)
      </Text>

      <Text style={styles.counterText}>
        Count Value: {count}
      </Text>

      <Button
        title="Increase Count"
        onPress={() => setCount(prev => prev + 1)}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',          // 🔥 IMPORTANT: no flex: 1
    paddingVertical: 40,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },
  counterText: {
    fontSize: 18,
    marginBottom: 20
  }
});

export default Module3;