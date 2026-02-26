import React from "react";
import {
  View,
  Text,
  FlatList,
  SectionList,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";

// --- Type Definitions ---
// FlatList item type
interface FlatItem {
  id: string;
  name: string;
}

// SectionList item type
interface SectionItem {
  title: string;
  data: string[];
}

// Sample FlatList data
const flatListData: FlatItem[] = Array.from({ length: 15 }, (_, i) => ({
  id: (i + 1).toString(),
  name: `Flat Item ${i + 1}`,
}));

// Sample SectionList data
const sectionListData: SectionItem[] = [
  { title: "Fruits", data: ["Apple", "Banana", "Orange", "Mango"] },
  { title: "Vegetables", data: ["Carrot", "Broccoli", "Spinach", "Potato"] },
];

const ListWithTypes: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>FlatList & SectionList with TypeScript Types</Text>

      {/* === FlatList Example === */}
      <Text style={styles.subHeader}>FlatList Example</Text>
      <FlatList
        data={flatListData}
        keyExtractor={(item: FlatItem) => item.id} // Type-safe keyExtractor
        renderItem={({ item }: { item: FlatItem }) => (
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
      <Text style={styles.subHeader}>SectionList Example</Text>
      <SectionList
        sections={sectionListData}
        keyExtractor={(item, index) => item + index} // Unique key for each item
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

export default ListWithTypes;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f0f4f7" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  subHeader: { fontSize: 18, fontWeight: "600", marginVertical: 10 },
  listItem: {
    padding: 12,
    backgroundColor: "#fff",
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  sectionHeader: { backgroundColor: "#4caf50", padding: 8, borderRadius: 6, marginTop: 10 },
  sectionHeaderText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});