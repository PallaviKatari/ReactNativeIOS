import React, { useState, useCallback, useMemo } from 'react';
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
   Memoized Item Component
============================= */

interface ListItemProps {
  item: ItemType;
  selectedId: string | null;
  onPress: (id: string) => void;
}

const ListItem = React.memo(
  ({ item, selectedId, onPress }: ListItemProps) => {
    const isSelected = item.id === selectedId;

    console.log('Rendering item:', item.id);

    return (
      <TouchableOpacity
        style={[
          styles.itemContainer,
          isSelected && styles.selectedItem,
        ]}
        onPress={() => onPress(item.id)}
      >
        <Text style={styles.itemText}>{item.title}</Text>
      </TouchableOpacity>
    );
  }
);

/* =============================
   Main Screen
============================= */

const OptimizedFlatList: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [counter, setCounter] = useState<number>(0);

  /* ----------------------------
     Large Data (Memoized)
  ----------------------------- */
  const data = useMemo<ItemType[]>(() => {
    return Array.from({ length: 500 }, (_, index) => ({
      id: index.toString(),
      title: `Item ${index}`,
    }));
  }, []);

  /* ----------------------------
     Stable Select Handler
  ----------------------------- */
  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  /* ----------------------------
     Optimized renderItem
  ----------------------------- */
  const renderItem: ListRenderItem<ItemType> = useCallback(
    ({ item }) => (
      <ListItem
        item={item}
        selectedId={selectedId}
        onPress={handleSelect}
      />
    ),
    [selectedId, handleSelect]
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Optimized FlatList Demo
        </Text>

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

export default OptimizedFlatList;

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