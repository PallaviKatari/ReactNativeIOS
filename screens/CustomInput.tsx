import React from "react";
import { View, Text, TextInput, StyleSheet, TextInputProps } from "react-native";

// --- Custom input props ---
interface CustomInputProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  error?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  value,
  onChangeText,
  error,
  secureTextEntry,
  keyboardType,
  placeholder,
  ...rest
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={[styles.input, error ? styles.inputError : null]}
        {...rest} // spread other TextInputProps
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { fontSize: 16, fontWeight: "500", marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
  },
  inputError: { borderColor: "#f44336" },
  errorText: { color: "#f44336", fontSize: 12, marginTop: 4 },
});