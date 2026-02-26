import React, { useState } from "react";
import { 
  View, 
  Text, 
  ActivityIndicator, 
  Pressable, 
  StyleSheet, 
  FlatList 
} from "react-native";

// Sample data to simulate network fetch
const sampleData = Array.from({ length: 15 }, (_, i) => ({
  id: i.toString(),
  name: `Item ${i + 1}`,
}));

const ActivityIndicatorDemo: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<typeof sampleData>([]);

  // Simulate fetching data
  const fetchData = () => {
    setLoading(true);
    setData([]);
    setTimeout(() => {
      setData(sampleData);
      setLoading(false);
    }, 2000); // 2 seconds delay
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ActivityIndicator Real-Time Demo</Text>

      <Pressable style={styles.button} onPress={fetchData}>
        <Text style={styles.buttonText}>Load Data</Text>
      </Pressable>

      {/* Show spinner while loading */}
      {loading && (
        <ActivityIndicator
          size="large"
          color="#2196f3"
          style={{ marginVertical: 20 }}
        />
      )}

      {/* Show data once loaded */}
      {!loading && data.length > 0 && (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text>{item.name}</Text>
            </View>
          )}
        />
      )}

      {/* Optional empty state */}
      {!loading && data.length === 0 && (
        <Text style={styles.emptyText}>Press "Load Data" to fetch items</Text>
      )}
    </View>
  );
};

export default ActivityIndicatorDemo;

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
  button: {
    backgroundColor: "#2196f3",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
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
  emptyText: {
    textAlign: "center",
    fontStyle: "italic",
    color: "#666",
    marginTop: 20,
  },
});