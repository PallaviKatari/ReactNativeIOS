import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native';

/* ================================
   Error Boundary (Class Component)
================================ */

type ErrorBoundaryState = {
  hasError: boolean;
  errorMessage: string;
};

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: '',
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error.message,
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.log('Error caught:', error);
    console.log('Error info:', info);
  }

  handleReset = () => {
    this.setState({ hasError: false, errorMessage: '' });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Something went wrong 🚨</Text>
          <Text style={styles.errorText}>
            {this.state.errorMessage}
          </Text>
          <Button title="Reset" onPress={this.handleReset} />
        </View>
      );
    }

    return this.props.children;
  }
}

/* ================================
   Component That Throws Error
================================ */

const BuggyComponent: React.FC = () => {
  const [crash, setCrash] = React.useState<boolean>(false);

  if (crash) {
    throw new Error('Intentional Crash Triggered!');
  }

  return (
    <View style={styles.content}>
      <Text style={styles.text}>App is running normally ✅</Text>
      <Button title="Crash App" onPress={() => setCrash(true)} />
    </View>
  );
};

/* ================================
   Main Screen
================================ */

const ErrorBoundaryDemoScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>
    </View>
  );
};

export default ErrorBoundaryDemoScreen;

/* ================================
   Styles
================================ */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 15,
    color: '#000',
  },
  errorContainer: {
    alignItems: 'center',
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 10,
  },
  errorText: {
    color: '#000',
    marginBottom: 15,
  },
});