import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ListRenderItem,
} from 'react-native';

/* =============================
   Types
============================= */
interface ItemType {
  id: string;
  title: string;
}

/* =============================
   ListItem: Render Only Once
============================= */
interface ListItemProps {
  item: ItemType;
  onPress: (id: string) => void;
}

const ListItem = React.memo(({ item, onPress }: ListItemProps) => {
  console.log('Rendering item:', item.id);

  // Local state to track selection
  const [selected, setSelected] = useState(false);

  const handlePress = () => {
    setSelected(true); // only this item updates itself
    onPress(item.id);
  };

  return (
    <TouchableOpacity
      style={[styles.itemContainer, selected && styles.selectedItem]}
      onPress={handlePress}
    >
      <Text style={styles.itemText}>{item.title}</Text>
    </TouchableOpacity>
  );
});

/* =============================
   Main Screen
============================= */
const RenderOnceFlatList: React.FC = () => {
  const [counter, setCounter] = useState(0);

  /* ----------------------------
     Large Data (Memoized)
  ----------------------------- */
  const data = useMemo<ItemType[]>(() => {
    return Array.from({ length: 20 }, (_, index) => ({
      id: index.toString(),
      title: `Item ${index}`,
    }));
  }, []);

  const handlePress = useCallback((id: string) => {
    console.log('Item pressed:', id);
  }, []);

  /* ----------------------------
     FlatList renderItem
  ----------------------------- */
  const renderItem: ListRenderItem<ItemType> = useCallback(
    ({ item }) => <ListItem item={item} onPress={handlePress} />,
    [handlePress]
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Render Once FlatList Demo</Text>

        <TouchableOpacity
          style={styles.counterButton}
          onPress={() => setCounter(prev => prev + 1)}
        >
          <Text>Unrelated Counter: {counter}</Text>
        </TouchableOpacity>
      </View>

      {/* FlatList */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews
        getItemLayout={(_, index) => ({
          length: 60,
          offset: 60 * index,
          index,
        })}
      />
    </View>
  );
};

export default RenderOnceFlatList;

/* =============================
   Styles
============================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  counterButton: {
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  listContent: {
    paddingBottom: 20,
  },
  itemContainer: {
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  selectedItem: {
    backgroundColor: '#d6f0ff',
  },
  itemText: {
    fontSize: 16,
  },
});