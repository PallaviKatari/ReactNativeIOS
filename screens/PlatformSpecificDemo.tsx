import React from "react";
import { 
  View, 
  Text, 
  Platform, 
  StatusBar, 
  StyleSheet 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PlatformSpecificDemo: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* StatusBar configuration */}
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
        backgroundColor={Platform.OS === "android" ? "#6200ee" : undefined}
      />

      <View style={styles.container}>
        <Text style={styles.header}>Platform-Specific Rendering Demo</Text>

        {/* Platform-specific text */}
        {Platform.OS === "ios" && (
          <Text style={styles.iosText}>Hello iOS user! 🌟</Text>
        )}

        {Platform.OS === "android" && (
          <Text style={styles.androidText}>Hello Android user! 🤖</Text>
        )}

        {Platform.OS === "web" && (
          <Text style={styles.webText}>Hello Web user! 💻</Text>
        )}

        {/* Platform-specific layout example */}
        <View
          style={[
            styles.box,
            Platform.OS === "ios"
              ? { backgroundColor: "#007aff", width: "80%" }
              : Platform.OS === "android"
              ? { backgroundColor: "#a4c639", width: "70%" }
              : { backgroundColor: "#ff9800", width: "60%" },
          ]}
        >
          <Text style={styles.boxText}>
            {Platform.OS === "ios"
              ? "iOS Box"
              : Platform.OS === "android"
              ? "Android Box"
              : "Web Box"}
          </Text>
        </View>

        {/* Platform-specific instructions */}
        <Text style={styles.infoText}>
          You are running on: {Platform.OS.toUpperCase()}{"\n"}
          Version: {Platform.Version}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default PlatformSpecificDemo;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f4f7",
  },
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  iosText: {
    color: "#007aff",
    fontSize: 16,
    marginBottom: 10,
  },
  androidText: {
    color: "#a4c639",
    fontSize: 16,
    marginBottom: 10,
  },
  webText: {
    color: "#ff9800",
    fontSize: 16,
    marginBottom: 10,
  },
  box: {
    height: 100,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    elevation: 3, // shadow for Android
    shadowColor: "#000", // shadow for iOS
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  boxText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  infoText: {
    fontSize: 14,
    textAlign: "center",
    color: "#333",
    marginTop: 10,
  },
});