// /**
//  * Module5.tsx
//  * FULLY SCROLLABLE FIXED VERSION
//  */

// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,//li - large lists - map() - iteration - high performance
//   //SectionList - For grouped list
//   ActivityIndicator,
//   Modal,
//   Alert,
//   Pressable,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Picker } from '@react-native-picker/picker';
// import { Gesture, GestureDetector } from 'react-native-gesture-handler';

// /* ================================
//    SAMPLE DATA
// ================================ */

// const DATA = Array.from({ length: 40 }).map((_, i) => ({
//   id: i.toString(),
//   name: `User ${i + 1}`,
// }));

// /* ================================
//    COMPONENT
// ================================ */

// const Module5: React.FC = () => {
//   const [loading, setLoading] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedRole, setSelectedRole] = useState('Developer');

//   const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   useEffect(() => {
//     return () => {
//       if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     };
//   }, []);

//   /* ================================
//      GESTURE HANDLER
//   ================================ */
// // Pan - dragging
// // Pinch - zoom in/out
// // rotation - with fingers
// // fling - swipe
//   const tapGesture = Gesture.Tap().onEnd(() => {
//     Alert.alert('Tapped using Gesture API');
//   });

//   /* ================================
//      RENDER FLATLIST ITEM
//   ================================ */

//   const renderItem = ({ item }: any) => (
//     <View style={styles.listItem}>
//       <Text>{item.name}</Text>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.safeArea}>

//       {/* ============================= */}
//       {/* SCROLLABLE HEADER + LIST */}
//       {/* ============================= */}

//       <FlatList
//         data={DATA}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         showsVerticalScrollIndicator
//         contentContainerStyle={styles.contentContainer}
//         ListHeaderComponent={
//           <View style={styles.headerContainer}>
//             <Text style={styles.title}>Module 5 - Scroll Fixed</Text>

//             <Pressable
//               style={styles.button}
//               onPress={() => {
//                 setLoading(true);
//                 timeoutRef.current = setTimeout(() => {
//                   setLoading(false);
//                 }, 2000);
//               }}
//             >
//               <Text style={styles.buttonText}>Simulate Loading</Text>
//             </Pressable>

//             <Picker
//               selectedValue={selectedRole}
//               onValueChange={(v) => setSelectedRole(v)}
//               style={{ marginVertical: 10 }}
//             >
//               <Picker.Item label="Developer" value="Developer" />
//               <Picker.Item label="Designer" value="Designer" />
//               <Picker.Item label="Manager" value="Manager" />
//             </Picker>

//             <Pressable
//               style={styles.button}
//               onPress={() => setModalVisible(true)}
//             >
//               <Text style={styles.buttonText}>Open Modal</Text>
//             </Pressable>

//             <Pressable
//               style={styles.button}
//               onPress={() => Alert.alert('Confirmation', 'Continue?')}
//             >
//               <Text style={styles.buttonText}>Show Alert</Text>
//             </Pressable>

//             <GestureDetector gesture={tapGesture}>
//               <View style={styles.gestureBox}>
//                 <Text style={{ color: '#fff' }}>Tap Me (Gesture API)</Text>
//               </View>
//             </GestureDetector>
//           </View>
//         }
//       />

//       {/* ============================= */}
//       {/* LOADING OVERLAY */}
//       {/* ============================= */}
//       {loading && (
//         <View style={styles.loadingOverlay} pointerEvents="none">
//           <ActivityIndicator size="large" color="#2979ff" />
//         </View>
//       )}

//       {/* ============================= */}
//       {/* MODAL */}
//       {/* ============================= */}
//       <Modal
//         visible={modalVisible}
//         transparent
//         animationType="slide"
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text>Professional Modal</Text>
//             <Pressable onPress={() => setModalVisible(false)}>
//               <Text style={{ marginTop: 10, color: 'blue' }}>Close</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>

//     </SafeAreaView>
//   );
// };

// export default Module5;

// /* ================================
//    STYLES
// ================================ */

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//   },

//   contentContainer: {
//     padding: 16,
//     paddingBottom: 60, // space for scrolling to last item
//   },

//   headerContainer: {
//     marginBottom: 20,
//   },

//   title: {
//     fontSize: 22,
//     fontWeight: '700',
//     marginBottom: 16,
//   },

//   listItem: {
//     padding: 14,
//     borderBottomWidth: 1,
//     borderColor: '#ddd',
//   },

//   button: {
//     backgroundColor: '#2979ff',
//     padding: 12,
//     borderRadius: 6,
//     marginVertical: 8,
//   },

//   buttonText: {
//     color: '#fff',
//     textAlign: 'center',
//   },

//   gestureBox: {
//     marginTop: 20,
//     backgroundColor: '#444',
//     padding: 20,
//     alignItems: 'center',
//     borderRadius: 8,
//   },

//   loadingOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255,255,255,0.3)',
//   },

//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.4)',
//   },

//   modalContent: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 10,
//     width: '80%',
//   },
// });
/**
 * Module5.tsx
 * FULLY FIXED PROFESSIONAL VERSION
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Modal,
  Alert,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

/* ================================
   SAMPLE DATA
================================ */

const DATA = Array.from({ length: 40 }).map((_, i) => ({
  id: i.toString(),
  name: `User ${i + 1}`,
}));

/* ================================
   COMPONENT
================================ */

const Module5: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Developer');

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  /* ================================
     GESTURE HANDLER
  ================================ */

  const tapGesture = Gesture.Tap().onEnd(() => {
    Alert.alert('Tapped using Gesture API');
  });

  /* ================================
     RENDER ITEM
  ================================ */

  const renderItem = ({ item }: any) => (
    <View style={styles.listItem}>
      <Text>{item.name}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* ============================= */}
      {/* SCROLLABLE HEADER + LIST */}
      {/* ============================= */}

      <FlatList
        data={DATA.slice(0, 10)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Module 5 - Scroll Fixed</Text>

            <Pressable
              style={styles.button}
              onPress={() => {
                setLoading(true);
                timeoutRef.current = setTimeout(() => {
                  setLoading(false);
                }, 2000);
              }}
            >
              <Text style={styles.buttonText}>Simulate Loading</Text>
            </Pressable>

            <Picker
              selectedValue={selectedRole}
              onValueChange={(v) => setSelectedRole(v)}
              style={{ marginVertical: 10 }}
            >
              <Picker.Item label="Developer" value="Developer" />
              <Picker.Item label="Designer" value="Designer" />
              <Picker.Item label="Manager" value="Manager" />
            </Picker>

            <Pressable
              style={styles.button}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.buttonText}>Open Modal</Text>
            </Pressable>

            <Pressable
              style={styles.button}
              onPress={() => Alert.alert('Confirmation', 'Continue?')}
            >
              <Text style={styles.buttonText}>Show Alert</Text>
            </Pressable>

            <GestureDetector gesture={tapGesture}>
              <View style={styles.gestureBox}>
                <Text style={{ color: '#fff' }}>
                  Tap Me (Gesture API)
                </Text>
              </View>
            </GestureDetector>
          </View>
        }
      />

      {/* ============================= */}
      {/* LOADING INDICATOR (Non Blocking) */}
      {/* ============================= */}

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2979ff" />
        </View>
      )}

      {/* ============================= */}
      {/* BOTTOM SHEET MODAL */}
      {/* ============================= */}

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.bottomSheet}>
            <Text style={styles.modalTitle}>
              Professional Bottom Sheet
            </Text>

            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: '#fff' }}>Close</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>

    </SafeAreaView>
  );
};

export default Module5;

/* ================================
   STYLES
================================ */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },

  contentContainer: {
    padding: 16,
    paddingBottom: 80,
  },

  headerContainer: {
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },

  listItem: {
    padding: 14,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },

  button: {
    backgroundColor: '#2979ff',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },

  gestureBox: {
    marginTop: 20,
    backgroundColor: '#444',
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
  },

  /* Loading Spinner - Non Blocking */
  loadingContainer: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },

  /* Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },

  bottomSheet: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },

  closeButton: {
    backgroundColor: '#2979ff',
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
  },
});