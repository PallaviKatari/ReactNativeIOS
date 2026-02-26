import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const FlexLayoutDemo: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>React Native Flex & Layout Best Practices</Text>

      {/* Example 1: Row Layout */}
      <Text style={styles.exampleTitle}>1. Row Layout (flexDirection: 'row')</Text>
      <View style={styles.rowContainer}>
        <View style={[styles.box, { backgroundColor: "#f44336" }]} />
        <View style={[styles.box, { backgroundColor: "#2196f3" }]} />
        <View style={[styles.box, { backgroundColor: "#4caf50" }]} />
      </View>
      <Text style={styles.explanation}>
        flexDirection: 'row' arranges children horizontally. Use justifyContent to align along main axis.
      </Text>

      {/* Example 2: Column Layout with Spacing */}
      <Text style={styles.exampleTitle}>2. Column Layout with Spacing</Text>
      <View style={[styles.columnContainer, { justifyContent: 'space-between' }]}>
        <View style={[styles.box, { backgroundColor: "#ff9800" }]} />
        <View style={[styles.box, { backgroundColor: "#9c27b0" }]} />
        <View style={[styles.box, { backgroundColor: "#03a9f4" }]} />
      </View>
      <Text style={styles.explanation}>
        flexDirection: 'column' (default) arranges children vertically. 
        justifyContent: 'space-between' spreads children evenly.
      </Text>

      {/* Example 3: Align Items */}
      <Text style={styles.exampleTitle}>3. Align Items Example</Text>
      <View style={[styles.rowContainer, { alignItems: 'flex-end', height: 100 }]}>
        <View style={[styles.smallBox, { backgroundColor: "#e91e63" }]} />
        <View style={[styles.largeBox, { backgroundColor: "#009688" }]} />
        <View style={[styles.smallBox, { backgroundColor: "#ffc107" }]} />
      </View>
      <Text style={styles.explanation}>
        alignItems aligns children along cross axis. 'flex-start', 'center', 'flex-end', or 'stretch' can be used.
      </Text>

      {/* Example 4: Flex Wrap */}
      <Text style={styles.exampleTitle}>4. Flex Wrap Example</Text>
      <View style={[styles.rowContainer, { flexWrap: 'wrap' }]}>
        {[...Array(10).keys()].map((i) => (
          <View key={i} style={[styles.smallBox, { backgroundColor: `hsl(${i*36}, 70%, 50%)` }]} />
        ))}
      </View>
      <Text style={styles.explanation}>
        flexWrap: 'wrap' allows children to wrap to next line when space is limited.
      </Text>

      {/* Example 5: Align Self */}
      <Text style={styles.exampleTitle}>5. Align Self Example</Text>
      <View style={[styles.rowContainer, { height: 100 }]}>
        <View style={[styles.smallBox, { backgroundColor: "#3f51b5", alignSelf: 'flex-start' }]} />
        <View style={[styles.smallBox, { backgroundColor: "#ff5722", alignSelf: 'center' }]} />
        <View style={[styles.smallBox, { backgroundColor: "#8bc34a", alignSelf: 'flex-end' }]} />
      </View>
      <Text style={styles.explanation}>
        alignSelf overrides alignItems for an individual child.
      </Text>
    </ScrollView>
  );
};

export default FlexLayoutDemo;

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
  exampleTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  explanation: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#333",
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  columnContainer: {
    flexDirection: "column",
    height: 150,
    marginBottom: 10,
  },
  box: {
    width: 50,
    height: 50,
    marginHorizontal: 5,
  },
  smallBox: {
    width: 40,
    height: 40,
    margin: 5,
  },
  largeBox: {
    width: 60,
    height: 60,
    margin: 5,
  },
});