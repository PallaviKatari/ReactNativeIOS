/**
 * Module4.tsx (SCROLL-SAFE VERSION)
 *
 * This version:
 * - DOES NOT use SafeAreaView (handled in App.tsx)
 * - DOES NOT use ScrollView (parent handles scrolling)
 * - DOES NOT use flex: 1
 * - Works perfectly inside stacked modules
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
  StatusBar,
  Platform,
  ViewStyle,
  TextStyle,
} from 'react-native';

/* ================================
   Typed Card Props
================================ */

interface CardProps {
  title: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const Card: React.FC<CardProps> = ({
  title,
  containerStyle,
  textStyle,
}) => {
  return (
    <View style={[styles.card, containerStyle]}>
      <Text style={[styles.cardTitle, textStyle]}>
        {title}
      </Text>
    </View>
  );
};

/* ================================
   MAIN MODULE 4
================================ */

const Module4: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [pressed, setPressed] = useState<boolean>(false);

  return (
    <View style={styles.container}>

      <StatusBar barStyle="light-content" />

      {/* Header */}
      <Text style={styles.headerTitle}>
        Module 4 - Advanced UI Concepts
      </Text>

      {/* Image */}
      <Image
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* TextInput */}
      <TextInput
        style={styles.input}
        placeholder="Enter something..."
        placeholderTextColor="#ce6969"
        value={input}
        onChangeText={setInput}
      />

      {/* Pressable Button */}
      <Pressable
        onPress={() => setPressed(!pressed)}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.buttonText}>
          {pressed ? 'Pressed!' : 'Press Me'}
        </Text>
      </Pressable>

      {/* Platform Conditional */}
      {Platform.OS === 'ios' ? (
        <Card title="Running on iOS" />
      ) : (
        <Card title="Running on Android" />
      )}

      {/* Flexbox Demo */}
      <View style={styles.flexRow}>
        <View style={styles.flexBoxOne} />
        <View style={styles.flexBoxTwo} />
        <View style={styles.flexBoxThree} />
      </View>

      {/* Dynamic Card */}
      <Card
        title={`You typed: ${input}`}
        containerStyle={{ backgroundColor: '#d2eece' }}
        textStyle={{ color: '#d72323' }}
      />

    </View>
  );
};

export default Module4;

/* ================================
   STYLES
================================ */

const styles = StyleSheet.create({

  container: {
    width: '100%',            // 🔥 IMPORTANT: no flex: 1
    backgroundColor: '#dbacac',
    padding: 20,
    borderRadius: 22,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 20,
  },

  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginVertical: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    color: '#fff',
  },

  button: {
    backgroundColor: '#2979ff',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },

  buttonPressed: {
    backgroundColor: '#1c54b2',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },

  card: {
    padding: 16,
    backgroundColor: '#e7afaf',
    borderRadius: 10,
    marginBottom: 20,
  },

  cardTitle: {
    color: '#fff',
    fontSize: 16,
  },

  flexRow: {
    flexDirection: 'row',
    height: 100,
    marginBottom: 20,
  },

  flexBoxOne: {
    flex: 1,
    backgroundColor: '#ff5252',
  },

  flexBoxTwo: {
    flex: 1,
    backgroundColor: '#ffca28',
  },

  flexBoxThree: {
    flex: 1,
    backgroundColor: '#66bb6a',
  },

});