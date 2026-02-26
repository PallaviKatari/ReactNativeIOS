import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { Buffer } from "buffer";

const BasicAuthDemo: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [responseText, setResponseText] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter both username and password");
      return;
    }

    try {
      const credentials = Buffer.from(`${username}:${password}`).toString("base64");

      const response = await fetch("https://httpbin.org/basic-auth/user/passwd", {
        method: "GET",
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setResponseText(JSON.stringify(data, null, 2));
        Alert.alert("Success", "Authenticated successfully!");
      } else {
        setResponseText("");
        Alert.alert("Error", "Authentication failed!");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Basic Auth Demo</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      {responseText ? (
        <View style={styles.responseContainer}>
          <Text style={styles.responseHeader}>API Response:</Text>
          <Text style={styles.responseText}>{responseText}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default BasicAuthDemo;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f0f4f7", justifyContent: "center" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 24, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 12, backgroundColor: "#fff" },
  button: { backgroundColor: "#2196f3", padding: 12, borderRadius: 8, alignItems: "center", marginBottom: 24 },
  buttonText: { color: "#fff", fontWeight: "bold" },
  responseContainer: { padding: 12, backgroundColor: "#fff", borderRadius: 8 },
  responseHeader: { fontWeight: "bold", marginBottom: 6 },
  responseText: { fontFamily: "monospace", fontSize: 14 },
});