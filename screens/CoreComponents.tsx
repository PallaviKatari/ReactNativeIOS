import React, { useState } from "react";
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TextInput, 
  Pressable, 
  StyleSheet,
  Alert 
} from "react-native";

const CoreComponents: React.FC = () => {
  const [name, setName] = useState<string>("");

  const handlePress = (): void => {
    Alert.alert("Greetings", `Hello, ${name || "Guest"}!`);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>React Native Core Components</Text>
      </View>

      {/* Logo Image */}
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Description */}
      <Text style={styles.description}>
        This screen demonstrates core React Native components: View, Text, Image, ScrollView, TextInput, and Pressable.
      </Text>

      {/* TextInput */}
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      {/* Pressable Button */}
      <Pressable style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Greet Me</Text>
      </Pressable>

      {/* Scrollable List */}
      <View style={styles.scrollSection}>
        <Text style={styles.subHeader}>Scrollable List:</Text>
        {[...Array(15).keys()].map((i) => (
          <Pressable
            key={i}
            style={styles.listItem}
            onPress={() => Alert.alert("Item Pressed", `You tapped Item ${i + 1}`)}
          >
            <Text>Item {i + 1}</Text>
          </Pressable>
        ))}
      </View>

      {/* Footer Image */}
      <Image
        source={require("../assets/background.jpg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
    </ScrollView>
  );
};

export default CoreComponents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f4f7",
  },
  header: {
    padding: 10,
    alignItems: "center",
    backgroundColor: "#4caf50",
    borderRadius: 10,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  logo: {
    width: "100%",
    height: 150,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#2196f3",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  scrollSection: {
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  listItem: {
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 5,
    borderRadius: 6,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  backgroundImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginTop: 20,
  },
});