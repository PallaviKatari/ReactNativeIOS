import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  Alert,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // official picker library

const ModalAlertPickerDemo: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>("apple");

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Modal, Alert & Picker Demo</Text>

      {/* --- Alert Example --- */}
      <Pressable
        style={styles.button}
        onPress={() => Alert.alert("Alert Title", "This is a native alert message", [
          { text: "Cancel", style: "cancel" },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ])}
      >
        <Text style={styles.buttonText}>Show Alert</Text>
      </Pressable>

      {/* --- Modal Example --- */}
      <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Show Modal</Text>
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // for Android back button
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>This is a Modal</Text>
            <Text style={styles.modalText}>You can put any content here</Text>
            <Pressable
              style={[styles.button, { marginTop: 10 }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Close Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* --- Picker Example --- */}
      <Text style={[styles.subHeader, { marginTop: 20 }]}>Select a fruit:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Apple" value="apple" />
          <Picker.Item label="Banana" value="banana" />
          <Picker.Item label="Orange" value="orange" />
          <Picker.Item label="Mango" value="mango" />
        </Picker>
      </View>
      <Text style={styles.selectedText}>Selected: {selectedValue}</Text>
    </View>
  );
};

export default ModalAlertPickerDemo;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f0f4f7" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  subHeader: { fontSize: 18, fontWeight: "600" },
  button: {
    backgroundColor: "#2196f3",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  modalText: { fontSize: 14, marginBottom: 10, textAlign: "center" },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginTop: 10,
  },
  selectedText: {
    marginTop: 10,
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center",
  },
});