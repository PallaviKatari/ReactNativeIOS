import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

// --- Typed keys ---
type StorageKeys = "username" | "email";

// --- Helper functions ---
const saveItem = async (key: StorageKeys, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
  }
};

const readItem = async (key: StorageKeys): Promise<string> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value || "";
  } catch (error) {
    console.error(`Error reading ${key}:`, error);
    return "";
  }
};

const deleteItem = async (key: StorageKeys) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error deleting ${key}:`, error);
  }
};

const AsyncStorageDemo: React.FC = () => {
  const [inputs, setInputs] = useState<{ username: string; email: string }>({ username: "", email: "" });
  const [storedValues, setStoredValues] = useState<{ username: string; email: string }>({ username: "", email: "" });

  // Load stored values on mount
  useEffect(() => {
    const loadValues = async () => {
      const username = await readItem("username");
      const email = await readItem("email");
      setStoredValues({ username, email });
    };
    loadValues();
  }, []);

  const handleSave = async (key: StorageKeys) => {
    await saveItem(key, inputs[key]);
    setStoredValues(prev => ({ ...prev, [key]: inputs[key] }));
    setInputs(prev => ({ ...prev, [key]: "" }));
  };

  const handleRead = async (key: StorageKeys) => {
    const value = await readItem(key);
    setStoredValues(prev => ({ ...prev, [key]: value }));
  };

  const handleDelete = async (key: StorageKeys) => {
    await deleteItem(key);
    setStoredValues(prev => ({ ...prev, [key]: "" }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>AsyncStorage Demo</Text>

      {(["username", "email"] as StorageKeys[]).map((key) => (
        <View key={key} style={styles.section}>
          <Text style={styles.sectionHeader}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
          <TextInput
            style={styles.input}
            placeholder={`Enter ${key}`}
            value={inputs[key]}
            onChangeText={(text) => setInputs(prev => ({ ...prev, [key]: text }))}
          />
          <Pressable style={styles.button} onPress={() => handleSave(key)}>
            <Text style={styles.buttonText}>Save {key}</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => handleRead(key)}>
            <Text style={styles.buttonText}>Read {key}</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => handleDelete(key)}>
            <Text style={styles.buttonText}>Delete {key}</Text>
          </Pressable>
          <Text style={styles.valueText}>Stored {key}: {storedValues[key]}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default AsyncStorageDemo;

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#f0f4f7" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  section: { marginBottom: 32, padding: 16, backgroundColor: "#fff", borderRadius: 8 },
  sectionHeader: { fontSize: 18, fontWeight: "600", marginBottom: 12 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 12 },
  button: { backgroundColor: "#2196f3", padding: 12, borderRadius: 8, alignItems: "center", marginVertical: 4 },
  buttonText: { color: "#fff", fontWeight: "bold" },
  valueText: { marginTop: 8, fontSize: 16, color: "#333" },
});