import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Animated,
} from "react-native";
import {
  TapGestureHandler,
  LongPressGestureHandler,
  PanGestureHandler,
  GestureHandlerRootView,
  State,
} from "react-native-gesture-handler";

const GestureDemoNoReanimated: React.FC = () => {
  // Pan / drag state
  const pan = useRef(new Animated.ValueXY()).current;

  // --- Tap Handler ---
  const onTapEvent = ({ nativeEvent }: any) => {
    if (nativeEvent.state === State.ACTIVE) {
      Alert.alert("Tap Gesture", "You tapped the box!");
    }
  };

  // --- Long Press Handler ---
  const onLongPressEvent = ({ nativeEvent }: any) => {
    if (nativeEvent.state === State.ACTIVE) {
      Alert.alert("Long Press Gesture", "You long pressed the box!");
    }
  };

  // --- Pan / Drag Handler ---
  const onPanGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: pan.x,
          translationY: pan.y,
        },
      },
    ],
    { useNativeDriver: false }
  );

  const onPanHandlerStateChange = ({ nativeEvent }: any) => {
    if (
      nativeEvent.oldState === State.ACTIVE ||
      nativeEvent.state === State.END
    ) {
      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.header}>Gesture Handling (No Reanimated)</Text>

      {/* Tap Gesture */}
      <TapGestureHandler onHandlerStateChange={onTapEvent}>
        <View style={[styles.box, { backgroundColor: "#2196f3" }]}>
          <Text style={styles.boxText}>Tap Me</Text>
        </View>
      </TapGestureHandler>

      {/* Long Press Gesture */}
      <LongPressGestureHandler
        onHandlerStateChange={onLongPressEvent}
        minDurationMs={800}
      >
        <View style={[styles.box, { backgroundColor: "#4caf50" }]}>
          <Text style={styles.boxText}>Long Press Me</Text>
        </View>
      </LongPressGestureHandler>

      {/* Pan / Drag Gesture */}
      <PanGestureHandler
        onGestureEvent={onPanGestureEvent}
        onHandlerStateChange={onPanHandlerStateChange}
      >
        <Animated.View
          style={[
            styles.box,
            { backgroundColor: "#ff9800" },
            { transform: [{ translateX: pan.x }, { translateY: pan.y }] },
          ]}
        >
          <Text style={styles.boxText}>Drag Me</Text>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default GestureDemoNoReanimated;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f4f7",
    alignItems: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  box: {
    width: 150,
    height: 80,
    borderRadius: 12,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  boxText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});