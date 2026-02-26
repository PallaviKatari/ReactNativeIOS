import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

// --- Input field type ---
interface InputField {
  value: string;
  error: string;
}

// --- Form State Type ---
interface FormState {
  name: InputField;
  email: InputField;
  password: InputField;
  age: InputField;
}

// --- Validation Functions ---
const validateName = (name: string) => {
  if (!name.trim()) return "Name is required";
  if (name.length < 3) return "Name must be at least 3 characters";
  return "";
};

const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) return "Email is required";
  if (!regex.test(email)) return "Email is invalid";
  return "";
};

const validatePassword = (password: string) => {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  if (!/[A-Z]/.test(password)) return "Password must contain an uppercase letter";
  if (!/[0-9]/.test(password)) return "Password must contain a number";
  return "";
};

const validateAge = (age: string) => {
  if (!age.trim()) return "Age is required";
  const num = Number(age);
  if (isNaN(num)) return "Age must be a number";
  if (num < 18 || num > 100) return "Age must be between 18 and 100";
  return "";
};

// --- Reusable Input Component ---
interface InputProps {
  label: string;
  field: InputField;
  onChange: (value: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "numeric" | "email-address";
}

const Input: React.FC<InputProps> = ({ label, field, onChange, secureTextEntry, keyboardType }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      value={field.value}
      onChangeText={onChange}
      style={[styles.input, field.error ? styles.inputError : null]}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType || "default"}
    />
    {field.error ? <Text style={styles.errorText}>{field.error}</Text> : null}
  </View>
);

// --- Form Screen ---
const FormValidationDemo: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    name: { value: "", error: "" },
    email: { value: "", error: "" },
    password: { value: "", error: "" },
    age: { value: "", error: "" },
  });

  // --- Update field ---
  const updateField = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: { ...prev[key], value } }));
  };

  // --- Validate all fields ---
  const validateAll = () => {
    const nameError = validateName(form.name.value);
    const emailError = validateEmail(form.email.value);
    const passwordError = validatePassword(form.password.value);
    const ageError = validateAge(form.age.value);

    setForm((prev) => ({
      name: { ...prev.name, error: nameError },
      email: { ...prev.email, error: emailError },
      password: { ...prev.password, error: passwordError },
      age: { ...prev.age, error: ageError },
    }));

    return !(nameError || emailError || passwordError || ageError);
  };

  // --- Submit ---
  const onSubmit = () => {
    if (validateAll()) {
      Alert.alert("Success", "Form submitted successfully!");
      // reset form or send to API
      setForm({
        name: { value: "", error: "" },
        email: { value: "", error: "" },
        password: { value: "", error: "" },
        age: { value: "", error: "" },
      });
    } else {
      Alert.alert("Validation Failed", "Please fix the errors in the form");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Form Validation Demo</Text>

      <Input label="Name" field={form.name} onChange={(val) => updateField("name", val)} />
      <Input
        label="Email"
        field={form.email}
        onChange={(val) => updateField("email", val)}
        keyboardType="email-address"
      />
      <Input
        label="Password"
        field={form.password}
        onChange={(val) => updateField("password", val)}
        secureTextEntry
      />
      <Input
        label="Age"
        field={form.age}
        onChange={(val) => updateField("age", val)}
        keyboardType="numeric"
      />

      <Pressable style={styles.submitButton} onPress={onSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </Pressable>
    </ScrollView>
  );
};

export default FormValidationDemo;

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16, backgroundColor: "#f0f4f7" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  inputContainer: { marginBottom: 16 },
  label: { fontSize: 16, fontWeight: "500", marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
  },
  inputError: { borderColor: "#f44336" },
  errorText: { color: "#f44336", marginTop: 4, fontSize: 12 },
  submitButton: {
    backgroundColor: "#2196f3",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  submitText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});