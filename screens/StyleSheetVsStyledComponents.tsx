import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, Alert } from "react-native";
import styled from "styled-components/native";

const StyleSheetVsStyledComponents: React.FC = () => {
  const [name, setName] = useState<string>("");

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>StyleSheet vs Styled-Components Demo</Text>

      {/* === StyleSheet Example === */}
      <Text style={styles.sectionTitle}>1. Using StyleSheet</Text>
      <View style={styles.sheetBox}>
        <Text style={styles.sheetText}>Hello from StyleSheet</Text>
        <TextInput
          style={styles.sheetInput}
          placeholder="Enter Name"
          value={name}
          onChangeText={setName}
        />
        <Pressable style={styles.sheetButton} onPress={() => Alert.alert(`Hello, ${name || "Guest"}!`)}>
          <Text style={styles.sheetButtonText}>Greet</Text>
        </Pressable>
      </View>

      {/* === Styled-Components Example === */}
      <Text style={styles.sectionTitle}>2. Using Styled-Components</Text>
      <StyledBox>
        <StyledText>Hello from Styled-Components</StyledText>
        <StyledInput
          placeholder="Enter Name"
          value={name}
          onChangeText={setName}
        />
        <StyledButton onPress={() => Alert.alert(`Hello, ${name || "Guest"}!`)}>
          <StyledButtonText>Greet</StyledButtonText>
        </StyledButton>
      </StyledBox>
    </ScrollView>
  );
};

export default StyleSheetVsStyledComponents;

/* === Styled-Components Definitions === */
const StyledBox = styled.View`
  background-color: #e0f7fa;
  padding: 16px;
  margin-bottom: 20px;
  border-radius: 12px;
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #00796b;
`;

const StyledInput = styled.TextInput`
  width: 90%;
  padding: 10px;
  border-width: 1px;
  border-color: #00796b;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const StyledButton = styled.Pressable`
  background-color: #00796b;
  padding: 12px 20px;
  border-radius: 8px;
`;

const StyledButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;

/* === StyleSheet Definitions === */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f4f7",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  sheetBox: {
    backgroundColor: "#ffecb3",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  sheetText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ff6f00",
  },
  sheetInput: {
    width: "90%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ff6f00",
    borderRadius: 8,
    marginBottom: 10,
  },
  sheetButton: {
    backgroundColor: "#ff6f00",
    padding: 12,
    borderRadius: 8,
  },
  sheetButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});