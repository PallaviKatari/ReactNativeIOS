import React from "react";
import { View, Text, StyleSheet, ScrollView, ViewStyle, TextStyle } from "react-native";

// --- Card Component Props ---
interface CardProps {
  title: string;
  subtitle: string;
  containerStyle?: ViewStyle; // optional container style
  titleStyle?: TextStyle;     // optional title style
  subtitleStyle?: TextStyle;  // optional subtitle style
}

// --- Reusable Card Component ---
const Card: React.FC<CardProps> = ({ title, subtitle, containerStyle, titleStyle, subtitleStyle }) => {
  return (
    <View style={[styles.cardContainer, containerStyle]}>
      <Text style={[styles.cardTitle, titleStyle]}>{title}</Text>
      <Text style={[styles.cardSubtitle, subtitleStyle]}>{subtitle}</Text>
    </View>
  );
};

// --- Screen Component ---
const ComponentTypingWithStyle: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Component Typing with Style Props Demo</Text>

      {/* Default Card */}
      <Card title="Default Card" subtitle="Uses default styles" />

      {/* Card with custom container style */}
      <Card
        title="Custom Background"
        subtitle="Overridden container style"
        containerStyle={{ backgroundColor: "#e1f5fe" }}
      />

      {/* Card with custom title and subtitle styles */}
      <Card
        title="Custom Text Styles"
        subtitle="Title is red, subtitle is blue"
        titleStyle={{ color: "red", fontSize: 20 }}
        subtitleStyle={{ color: "blue", fontStyle: "italic" }}
      />

      {/* Card with full style override */}
      <Card
        title="Full Style Override"
        subtitle="Custom container, title, and subtitle"
        containerStyle={{ backgroundColor: "#ffecb3", padding: 24, borderRadius: 16 }}
        titleStyle={{ color: "#ff6f00", fontWeight: "bold" }}
        subtitleStyle={{ color: "#bf360c", fontSize: 14 }}
      />
    </ScrollView>
  );
};

export default ComponentTypingWithStyle;

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
  cardContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2, // shadow for Android
    shadowColor: "#000", // shadow for iOS
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#555",
  },
});