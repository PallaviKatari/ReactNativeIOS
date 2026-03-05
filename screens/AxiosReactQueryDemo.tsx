// screens/AxiosReactQueryDemo.tsx
import React from "react";
import { View, Text, StyleSheet, FlatList, Pressable, ActivityIndicator } from "react-native";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";

//Axios + React Query Demo - Fetching and displaying a list of users from an API with loading and error states. This screen demonstrates how to use React Query's useQuery hook to manage data fetching, caching, and state management in a clean and efficient way. It also shows how to handle loading and error states gracefully in the UI.
// @tanstack - manage the server state (loading,error,caching,refetching)
// flatList - display the list of users in a scrollable list

// --- User type ---
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

// --- Fetch function ---
const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>("https://jsonplaceholder.typicode.com/users");
  return response.data;
};

// --- Main screen ---
const AxiosReactQueryDemo: React.FC = () => {
  // instead of useState and useEffect we use useQuery to fetch data and manage loading and error states
  const { data, isLoading, error, refetch } = useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers, // useEffect(() => { fetchUsers() }, []) --- IGNORE ---
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
        <Pressable style={styles.button} onPress={() => refetch()}>
          <Text style={styles.buttonText}>Try Again</Text>
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
      />
      <Pressable style={styles.button} onPress={() => refetch()}>
        <Text style={styles.buttonText}>Refetch Users</Text>
      </Pressable>
    </View>
  );
};

// --- Wrap with QueryClientProvider ---
const queryClient = new QueryClient();

const AxiosReactQueryDemoWrapper: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <AxiosReactQueryDemo />
  </QueryClientProvider>
);

export default AxiosReactQueryDemoWrapper;

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