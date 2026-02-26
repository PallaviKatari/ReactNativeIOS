import React from "react";
import { View, Text, StyleSheet, FlatList, Pressable, ActivityIndicator } from "react-native";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";

// --- User type ---
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

// --- Fetch function ---
const fetchUsers = async (): Promise<User[]> => {
  // Simulate random error for demo
  if (Math.random() < 0.5) {
    throw new Error("Random API error occurred");
  }
  const response = await axios.get<User[]>("https://jsonplaceholder.typicode.com/users");
  return response.data;
};

// --- Main Screen ---
const AxiosReactQueryErrorRetry: React.FC = () => {
  const { data, isLoading, error, refetch, isFetching } = useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
    retry: 3, // Retry up to 3 times automatically on failure
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000), // Exponential backoff
    staleTime: 1000 * 60, // 1 minute
  });

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2196f3" />
        <Text>Loading users...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
        <Text style={{ marginTop: 4 }}>Retries attempted automatically: 3</Text>
        <Pressable style={styles.button} onPress={() => refetch()}>
          <Text style={styles.buttonText}>Retry Now</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Users List</Text>

      <FlatList
        data={data || []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.email}>{item.email}</Text>
          </View>
        )}
        refreshing={isFetching}
        onRefresh={refetch}
      />

      <Pressable style={styles.button} onPress={() => refetch()}>
        <Text style={styles.buttonText}>Refetch Users</Text>
      </Pressable>
    </View>
  );
};

// --- Wrap with QueryClientProvider ---
const queryClient = new QueryClient();

const AxiosReactQueryErrorRetryWrapper: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <AxiosReactQueryErrorRetry />
  </QueryClientProvider>
);

export default AxiosReactQueryErrorRetryWrapper;

// --- Styles ---
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f0f4f7" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 12, textAlign: "center" },
  item: { padding: 12, backgroundColor: "#fff", marginVertical: 6, borderRadius: 8 },
  name: { fontSize: 16, fontWeight: "bold" },
  email: { fontSize: 14, color: "#555" },
  button: { backgroundColor: "#2196f3", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 12 },
  buttonText: { color: "#fff", fontWeight: "bold" },
  errorText: { color: "#f44336", fontSize: 16 },
});