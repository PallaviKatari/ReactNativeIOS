/**
 * Module6.tsx
 *
 * FORM ARCHITECTURE + VALIDATION PATTERNS
 * Formik + Yup + TypeScript
 *
 * ✅ Scroll Fixed Version
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import * as Yup from 'yup';

/* ================================
   1️⃣ FORM VALUE TYPE
================================ */

interface LoginFormValues {
  email: string;
  password: string;
}

/* ================================
   2️⃣ VALIDATION SCHEMA
================================ */

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Minimum 6 characters')
    .required('Password is required'),
});

/* ================================
   3️⃣ CUSTOM INPUT COMPONENT
================================ */

interface CustomInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur: (e?: any) => void;
  error?: string;
  touched?: boolean;
  secureTextEntry?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  value,
  onChangeText,
  onBlur,
  error,
  touched,
  secureTextEntry = false,
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, touched && error ? styles.inputError : null]}
      value={value}
      onChangeText={onChangeText}
      onBlur={onBlur}
      secureTextEntry={secureTextEntry}
    />
    {touched && error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

/* ================================
   4️⃣ MAIN COMPONENT
================================ */

const Module6: React.FC = () => {
  const initialValues: LoginFormValues = { email: '', password: '' };

  const handleSubmit = (values: LoginFormValues) => {
    Alert.alert('Form Submitted', JSON.stringify(values, null, 2));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* KeyboardAvoidingView ensures fields are visible above keyboard */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Module 6 - Form Architecture</Text>

          <Formik<LoginFormValues>
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View>

                {/* Email Field */}
                <CustomInput
                  label="Email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  error={errors.email}
                  touched={touched.email}
                />

                {/* Password Field */}
                <CustomInput
                  label="Password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  error={errors.password}
                  touched={touched.password}
                  secureTextEntry
                />

                {/* Submit Button */}
                <Pressable style={styles.button} onPress={() => handleSubmit()}>
                  <Text style={styles.buttonText}>Submit</Text>
                </Pressable>

              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Module6;

/* ================================
   STYLES
================================ */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  scrollContainer: {
    flexGrow: 1,           // Fix: ensures scroll works even if content is small
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    color: '#fff',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 6,
    padding: 12,
    color: '#fff',
    backgroundColor: '#1c1c1c',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    fontSize: 12,
  },
  button: {
    backgroundColor: '#2979ff',
    padding: 14,
    borderRadius: 6,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});