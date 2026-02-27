import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

interface User {
  id?: number;
  name: string;
  email: string;
}

// ⚠️ If Android Emulator use 10.0.2.2
const API_URL = 'http://localhost:3000/users';

const CrudScreen = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchUsers = async () => {
    const res = await axios.get(API_URL);
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async () => {
    if (!name || !email) return;
    await axios.post(API_URL, { name, email });
    setName('');
    setEmail('');
    fetchUsers();
  };

  const updateUser = async () => {
    if (!editingId) return;
    await axios.put(`${API_URL}/${editingId}`, { name, email });
    setEditingId(null);
    setName('');
    setEmail('');
    fetchUsers();
  };

  const deleteUser = async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchUsers();
  };

  const startEdit = (user: User) => {
    setEditingId(user.id!);
    setName(user.name);
    setEmail(user.email);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CRUD Demo</Text>

      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity
        style={styles.addBtn}
        onPress={editingId ? updateUser : addUser}
      >
        <Text style={styles.btnText}>
          {editingId ? 'Update' : 'Add'}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id!.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View>
              <Text>{item.name}</Text>
              <Text>{item.email}</Text>
            </View>

            <View style={styles.rowButtons}>
              <TouchableOpacity onPress={() => startEdit(item)}>
                <Text style={styles.edit}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => deleteUser(item.id!)}>
                <Text style={styles.delete}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default CrudScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  addBtn: {
    backgroundColor: 'black',
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  btnText: {
    color: 'white',
  },
  row: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowButtons: {
    justifyContent: 'space-between',
  },
  edit: {
    color: 'blue',
  },
  delete: {
    color: 'red',
  },
});