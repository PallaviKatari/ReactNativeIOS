import React, { Profiler, useState, useCallback } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

type ProfileLog = {
  id: string;
  phase: 'mount' | 'update';
  actualDuration: number;
};

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <View style={styles.counterContainer}>
      <Text style={styles.countText}>Count: {count}</Text>
      <Button title="Increment" onPress={() => setCount(c => c + 1)} />
    </View>
  );
};

const ProfilerScreen: React.FC = () => {
  const [logs, setLogs] = useState<ProfileLog[]>([]);

  // ✅ useCallback prevents recreation
  const onRender = useCallback<React.ProfilerOnRenderCallback>(
    (id, phase, actualDuration) => {
      // ✅ Only log updates (optional safety)
      if (phase === 'update') {
        setLogs(prev => {
          const newLog = {
            id,
            phase,
            actualDuration,
          };

          // ✅ Keep only last 5 logs (prevent excessive updates)
          return [newLog, ...prev].slice(0, 5);
        });
      }
    },
    []
  );

  return (
    <View style={styles.container}>
      <Profiler id="CounterComponent" onRender={onRender}>
        <Counter />
      </Profiler>

      <Text style={styles.logTitle}>Profiler Logs</Text>

      <ScrollView>
        {logs.map((log, index) => (
          <View key={index} style={styles.logCard}>
            <Text style={styles.logText}>Component: {log.id}</Text>
            <Text style={styles.logText}>Phase: {log.phase}</Text>
            <Text style={styles.logText}>
              Duration: {log.actualDuration.toFixed(2)} ms
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ProfilerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  counterContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  countText: {
    fontSize: 22,
    marginBottom: 10,
    color: '#000',
  },
  logTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  logCard: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  logText: {
    color: '#000',
    fontSize: 13,
  },
});