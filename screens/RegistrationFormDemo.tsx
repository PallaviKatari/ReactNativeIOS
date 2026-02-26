import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { Picker } from "@react-native-picker/picker";

// --- Registration Form Fields Interface ---
interface RegistrationFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  country: string;
  acceptTerms: boolean;
  newsletter: boolean;
}

// --- Validation Schema ---
const RegistrationSchema = Yup.object().shape({
  firstName: Yup.string().min(2, "Too Short!").required("Required"),
  lastName: Yup.string().min(2, "Too Short!").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password too short")
    .matches(/[A-Z]/, "Must contain uppercase")
    .matches(/[0-9]/, "Must contain a number")
    .required("Required"),
  gender: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
  acceptTerms: Yup.boolean().oneOf([true], "You must accept the terms"),
});

// --- Registration Form Screen ---
const RegistrationFormDemo: React.FC = () => {
  const initialValues: RegistrationFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    country: "",
    acceptTerms: false,
    newsletter: false,
  };

  const onSubmit = (values: RegistrationFormValues) => {
    Alert.alert("Registration Successful", JSON.stringify(values, null, 2));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Registration Form</Text>

      <Formik
        initialValues={initialValues}
        validationSchema={RegistrationSchema}
        onSubmit={onSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <View>
            {/* First Name */}
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={[styles.input, errors.firstName && touched.firstName ? styles.inputError : null]}
              placeholder="First Name"
              onChangeText={handleChange("firstName")}
              onBlur={handleBlur("firstName")}
              value={values.firstName}
            />
            {errors.firstName && touched.firstName && <Text style={styles.error}>{errors.firstName}</Text>}

            {/* Last Name */}
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={[styles.input, errors.lastName && touched.lastName ? styles.inputError : null]}
              placeholder="Last Name"
              onChangeText={handleChange("lastName")}
              onBlur={handleBlur("lastName")}
              value={values.lastName}
            />
            {errors.lastName && touched.lastName && <Text style={styles.error}>{errors.lastName}</Text>}

            {/* Email */}
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, errors.email && touched.email ? styles.inputError : null]}
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {errors.email && touched.email && <Text style={styles.error}>{errors.email}</Text>}

            {/* Password */}
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={[styles.input, errors.password && touched.password ? styles.inputError : null]}
              placeholder="Password"
              secureTextEntry
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            {errors.password && touched.password && <Text style={styles.error}>{errors.password}</Text>}

            {/* Gender (Radio Buttons) */}
            <Text style={styles.label}>Gender</Text>
            <View style={styles.radioContainer}>
              {["Male", "Female", "Other"].map((gender) => (
                <Pressable
                  key={gender}
                  style={styles.radioOption}
                  onPress={() => setFieldValue("gender", gender)}
                >
                  <View style={[styles.radioCircle, values.gender === gender ? styles.radioSelected : null]} />
                  <Text style={styles.radioLabel}>{gender}</Text>
                </Pressable>
              ))}
            </View>
            {errors.gender && touched.gender && <Text style={styles.error}>{errors.gender}</Text>}

            {/* Country (Picker) */}
            <Text style={styles.label}>Country</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={values.country}
                onValueChange={(itemValue) => setFieldValue("country", itemValue)}
              >
                <Picker.Item label="Select Country" value="" />
                <Picker.Item label="USA" value="usa" />
                <Picker.Item label="Canada" value="canada" />
                <Picker.Item label="UK" value="uk" />
                <Picker.Item label="Australia" value="australia" />
              </Picker>
            </View>
            {errors.country && touched.country && <Text style={styles.error}>{errors.country}</Text>}

            {/* Newsletter (Checkbox) */}
            <Pressable
              style={styles.checkboxContainer}
              onPress={() => setFieldValue("newsletter", !values.newsletter)}
            >
              <View style={[styles.checkbox, values.newsletter ? styles.checkboxChecked : null]} />
              <Text style={styles.checkboxLabel}>Subscribe to newsletter</Text>
            </Pressable>

            {/* Accept Terms (Checkbox) */}
            <Pressable
              style={styles.checkboxContainer}
              onPress={() => setFieldValue("acceptTerms", !values.acceptTerms)}
            >
              <View style={[styles.checkbox, values.acceptTerms ? styles.checkboxChecked : null]} />
              <Text style={styles.checkboxLabel}>I accept the terms & conditions</Text>
            </Pressable>
            {errors.acceptTerms && touched.acceptTerms && <Text style={styles.error}>{errors.acceptTerms}</Text>}

            {/* Submit Button */}
            <Pressable style={styles.submitButton} onPress={() => handleSubmit()}>
              <Text style={styles.submitText}>Register</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default RegistrationFormDemo;

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16, backgroundColor: "#f0f4f7" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  label: { fontSize: 16, fontWeight: "500", marginTop: 12, marginBottom: 6 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, backgroundColor: "#fff" },
  inputError: { borderColor: "#f44336" },
  error: { color: "#f44336", fontSize: 12, marginTop: 4 },
  radioContainer: { flexDirection: "row", marginBottom: 8 },
  radioOption: { flexDirection: "row", alignItems: "center", marginRight: 20 },
  radioCircle: { width: 20, height: 20, borderRadius: 10, borderWidth: 1, borderColor: "#2196f3", marginRight: 6 },
  radioSelected: { backgroundColor: "#2196f3" },
  radioLabel: { fontSize: 14 },
  pickerContainer: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, marginBottom: 8, backgroundColor: "#fff" },
  checkboxContainer: { flexDirection: "row", alignItems: "center", marginVertical: 6 },
  checkbox: { width: 20, height: 20, borderWidth: 1, borderColor: "#2196f3", marginRight: 8 },
  checkboxChecked: { backgroundColor: "#2196f3" },
  checkboxLabel: { fontSize: 14 },
  submitButton: { backgroundColor: "#2196f3", padding: 16, borderRadius: 8, alignItems: "center", marginTop: 16 },
  submitText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});