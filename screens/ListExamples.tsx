import React from "react";
import {
  View,
  Text,
  FlatList,
  SectionList,
  StyleSheet,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";

// --- Sample Data ---
const flatListData = Array.from({ length: 20 }, (_, i) => ({
  id: i.toString(),
  name: `Flat Item ${i + 1}`,
}));

const sectionListData = [
  {
    title: "Fruits",
    data: ["Apple", "Banana", "Orange", "Mango"],
  },
  {
    title: "Vegetables",
    data: ["Carrot", "Broccoli", "Spinach", "Potato"],
  },
];

const ListExamples: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>FlatList & SectionList Demo</Text>

      {/* === FlatList Example === */}
      <Text style={styles.subHeader}>1. FlatList Example</Text>
      <FlatList
        data={flatListData}
        keyExtractor={(item) => item.id}
        horizontal={false} // vertical scroll
        renderItem={({ item }) => (
          <Pressable
            style={styles.listItem}
            onPress={() => Alert.alert("FlatList Item", `You pressed ${item.name}`)}
          >
            <Text>{item.name}</Text>
          </Pressable>
        )}
        showsVerticalScrollIndicator={false}
      />

      {/* === SectionList Example === */}
      <Text style={styles.subHeader}>2. SectionList Example</Text>
      <SectionList
        sections={sectionListData}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <Pressable
            style={styles.listItem}
            onPress={() => Alert.alert("SectionList Item", `You pressed ${item}`)}
          >
            <Text>{item}</Text>
          </Pressable>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </ScrollView>
  );
};

export default ListExamples;

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
  subHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  listItem: {
    padding: 12,
    backgroundColor: "#fff",
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2, // shadow for Android
    shadowColor: "#000", // shadow for iOS
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  sectionHeader: {
    backgroundColor: "#4caf50",
    padding: 8,
    borderRadius: 6,
    marginTop: 10,
  },
  sectionHeaderText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});