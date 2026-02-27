import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Module3 from './screens/Module3';
import Module4 from './screens/Module4';
import Module5 from './screens/Module5';
import Module6 from './screens/Module6';

import CoreComponents from './screens/CoreComponents';
import FlexLayoutDemo from './screens/FlexLayoutDemo';
import PlatformComponentsDemo from './screens/PlatformComponentsDemo';
import PlatformSpecificDemo from './screens/PlatformSpecificDemo';
import StyleSheetVsStyledComponents from './screens/StyleSheetVsStyledComponents';
import ComponentTypingWithStyle from './screens/ComponentTypingWithStyle';
import ListExamples from './screens/ListExamples';
import ListWithTypes from './screens/ListWithTypes';
import ActivityIndicatorDemo from './screens/ActivityIndicatorDemo';
import ModalAlertPickerDemo from './screens/ModalAlertPickerDemo';
import GestureDemoNoReanimated from './screens/GestureDemo';
import FormValidationDemo from './screens/FormValidationDemo';
import RegistrationFormDemo from './screens/RegistrationFormDemo';
import CustomInput from './screens/CustomInput';
import CustomInputDemo from './screens/CustomInputDemo';


//import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AxiosReactQueryDemoWrapper from './screens/AxiosReactQueryDemo';
import AxiosReactQueryErrorRetryWrapper from './screens/AxiosReactQueryErrorRetryWrapper';

import AsyncStorageDemo from './screens/AsyncStorageDemo';
import BasicAuthDemo from './screens/BasicAuthDemo';
import NativeModuleUI from './screens/NativeModuleUI';
import Optimization from './screens/optimization';
import OptimizedFlatList from './screens/OptimizedFlatList';
import CrudScreen from './screens/CrudScreen';
import ProfilerScreen from './screens/Profiler';
import ErrorBoundaryDemoScreen from './screens/ErrorBoundaryDemoScreen';

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#111' }}>
          <ScrollView
            contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
            showsVerticalScrollIndicator
            keyboardShouldPersistTaps="handled"
          >
            {/* <Text style={styles.heading}>Module 3</Text>
            <Module3 />

            <Text style={styles.heading}>Module 4</Text>
            <Module4 />

            <Text style={styles.heading}>Module 5</Text>
            <Module5 /> disable internal scroll */}

            {/* <Text style={styles.heading}>Module 6</Text>
            <Module6/> disable internal scroll */}

            {/* <Text style={styles.heading}>Core Components</Text>
            <CoreComponents /> */}

            {/* <Text style={styles.heading}>Flex Layout Demo</Text>
            <FlexLayoutDemo /> */}

            {/* <Text style={styles.heading}>Platform Components Demo</Text>
            <PlatformComponentsDemo /> */}

            {/* <Text style={styles.heading}>Platform Specific Demo</Text>
            <PlatformSpecificDemo /> */}

            {/* <Text style={styles.heading}>StyleSheet vs Styled Components</Text>
            <StyleSheetVsStyledComponents /> */}

            {/* <Text style={styles.heading}>Component Typing with Style</Text>
            <ComponentTypingWithStyle /> */}

            {/* <Text style={styles.heading}>List Examples</Text>
            <ListExamples /> */}

            {/* <Text style={styles.heading}>List with Types</Text>
            <ListWithTypes /> */}

            {/* <Text style={styles.heading}>Activity Indicator Demo</Text>
            <ActivityIndicatorDemo /> */}

            {/* <Text style={styles.heading}>Modal, Alert & Picker Demo</Text>
            <ModalAlertPickerDemo /> */}

            {/* <Text style={styles.heading}>Gesture Demo (No Reanimated)</Text>
            <GestureDemoNoReanimated /> */}

            {/* <Text style={styles.heading}>Form Validation Demo</Text>
            <FormValidationDemo /> */}

            {/* <Text style={styles.heading}>Registration Form Demo</Text>
            <RegistrationFormDemo /> */}

            {/* <Text style={styles.heading}>Custom Input Component</Text>
            <CustomInput label="Name" value="John Doe" onChangeText={(value) => console.log(value)} />

            <CustomInputDemo /> */}

            {/* <Text style={styles.heading}>Axios + React Query Demo</Text>
            <AxiosReactQueryDemoWrapper /> */}

            {/* <Text style={styles.heading}>Axios + React Query Error Retry Demo</Text>
            <AxiosReactQueryErrorRetryWrapper /> */}

            {/* <Text style={styles.heading}>AsyncStorage Demo</Text>
            <AsyncStorageDemo /> */}

            {/* <Text style={styles.heading}>Basic Auth Demo</Text>
            <BasicAuthDemo /> */}

            {/* <NativeModuleUI /> */}

            {/* <Text style={styles.heading}>Optimization Techniques</Text>
            <Optimization /> */}

            {/* <Text style={styles.heading}>Optimized FlatList Demo</Text>
            <OptimizedFlatList /> */}

            {/* <Text style={styles.heading}>CRUD Screen Demo</Text>
            <CrudScreen /> */}

            {/* <Text style={styles.heading}>Profiler Demo</Text>
            <ProfilerScreen /> */}

            <Text style={styles.heading}>Error Boundary Demo</Text>
            <ErrorBoundaryDemoScreen />

          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    marginVertical: 20,
  },
});