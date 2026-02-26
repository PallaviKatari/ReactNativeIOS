import React from "react";
import { View, Text, Platform, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PlatformComponentsDemo: React.FC = () => {
  return (
    // Use SafeAreaView from react-native-safe-area-context for proper safe areas
    <SafeAreaView style={styles.safeArea}>
      {/* StatusBar configuration */}
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
        backgroundColor={Platform.OS === "android" ? "#6200ee" : undefined}
      />

      <View style={styles.container}>
        <Text style={styles.header}>Platform-Specific Components Demo</Text>

        {/* Platform-specific text */}
        {Platform.OS === "ios" ? (
          <Text style={styles.iosText}>This text is shown only on iOS</Text>
        ) : (
          <Text style={styles.androidText}>This text is shown only on Android</Text>
        )}

        {/* Platform-specific logic example */}
        <Text style={styles.infoText}>
          You are running on: {Platform.OS.toUpperCase()} {"\n"}
          Version: {Platform.Version}
        </Text>

        {/* SafeArea + padding example */}
        <View style={styles.box}>
          <Text>Safe content inside a box respecting platform safe areas</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PlatformComponentsDemo;

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
  infoText: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
  },
  box: {
    width: "90%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3, // shadow on Android
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4, // shadow on iOS
  },
});