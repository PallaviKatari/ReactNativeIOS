import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView, Alert } from "react-native";
import CustomInput from "../screens/CustomInput"; // Assuming you have a CustomInput component defined in this path

const CustomInputDemo: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name) newErrors.name = "Name is required";
    if (!email.includes("@")) newErrors.email = "Email is invalid";
    if (password.length < 6) newErrors.password = "Password must be at least 6 chars";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = () => {
    if (validate()) {
      Alert.alert("Success", `Name: ${name}\nEmail: ${email}\nPassword: ${password}`);
      setName(""); setEmail(""); setPassword(""); setErrors({});
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Custom Input Demo</Text>

      <CustomInput
              label="Name"
              value={name}
              onChange={(e) => setName(e.nativeEvent.text)}
              error={errors.name}
              placeholder="Enter your name" onChangeText={function (value: string): void {
                  throw new Error("Function not implemented.");
              } }      />

      <CustomInput
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.nativeEvent.text)}
              error={errors.email}
              placeholder="Enter your email"
              keyboardType="email-address" onChangeText={function (value: string): void {
                  throw new Error("Function not implemented.");
              } }      />

      <CustomInput
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.nativeEvent.text)}
              error={errors.password}
              placeholder="Enter your password"
              secureTextEntry onChangeText={function (value: string): void {
                  throw new Error("Function not implemented.");
              } }      />

      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
    </ScrollView>
  );
};

export default CustomInputDemo;

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16, backgroundColor: "#f0f4f7" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  button: { backgroundColor: "#2196f3", padding: 16, borderRadius: 8, alignItems: "center", marginTop: 20 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});