import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Optimization techniques in React Native: 
// React.memo, useCallback, useMemo 
// with simple demos for each to illustrate their usage and benefits in preventing unnecessary re-renders and optimizing performance.

// React/ReactNative - state,props are passed - re-renders 
// React.memo - memoizes a component and only re-renders if props change - prevents unnecessary re-renders of child components when parent re-renders but props remain the same.
// useCallback - memoizes a function and only re-creates it if dependencies change - prevents unnecessary re-creation of functions on every render which can cause child components that depend on those functions to re-render.
// useMemo - memoizes a value and only re-computes it if dependencies change - prevents expensive calculations from running on every render when the inputs haven't changed.

//AuthContext
//login,logout,user
//usememo - user object is memoized and only changes when login/logout is called, preventing unnecessary re-renders of components that consume the user context when the auth state changes but the user object remains the same.
//useCallback- login and logout functions are memoized and only re-created when the auth state changes, preventing unnecessary re-renders of components that consume the auth context when the auth state changes but the login/logout functions remain the same.

/* ===============================
   1️⃣ React.memo Demo Component
================================= */

interface ChildProps {
  value: number;
}

const MemoChild = React.memo(({ value }: ChildProps) => {
  console.log('MemoChild Rendered');
  return (
    <View style={styles.box}>
      <Text>React.memo Child Value: {value}</Text>
    </View>
  );
});

/* ===============================
   MAIN SCREEN
================================= */

const Optimization: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [otherCount, setOtherCount] = useState<number>(0);

  /* ===============================
     2️⃣ useCallback Demo
  ================================= */

  const handlePress = useCallback(() => {
    console.log('useCallback Triggered');
    setOtherCount(prev => prev + 1);
  }, []);

  /* ===============================
     3️⃣ useMemo Demo
  ================================= */

  const expensiveCalculation = useMemo(() => {
    console.log('useMemo Calculating...');
    let total = 0;
    for (let i = 0; i < 15_000_000; i++) {
      total += i;
    }
    return total + otherCount;
  }, [otherCount]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* ===============================
           useCallback Section
        ================================= */}
        <View style={styles.section}>
          <Text style={styles.title}>useCallback Demo</Text>
          <Text>Other Count: {otherCount}</Text>
          <Button title="Trigger useCallback" onPress={handlePress} />
        </View>

        {/* ===============================
           React.memo Section
        ================================= */}
        <View style={styles.section}>
          <Text style={styles.title}>React.memo Demo</Text>
          <Text>Main Count: {count}</Text>
          <Button
            title="Increase Main Count"
            onPress={() => setCount(prev => prev + 1)}
          />
          <MemoChild value={count} />
        </View>

        {/* ===============================
           useMemo Section
        ================================= */}
        <View style={styles.section}>
          <Text style={styles.title}>useMemo Demo</Text>
          <Text>Expensive Result:</Text>
          <Text style={styles.result}>{expensiveCalculation}</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Optimization;

/* ===============================
   Styles
================================= */

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 40,
    padding: 20,
    backgroundColor: '#f4f4f4',
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  box: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  result: {
    marginTop: 10,
    fontWeight: 'bold',
  },
});